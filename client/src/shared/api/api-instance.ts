import axios, { AxiosRequestConfig, AxiosError } from "axios";

export const apiInstance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Enable sending/receiving cookies
});

export const createApiInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  return apiInstance({
    ...config,
    ...options,
  }).then((response) => response.data);
};


export type BodyType<Data> = Data;

export type ErrorType<Error> = AxiosError<Error>;