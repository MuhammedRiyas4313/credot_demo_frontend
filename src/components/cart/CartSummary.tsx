import { memo } from "react";
import { ICart } from "../../services/cart.service";
import { toastError, toastSuccess } from "../../utils/toast";
import { useCreateOrder } from "../../services/order.service";
import { useNavigate } from "react-router-dom";

function CartSummary({ cartSummary }: { cartSummary: Partial<ICart> }) {
  //IMPORTS
  const navigate = useNavigate();

  //MUTANT
  const { mutateAsync: createOrder } = useCreateOrder();

  //HANDLERS
  const handleCheckout = async () => {
    try {
      if (
        !window.confirm(
          "Are you sure you want to place this order? Please review your items before proceeding."
        )
      )
        return;

      const res = await createOrder();
      if (res?.data?.message) {
        toastSuccess(res?.data?.message);
        navigate("/order_success");
      }
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <div className="summary w-full md:w-1/3 border border-[#DFDCDC] mt-2 px-8 py-4 max-h-[fit-content]">
      <div className="mt-4 md:mt-0 flex flex-col gap-8">
        <h2 className="text-[20px] font-semibold leading-[48.96px] self-start">
          Cart Totals
        </h2>
        <div className="flex justify-between border-b-2 border-[#DFDCDC]">
          <p className="text-[14px] font-semibold leading-[48.96px] tracking-[2%]">
            Subtotal:
          </p>
          <p className="text-[14px] leading-[48.96px] tracking-[2%] text-right">
            INR &nbsp;{" "}
            {cartSummary?.grandTotal
              ? cartSummary?.grandTotal?.toFixed(2)
              : "0.00"}
          </p>
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-[14px] font-semibold leading-[48.96px] tracking-[2%]">
            Total:
          </p>
          <p className="font-bold text-[22px] leading-[48.96px] tracking-[2%] text-right">
            INR &nbsp;{" "}
            {cartSummary?.grandTotal
              ? cartSummary?.grandTotal?.toFixed(2)
              : "0.00"}
          </p>
        </div>
        <button
          onClick={handleCheckout}
          className="bg-[#1AA5C3] text-[12px] leading-[34px] text-center mt-4 mb-5 uppercase text-white w-full py-3 hover:opacity-85"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default memo(CartSummary);
