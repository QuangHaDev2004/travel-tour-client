/* eslint-disable @next/next/no-img-element */
"use client";
import { CounterInput } from "@/components/common/CounterInput";
import { Spinner } from "@/components/loading/Spinner";
import { NO_IMAGE } from "@/constants/common";
import { useCartStore } from "@/store/useCartStore";
import { TourDetail } from "@/types/tour";
import { useEffect, useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { GrMapLocation } from "react-icons/gr";
import { HiOutlineUserGroup } from "react-icons/hi";
import { LuAlarmClock, LuPlane, LuTicket } from "react-icons/lu";
import { toast } from "sonner";

export const YourTrip = ({ tourDetail }: { tourDetail: TourDetail }) => {
  const { cart, addToCart, hasHydrated } = useCartStore();
  const cartItem = cart.find((item) => item.tourId === tourDetail.id);

  const [inputAdult, setInputAdult] = useState<string>("1");
  const [inputChildren, setInputChildren] = useState<string>("0");
  const [inputBaby, setInputBaby] = useState<string>("0");
  const [quantityAdult, setQuantityAdult] = useState<number>(1);
  const [quantityChildren, setQuantityChildren] = useState<number>(0);
  const [quantityBaby, setQuantityBaby] = useState<number>(0);

  useEffect(() => {
    if (cartItem) {
      setQuantityAdult(cartItem.quantityAdult);
      setInputAdult(String(cartItem.quantityAdult));

      setQuantityChildren(cartItem.quantityChildren);
      setInputChildren(String(cartItem.quantityChildren));

      setQuantityBaby(cartItem.quantityBaby);
      setInputBaby(String(cartItem.quantityBaby));
    }
  }, [cartItem]);

  const totalPrice =
    quantityAdult * tourDetail.priceNewAdult +
    quantityChildren * tourDetail.priceNewChildren +
    quantityBaby * tourDetail.priceNewBaby;

  const handleAddToCart = () => {
    addToCart({
      tourId: tourDetail.id,
      quantityAdult: quantityAdult,
      quantityChildren: quantityChildren,
      quantityBaby: quantityBaby,
      checked: true,
    });

    toast.success("Đã thêm tour vào giỏ hàng!");
  };

  return (
    <div className="sticky top-24 right-0 rounded-lg bg-white p-4 shadow-md sm:p-6">
      <h2 className="text-travel-primary mb-4 text-[20px] font-bold">
        Chuyến Đi Của Bạn
      </h2>

      {tourDetail ? (
        <>
          <div className="mb-4 flex items-center gap-3">
            <div className="aspect-[132/98] w-[103px] overflow-hidden rounded-lg sm:w-[132px]">
              <img
                src={tourDetail.avatar || NO_IMAGE}
                alt={tourDetail.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="text-travel-primary line-clamp-2 flex-1 text-sm font-normal sm:text-[16px]">
              {tourDetail.name}
            </div>
          </div>

          <div className="text-travel-gray-900 mb-4 flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <LuTicket size={20} />
                Mã Tour:
              </div>
              <div className="text-travel-primary font-semibold">
                {tourDetail.tourCode}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <GrMapLocation size={20} />
                Khởi hành:
              </div>
              <div className="text-travel-primary font-semibold">
                {tourDetail.locationsFromName
                  .map((item) => item.name)
                  .join(", ") || "Không xác định"}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <FaRegCalendarAlt size={20} />
                Ngày khởi hành:
              </div>
              <div className="text-travel-primary font-semibold">
                {tourDetail.departureDateFormat || "Không xác định"}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <LuAlarmClock size={20} />
                Thời gian:
              </div>
              <div className="text-travel-primary font-semibold">
                {tourDetail.time || "Không xác định"}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <LuPlane size={20} />
                Phương tiện:
              </div>
              <div className="text-travel-primary font-semibold">
                {tourDetail.vehicle || "Không xác định"}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <HiOutlineUserGroup size={20} />
                Số chỗ còn:
              </div>
              <div className="text-travel-primary font-semibold">
                {tourDetail.stockAdult || 0}
              </div>
            </div>
          </div>

          {tourDetail.stockAdult > 0 ? (
            hasHydrated ? (
              <>
                <div className="mb-4">
                  <label
                    htmlFor="Quantity"
                    className="text-travel-gray-900 mb-2 block text-sm"
                  >
                    Số lượng hành khách:
                  </label>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="Adult"
                        className="text-travel-gray-900 mb-1 inline-block w-20 text-sm sm:w-[100px]"
                      >
                        Người lớn:
                      </label>
                      <CounterInput
                        min={1}
                        max={tourDetail.stockAdult}
                        value={inputAdult}
                        setQuantity={setQuantityAdult}
                        setInput={setInputAdult}
                      />
                      <div className="text-travel-gray-900 flex-1 text-right">
                        <span className="text-travel-primary text-sm font-semibold sm:text-[16px]">
                          {tourDetail.priceNewAdult?.toLocaleString("vi-VN")}
                          <span className="underline">đ</span>
                        </span>
                        <span className="text-xs font-medium"> / Khách</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="Children"
                        className="text-travel-gray-900 mb-1 inline-block w-20 text-sm sm:w-[100px]"
                      >
                        Trẻ em:
                      </label>
                      <CounterInput
                        min={0}
                        max={tourDetail.stockChildren}
                        value={inputChildren}
                        setQuantity={setQuantityChildren}
                        setInput={setInputChildren}
                      />
                      <div className="text-travel-gray-900 flex-1 text-right">
                        <span className="text-travel-primary text-sm font-semibold sm:text-[16px]">
                          {tourDetail.priceNewChildren?.toLocaleString("vi-VN")}
                          <span className="underline">đ</span>
                        </span>
                        <span className="text-xs font-medium"> / Khách</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="Baby"
                        className="text-travel-gray-900 mb-1 inline-block w-20 text-sm sm:w-[100px]"
                      >
                        Em bé:
                      </label>
                      <CounterInput
                        min={0}
                        max={tourDetail.stockBaby}
                        value={inputBaby}
                        setQuantity={setQuantityBaby}
                        setInput={setInputBaby}
                      />
                      <div className="text-travel-gray-900 flex-1 text-right">
                        <span className="text-travel-primary text-sm font-semibold sm:text-[16px]">
                          {tourDetail.priceNewBaby?.toLocaleString("vi-VN")}
                          <span className="underline">đ</span>
                        </span>
                        <span className="text-xs font-medium"> / Khách</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4 flex items-center justify-between">
                  <label
                    htmlFor="Total Price"
                    className="text-travel-secondary text-[16px] font-normal"
                  >
                    Tổng tiền:
                  </label>
                  <div className="text-travel-primary text-[20px] font-semibold">
                    {totalPrice?.toLocaleString("vi-VN")}đ
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="text h-11 w-full cursor-pointer rounded-lg border border-red-500 bg-red-500 text-[16px] font-semibold text-white transition-all duration-300 hover:bg-white hover:text-red-500"
                >
                  Thêm Vào Giỏ Hàng
                </button>
              </>
            ) : (
              <div className="h-[234px]">
                <Spinner />
              </div>
            )
          ) : (
            <div className="rounded-md bg-amber-100 px-4 py-2 text-sm font-medium text-rose-500">
              Số chỗ của tour Quý khách tham khảo hiện tại đang hết.
            </div>
          )}
        </>
      ) : (
        <div className="">Chưa có thông tin cho tour này</div>
      )}
    </div>
  );
};
