import axios from 'axios'

import { baseApiUrl } from '../config'

export const axiosInstance = () => axios.create({ baseURL: baseApiUrl })

export const sandboxAxiosInstance = (sandbox: string) =>
  axios.create({ baseURL: baseApiUrl, headers: { sandbox } })

export const authedAxiosInstance = (sandbox: string, token: string) =>
  axios.create({
    baseURL: baseApiUrl,
    headers: {
      Authorization: `Bearer ${token}`,
      sandbox
    }
  })
