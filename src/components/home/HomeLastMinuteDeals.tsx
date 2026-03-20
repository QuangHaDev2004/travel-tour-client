"use client";
import { ClockCountdown } from "../countdown/ClockCountdown";
import { LastMinuteDealFeatures } from "./LastMinuteDealFeatures";
import { TourDetail } from "@/types/tour";

export const HomeLastMinuteDeals = ({
  tourListDeal,
}: {
  tourListDeal: TourDetail[];
}) => {
  return (
    <div className="py-[45px] sm:py-[60px]">
      <div className="container">
        <div
          style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
          className="bg-travel-primary flex flex-wrap gap-8 rounded-[10px] px-[15px] py-[30px] sm:p-8"
        >
          {/* Info */}
          <div className="w-full text-center text-white md:w-[calc(50%-32px)] lg:w-[calc(32%-32px)] xl:w-[calc(25%-32px)]">
            <h2 className="mb-2.5 text-[28px] font-bold uppercase sm:mt-6">
              ƯU ĐÃI 2025 TOUR GIỜ CHÓT
            </h2>
            <p className="mb-9 text-xs font-normal">
              Chuyến đi trong mơ đang chờ bạn, ưu đãi đặc biệt cho những ai đặt
              sớm hôm nay!
            </p>
            <div className="mb-4 text-[20px] font-bold">Kết thúc sau</div>
            <ClockCountdown expireDate="2026-07-18T00:00:00" />
            <div className="text-[16px] font-bold uppercase">GIẢM ĐẾN</div>
            <div className="text-travel-yellow text-[40px] font-bold">
              <span>990.000</span>
              <span className="underline">đ</span>
            </div>
          </div>

          {/* Features Tour */}
          <LastMinuteDealFeatures tourListDeal={tourListDeal} />
        </div>
      </div>
    </div>
  );
};
