import { useCallback } from "react";
import {
  ICartItems,
  useAddToCart,
  useRemoveCartItem,
} from "../../services/cart.service";
import { toastError, toastSuccess } from "../../utils/toast";
import { useLoading } from "../../hooks/useLoading";
import CustomTable from "../table/CustomTable";

export const QUANTITY = {
  INC: "INC",
  DEC: "DEC",
} as const;
type QUANTITY_TYPE = keyof typeof QUANTITY;

function CartItems({ items }: { items: ICartItems[] }) {
  //MUTANTS
  const { mutateAsync: addToCart, isPending: isAddToCartPending } =
    useAddToCart();
  const { mutateAsync: removeCartItem, isPending: isremoveCartItemPending } =
    useRemoveCartItem();

  const isLoading = useLoading(isAddToCartPending, isremoveCartItemPending);

  //HANDLERS
  const handleDeleteCartItem = async (itemId: string) => {
    try {
      if (
        !itemId ||
        !window.confirm("Are you sure you want to remove this item ?")
      )
        return;
      let res = await removeCartItem(itemId);
      if (res?.data?.message) {
        toastSuccess(res?.data?.message);
      }
    } catch (error) {
      toastError(error);
    }
  };
  const handleQuantityChange = useCallback(
    async (type: QUANTITY_TYPE, el: ICartItems) => {
      try {
        const obj: any = {
          sku: el?.sku,
        };
        if (el?.subvariantId && el?.variantId) {
          obj.subvariantId = el?.subvariantId;
          obj.variantId = el?.variantId;
        }
        if (type === QUANTITY.INC) {
          obj.quantity = 1;
        } else {
          if (el.quantity > 1) {
            obj.quantity = -1;
          }
        }
        if (!obj.quantity) {
          return;
        }
        let res = await addToCart(obj);
        if (res?.data) {
          toastSuccess(res?.data?.message);
        }
      } catch (error) {
        toastError(error);
      }
    },
    []
  );

  return (
    <div className="table w-full md:w-2/3 md:pr-20">
      <CustomTable
        items={items}
        handleDeleteCartItem={handleDeleteCartItem}
        handleQuantityChange={handleQuantityChange}
        isLoading={isLoading}
        cart
      />
      <div className="mt-8 flex flex-wrap justify-between">
        <div className="flex w-full md:w-auto mb-3 md:mb-auto">
          <input
            type="text"
            className="border px-4 md:px-5  py-2 placeholder:text-[10px] placeholder:text-[#585858]"
            placeholder="Coupon Code"
          />
          <button className="bg-black w-full text-[12px] uppercase text-white px-2 md:px-6 py-2 hover:opacity-85">
            Apply Coupon
          </button>
        </div>
        <button className="bg-white w-full md:w-auto text-[12px] mb-3 md:mb-auto uppercase text-black font-bold border-2 border-black px-6 py-2 hover:opacity-85">
          Update Cart
        </button>
      </div>
    </div>
  );
}

export default CartItems;
