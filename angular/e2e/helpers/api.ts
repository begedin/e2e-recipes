import axios from 'axios';

const baseURL = 'http://127.0.0.1:4000/api';

export const axiosInstance = () => axios.create({ baseURL });

export const sandboxAxiosInstance = (sandbox: string) =>
  axios.create({ baseURL, headers: { sandbox } });

export const authedAxiosInstance = (sandbox: string, token: string) =>
  axios.create({
    baseURL,
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `Bearer ${token}`,
      sandbox,
    },
  });
