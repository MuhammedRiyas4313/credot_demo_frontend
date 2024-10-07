import { Dialog, Select, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { IOrder, useUpdateOrderStatus } from "../../services/order.service";
import { ORDER_STATUS, ORDER_STATUS_TYPE } from "../../common/constant.common";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";
import { toastError, toastSuccess } from "../../utils/toast";
import { ERROR } from "../../common/error.common";

export default function UpdateStatus({
  order,
  isOpen,
  closeModal,
}: {
  order: IOrder;
  isOpen: boolean;
  closeModal: any;
}) {
  //STATES
  const [status, setStatus] = useState<ORDER_STATUS_TYPE | null>();
  const [statusArr, setStatusArr] = useState<any[]>([]);
  const [remark, setRemark] = useState<string>();

  //MUTANTS
  const { mutateAsync: updateOrder } = useUpdateOrderStatus();

  //USEEFFECT
  useEffect(() => {
    if (order) {
      const { status }: any = order;
      setStatus(status);
      let statusArr = [];
      if (status === ORDER_STATUS.INITIATED) {
        statusArr.push(ORDER_STATUS.CANCELLED);
      } else if (status === ORDER_STATUS.PROCESSING) {
        statusArr.push(ORDER_STATUS.DELIVERED, ORDER_STATUS.CANCELLED);
      } else if (status === ORDER_STATUS.DELIVERED) {
        statusArr.push(ORDER_STATUS.RETURNED_INITIATED);
      }
      setStatusArr(statusArr);
    }
  }, [order]);

  //HANDLER
  const handleOrderUpdate = async () => {
    try {
      if (order.status === status) return;
      if (!status) throw new Error(ERROR.REQUIRED_FIELD("Status"));
      if (
        status === ORDER_STATUS.CANCELLED ||
        status === ORDER_STATUS.RETURNED_INITIATED
      ) {
        if (!remark) throw new Error(ERROR.REQUIRED_FIELD("Remark"));
      }

      const newObj = {
        status,
        remark,
      };

      let res: any = {};

      if (order?._id) {
        res = await updateOrder({ orderId: order?._id, ...newObj });
      }

      if (res.data?.message) {
        toastSuccess(res.data.message);
        closeModal();
        setRemark("");
        setStatus(null);
      }
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Update Order
                  </Dialog.Title>
                  <div className="relative min-h-[150px]">
                    <Select
                      className={clsx(
                        "mt-3 w-[100px] right-0 md:block md:w-full border bg-white py-2 px-3 text-sm text-black",
                        // Ensure it is responsive
                        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50",
                        "*:text-black"
                      )}
                      onChange={(e: any) => setStatus(e.target.value)}
                    >
                      {Object.values(ORDER_STATUS)?.length > 0 &&
                        Object.values(ORDER_STATUS)?.map((el) => (
                          <option
                            key={el}
                            value={el}
                            disabled={!statusArr.includes(el)}
                            className="text-[10px] md:text-[16]"
                          >
                            {el}
                          </option>
                        ))}
                    </Select>

                    {(status === ORDER_STATUS.CANCELLED ||
                      status === ORDER_STATUS.RETURNED_INITIATED) && (
                      <div className="mt-2 w-full">
                        <input
                          value={remark}
                          onChange={(e: any) => setRemark(e.target.value)}
                          id="remark"
                          name="remark"
                          type="text"
                          placeholder="remark"
                          className="block w-full border-0 px-5 py-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black sm:text-sm sm:leading-6 focus:outline-none"
                        />
                      </div>
                    )}
                    <ChevronDownIcon
                      className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                      aria-hidden="true"
                    />
                    <button
                      onClick={handleOrderUpdate}
                      className="bg-[#1AA5C3] text-[12px] leading-[34px] text-center mt-4 mb-5 uppercase text-white w-full py-2 hover:opacity-85"
                    >
                      Update Order
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
