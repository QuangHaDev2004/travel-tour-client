/* eslint-disable @next/next/no-img-element */
"use client";
import { TourItem } from "@/types/tour";
import Link from "next/link";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaBolt } from "react-icons/fa6";
import { GrMapLocation } from "react-icons/gr";
import { LuAlarmClock } from "react-icons/lu";

export const TourCard = ({ item }: { item: TourItem }) => {
  if (!item) return null;

  return (
    <div
      style={{ boxShadow: "0px 2.38px 2.38px 0px #00000040" }}
      className="group/item overflow-hidden rounded-md bg-white"
    >
      <div className="-mb-3 aspect-3/2 overflow-hidden rounded-md md:aspect-[271/237]">
        <Link href={`/tour/detail/${item.slug}`}>
          <img
            src={
              item.avatar ||
              "https://placehold.co/1x1/white/black?text=No+Image"
            }
            alt={item.name}
            className="h-full w-full object-cover transition-all duration-500 group-hover/item:scale-105"
          />
        </Link>
      </div>
      <div className="bg-travel-red relative -mt-5 inline-flex items-center gap-1.5 rounded-tr-4xl rounded-br-4xl pt-1 pr-3 pb-[2px] pl-[5px] text-xs font-semibold text-white uppercase">
        <FaBolt className="text-travel-yellow text-sm" />
        Giảm -{item.discount}%
      </div>
      <div className="p-2.5">
        <h2>
          <Link
            href={`/tour/detail/${item.slug}`}
            className="text-travel-secondary hover:text-travel-primary mb-2 line-clamp-2 min-h-12 text-[16px] font-semibold transition-all duration-300"
          >
            {item.name}
          </Link>
        </h2>
        <div className="text-travel-secondary/80 mb-2.5 flex flex-col gap-2 text-xs font-medium">
          <div className="flex items-center gap-2">
            <GrMapLocation size={16} />
            <span className="line-clamp-1">
              Khởi Hành:{" "}
              <b className="text-travel-primary">
                {item.locationsFromName.map((item) => item.name).join(", ") ||
                  "Chưa xác định"}
              </b>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaRegCalendarAlt size={16} />
            Ngày Khởi Hành: {item.departureDateFormat || "Chưa xác định"}
          </div>
          <div className="flex items-center gap-2">
            <LuAlarmClock size={16} />
            Thời gian: {item.time || "Chưa xác định"}
          </div>
        </div>
        <div className="border-travel-red flex h-10 items-center justify-between rounded-4xl border">
          <div className="text-travel-primary px-3 text-[16px] font-semibold">
            {item.priceNewAdult.toLocaleString("vi-VN") || 0}
            <span className="underline">đ</span>
          </div>
          <Link
            href={`/tour/detail/${item.slug}`}
            className="bg-travel-red group/button relative flex h-10 items-center justify-center overflow-hidden rounded-4xl px-4 text-sm font-semibold text-white uppercase transition-colors duration-500"
          >
            <span className="bg-travel-primary absolute inset-0 -translate-x-full transition-transform duration-500 group-hover/button:translate-x-0"></span>
            <span className="relative">Đặt ngay</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
