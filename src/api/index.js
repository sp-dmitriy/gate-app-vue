import axios from 'axios'

const defaultConfig = { baseURL: import.meta.env.VITE_APP_API_V1 }
export const DefaultAPIInstance = axios.create(defaultConfig)

DefaultAPIInstance.interceptors.request.use(
  (config) => {
    const updatedConfig = { ...config }
    return updatedConfig
  },
  error => Promise.reject(error),
)

DefaultAPIInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    return Promise.reject(error)
  },
)

