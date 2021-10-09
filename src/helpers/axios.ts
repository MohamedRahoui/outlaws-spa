import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { store } from '../store';
import { getRefreshToken, getToken, setToken } from './user';
import { toast } from 'react-toastify';
import history from './history';
const Axios = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
});

Axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await refreshToken();
          const { newToken } = rs.data;
          setToken(newToken);
          Axios.defaults.headers.common['Authorization'] = newToken;
          return Axios(originalConfig);
        } catch (_error: any) {
          console.log(_error);
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }
          return Promise.reject(_error);
        }
      }

      if (err.response.status === 403 && err.response.data) {
        store.logout();
        history.push('/login');
        return Promise.reject(err.response.data);
      }

      if ([500, 400].includes(err.response.status)) {
        toast.error("Une erreur s'est produite. Veuillez réessayer");
        return Promise.reject(err);
      }
    }

    return Promise.reject(err);
  }
);

const refreshToken = async () => {
  return Axios.post('/auth/refresh-token', {
    refreshToken: getRefreshToken(),
  });
};

export default Axios;
