import axios from 'axios'

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: 'http://localhost:8085' })

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) =>
    Promise.reject((error.response && error.response.data) || 'Something went wrong'),
)

export default axiosInstance
