"use client";
import { TourDetail } from "@/types/tour";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";

export const TourSchedule = ({ tourDetail }: { tourDetail: TourDetail }) => {
  const [expandItems, setExpandItems] = useState(
    tourDetail.schedules.map(() => true),
  );

  const toggle = (index: number) => {
    setExpandItems((prev) =>
      prev.map((status, pos) => (pos === index ? !status : status)),
    );
  };

  return (
    <div className="mt-[30px]">
      <h2 className="text-travel-primary mb-4 text-center text-2xl font-bold capitalize">
        Lịch trình tour
      </h2>
      {tourDetail?.schedules && tourDetail?.schedules.length > 0 ? (
        <div className="flex flex-col gap-4">
          {tourDetail.schedules.map((item, index) => {
            const expand = expandItems[index];

            return (
              <div
                key={item.title}
                className="overflow-hidden rounded-md bg-white shadow-md"
              >
                <div
                  onClick={() => toggle(index)}
                  className="bg-travel-primary flex cursor-pointer items-center justify-between gap-4 p-4"
                >
                  <div className="flex-1 text-[16px] font-semibold text-white uppercase">
                    {item.title}
                  </div>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
                    <FaAngleDown
                      className={`text-travel-primary size-3 transition-transform duration-300 ${expand ? "" : "rotate-180"}`}
                    />
                  </div>
                </div>

                <div
                  className={`overflow-hidden text-sm transition-all duration-300 ${expand ? "max-h-[1000px]" : "max-h-0"}`}
                >
                  <div className="px-4 py-4">
                    <div
                      className="tinymce-content"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-travel-secondary text-center font-medium italic">
          Chưa có lịch trình cho tour này. Vui lòng liên hệ với chúng tôi để
          biết thêm chi tiết.
        </div>
      )}
    </div>
  );
};
