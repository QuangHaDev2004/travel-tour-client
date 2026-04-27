import { BreadCrumb } from "@/components/breadcrumb/BreadCrumb";
import { BoxImages } from "./BoxImages";
import { TourInfo } from "./TourInfo";
import { TourSchedule } from "./TourSchedule";
import { YourTrip } from "./YourTrip";
import { getTourDetail } from "@/services/tour";

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { breadcrumb, tourDetail } = await getTourDetail(slug);

  return (
    <>
      <BreadCrumb breadcrumb={breadcrumb} />

      <div className="py-[45px] sm:py-[60px]">
        <div className="container">
          <div className="flex flex-wrap gap-5 lg:flex-nowrap">
            {/* Left */}
            <div className="order-1 w-full lg:order-none lg:w-[58.7%]">
              <BoxImages tourDetail={tourDetail} />
              <TourInfo tourDetail={tourDetail} />
              <TourSchedule tourDetail={tourDetail} />
            </div>

            {/* Right */}
            <div className="w-full flex-none lg:flex-1">
              <YourTrip tourDetail={tourDetail} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
