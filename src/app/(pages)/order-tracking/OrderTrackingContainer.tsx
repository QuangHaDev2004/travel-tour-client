"use client";
import { FormSearch } from "./FormSearch";
import { SearchResult } from "./SearchResult";
import { useSearchParams } from "next/navigation";
import { useOrderTracking } from "@/hooks/order/useOrderTracking";

/**
 * Container chính cho chức năng tra cứu booking
 * - Lấy phone từ query param
 * - Gọi API lấy danh sách đơn hàng
 * - Render form + kết quả
 * @author QuangHaDev - 04.04.2026
 */
export const OrderTrackingContainer = () => {
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") || "";

  const { data, isLoading } = useOrderTracking(phone);
  const orderTracking = data?.orderTracking ?? null;

  return (
    <div className="py-[45px] sm:py-[60px]">
      <div className="container">
        <div className="mx-auto text-center md:w-3/4 xl:w-1/2">
          <div className="mb-8">
            <h1 className="text-travel-secondary text-2xl font-semibold">
              Tra cứu Booking
            </h1>
            <p className="text-travel-secondary text-sm font-medium">
              Nhập số điện thoại để xem tất cả tour đã đặt
            </p>
          </div>

          <FormSearch isLoading={isLoading} />

          <SearchResult orderTracking={orderTracking} />
        </div>
      </div>
    </div>
  );
};
