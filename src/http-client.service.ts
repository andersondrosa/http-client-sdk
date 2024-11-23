import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import {
  HttpClientConfig,
  HttpResponse,
  IHttpClient,
} from "./http-client.interface";
import { HttpClientError } from "./exception";

export class HttpClient implements IHttpClient {
  private axiosInstance: AxiosInstance;

  requests: {
    id: number;
    url: string;
    method: string;
    data: any;
    headers: any;
  }[] = [];

  constructor(private config: HttpClientConfig = {}) {
    //
    this.axiosInstance = axios.create({
      baseURL: config.baseUrl || "/",
      timeout: config.timeout || 10000,
      headers: config.headers || {},
    });

    if (!this.config.interceptor) return;
    this.config.interceptor.handle(this.axiosInstance);
  }

  private mapResponse<T>(axiosResponse: AxiosResponse<T>): HttpResponse<T> {
    return {
      data: axiosResponse.data,
      headers: axiosResponse.headers,
      status: axiosResponse.status,
    };
  }

  private mapError(error: any): HttpClientError {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const data = error.response?.data;
      const headers = error.response?.headers;
      const message = error.message || "Unknown error in HTTP request";
      return new HttpClientError(message, status, data, headers);
    }
    return new HttpClientError("Unexpected error in HTTP request");
  }

  private getConfig(config?: HttpClientConfig): AxiosRequestConfig {
    return config ? { ...config } : {};
  }

  // ---------------------------------------------------------------------------

  setHeader(name: string, value: string) {
    this.axiosInstance.defaults.headers.common[name] = value;
  }

  async get<T>(
    url: string,
    config?: HttpClientConfig
  ): Promise<HttpResponse<T>> {
    try {
      const response = await this.axiosInstance.get<T>(
        url,
        this.getConfig(config)
      );
      return this.mapResponse<T>(response);
    } catch (error) {
      throw this.mapError(error);
    }
  }

  async post<T>(
    url: string,
    data?: Record<string, any>,
    config?: HttpClientConfig
  ): Promise<HttpResponse<T>> {
    try {
      const response = await this.axiosInstance.post<T>(
        url,
        data,
        this.getConfig(config)
      );
      return this.mapResponse<T>(response);
    } catch (error) {
      throw this.mapError(error);
    }
  }

  async put<T>(
    url: string,
    data?: Record<string, any>,
    config?: HttpClientConfig
  ): Promise<HttpResponse<T>> {
    try {
      const response = await this.axiosInstance.put<T>(
        url,
        data,
        this.getConfig(config)
      );
      return this.mapResponse<T>(response);
    } catch (error) {
      throw this.mapError(error);
    }
  }

  async delete<T>(
    url: string,
    config?: HttpClientConfig
  ): Promise<HttpResponse<T>> {
    try {
      const response = await this.axiosInstance.delete<T>(
        url,
        this.getConfig(config)
      );
      return this.mapResponse<T>(response);
    } catch (error) {
      throw this.mapError(error);
    }
  }

  async patch<T>(
    url: string,
    data?: Record<string, any>,
    config?: HttpClientConfig
  ): Promise<HttpResponse<T>> {
    try {
      const response = await this.axiosInstance.patch<T>(
        url,
        data,
        this.getConfig(config)
      );
      return this.mapResponse<T>(response);
    } catch (error) {
      throw this.mapError(error);
    }
  }
}
