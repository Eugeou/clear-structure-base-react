import { logger } from "@/infrastructure/logger/default-logger";
import axios, {
  AxiosHeaders,
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import type { ApiError, ApiErrorResponse, HttpService } from "./type";

export class HttpServiceBase {
  private axiosInstance: AxiosInstance;
  private headers: AxiosHeaders;
  private waitingInterceptorFunc?: () => Promise<void>;
  private tokenProvider?: () => Promise<string>;

  public static createInstance(
    {
      baseURL,
      name: serviceType,
      appId,
      timeout,
      waitingInterceptorFunc,
    }: HttpService,
    tokenProvider?: () => Promise<string>
  ): HttpServiceBase {
    const headers: AxiosHeaders = HttpServiceBase.createDefaultHeaders(
      serviceType,
      appId
    );

    const axiosInstance = axios.create({
      baseURL,
      timeout: timeout || 30000,
      headers,
    });
    const service = new HttpServiceBase(
      axiosInstance,
      headers,
      waitingInterceptorFunc
    );
    service.setupInterceptors();
    service.tokenProvider = tokenProvider;
    return service;
  }

  constructor(
    axiosInstance: AxiosInstance,
    headers: AxiosHeaders,
    waitingInterceptorFunc?: () => Promise<void>
  ) {
    this.axiosInstance = axiosInstance;
    this.headers = headers;
    this.waitingInterceptorFunc = waitingInterceptorFunc;
  }

  private static createDefaultHeaders(serviceType: string, appId: string) {
    const headers: AxiosHeaders = new AxiosHeaders();
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");
    headers.set("x-service-id", serviceType?.toLowerCase() || "none");
    headers.set("x-app-id", appId);
    return headers;
  }

  public addAuthorization(bearerToken: string | undefined): this {
    if (bearerToken) {
      this.headers.set("authorization", bearerToken);
      this.setupInterceptors();
    }
    return this;
  }

  private async responseInterceptor<TResponse>(
    response: TResponse
  ): Promise<TResponse> {
    if (this.waitingInterceptorFunc) {
      await this.waitingInterceptorFunc();
    }
    return Promise.resolve(response);
  }

  private async getToken(): Promise<string> {
    if (this.tokenProvider) {
      return await this.tokenProvider();
    }
    return "";
  }
  private async addTokenAuthorization(): Promise<void> {
    const token = await this.getToken();
    if (token) this.addAuthorization(token);
  }

  public async get<TResponse>(
    url: string,
    params?: any,
    config?: AxiosRequestConfig,
    signal?: AbortSignal
  ): Promise<TResponse> {
    try {
      await this.addTokenAuthorization();
      const response: AxiosResponse<TResponse> = await this.axiosInstance.get(
        url,
        {
          signal,
          params,
          ...config,
        }
      );
      return this.responseInterceptor(response.data);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async post<TRequest, TResponse>(
    url: string,
    data?: TRequest,
    config?: AxiosRequestConfig
  ): Promise<TResponse> {
    try {
      await this.addTokenAuthorization();
      const response: AxiosResponse<TResponse> = await this.axiosInstance.post(
        url,
        data,
        config
      );
      return this.responseInterceptor(response.data);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async put<TRequest, TResponse>(
    url: string,
    data?: TRequest,
    config?: AxiosRequestConfig
  ): Promise<TResponse> {
    try {
      await this.addTokenAuthorization();
      const response: AxiosResponse<TResponse> = await this.axiosInstance.put(
        url,
        data,
        config
      );
      return this.responseInterceptor(response.data);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      await this.addTokenAuthorization();
      const response: AxiosResponse<T> = await this.axiosInstance.delete(
        url,
        config
      );
      return this.responseInterceptor(response.data);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async patch<TRequest, TResponse>(
    url: string,
    data?: TRequest,
    config?: AxiosRequestConfig
  ): Promise<TResponse> {
    try {
      await this.addTokenAuthorization();
      const response: AxiosResponse<TResponse> = await this.axiosInstance.patch(
        url,
        data,
        config
      );
      return this.responseInterceptor(response.data);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: unknown): ApiError {
    let errorMessage = "An unknown error occurred";

    if (
      error &&
      typeof error === "object" &&
      "response" in error &&
      error.response &&
      typeof error.response === "object" &&
      "data" in error.response
    ) {
      const responseData = (error.response as { data: ApiErrorResponse }).data;
      errorMessage = responseData.message || responseData.error || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    const processedError = new Error(errorMessage) as ApiError;

    processedError.originalError = error;
    processedError.status =
      error && typeof error === "object" && "response" in error
        ? (error.response as { status: number }).status
        : null;

    return processedError;
  }

  private handleResponseError(error: AxiosError): Promise<ApiError> {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          logger.error("Unauthorized access");
          break;
        case 403:
          logger.error("Forbidden access");
          break;
        case 404:
          logger.error("Resource not found");
          break;
        case 500:
          logger.error("Server error");
          break;
        default:
          logger.error(`Request failed with status ${error.response.status}`);
          break;
      }
    } else if (error.request) {
      logger.debug("base url: ", this.axiosInstance.defaults.baseURL);
      logger.error("No response received from server", error);
    } else {
      logger.error("Error setting up request", error.message);
    }

    return Promise.reject(this.handleError(error));
  }

  private setupInterceptors(): void {
    this.axiosInstance.interceptors.request.use(
      (config) => this.intercepHeader(config),
      (error: Error) => Promise.reject(error)
    );

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => this.handleResponseError(error as AxiosError)
    );
  }

  private intercepHeader(
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig {
    Object.entries(this.headers).forEach(([key, value]) => {
      if (value !== undefined && key && !config.headers.has(key)) {
        config.headers.set(key, value);
      }
    });
    return config;
  }
}
