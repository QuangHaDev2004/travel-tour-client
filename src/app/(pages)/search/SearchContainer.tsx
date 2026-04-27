"use client";
import { useState } from "react";
import { TourItem } from "@/types/tour";
import { CityItem } from "@/types/city";
import { useSearchParams } from "next/navigation";
import { Filter } from "@/components/filter/Filter";
import { useSearch } from "@/hooks/search/useSearch";
import { TourResult } from "@/components/tour/TourResult";
import { Pagination } from "@/components/pagination/pagination";

/**
 * Component Container trung tâm của trang tìm kiếm Tour.
 * @author QuangHaDev - 26.11.2025
 */
export const SearchContainer = ({ cityList }: { cityList: CityItem[] }) => {
  // Trích xuất keyword từ URL để hiển thị cho người dùng biết họ đang tìm gì
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  // Trạng thái điều khiển Drawer bộ lọc trên Mobile
  const [filterActive, setFilterActive] = useState(false);

  // Hook thực hiện gọi API tìm kiếm, tự động chạy lại mỗi khi URL thay đổi
  const { data, isLoading } = useSearch();

  // Destructuring dữ liệu trả về từ API
  const tourList: TourItem[] = data?.tourList ?? [];
  const pagination = data?.pagination;
  const totalRecord = data?.pagination?.totalRecord ?? 0;

  return (
    <>
      <div className="py-[45px] sm:py-[60px]">
        <div className="container">
          <div className="flex gap-[23px]">
            <Filter
              cityList={cityList}
              filterActive={filterActive}
              setFilterActive={setFilterActive}
            />

            <div className="flex-1">
              <h2 className="text-travel-primary mb-2.5 text-2xl font-semibold sm:text-[28px] line-clamp-2">
                Kết quả tìm kiếm{" "}
                {keyword && (
                  <span className="">
                    cho từ khóa <em className="text-travel-red">{keyword}</em>
                  </span>
                )}
              </h2>

              <TourResult
                tourList={tourList}
                isLoading={isLoading}
                setFilterActive={setFilterActive}
                totalRecord={totalRecord}
              />

              {tourList && tourList.length > 0 && (
                <Pagination pagination={pagination} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
