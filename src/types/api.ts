export type RequestHeaders = Record<string, string>;

export type RequestConfig = {
  _retry?: boolean;
  headers?: RequestHeaders;
  url?: string;
};

export type ApiClient = {
  request: (config: RequestConfig) => Promise<unknown>;
};

export type ApiError = {
  code: string;
  message: string;
};

export type ApiSettings = {
  apiBaseUrl: string;
  apiBaseUrlCache?: string;
  homeDomain: string;
};
