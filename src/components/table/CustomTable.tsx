import { ICartItems } from "../../services/cart.service";
import { generateFilePath } from "../../services/url.service";
import { QUANTITY } from "../cart/CartItems";

function CustomTable({
  items,
  handleDeleteCartItem,
  handleQuantityChange,
  isLoading,
  cart,
  orderList,
}: {
  items: ICartItems[];
  handleDeleteCartItem?: any;
  handleQuantityChange?: any;
  isLoading: boolean;
  cart?: boolean;
  orderList?: boolean;
}) {
  return (
    <>
      <table className="w-full border-collapse">
        <thead className="hidden md:table-header-group">
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
            {orderList && (
              <th className="py-2 text-left text-[12px] uppercase leading-[48.96px] tracking-[0.02em] font-semibold">
                Status
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {items &&
            items?.length > 0 &&
            items?.map((el: any, index: number) => (
              <tr
                className="py-6 text-left border-b block md:table-row"
                key={index}
              >
                <td className="py-6 block md:table-cell">
                  <div className="flex items-center gap-2">
                    <div
                      className={`relative hover:opacity-80 min-h-[90px] min-w-[90px] object-contain border bg-[#F9F9F9] border-[#EEEEEE] flex justify-center items-center`}
                    >
                      <img
                        src={
                          el?.productObj?.image
                            ? generateFilePath(el?.productObj?.image)
                            : ""
                        }
                        className="object-contain h-[30px] w-[30px] md:h-[50px] md:w-[50px]"
                      />
                      {cart && (
                        <div
                          onClick={() =>
                            !isLoading && handleDeleteCartItem(el?._id)
                          }
                          className="absolute cursor-pointer text-[13px] shadow-[0px_0px_8px_0px_rgba(17,17,26,0.08)] top-[-7px] right-[-7px] w-5 h-5 rounded-full bg-white flex justify-center items-center"
                        >
                          x
                        </div>
                      )}
                    </div>
                    <p className="font-semibold text-[12px] leading-[48.96px] tracking-[0.02em] overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[50px] md:max-w-[100px]">
                      {el?.productObj?.name}
                    </p>
                  </div>
                </td>
                <td
                  className="font-semibold text-[12px] leading-[48.96px] tracking-[0.02em] overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[200px] block md:table-cell"
                  data-label="Price"
                >
                  INR &nbsp;{el?.price ? el?.price?.toFixed(2) : "0.00"}
                </td>
                <td
                  className="block md:table-cell border-b"
                  data-label="Quantity"
                >
                  {cart ? (
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
                  ) : (
                    <div className="px-6 py-1 md:py-3">{el?.quantity}</div>
                  )}
                </td>
                <td
                  className="font-semibold text-[12px] leading-[48.96px] tracking-[0.02em] overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[200px] block md:table-cell"
                  data-label="Subtotal"
                >
                  INR &nbsp;{el?.total ? el?.total?.toFixed(2) : "0.00"}
                </td>
                {orderList && (
                  <td
                    className="font-semibold text-[12px] leading-[48.96px] tracking-[0.02em] overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[200px] block md:table-cell"
                    data-label="Status"
                  >
                    {el?.status}
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default CustomTable;
