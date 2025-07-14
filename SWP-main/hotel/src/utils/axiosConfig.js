import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
});

// Gửi token tự động
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Tự động xử lý lỗi xác thực
instance.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem('token');
      window.location.href = '/admin/login'; // Có thể điều hướng khác
    }
    return Promise.reject(error);
  }
);

export default instance;