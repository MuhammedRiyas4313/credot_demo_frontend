import { ShoppingBagIcon } from "@heroicons/react/16/solid";
import { useLoading } from "../../hooks/useLoading";
import { useOrder } from "../../services/order.service";
import Breadcrumb from "../brudcrumbs/Breadcrumb";
import Loader from "../loader/Loader";
import OrderTable from "./OrderTable";

function OrderList() {
  //DATA
  const { data: orders, isFetching, isLoading: isLoadingOrders } = useOrder();

  //LOADING STATUS
  const isLoading = useLoading(isLoadingOrders, isFetching);

  return (
    <>
      {!isLoading ? (
        <>
          <Breadcrumb title="Orders" />
          {orders && orders?.length > 0 ? (
            <div className="p-[15px] md:px-[130px] md:py-[130px]">
              <OrderTable items={orders} />
            </div>
          ) : (
            <div className="min-h-[500px] w-full flex justify-center items-center">
              <span className="text-xl md:text-2xl font-bold flex justify-center items-center gap-5">
                Your Order List is empty <ShoppingBagIcon className="size-10" />
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

export default OrderList;
