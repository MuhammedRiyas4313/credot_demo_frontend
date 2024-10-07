import { useCallback, useEffect, useState } from "react";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import { useProductById } from "../../services/product.service";
import { useParams } from "react-router-dom";
import { StarIcon } from "@heroicons/react/16/solid";
import { generateFilePath } from "../../services/url.service";
import { toastError, toastSuccess } from "../../utils/toast";
import { useAddToCart } from "../../services/cart.service";
import { ERROR } from "../../common/error.common";

const QUANTITY = {
  INC: "INC",
  DEC: "DEC",
} as const;
type QUANTITY_TYPE = keyof typeof QUANTITY;

const TABS = {
  SPEC: "Specification",
  DESC: "Overview",
} as const;
type TABS_TYPE = keyof typeof TABS;

function ProductDetail() {
  //IMPORTS
  const { id } = useParams();

  //DATA
  const { data: product } = useProductById(id, !!id);

  //STATES
  const [tabs, setTabs] = useState<
    { name: TABS_TYPE | string; text: string }[]
  >([
    {
      name: TABS.SPEC,
      text: "",
    },
    {
      name: TABS.DESC,
      text: "",
    },
  ]);
  const [imagesArr, setImagesArr] = useState([]);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [selectedSubVariant, setSelectedSubVariant] = useState<any>(null);
  const [price, setPrice] = useState<any>(null);
  const [mrp, setMrp] = useState<any>(null);
  const [name, setName] = useState<any>(null);
  const [description, setDescription] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);

  //MUTANTS
  const { mutateAsync: addToCart } = useAddToCart();

  //HANDLERS
  const handleSelectImage = useCallback((el: any) => {
    if (el?.image) {
      setSelectedImage(el?.image);
    }
  }, []);
  const handleSelectVariant = useCallback((variant: any) => {
    if (variant) {
      setSelectedVariant(variant);
      setName(variant?.name);
      setImagesArr(variant?.imagesArr);
      if (variant?.imagesArr[0].image) {
        setSelectedImage(variant?.imagesArr[0].image);
      }
      let desc = null;
      let spec = null;
      if (variant?.subvariants?.length > 0) {
        setSelectedSubVariant(variant?.subvariants[0]);
        setPrice(variant?.subvariants[0].price);
        setMrp(variant?.subvariants[0].mrp);
        setDescription(variant?.subvariants[0].description);
        desc = variant?.subvariants[0].description;
        spec = variant?.subvariants[0].specification;
      } else {
        setPrice(variant?.price);
        setMrp(variant?.mrp);
        setDescription(variant?.description);
        setSelectedSubVariant(null);
        desc = variant?.description;
        spec = variant?.specification;
      }
      if (desc && spec) {
        setTabs((prev: any) => {
          let currentArr = [...prev];
          currentArr = currentArr?.map((el) => {
            if (el?.name === TABS.SPEC) {
              el.text = spec;
            } else {
              el.text = desc;
            }
            return el;
          });
          return currentArr;
        });
      } else {
        setTabs([
          { name: TABS.SPEC, text: "" },
          { name: TABS.DESC, text: "" },
        ]);
      }
    }
  }, []);
  const handleSelectSubVariant = useCallback((subVariant: any) => {
    if (subVariant) {
      setSelectedSubVariant(subVariant);
      setPrice(subVariant?.price);
      setMrp(subVariant?.mrp);
      setDescription(subVariant?.description);
      if (subVariant?.description && subVariant?.specification) {
        setTabs((prev: any) => {
          let currentArr = [...prev];
          currentArr = currentArr?.map((el) => {
            if (el?.name === TABS.SPEC) {
              el.text = subVariant?.specification;
            } else {
              el.text = subVariant?.description;
            }
            return el;
          });
          return currentArr;
        });
      }
    }
  }, []);
  const handleQuantityChange = useCallback(
    (type: QUANTITY_TYPE) => {
      if (type === QUANTITY.INC) {
        setQuantity((prev) => prev + 1);
      } else {
        if (quantity > 1) {
          setQuantity((prev) => prev - 1);
        }
      }
    },
    [quantity]
  );
  const handleAddToCart = useCallback(async () => {
    try {
      if (!quantity) {
        throw new Error(ERROR.REQUIRED_FIELD("Quantity"));
      }
      if (!product?.sku) {
        throw new Error(ERROR.REQUIRED_FIELD("Sku"));
      }
      const obj: any = {
        sku: product?.sku,
        quantity,
      };
      if (selectedSubVariant) {
        obj.subvariantId = selectedSubVariant?._id;
        obj.variantId = selectedVariant?._id;
      }
      let res = await addToCart(obj);
      if (res?.data) {
        toastSuccess(res?.data?.message);
      }
    } catch (error) {
      toastError(error);
    }
  }, [quantity, selectedSubVariant, selectedVariant, product]);

  //USEEFFECT
  useEffect(() => {
    if (product) {
      const {
        imagesArr,
        selectedVariant,
        selectedSubVariant,
        price,
        mrp,
        name,
        description,
        specification,
      }: any = product;
      setImagesArr(imagesArr);
      if (imagesArr?.length) {
        setSelectedImage(imagesArr[0].image);
      }
      setSelectedVariant(selectedVariant);
      setSelectedSubVariant(selectedSubVariant);
      setPrice(price);
      setMrp(mrp);
      setName(name);
      setDescription(description);
      if (specification && description) {
        setTabs((prev: any) => {
          let currentArr = [...prev];
          currentArr = currentArr?.map((el) => {
            if (el?.name === TABS.SPEC) {
              el.text = specification;
            } else {
              el.text = description;
            }
            return el;
          });
          return currentArr;
        });
      }
    }
  }, [product]);

  return (
    <>
      <div className="p-[15px] md:px-[130px] md:py-[60px]">
        {/* detail section */}
        <div className="flex flex-wrap">
          <div className="gallery  w-full md:w-[40%]  flex flex-col justify-between  items-center">
            <div className="flex justify-center items-center p-10 md:p-32 w-full md:mb-10 mb-5 bg-[#F9F9F9] object-contain">
              <img
                src={selectedImage ? generateFilePath(selectedImage) : ""}
                alt="Main_image"
                className="h-[200px] w-[125px] md:h-[300px] md:w-[225px] object-contain"
              />
            </div>
            <div
              className="w-[100%] flex gap-5 overflow-y-scroll"
              style={{
                scrollbarWidth: "none", // For Firefox
                msOverflowStyle: "none", // For IE and Edge
              }}
            >
              {imagesArr?.length > 0 &&
                imagesArr?.map((el: any, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelectImage(el)}
                    className={`hover:opacity-80 min-h-[100px] min-w-[100px] md:min-h-[135px] md:min-w-[135px] object-contain border border-[#EEEEEE] flex justify-center items-center ${selectedImage !== el?.image ? "bg-[#EEEEEE]" : ""} `}
                  >
                    <img
                      src={el?.image ? generateFilePath(el?.image) : ""}
                      className="object-contain h-[30px] w-[30px] md:h-[50px] md:w-[50px]"
                    />
                  </div>
                ))}
            </div>
          </div>
          {/* Product Details */}
          <div className="h-full md:w-[60%] flex items-start p-5 md:p-12 md:px-16 flex-col gap-3 md:gap-6">
            <h2 className="text-[22px] md:text-[28px] font-medium leading-[33.43px] text-left line-clamp-1 md:line-clamp-2">
              {name}
            </h2>
            <p className="text-[10px] md:text-[12px] leading-[26px] tracking[-0.01em] text-[#999999] flex gap-3 items-center">
              <div className="flex gap-1">
                {Array(5)
                  .fill(null)
                  .map((_, index) => (
                    <StarIcon
                      key={index}
                      className="md:size-4 size-2 fill-[#999999]"
                    />
                  ))}
              </div>
              (There are no reviews yet)
            </p>
            <p className="flex md:gap-0">
              <span className="mr-2 font-semibold text-[12px] leading-[15px] text-[#606060]">
                INR
              </span>
              <span className="mr-2 font-extrabold text-[16px] md:text-[20px] leading-[15px] tracking-[-0.1px] text-black">
                {price ? price?.toFixed(2) : "Nil"}
              </span>
              <span className="font-semibold text-[14px] italic md:text-[18px]  leading-[15px] tracking-[-0.1px] text-[#606060] line-through">
                {mrp ? mrp?.toFixed(2) : "Nil"}
              </span>
            </p>
            <p className="text-[#606060] mb-5 text-[12px] md:text-[14px] line-clamp-3">
              {description}
            </p>
            {selectedVariant && (
              <p className="font-semibold text-[12px] md:text-[14px]">
                Color: &nbsp;{selectedVariant?.title}
              </p>
            )}
            <div className="flex gap-5 mb-2 flex-wrap">
              {product &&
                product?.variants?.length > 0 &&
                product?.variants?.map((el: any, index: number) => (
                  <div
                    onClick={() => handleSelectVariant(el)}
                    key={index}
                    className={`relative bg-[#F8F8F8] cursor-pointer hover:opacity-80 h-8 w-8 md:h-[63px] md:w-[63px] rounded-full object-fill flex justify-center items-center`}
                  >
                    <img
                      src={el?.image ? generateFilePath(el?.image) : ""}
                      alt=""
                      className="rounded-full object-fill h-4 w-4 md:h-[40px] md:w-[40px]"
                    />
                    {el?._id === selectedVariant?._id && ( // Assuming `isSelected` indicates whether this variant is selected
                      <div className="absolute inset-0 flex justify-center items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-white" // You can adjust the size and color
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 12l5 5L20 7"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
            </div>
            {selectedVariant && selectedVariant?.subvariants?.length > 0 && (
              <p className="font-semibold text-[12px] md:text-[14px]">
                Internal Memory
              </p>
            )}
            <div className="flex gap-2 mb-6">
              {selectedVariant?.subvariants &&
                selectedVariant?.subvariants?.length > 0 &&
                selectedVariant?.subvariants?.map((el: any) => (
                  <div
                    onClick={() => handleSelectSubVariant(el)}
                    className={`${selectedSubVariant?._id === el._id ? "bg-black text-white " : "hover:opacity-80 text-[#292D32]"} px-2 cursor-pointer md:px-6 py-2 md:py-3 flex gap-2 border border-[#DCDCDC] font-bold text-[10px] md:text-[12px]`}
                  >
                    {el?.title}
                  </div>
                ))}
            </div>
            <div className="quantity_section border-b border-t border-[#DCDCDC] w-full p-4 flex gap-3 md:gap-8">
              <div className="quntity_buttons flex">
                <div
                  className="border border-[#DCDCDC] px-3 py-1 md:py-3 cursor-pointer hover:opacity-80"
                  onClick={() => handleQuantityChange(QUANTITY.DEC)}
                >
                  -
                </div>
                <div className="border border-[#DCDCDC] px-6 py-1 md:py-3">
                  {quantity}
                </div>
                <div
                  className="border border-[#DCDCDC] px-3 py-1 md:py-3 cursor-pointer hover:opacity-80"
                  onClick={() => handleQuantityChange(QUANTITY.INC)}
                >
                  +
                </div>
              </div>
              <div className="addbutton">
                <button
                  onClick={() => handleAddToCart()}
                  className="uppercase flex bg-black text-white text-[12px] md:text-[16px] px-5 py-2 md:px-8 h-full w-full justify-center items-center hover:opacity-80"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Over view Section */}

        {/* Over view section */}
        <div className="flex h-screen w-full justify-start pt-5 md:pt-24 px-4">
          <div className="w-full">
            <TabGroup>
              <TabList className="flex gap-10 border-b w-full border-[#DAD7D7]">
                {tabs.map(({ name }: any) => (
                  <Tab
                    key={name}
                    className="text-[16px] md:text-[20px] pb-4 py-1 px-3 text-sm/6 text-black focus:outline-none data-[selected]:border-b-2 data-[selected]:border-black data-[selected]:font-bold data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
                  >
                    {name}
                  </Tab>
                ))}
              </TabList>
              <TabPanels className="mt-3 md:w-[60%] w-full pt-3  md:pt-10">
                {tabs.map(({ name, text }: any) => (
                  <TabPanel key={name} className="rounded-xl bg-white/5 p-3">
                    {name === TABS.SPEC ? (
                      <div dangerouslySetInnerHTML={{ __html: text }}></div>
                    ) : (
                      <div className="text-black">{text}</div>
                    )}
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
