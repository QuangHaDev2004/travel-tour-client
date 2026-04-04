"use client";
import { TourItem } from "@/types/tour";
import { FiFilter } from "react-icons/fi";
import { sortList } from "@/constants/sort";
import { TourCard } from "@/components/tour/TourCart";
import { EmptyState } from "@/components/common/EmptyState";
import { Pagination } from "@/components/pagination/pagination";
import { TourCardSkeleton } from "@/components/skeleton/TourCardSkeleton";

/**
 * Component hiển thị danh sách kết quả tour du lịch.
 * Bao gồm bộ chọn sắp xếp, hiển thị số lượng, xử lý trạng thái Loading (Skeleton),
 * hiển thị danh sách tour hoặc trạng thái trống và phân trang.
 * @param {TourItem[]} props.tourList - Danh sách các tour được trả về từ API.
 * @param {boolean} props.isLoading - Trạng thái đang tải dữ liệu.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setFilterActive - Hàm điều khiển mở Sidebar bộ lọc trên mobile.
 * @author QuangHaDev - 02.12.2025
 * Cập nhật bởi: QuangHaDev - 04.04.2026: Thêm props cho Empty State
 */
export const TourResult = ({
  tourList,
  isLoading,
  setFilterActive,
}: {
  tourList: TourItem[];
  isLoading: boolean;
  setFilterActive: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2.5 sm:mb-[30px] sm:gap-4">
        <div className="flex w-full flex-wrap items-center gap-4 lg:w-auto">
          <span className="text-travel-gray-900 text-sm font-medium">
            Sắp xếp theo:
          </span>
          <select className="select border-travel-secondary/20 text-travel-secondary w-60 rounded-md border bg-white px-3 text-sm font-medium sm:w-64">
            {sortList.map((item) => (
              <option
                key={item.value}
                value={item.value}
                className="hover:bg-travel-primary rounded-sm bg-white py-2 hover:text-white"
              >
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <div className="text-travel-gray-900 text-sm font-normal">
          <span>Tất cả: </span>
          <span className="text-travel-primary text-[16px] font-bold">
            38 tour
          </span>
        </div>

        {/* Button Filter Mobile */}
        <button
          onClick={() => setFilterActive(true)}
          className="flex cursor-pointer items-center gap-2 lg:hidden"
        >
          <div className="text-travel-primary text-sm font-semibold sm:text-lg">
            Bộ Lọc
          </div>
          <FiFilter className="text-travel-primary size-5 sm:size-6" />
        </button>
      </div>

      {isLoading ? (
        <div className="mb-[30px] grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-[20px]">
          {Array(6)
            .fill("")
            .map((_, index) => (
              <TourCardSkeleton key={index} />
            ))}
        </div>
      ) : tourList.length > 0 ? (
        <>
          <div className="mb-[30px] grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-[20px]">
            {tourList.map((item) => (
              <TourCard key={item.id} item={item} />
            ))}
          </div>

          <Pagination />
        </>
      ) : (
        <EmptyState
          primaryMsg="Rất tiếc khi chúng tôi không tìm thấy tour bạn cần"
          subMsg="Thay đổi nội dung để tìm kiếm các tour tuyệt vời khác nhé!"
        />
      )}
    </>
  );
};
