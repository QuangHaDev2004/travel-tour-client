import { HomeBanner } from "@/components/home/HomeBanner";
import { HomeLastMinuteDeals } from "@/components/home/HomeLastMinuteDeals";
import { HomeDealsCarousel } from "@/components/home/HomeDealsCarousel";
import { TourList } from "@/components/tour/TourList";
import { ImageBanner } from "@/components/home/ImageBanner";
// import { LatestNews } from "@/components/home/LatestNews";
// import { FavoriteDestinations } from "@/components/home/FavoriteDestinations";
import { getLastMinuteDeals, getTourList } from "@/services/home";

export default async function HomePage() {
  const [lastMinuteDeals, tourList] = await Promise.all([
    getLastMinuteDeals(),
    getTourList(),
  ]);

  const { tourListDeal } = lastMinuteDeals;
  const { tourListOne, categoryTourListOne, tourListTwo, categoryTourListTwo } =
    tourList;

  return (
    <>
      <HomeBanner />
      <HomeLastMinuteDeals tourListDeal={tourListDeal} />
      <HomeDealsCarousel />
      <TourList category={categoryTourListOne} tour={tourListOne} />
      <ImageBanner src="/assets/images/section-5.jpg" />
      <TourList category={categoryTourListTwo} tour={tourListTwo} />
      <ImageBanner src="/assets/images/section-7.jpg" />
      {/* <FavoriteDestinations /> */}
      {/* <LatestNews /> */}
    </>
  );
}
