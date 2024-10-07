import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./swiperstyle.css";
import "../../index.css";

// import required modules
import { Navigation } from "swiper/modules";
import BannerSlide from "./BannerSlide";
import BrandSlide from "../brandList/BrandSlide";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import ImagesArr from "../productDetails/ImagesArr";

export default function SwiperComponent({
  data,
  homeBanner,
  brands,
  slidesPerView,
  spaceBetween,
  productGallery,
  loop = true,
  navigation,
}: {
  data: any[];
  homeBanner?: boolean;
  brands?: boolean;
  productGallery?: boolean;
  slidesPerView: number;
  spaceBetween: number;
  loop?: boolean;
  navigation?: boolean;
}) {
  return (
    <div className="relative w-full">
      <Swiper
        navigation={
          !!brands
            ? {
                nextEl: ".custom-next",
                prevEl: ".custom-prev",
              }
            : navigation
        }
        autoplay={{ delay: 2000 }}
        loop={loop}
        modules={[Navigation]}
        className="mySwiper"
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        style={
          {
            "--swiper-navigation-size": "25px",
          } as any
        }
      >
        {/* Home Banner */}
        {homeBanner &&
          data?.length > 0 &&
          data.map((el: any) => (
            <SwiperSlide key={el?._id}>
              <BannerSlide el={el} />
            </SwiperSlide>
          ))}
        {brands &&
          data?.length > 0 &&
          data.map((el: any) => (
            <SwiperSlide key={el?._id}>
              <BrandSlide el={el} />
            </SwiperSlide>
          ))}
        {productGallery &&
          data?.length > 0 &&
          data.map((el: any) => (
            <SwiperSlide key={el?._id}>
              <ImagesArr el={el} />
            </SwiperSlide>
          ))}
      </Swiper>
      {brands && (
        <>
          <div
            className="hidden custom-prev cursor-pointer top-9 left-[-50px]  z-[9999] absolute md:flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-full bg-[#F8F8F8] hover:bg-[rgba(231,231,231,0.29)] transition-colors duration-200"
            style={{ backdropFilter: "blur(88px)" }}
          >
            <ChevronLeftIcon className="size-5 fill-black" />
          </div>
          <div
            className="hidden custom-next cursor-pointer top-9 right-[-50px] z-10 absolute md:flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-full bg-[#F8F8F8] hover:bg-[rgba(231,231,231,0.29)] transition-colors duration-200"
            style={{ backdropFilter: "blur(88px)" }}
          >
            <ChevronRightIcon className="size-5 fill-black" />
          </div>
        </>
      )}
    </div>
  );
}
