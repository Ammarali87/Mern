
import axios from 'axios'

const apiClient = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development' ? 'https://fakestoreapi.com/' : '/',
  headers: {
    'Content-type': 'application/json',
  },
})
 export  const apiClient2 = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development' ? 'https://ecommerce.routemisr.com/' : '/',
  headers: {
    'Content-type': 'application/json',
  },
})

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
