//
export class HttpClientError extends Error {
  status?: number;
  data?: any;
  headers?: Record<string, any>;

  constructor(
    message: string,
    status?: number,
    data?: any,
    headers?: Record<string, any>
  ) {
    super(message);
    this.name = "HttpClientError";
    this.status = status;
    this.data = data;
    this.headers = headers;
    Object.setPrototypeOf(this, HttpClientError.prototype); // Corrige o protótipo
  }
}
