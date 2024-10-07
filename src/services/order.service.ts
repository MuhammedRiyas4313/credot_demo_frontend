import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "./axios.service";
import url, { GeneralApiResponse } from "./url.service";

export interface IOrder {
  _id: string;
  userId: string;
  addressId: string;
  itemsArr: {
    sku: string;
    variantId?: string;
    subvariantId?: string;
    price: number;
    mrp: number;
    quantity: number;
    total: number;
    createdAt: Date;
  }[];
  grandTotal: number;
  itemsCount: number;
  status: string;
  remark: string; //to cancel the order remark is mandatory!
}

const baseUrl = `${url}/order`;

const createOrder = () => {
  return axios.post(`${baseUrl}`);
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrder,
    onSuccess: (res) => {
      if (res) {
        queryClient.invalidateQueries({ queryKey: ["order"] });
        queryClient.invalidateQueries({ queryKey: ["cart"] });
        queryClient.invalidateQueries({ queryKey: ["products"] });
        queryClient.invalidateQueries({ queryKey: ["order_by_id"] });
      }
    },
  });
};

const getOrder = (pagination: any, searchObj: Record<string, any>) => {
  const query = new URLSearchParams({
    pageIndex: String(pagination.pageIndex),
    pageSize: String(pagination.pageSize),
    ...searchObj,
  }).toString();
  return axios.get<GeneralApiResponse<IOrder[]>>(`${baseUrl}/user/?${query}`);
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
    queryFn: () => getOrder(pagination, searchObj).then((res) => res.data.data),
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
      if (res) {
        queryClient.invalidateQueries({ queryKey: ["order"] });
        queryClient.invalidateQueries({ queryKey: ["order_by_id"] });
      }
    },
  });
};
