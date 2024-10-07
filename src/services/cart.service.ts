import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "./axios.service";
import url, { GeneralApiResponse } from "./url.service";

const baseUrl = `${url}/cart`;

export interface ICart {
  userId: string;
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
}

export interface ICartItems {
  sku: string;
  variantId?: string;
  subvariantId?: string;
  price: number;
  mrp: number;
  quantity: number;
  total: number;
  createdAt: Date;
}

const getUserCart = () => {
  return axios.get<GeneralApiResponse<ICart>>(`${baseUrl}`);
};

export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: () => getUserCart().then((res) => res.data.data),
  });
};

const addToCart = (obj: {
  sku: string;
  quantity: number;
  subvariantId?: string;
  variantId?: string;
}) => {
  return axios.post(`${baseUrl}`, obj);
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToCart,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

const removeCartItem = (itemId: string) => {
  return axios.delete(`${baseUrl}/${itemId}`);
};

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeCartItem,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
