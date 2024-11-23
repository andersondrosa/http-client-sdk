import axios, { AxiosInstance } from "axios";
import { generateUUID } from "./utils/randomId";

export type Config = {
  endpoint: string;
};

export type RequestDTO = {
  traceId?: string;
  request?: {
    headers?: Record<string, any>;
    body?: any;
    url?: string;
    method?: string;
    timestamp?: string;
  };
  response?: {
    content?: any;
    status?: number;
    headers?: Record<string, any>;
    timestamp?: string;
  };
};

export class Interceptor {
  constructor(private config: Config) {}
  requestId = 0;

  async registerRequest({ traceId, request, response }: RequestDTO) {
    console.log("Tentando salvar log no interceptor...");
    try {
      await axios.post(this.config.endpoint, { traceId, request, response });
    } catch (error) {
      console.error("Erro ao salvar log de request e response:", error);
    }
  }

  handle(axiosInstance: AxiosInstance) {
    //
    axiosInstance.interceptors.request.use((config: any) => {
      const traceId = generateUUID();
      const requestTimestamp = new Date().toISOString();
      config.metadata = { requestTimestamp, traceId };
      config.headers["X-Trace-Id"] = traceId;
      return config;
    });

    axiosInstance.interceptors.response.use(
      async (response) => {
        const config = response.config as any;
        const traceId = config.metadata.traceId;
        const requestTimestamp = config.metadata.requestTimestamp;
        const responseTimestamp = new Date().toISOString();

        response.headers["X-Trace-Id"] = traceId;

        const requestDto: RequestDTO = {
          traceId,
          request: {
            headers: response.config.headers,
            body: response.config.data,
            url: response.config.baseURL + "/" + response.config.url!,
            method: String(response.config.method).toUpperCase(),
            timestamp: requestTimestamp,
          },
          response: {
            content: response.data,
            status: response.status,
            headers: response.headers,
            timestamp: responseTimestamp,
          },
        };

        await this.registerRequest(requestDto);

        return response;
      },
      async (error) => {
        try {
          const config = (error.config || {}) as any;
          const traceId = config.metadata.traceId;
          const requestTimestamp = config.metadata.requestTimestamp;
          const responseTimestamp = new Date().toISOString();

          const response = error.response || { headers: {} };
          if (!response.headers) response.headers = {};

          response.headers["X-Trace-Id"] = traceId;

          const requestDto: RequestDTO = {
            request: {
              headers: config.headers,
              body: config.data,
              url: config.baseURL + "/" + config.url!,
              method: config.method || "",
              timestamp: requestTimestamp,
            },
            response: {
              content: response.data || error.message,
              status: response.status || 500,
              headers: response.headers || {},
              timestamp: responseTimestamp,
            },
          };

          await this.registerRequest(requestDto);
        } catch (e) {
          console.error(e);
        }

        return Promise.reject(error);
      }
    );
  }
}
