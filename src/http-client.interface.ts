import { Interceptor } from "./interceptor";

export interface HttpResponse<T> {
  data: T;
  headers: Record<string, string>;
  status: number;
}

export interface HttpClientConfig {
  baseUrl?: string;
  timeout?: number;
  headers?: Record<string, any>;
  interceptor?: Interceptor;
}

export interface IHttpClient {
  requests: {
    id: number;
    url: string;
    method: string;
    data: Record<string, any>;
    headers: Record<string, string>;
  }[];

  setHeader(name: string, value: string): void;

  get<T>(url: string, config?: HttpClientConfig): Promise<HttpResponse<T>>;
  post<T>(
    url: string,
    data?: Record<string, any>,
    config?: HttpClientConfig
  ): Promise<HttpResponse<T>>;
  put<T>(
    url: string,
    data?: Record<string, any>,
    config?: HttpClientConfig
  ): Promise<HttpResponse<T>>;
  delete<T>(url: string, config?: HttpClientConfig): Promise<HttpResponse<T>>;
  patch<T>(
    url: string,
    data?: Record<string, any>,
    config?: HttpClientConfig
  ): Promise<HttpResponse<T>>;
}
