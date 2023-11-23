import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { toCamelCase, toSnakeCase } from './utils/helpers';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

apiClient.interceptors.request.use((value: InternalAxiosRequestConfig) => {
  if (value.data) {
    value.data = toSnakeCase(value.data);
  }

  return value;
});

apiClient.interceptors.response.use((response: AxiosResponse) => {
  if (
    response.data &&
    response.headers['content-type'] === 'application/json'
  ) {
    response.data = toCamelCase(response.data);
  }

  return response;
});

export default apiClient;
