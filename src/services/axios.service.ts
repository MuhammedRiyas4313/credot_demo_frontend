import axios from "axios";
import { AUTH_TOKEN } from "../common/constant_frontend.common";
export const axiosAuth = axios.create();

axiosAuth.interceptors.request.use(
  async function (config) {
    if (localStorage) {
      const token = localStorage.getItem(AUTH_TOKEN);
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  function (error) {
    if (error.response.status === 401 || error.response.status === 403) {
      if (localStorage) {
        localStorage.removeItem(AUTH_TOKEN);
      }
    }
    return Promise.reject(error);
  }
);

axiosAuth.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      (error.response && error.response.status === 401) ||
      error.response.status === 403
    ) {
      if (localStorage) {
        localStorage.removeItem(AUTH_TOKEN);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosAuth;
