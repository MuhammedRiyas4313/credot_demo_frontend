import { useQuery } from "@tanstack/react-query";
import axios from "./axios.service";
import url, { GeneralApiResponse } from "./url.service";

const baseUrl = `${url}/banner`;

const getActiveBanner = () => {
  return axios.get<GeneralApiResponse<any>>(`${baseUrl}/active`);
};

export const useActiveBanner = () => {
  return useQuery({
    queryKey: ["active_banner"],
    queryFn: () => getActiveBanner().then((res) => res.data.data),
  });
};
