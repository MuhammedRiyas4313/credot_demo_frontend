import Breadcrumb from "../components/brudcrumbs/Breadcrumb";
import CartItems from "../components/cart/CartItems";
import CartSummary from "../components/cart/CartSummary";
import { useCart } from "../services/cart.service";
import Loader from "../components/loader/Loader";
import { ShoppingCartIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";

function Cart() {
  //DATA
  const {
    data: cart,
    // isLoading: isCartLoading,
    // isFetching: isCartFetching,
  } = useCart();

  //LOADING STATUS
  // const isLoading = useLoading(isCartLoading, isCartFetching);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {!isLoading ? (
        <>
          <Breadcrumb title="Cart" />
          {cart && cart?.itemsArr?.length > 0 ? (
            <div className="p-[15px] md:px-[130px] md:py-[130px]">
              <div className="flex flex-wrap">
                <CartItems
                  items={
                    cart && cart?.itemsArr?.length > 0 ? cart?.itemsArr : []
                  }
                />
                <CartSummary cartSummary={cart ? cart : {}} />
              </div>
            </div>
          ) : (
            <div className="min-h-[500px] w-full flex justify-center items-center">
              <span className="text-xl md:text-2xl font-bold flex gap-5">
                Your Cart is empty <ShoppingCartIcon className="size-10" />
              </span>
            </div>
          )}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Cart;
