import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "./axios.service";
import url, {
  GeneralApiResponse,
  GeneralApiResponsePagination,
} from "./url.service";

const baseUrl = `${url}/order`;

const getOrder = (pagination: any, searchObj: Record<string, any>) => {
  const query = new URLSearchParams({
    pageIndex: String(pagination.pageIndex),
    pageSize: String(pagination.pageSize),
    ...searchObj,
  }).toString();
  return axios.get<GeneralApiResponsePagination<any>>(`${baseUrl}?${query}`);
};

export const useOrder = (
  searchObj: Record<string, any> = {},
  pagination: any = {
    pageIndex: 0,
    pageSize: 10000,
  }
) => {
  return useQuery({
    queryKey: ["order", pagination, searchObj],
    queryFn: () => getOrder(pagination, searchObj).then((res) => res.data),
  });
};

const getOrderById = (OrderId: string) => {
  return axios.get<GeneralApiResponse<any>>(`${baseUrl}/${OrderId}`);
};

export const useOrderById = (OrderId: any, enabled = true) => {
  return useQuery({
    queryKey: ["order_by_id", OrderId],
    queryFn: () => getOrderById(OrderId).then((res) => res.data.data),
    enabled: enabled,
  });
};

const updateOrderStatus = ({ orderId, ...order }: any) => {
  return axios.patch(`${baseUrl}/${orderId}`, order);
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["order"] });
      queryClient.invalidateQueries({ queryKey: ["order_by_id"] });
    },
  });
};
