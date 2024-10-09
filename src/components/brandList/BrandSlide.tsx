import { generateFilePath } from "../../services/url.service";
import dummyBrand from "../../assets/images/dummy_product.webp";

function BrandSlide({ el }: any) {
  return (
    <>
      <div className="h-[49px] w-[49px] object-cover rounded-full overflow-hidden ">
        <img
          src={el?.logo ? generateFilePath(el?.logo) : dummyBrand}
          alt="brand_logo"
          className="object-cover"
        />
      </div>
    </>
  );
}

export default BrandSlide;
