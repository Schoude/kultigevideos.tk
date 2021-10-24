import { ENVIRONMENT } from './../../types/base.d';
import router from '../router/index';
import { ROUTE_NAMES } from '../router/routing-info';
// import { useAuthStore } from '../stores/auth';
import type {
  ApiResponse,
  BaseRequestParams,
  DefaultHeaders,
  PostRequestParams,
} from './types.d';

export const apiHost =
  import.meta.env.MODE === ENVIRONMENT.PROD
    ? import.meta.env.VITE_API_HOST_PROD
    : import.meta.env.VITE_API_HOST_DEV;

class ApiClient {
  #host =
    import.meta.env.MODE === ENVIRONMENT.PROD
      ? import.meta.env.VITE_API_HOST_PROD
      : import.meta.env.VITE_API_HOST_DEV;

  #headers: DefaultHeaders | {} = {};

  constructor() {}

  async get<Data>({
    url,
    credentials,
    mode,
  }: BaseRequestParams): Promise<ApiResponse<Data>> {
    const res = await fetch(`${this.#host}${url}`, {
      method: 'GET',
      mode,
      credentials,
      headers: this.headers,
    });

    // TODO: handle res.text();
    const data = (await res.json()) as Data;
    return new Promise(resolve => resolve({ data, status: res.status }));
  }

  async delete<Data>({
    url,
    credentials,
    mode,
  }: BaseRequestParams): Promise<ApiResponse<Data>> {
    const res = await fetch(`${this.#host}${url}`, {
      method: 'DELETE',
      mode,
      credentials,
      headers: this.headers,
    });

    // TODO: handle res.text();
    const data = (await res.json()) as Data;
    return new Promise(resolve => resolve({ data, status: res.status }));
  }

  async post<Data>({
    url,
    credentials,
    mode,
    headers,
    body,
  }: PostRequestParams): Promise<ApiResponse<Data>> {
    const res = await fetch(`${this.#host}${url}`, {
      method: 'POST',
      mode,
      credentials,
      headers: {
        ...this.headers,
        ...headers,
      },
      body,
    });

    // TODO: handle res.text();
    const data = (await res.json()) as Data;
    return new Promise(resolve => resolve({ data, status: res.status }));
  }

  set headers(value: DefaultHeaders | {}) {
    this.#headers = value;
  }

  get headers() {
    return this.#headers;
  }
}

const apiClient = new ApiClient();

// //interceptor for fetch
// const { fetch: origFetch } = window;
// window.fetch = async (...args) => {
//   const response = await origFetch(...args);

//   // logout on unauthorized response if already logged in
//   const authStore = useAuthStore();
//   if (response.status === 401 && authStore.isLoggedIn) {
//     const authStore = useAuthStore();
//     router.push({ name: ROUTE_NAMES.LOGIN });
//     authStore.logout();
//   }

//   return response;
// };

export { apiClient };
