import { SORT_ORDER } from "../common/constant.common";
import BrandSlide from "../components/brandList/BrandSlide";
import Loader from "../components/loader/Loader";
import ProductList from "../components/productList/ProductList";
import SectionTitle from "../components/sectionTitle/SectionTitle";
import SwiperComponent from "../components/swiper/SwiperComponent";
import { useLoading } from "../hooks/useLoading";
import { useActiveBanner } from "../services/banner.service";
import { useBrand } from "../services/brand.service";

function Home() {
  //DATA
  const {
    data: activeBanner,
    isLoading: isLoadingBanner,
    isFetching: isFetchingBanner,
  } = useActiveBanner();
  const {
    data: topBrands,
    isLoading: isLoadingBrands,
    isFetching: isFetchingBrands,
  } = useBrand({
    sort: "priority",
    order: SORT_ORDER.DESC,
  });

  const isLoading = useLoading(
    isLoadingBanner,
    isFetchingBanner,
    isLoadingBrands,
    isFetchingBrands
  );

  return (
    <>
      {!isLoading ? (
        <>
          <SwiperComponent
            slidesPerView={1}
            spaceBetween={0}
            homeBanner
            navigation
            loop
            data={
              activeBanner?.imagesArr?.length > 0 ? activeBanner?.imagesArr : []
            }
          />
          <div className="p-[15px] md:px-[130px] md:py-[60px]">
            <SectionTitle
              title="Products"
              titleOnMobile="Recommended for you"
            />
            <ProductList />
            <SectionTitle title="Top Brands" titleOnMobile="Top Brands" />
            <div className="pb-20 hidden md:block">
              <SwiperComponent
                brands
                slidesPerView={7}
                spaceBetween={8}
                data={topBrands && topBrands?.length > 0 ? topBrands : []}
              />
            </div>
            <div className="py-4  flex gap-5 overflow-x-scroll md:hidden">
              {topBrands &&
                topBrands?.length > 0 &&
                topBrands?.map((el, index) => (
                  <div className="" key={index}>
                    <BrandSlide el={el} />
                  </div>
                ))}
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Home;
