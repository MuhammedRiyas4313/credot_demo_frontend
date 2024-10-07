import { useCallback } from "react";
import {
  ICartItems,
  useAddToCart,
  useRemoveCartItem,
} from "../../services/cart.service";
import { generateFilePath } from "../../services/url.service";
import { toastError, toastSuccess } from "../../utils/toast";
import { useLoading } from "../../hooks/useLoading";

const QUANTITY = {
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
    <div className="table w-full md:w-2/3 pr-20 ">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-2 text-left text-[12px] uppercase leading-[48.96px] tracking-[0.02em] font-semibold">
              Product
            </th>
            <th className="py-2 text-left text-[12px] uppercase leading-[48.96px] tracking-[0.02em] font-semibold">
              Price
            </th>
            <th className="py-2 text-left text-[12px] uppercase leading-[48.96px] tracking-[0.02em] font-semibold">
              Quantity
            </th>
            <th className="py-2 text-left text-[12px] uppercase leading-[48.96px] tracking-[0.02em] font-semibold">
              Subtotal
            </th>
          </tr>
        </thead>
        <tbody>
          {items &&
            items?.length > 0 &&
            items?.map((el: any, index: number) => (
              <tr className="py-6 text-left border-b" key={index}>
                <td className="py-6">
                  <div className="flex items-center gap-2">
                    <div
                      className={`relative hover:opacity-80 min-h-[90px] min-w-[90px] object-contain border bg-[#F9F9F9] border-[#EEEEEE] flex justify-center items-center  `}
                    >
                      <img
                        src={
                          el?.productObj?.image
                            ? generateFilePath(el?.productObj?.image)
                            : ""
                        }
                        className="object-contain h-[30px] w-[30px] md:h-[50px] md:w-[50px]"
                      />
                      <div
                        onClick={() =>
                          !isLoading && handleDeleteCartItem(el?._id)
                        }
                        className="absolute cursor-pointer text-[13px] shadow-[0px_0px_8px_0px_rgba(17,17,26,0.08)] top-[-7px] right-[-7px] w-5 h-5 rounded-full bg-white flex justify-center items-center"
                      >
                        x
                      </div>
                    </div>
                    <p className="font-semibold text-[12px] leading-[48.96px] tracking-[0.02em] overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[100px]">
                      {el?.productObj?.name}
                    </p>
                  </div>
                </td>
                <td className="font-semibold text-[12px] leading-[48.96px] tracking-[0.02em] overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[200px]">
                  INR &nbsp;{el?.price ? el?.price?.toFixed(2) : "0.00"}
                </td>
                <td className=" border-b">
                  <div className="quntity_buttons flex">
                    <div
                      className="border border-[#DCDCDC] px-3 py-1 md:py-3 cursor-pointer hover:opacity-80"
                      onClick={() =>
                        !isLoading && handleQuantityChange(QUANTITY.DEC, el)
                      }
                    >
                      -
                    </div>
                    <div className="border border-[#DCDCDC] px-6 py-1 md:py-3">
                      {el?.quantity}
                    </div>
                    <div
                      className="border border-[#DCDCDC] px-3 py-1 md:py-3 cursor-pointer hover:opacity-80"
                      onClick={() =>
                        !isLoading && handleQuantityChange(QUANTITY.INC, el)
                      }
                    >
                      +
                    </div>
                  </div>
                </td>
                <td className="font-semibold text-[12px] leading-[48.96px] tracking-[0.02em] overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[200px]">
                  INR &nbsp;{el?.total ? el?.total?.toFixed(2) : "0.00"}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="mt-8 flex justify-between">
        <div className="flex">
          <input
            type="text"
            className="border px-5 py-2 placeholder:text-[10px] placeholder:text-[#585858]"
            placeholder="Coupon Code"
          />
          <button className="bg-black text-[12px] uppercase text-white px-6 py-2 hover:opacity-85">
            Apply Coupon
          </button>
        </div>
        <button className="bg-white text-[12px] uppercase text-black font-bold border-2 border-black px-6 py-2 hover:opacity-85">
          Update Cart
        </button>
      </div>
    </div>
  );
}

export default CartItems;
