import { CheckIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

function OrderSuccess() {
  //IMPORTS
  const navigate = useNavigate();

  //HANDLERS
  const handleSeeOrders = () => {
    navigate("/orders");
  };

  return (
    <div className="min-h-[600px] md:min-h-screen flex items-center justify-center flex-col gap-10 p-4">
      <div>
        <div className="relative bg-[#F8F8F8] cursor-pointer hover:opacity-80 h-[80px] w-[80px] md:h-[150px] md:w-[150px] rounded-full flex justify-center items-center">
          <div className="flex rounded-full justify-center items-center h-[60px] w-[60px] md:h-[100px] md:w-[100px] bg-[#44961D]">
            <CheckIcon className="w-6 h-6 md:w-10 md:h-10 font-bold fill-white" />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 text-center px-2">
        <span className="font-semibold text-[22px] leading-tight md:text-[26px] md:leading-[52.33px]">
          Your order has been placed successfully.
        </span>
        <span className="font-normal text-[13px] leading-[18px] md:leading-[13px] text-[#777777]">
          Thank you for choosing us! You will receive a confirmation email
          shortly with the details of your order.
        </span>
      </div>
      <button
        className="border border-black hover:bg-black hover:text-white mt-5 px-4 py-2 text-sm md:px-5 md:py-2 cursor-pointer"
        onClick={handleSeeOrders}
      >
        See all orders
      </button>
    </div>
  );
}

export default OrderSuccess;
