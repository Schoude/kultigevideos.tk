type HeaderKey = 'Content-Type' | 'Authentication';
type HeaderValue = 'application/json';

export type DefaultHeaders = Record<HeaderKey, string>;

export interface BaseRequestParams {
  url: string;
  mode?: 'cors' | 'navigate' | 'no-cors' | 'same-origin';
  credentials?: 'include' | 'omit' | 'same-origin';
}

export interface PostRequestParams extends BaseRequestParams {
  body?: string;
  headers?: Record<Exclude<HeaderKey, 'Authentication'>, HeaderValue>;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
}
