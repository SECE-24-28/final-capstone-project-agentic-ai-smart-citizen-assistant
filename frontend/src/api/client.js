import axios from 'axios'

const apiClient = axios.create({
  baseURL: '/api',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const message =
        error.response.data?.detail ||
        error.response.data?.message ||
        `Request failed with status ${error.response.status}`
      return Promise.reject(new Error(message))
    }

    if (error.request) {
      return Promise.reject(
        new Error(
          'Unable to reach the server. Please ensure the backend is running and try again.',
        ),
      )
    }

    return Promise.reject(error)
  },
)

export default apiClient
