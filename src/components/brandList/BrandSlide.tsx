import { generateFilePath } from "../../services/url.service";

function BrandSlide({ el }: any) {
  return (
    <>
      <div className="h-[70px] w-[70px] object-cover rounded-full md:h-[128px] md:w-[128px] overflow-hidden ">
        <img
          src={el?.logo ? generateFilePath(el?.logo) : ""}
          alt="brand_logo"
          className="object-cover"
        />
      </div>
    </>
  );
}

export default BrandSlide;
