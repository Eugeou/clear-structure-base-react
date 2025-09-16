export interface ApiErrorResponse {
  message?: string;
  error?: string;
  status?: number;
}

export interface ApiError extends Error {
  originalError?: unknown;
  status?: number | null;
}

export interface HttpService {
  baseURL: string;
  name: string;
  appId: string;
  timeout?: number;
  waitingInterceptorFunc?: () => Promise<void>;
}
