import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { generateFilePath } from "../../services/url.service";

function BannerSlide({ el }: any) {
  return (
    <>
      <div className="image group w-full h-[250px] md:h-[400px] lg:h-[500px] xl:h-[600px] 3xl:h-[750px] relative">
        <a href={el?.url ? `${el.url}` : "#"}>
          <img
            src={generateFilePath(el?.image)}
            alt="image"
            className="object-cover w-full h-full"
            fetchPriority="high"
          />
          <div className="h-full w-full bg-custom-gradient absolute left-0 right-0 text-center mx-auto z-10 bottom-0">
            <div className="absolute left-0 right-0 text-center w-full md:w-[65%] xl:w-[55%] 3xl:w-[40%] top-[25%] md:top-[40%] xl:top-[45%] mx-auto">
              <h6 className="text-[#f2f2fc] text-sm md:text-text18 3xl:text-xl font-normal mb-0 md:mb-1 3xl:mb-2">
                {el?.title}
              </h6>
              <h1 className="text-text16 md:text-2xl lg:text-3xl xl:text-4xl text-white font-semibold">
                {el?.tagline}
              </h1>
            </div>
          </div>
        </a>
      </div>
      {/* <div
        className="custom-prev cursor-pointer top-1/2 left-2 md:left-16 z-10 absolute flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-full bg-[rgba(255,255,255,0.29)] hover:bg-[rgba(231,231,231,0.29)] transition-colors duration-200"
        style={{ backdropFilter: "blur(88px)" }}
      >
        <ChevronLeftIcon className="size-5 fill-black" />
      </div>
      <div
        className="custom-next cursor cursor-pointer top-1/2 right-2 md:right-16 z-10 absolute flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-full bg-[rgba(255,255,255,0.29)] hover:bg-[rgba(231,231,231,0.29)] transition-colors duration-200"
        style={{ backdropFilter: "blur(88px)" }}
      >
        <ChevronRightIcon className="size-5 fill-black" />
      </div> */}
    </>
  );
}

export default BannerSlide;
