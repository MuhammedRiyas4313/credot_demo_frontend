import Breadcrumb from "../components/brudcrumbs/Breadcrumb";
import CartItems from "../components/cart/CartItems";
import CartSummary from "../components/cart/CartSummary";
import { useCart } from "../services/cart.service";
import Loader from "../components/loader/Loader";
import { ShoppingCartIcon } from "@heroicons/react/16/solid";

function Cart() {
  //DATA
  const { data: cart, isLoading, isFetching } = useCart();

  return (
    <>
      {!isLoading ? (
        <>
          <Breadcrumb title="Cart" />
          {cart && cart?.itemsArr?.length > 0 ? (
            <div className="p-[15px] md:px-[130px] md:py-[130px]">
              <div className="flex">
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
