import axios from "axios";
import url from "./url.service";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../providers/context/AuthContext";
import { AUTH_TOKEN } from "../common/constant_frontend.common";

const baseUrl = `${url}/user`;

export const webLogin = async (obj: { email: string; password: string }) => {
  return axios.post(`${baseUrl}/login`, obj);
};

export const useLogin = () => {
  const [auth, setAuth] = useAuth();
  return useMutation({
    mutationFn: webLogin,
    onSuccess: (res) => {
      if (res?.data?.token) {
        setAuth(res?.data?.token);
        if (localStorage) {
          localStorage.setItem(AUTH_TOKEN, res?.data?.token);
        }
      }
    },
  });
};

export const registerUser = async (obj: {
  email: string;
  password: string;
}) => {
  return axios.post(`${baseUrl}/register`, obj);
};

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};
