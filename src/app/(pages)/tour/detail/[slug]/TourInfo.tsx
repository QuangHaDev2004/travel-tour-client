"use client";
import { TourDetail } from "@/types/tour";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

export const TourInfo = ({ tourDetail }: { tourDetail: TourDetail }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {tourDetail.information && (
        <div className="mt-[30px] overflow-hidden rounded-lg bg-white p-4 shadow-md sm:p-5">
          <div className="text-travel-primary border-travel-gray-100/40 mb-4 border-b border-dashed pb-3 text-[20px] font-bold capitalize">
            Thông tin tour
          </div>
          <div
            className={`relative overflow-hidden text-sm ${!expanded && "max-h-52"}`}
          >
            <div
              className="tinymce-content"
              dangerouslySetInnerHTML={{ __html: tourDetail.information }}
            ></div>
            {!expanded && (
              <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-10 bg-gradient-to-t from-white"></div>
            )}
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="relative mt-2 flex w-full cursor-pointer items-center justify-between"
          >
            <span className="text-travel-primary text-sm font-bold">
              {expanded ? "Ẩn bớt" : "Xem thêm"}
            </span>
            <FaChevronDown
              className={`text-travel-primary size-3 transition-transform duration-300 ${expanded && "rotate-180"}`}
            />
          </button>
        </div>
      )}
    </>
  );
};
