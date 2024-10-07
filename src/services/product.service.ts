import { useQuery } from "@tanstack/react-query";
import axios from "./axios.service";
import url, {
  GeneralApiResponse,
  GeneralApiResponsePagination,
} from "./url.service";
import { PRODUCT_STATUS_TYPE } from "../common/constant.common";

const baseUrl = `${url}/product`;

export interface IProduct {
  _id: string;
  name: string;
  sku: string;
  categoryId: string;
  categoryName: string;
  brandId: string;
  brandName: string;
  specification: string;
  description: string;
  thumbnail: string; //required
  maxItemsPerOrder: number;
  imagesArr: { image: string }[]; //not required.
  price: number;
  mrp: number;
  quantity: number;
  isBestSeller: boolean;
  variants: {
    title: string;
    image: string;
    price: number;
    mrp: number;
    quantity: number;
    specification: string;
    description: string;
    createdAt: Date;
    imagesArr: { image: string }[]; //to show multiple images of a variant.
    subvariants: {
      title: string;
      price: number;
      mrp: number;
      quantity: number;
      specification: string;
      description: string;
      createdAt: Date;
    }[];
  }[];
  isDeleted: boolean;
  metaTitle: string;
  metaDescription: string;

  //fields added after aggregation
  image: string;
  status: PRODUCT_STATUS_TYPE;
  title: string;
  inCart: boolean;
}

const getProduct = (pagination: any, searchObj: Record<string, any>) => {
  const query = new URLSearchParams({
    pageIndex: String(pagination.pageIndex),
    pageSize: String(pagination.pageSize),
    ...searchObj,
  }).toString();
  return axios.get<GeneralApiResponsePagination<IProduct>>(
    `${baseUrl}/user?${query}`
  );
};

export const useProduct = (
  searchObj: Record<string, any> = {},
  pagination: any = {
    pageIndex: 0,
    pageSize: 10000,
  }
) => {
  return useQuery({
    queryKey: ["product", pagination, searchObj],
    queryFn: () => getProduct(pagination, searchObj).then((res) => res.data),
  });
};

const getProductById = (productId: string) => {
  return axios.get<GeneralApiResponse<IProduct>>(
    `${baseUrl}/user/${productId}`
  );
};

export const useProductById = (productId: any, enabled = true) => {
  return useQuery({
    queryKey: ["product_by_id", productId],
    queryFn: () => getProductById(productId).then((res) => res.data.data),
    enabled: enabled,
  });
};
