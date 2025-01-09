// apiClient.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://fakestoreapi.com', // Ensure this matches your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});




apiClient.interceptors.request.use(
  async (config) => {
    if (localStorage.getItem('userInfo'))
      config.headers.authorization = `Bearer ${
        JSON.parse(localStorage.getItem('userInfo')!).token
      }`
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

export default apiClient
