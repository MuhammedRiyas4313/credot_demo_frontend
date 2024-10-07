import { useQuery } from "@tanstack/react-query";
import axios from "./axios.service";
import url, { GeneralApiResponsePagination } from "./url.service";

const baseUrl = `${url}/brand`;

const getBrand = (pagination: any, searchObj: Record<string, any>) => {
  const query = new URLSearchParams({
    pageIndex: String(pagination.pageIndex),
    pageSize: String(pagination.pageSize),
    ...searchObj,
  }).toString();
  return axios.get<GeneralApiResponsePagination<any>>(`${baseUrl}?${query}`);
};

export const useBrand = (
  searchObj: Record<string, any> = {},
  pagination: any = {
    pageIndex: 0,
    pageSize: 10000,
  }
) => {
  return useQuery({
    queryKey: ["brand", pagination, searchObj],
    queryFn: () => getBrand(pagination, searchObj).then((res) => res.data.data),
  });
};
