import { generateFilePath } from "../../services/url.service";

function BrandSlide({ el }: any) {
  return (
    <>
      <div className="h-[50px] w-[50px] object-cover rounded-full md:h-[128px] md:w-[128px] overflow-hidden ">
        <img
          src={el?.logo ? generateFilePath(el?.logo) : ""}
          alt="brand_logo"
          className="h-auto w-full object-cover"
        />
      </div>
    </>
  );
}

export default BrandSlide;
