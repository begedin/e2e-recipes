import axios, { AxiosRequestConfig } from 'axios';

const client = () => {
  const token = window.localStorage.getItem('token');
  const headers = {
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const config: AxiosRequestConfig = {
    baseURL: 'http://localhost:4000/api',
    headers,
    responseType: 'json',
  };

  return axios.create(config);
};

export const post = async <T = any>(url: string, data: {}) => {
  const response = await client().post(url, data);
  return response.data as { data: T };
};

export const get = async (url: string, params: {}) => {
  const response = await client().get(url, { params });
  return response.data;
};
