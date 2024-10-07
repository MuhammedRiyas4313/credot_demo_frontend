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
          <div className="h-full w-full md:w-1/2 absolute right-0 z-10 bottom-0 flex items-start">
            <div className="h-full w-full flex flex-col justify-center items-start p-4 pt-12 md:pt-16 pl-6 md:pl-10 rounded-xl">
              {/* Group 1: Title and Tagline */}
              <div className="mb-4 md:mb-6 flex flex-col items-start justify-center mt-2 md:mt-4">
                <h1 className="text-white font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight">
                  {el?.title}
                </h1>
                <h6 className="text-white font-semibold text-sm sm:text-base md:text-lg xl:text-2xl mt-1 md:mt-2">
                  {el?.tagline}
                </h6>
              </div>

              {/* Group 2: Release Date and Button */}
              <div className="mt-2 md:mt-4 flex flex-col items-start justify-center w-full md:w-1/2">
                <p className="text-white font-semibold text-xs sm:text-sm md:text-base xl:text-lg mb-3 md:mb-4">
                  {el?.releaseDate}
                </p>
                <button className="text-black bg-white rounded-full px-4 py-1 text-xs sm:text-sm md:text-base xl:text-lg font-semibold hover:bg-gray-200">
                  {el?.buttonText}
                </button>
              </div>
            </div>
          </div>
        </a>
      </div>
    </>
  );
}

export default BannerSlide;
