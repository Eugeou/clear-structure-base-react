import type { HttpService } from "./type";
import { HttpServiceBase } from "./http-service-base";
import { env } from "@/infrastructure/env/env";
export class ApiServiceFactory {
  private static httpServices: Record<string, HttpServiceBase> = {};

  private static createService({
    baseURL,
    name: serviceType,
    appId,
    waitingInterceptorFunc,
  }: HttpService): HttpServiceBase {
    const instance = HttpServiceBase.createInstance(
      {
        baseURL,
        appId,
        name: serviceType,
        timeout: 300000,
        waitingInterceptorFunc,
      },
      //idToken
    );
    return instance;
  }

  public static getService(
    serviceKey: string,
    baseUrl: string,
    waitingInterceptorFunc?: () => Promise<void>
  ): HttpServiceBase {
    if (!this.httpServices[serviceKey]) {
      this.httpServices[serviceKey] = this.createService({
        baseURL: baseUrl,
        name: serviceKey,
        appId: env.app.id,
        waitingInterceptorFunc,
      });
    }
    return this.httpServices[serviceKey];
  }
  public static getCommonService(
    baseUrl: string,
    waitingInterceptorFunc?: () => Promise<void>
  ): HttpServiceBase {
    return this.getService("be-common-agent", baseUrl, waitingInterceptorFunc);
  }
  public static getAuthService(baseUrl: string): HttpServiceBase {
    return this.getService("gateway-auth", baseUrl);
  }
}
