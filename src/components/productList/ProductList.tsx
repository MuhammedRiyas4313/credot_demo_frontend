import { ArrowRightIcon, PlusIcon } from "@heroicons/react/16/solid";
import { useProduct } from "../../services/product.service";
import { generateFilePath } from "../../services/url.service";
import { PRODUCT_STATUS } from "../../common/constant.common";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { ERROR } from "../../common/error.common";
import { useAddToCart } from "../../services/cart.service";
import { toastError, toastSuccess } from "../../utils/toast";

function ProductList() {
  //IMPORTS
  const navigate = useNavigate();

  //MUTANTS
  const { mutateAsync: addToCart } = useAddToCart();

  //DATA
  const { data: products } = useProduct({ pageIndex: 0, pageSize: 7 }, {});

  //HANDLERS
  const handleClickProduct = (id: string) => {
    if (id) {
      navigate(`product/${id}`);
    }
  };
  const handleAddToCart = useCallback(async (el: any, e: any) => {
    try {
      e.stopPropagation();
      if (el?.inCart) {
        navigate(`cart`);
        return;
      }
      if (!el?.sku) {
        throw new Error(ERROR.REQUIRED_FIELD("Sku"));
      }
      const obj: any = {
        sku: el?.sku,
        quantity: 1,
        variantId: el?.variantId,
      };
      if (el?.subvariantId) {
        obj.subvariantId = el?.subvariantId;
      }
      let res = await addToCart(obj);
      if (res?.data) {
        toastSuccess(res?.data?.message);
      }
    } catch (error) {
      toastError(error);
    }
  }, []);

  return (
    <div className="w-full mb-5 md:mb-10">
      <div className="md:grid md:grid-cols-[30%,70%] gap-0">
        {/* First Column: Single Product Details */}
        {products?.data && products?.data?.length > 0 && (
          <div
            onClick={() => handleClickProduct(products?.data[0]?._id)}
            className="object-contain hidden md:flex border md:gap-2 py-16 px-5 border-[#B9B9B9] md:flex-col items-center justify-between cursor-pointer"
          >
            <img
              src={generateFilePath(products?.data[0].image)}
              alt="Product"
              className="aspect-square object-contain md:w-[224px] md:h-[300px]" // Maintain aspect ratio
            />
            <div className="flex flex-col gap-5 items-center">
              <h6 className="mt-2 text-center text-[10px] font-semibold leading-[15px] tracking-[1px] text-[#1AA5C3]  md:text-[12px]">
                {products?.data[0].categoryName}
              </h6>
              <h4 className="text-[18px] font-medium leading-[29px] text-center text-black line-clamp-2  md:text-[20px]">
                {products?.data[0].name}
              </h4>
              <p className="flex gap:0 md:gap-10 m-5">
                <span className="text-[12px] font-bold leading-[15px] text-[#606060]">
                  INR
                </span>
                <span className="text-[18px] font-extrabold leading-[15px] tracking[-0.1px] text-black">
                  {products?.data[0].price}
                </span>
                <span className="text-[16px] font-bold leading-[15px] text-[#606060] line-through">
                  {products?.data[0].mrp}
                </span>
              </p>
            </div>
            {products?.data[0].status === PRODUCT_STATUS.AVAILABLE ? (
              <button
                onClick={(e: any) => handleAddToCart(products?.data[0], e)}
                className="flex justify-center uppercase bg-[#1AA5C3] px-16 py-4 text-sm font-semibold leading-6 text-white shadow-sm hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {products?.data[0].inCart ? "Order Now" : "Add to cart"}
              </button>
            ) : (
              <div className="text-red-500 text-[10px] md:text-[14px] mt-2 h-8 md:h-12 text-end flex items-end justify-end">
                Currently unvailable
              </div>
            )}
          </div>
        )}

        {/* Second Column: 6 Products Grid (2 rows x 3 columns on large, 3 rows x 2 columns on mobile) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-0 divide-x divide-y border border-[#B9B9B9] ">
          {/* Map through product items */}
          {products?.data &&
            products?.data?.slice(1).length > 0 &&
            products?.data?.slice(1)?.map((item, index) => (
              <div
                key={index}
                className="bg-white p-3 md:p-6 shadow w-full flex flex-col justify-items-start  border border-[#B9B9B9] relative cursor-pointer"
                onClick={() => handleClickProduct(item?._id)}
              >
                {item?.isBestSeller && (
                  <div className="h-3 w-8 md:h-5 md:w-14 md:top-3 md:left-3 bg-[#44961D] md:absolute flex items-center justify-center">
                    <p className="text-white text-[12px]">HOT</p>
                  </div>
                )}
                <div className="flex justify-center">
                  <img
                    src={generateFilePath(item?.image)}
                    alt={`Product`}
                    className="w-[70px] h-[92px] md:w-[130px] md:h-[182px] text-center"
                  />
                </div>
                <div className="flex flex-col justify-between h-full">
                  {" "}
                  <div className="flex items-end justify-between mb-2">
                    <h6 className=" text-center text-[10px] font-semibold leading-[15px] tracking-[1px] text-[#1AA5C3] md:text-[10px]">
                      {item?.categoryName}
                    </h6>
                    {item?.status === PRODUCT_STATUS.AVAILABLE ? (
                      <div
                        onClick={(e: any) =>
                          item?.inCart
                            ? navigate("/cart")
                            : handleAddToCart(item, e)
                        }
                        className={`custom-next cursor cursor-pointer flex items-center justify-center w-8 h-8 md:w-[43px] md:h-[43px] rounded-full ${item?.inCart ? "bg-[#1AA5C3]" : "bg-[rgba(255,255,255,0.29)]"}  hover:bg-[rgba(231,231,231,0.29)] transition-colors duration-200 border`}
                      >
                        <PlusIcon
                          className={`size-4 md:size-4 ${item?.inCart ? "fill-white" : "fill-black"}`}
                        />
                      </div>
                    ) : (
                      <div className="text-red-500 text-[10px] md:text-[14px] mt-2 h-8 md:h-12 text-end flex items-end justify-end">
                        Currently unvailable
                      </div>
                    )}
                  </div>
                  <h4 className="text-[12px] font-medium leading-[23px] text-black mb-3 md:text-[13px] ">
                    {item?.name}
                  </h4>
                  <p className="flex md:gap-8 md:mt-3">
                    <span className="mr-2 font-bold text-[12px] leading-[15px] text-[#606060]">
                      INR
                    </span>
                    <span className="mr-2 font-extrabold text-[16px] leading-[15px] tracking-[-0.1px] text-black">
                      {item?.price}
                    </span>
                    <span className="font-semibold text-[14px] leading-[15px] tracking-[-0.1px] text-[#606060] line-through">
                      {item?.mrp}
                    </span>
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="p-3 md:p-5 flex justify-end gap-1 items-center mt-3 md:mt-5 cursor-pointer text-[12px] md:text-[18px] font-semibold">
        View more <ArrowRightIcon className="md:size-5 size-3 fill-black" />
      </div>
    </div>
  );
}

export default ProductList;
