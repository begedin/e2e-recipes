import axios from 'axios';

const baseURL = 'http://localhost:4000/api';

export const axiosInstance = () => axios.create({ baseURL });

export const sandboxAxiosInstance = (sandbox: string) =>
  axios.create({ baseURL, headers: { sandbox } });

export const authedAxiosInstance = (sandbox: string, token: string) =>
  axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${token}`,
      sandbox,
    },
  });
