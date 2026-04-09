"use client";
import { TourItem } from "@/types/tour";
import { FiFilter } from "react-icons/fi";
import { sortList } from "@/constants/sort";
import { TourCard } from "@/components/tour/TourCart";
import { EmptyState } from "@/components/common/EmptyState";
import { TourCardSkeleton } from "@/components/skeleton/TourCardSkeleton";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * Component hiển thị danh sách kết quả Tour du lịch.
 * @author QuangHaDev - 09.04.2026
 */
export const TourResult = ({
  tourList,
  isLoading,
  setFilterActive,
  totalRecord,
}: {
  tourList: TourItem[];
  isLoading: boolean;
  setFilterActive: React.Dispatch<React.SetStateAction<boolean>>;
  totalRecord: number;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Phân tách chuỗi giá trị sort từ Select thành các cặp key-value cho URL.
  const parseSort = (value: string) => {
    if (!value) return null;
    const [sortKey, sortValue] = value.split("-");
    return { sortKey, sortValue };
  };

  // Xử lý sự kiện thay đổi tiêu chí sắp xếp.
  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const sort = parseSort(value);

    if (!sort) {
      params.delete("sortKey");
      params.delete("sortValue");
    } else {
      params.set("sortKey", sort.sortKey);
      params.set("sortValue", sort.sortValue);
    }

    // Luôn reset về trang đầu tiên khi thay đổi tiêu chí sắp xếp
    params.set("page", "1");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Xác định giá trị hiện tại của Select box dựa trên URL để giữ trạng thái khi Reload
  const currentSort = searchParams.get("sortKey")
    ? `${searchParams.get("sortKey")}-${searchParams.get("sortValue")}`
    : "";

  return (
    <>
      {/* Header */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2.5 sm:mb-[30px] sm:gap-4">
        {/* Sort */}
        <div className="flex w-full flex-wrap items-center gap-4 lg:w-auto">
          <span className="text-travel-gray-900 text-sm font-medium">
            Sắp xếp theo:
          </span>

          <select
            value={currentSort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="select border-travel-secondary/20 text-travel-secondary w-60 rounded-md border bg-white px-3 text-sm font-medium sm:w-60"
          >
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

        {/* Total */}
        <div className="text-travel-gray-900 text-sm font-normal">
          <span>Tất cả: </span>
          <span className="text-travel-primary text-[16px] font-bold">
            {totalRecord} tour
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

      {/* Content */}
      {isLoading ? (
        <div className="mb-[30px] grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-[20px]">
          {Array(6)
            .fill("")
            .map((_, index) => (
              <TourCardSkeleton key={index} />
            ))}
        </div>
      ) : tourList.length > 0 ? (
        <div className="mb-[30px] grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-[20px]">
          {tourList.map((item) => (
            <TourCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <EmptyState
          primaryMsg="Rất tiếc khi chúng tôi không tìm thấy tour bạn cần"
          subMsg="Thay đổi nội dung để tìm kiếm các tour tuyệt vời khác nhé!"
        />
      )}
    </>
  );
};
