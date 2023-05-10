import axios from 'axios';
import { toast } from 'react-toastify';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    // 'cache-control': 'no-cache',
  },
  // withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    if (localStorage.getItem('token') === null) return config;

    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    if (response.data.message) {
      console.log(response.data.message);
    }
    return response;
  },
  (error) => {
    // if (error.response?.status === 401 || error.response?.status === 403) {
    //   localStorage.removeItem('token');
    // }

    if (error.response?.data?.length > 0) {
      error?.response?.data.forEach((message) => toast.error(message));
    } else if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else if (error.message) {
      toast.error(error.message);
    } else if (error.response?.data?.error) {
      toast.error(error.response.data.error);
    }

    throw error;
  },
);

export default instance;
