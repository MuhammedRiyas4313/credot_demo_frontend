import { generateFilePath } from "../../services/url.service";

function ImagesArr({ el }: any) {
  return (
    <>
      <div className="h-[50px] w-[50px] object-cover md:h-[128px] md:w-[128px] ">
        <img
          src={el?.image ? generateFilePath(el?.image) : ""}
          alt="brand_logo"
          className="h-auto w-full object-cover"
        />
      </div>
    </>
  );
}

export default ImagesArr;
