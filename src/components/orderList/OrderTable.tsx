import { format } from "date-fns";
import { PencilSquareIcon } from "@heroicons/react/16/solid";
import { IOrder } from "../../services/order.service";
import { toastError } from "../../utils/toast";
import { useState } from "react";
import UpdateStatus from "./UpdateStatus";
import { ORDER_STATUS } from "../../common/constant.common";
import Loader from "../loader/Loader";

function OrderTable({
  items,
  isLoading,
}: {
  items: IOrder[];
  isLoading: boolean;
}) {
  //STATE
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState<any>(null);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  //HANDLERS
  const handleOrderUpdate = (order: any) => {
    try {
      setOrder(order);
      openModal();
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <>
          <div className="w-full overflow-x-auto">
            {" "}
            {/* This wrapper ensures horizontal scrollability */}
            <table className="min-w-full table-auto border-collapse">
              {" "}
              {/* Add min-w-full to ensure full width */}
              <thead>
                <tr className="border-b">
                  <th className="px-2 py-2 text-left text-[10px] sm:text-[12px] uppercase leading-[48.96px] tracking-[0.02em] font-semibold">
                    Created
                  </th>
                  <th className="px-2 py-2 text-left text-[10px] sm:text-[12px] uppercase leading-[48.96px] tracking-[0.02em] font-semibold">
                    Items
                  </th>
                  <th className="px-2 py-2 text-left text-[10px] sm:text-[12px] uppercase leading-[48.96px] tracking-[0.02em] font-semibold">
                    Subtotal
                  </th>
                  <th className="px-2 py-2 text-left text-[10px] sm:text-[12px] uppercase leading-[48.96px] tracking-[0.02em] font-semibold">
                    Status
                  </th>
                  <th className="px-2 py-2 text-left text-[10px] sm:text-[12px] uppercase leading-[48.96px] tracking-[0.02em] font-semibold">
                    Remark
                  </th>
                  <th className="px-2 py-2 text-left text-[10px] sm:text-[12px] uppercase leading-[48.96px] tracking-[0.02em] font-semibold">
                    {" "}
                  </th>
                </tr>
              </thead>
              <tbody>
                {items &&
                  items?.length > 0 &&
                  items?.map((el: any, index: number) => (
                    <tr className="py-4 text-left border-b" key={index}>
                      <td className="px-2 py-4 font-semibold text-[10px] sm:text-[12px] leading-[48.96px] tracking-[0.02em] overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[150px]">
                        {el.createdAt
                          ? format(el?.createdAt, "dd/MM/yy hh:mm a")
                          : ""}
                      </td>
                      <td className="px-2 py-4 font-semibold text-[10px] sm:text-[12px] leading-[48.96px] tracking-[0.02em] overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[150px]">
                        {el?.itemsCount}
                      </td>
                      <td className="px-2 py-4 font-semibold text-[10px] sm:text-[12px] leading-[48.96px] tracking-[0.02em] overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[150px]">
                        {el?.grandTotal
                          ? el?.grandTotal.toFixed(2)
                          : el?.grandTotal}
                      </td>
                      <td className="px-2 py-4 font-semibold text-[10px] sm:text-[12px] leading-[48.96px] tracking-[0.02em] overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[150px]">
                        {el?.status}
                      </td>
                      <td className="px-2 py-4 font-semibold text-[10px] sm:text-[12px] leading-[48.96px] tracking-[0.02em] overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[150px]">
                        {el?.remark}
                      </td>
                      <td
                        onClick={() =>
                          !(
                            el?.status === ORDER_STATUS.CANCELLED ||
                            el?.status === ORDER_STATUS.INITIATED ||
                            el?.status === ORDER_STATUS.RETURNED_INITIATED ||
                            el?.status === ORDER_STATUS.RETURNED_DELIVERED
                          ) && handleOrderUpdate(el)
                        }
                        className="px-2 py-4 cursor-pointer font-semibold text-[10px] sm:text-[12px] leading-[48.96px] tracking-[0.02em] overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[150px]"
                      >
                        <PencilSquareIcon className="w-4 h-4 sm:w-6 sm:h-6" />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <UpdateStatus isOpen={isOpen} closeModal={closeModal} order={order} />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default OrderTable;
