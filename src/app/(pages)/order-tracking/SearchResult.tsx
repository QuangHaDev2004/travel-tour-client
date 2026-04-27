/* eslint-disable @next/next/no-img-element */
"use client";
import { BadgeOrder } from "@/components/common/BadgeOrder";
import { EmptyState } from "@/components/common/EmptyState";
import { paymentStatusList } from "@/constants/order";
import { OrderTracking } from "@/types/order";
import Link from "next/link";

type SearchResultProps = {
  orderTracking: OrderTracking[] | null;
};

/**
 * Component hiển thị danh sách kết quả tra cứu đơn hàng.
 * Hỗ trợ hiển thị trạng thái trống, thông tin chi tiết tour và chức năng hủy đơn.
 * @author QuangHaDev - 04.04.2026
 */
export const SearchResult = ({ orderTracking }: SearchResultProps) => {
  if (!orderTracking) {
    return null; // Chưa có dữ liệu, không hiển thị gì
  }

  return (
    <>
      <h2 className="text-travel-secondary mb-4 text-left text-xl font-bold">
        Kết quả tra cứu
      </h2>

      {orderTracking.length === 0 ? (
        <EmptyState
          primaryMsg="Không tìm thấy đơn hàng"
          subMsg="Vui lòng kiểm tra lại số điện thoại hoặc thử lại sau."
        />
      ) : (
        <div className="flex flex-col gap-4 text-left">
          {orderTracking.map((order) => {
            const paymentInfo = paymentStatusList.find(
              (status) => status.value === order.paymentStatus,
            );

            return (
              <div
                key={order.orderId}
                className="rounded-lg border border-gray-300 p-4"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="text-travel-primary/80 font-medium">
                      #{order.orderCode}
                    </div>
                    <BadgeOrder status={order.status} />
                  </div>
                </div>

                <div className="mb-4 flex gap-10 text-sm">
                  <div className="flex flex-col">
                    <span className="text-travel-gray-900 font-medium">
                      Ngày đặt
                    </span>
                    <span className="text-travel-secondary font-semibold">
                      {order.createdAtFormat}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-travel-gray-900 font-medium">
                      Tổng tiền
                    </span>
                    <span className="text-travel-secondary font-semibold">
                      {order.total.toLocaleString("vi-VN")} VNĐ
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-travel-gray-900 font-medium">
                      Trạng thái
                    </span>
                    <span className="text-travel-secondary font-semibold">
                      {paymentInfo?.label || "Không xác định"}
                    </span>
                  </div>
                </div>

                <div className="text-travel-secondary mb-2 text-[16px] font-semibold capitalize">
                  Danh sách tour
                </div>

                {/* Danh sách tour */}
                <div className="flex flex-col gap-4">
                  {order?.items?.map((item, index) => (
                    <div key={`${item.tourId}-${index}`} className="flex gap-4">
                      <div className="aspect-3/2 w-36 overflow-hidden rounded-lg">
                        <img
                          src={item.avatar}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <Link
                          href={`/tour/detail/${item.slug}`}
                          className="text-travel-secondary hover:text-travel-primary line-clamp-1 text-[16px] font-semibold"
                        >
                          {item.name}
                        </Link>
                        <div className="text-travel-gray-900 text-sm font-medium capitalize">
                          Khởi hành tại:{" "}
                          <b className="font-semibold">
                            {item.locationsFromFormat}
                          </b>
                        </div>
                        <div className="text-travel-gray-900 text-sm font-medium capitalize">
                          Ngày khởi hành:{" "}
                          <b className="font-semibold">
                            {item.departureDateFormat}
                          </b>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
