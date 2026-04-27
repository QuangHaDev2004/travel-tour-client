/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { getOrderDetail } from "@/services/order";
import { FaRegCircleCheck, FaRegHandPointLeft } from "react-icons/fa6";
import { ClearCart } from "./components/ClearCart";

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{
    orderCode: string;
    phone: string;
  }>;
}) {
  const { orderCode, phone } = await searchParams;
  const orderDetail = await getOrderDetail({ orderCode, phone });

  return (
    <>
      <div className="py-[45px] sm:py-[60px]">
        <div className="container">
          <div className="mx-auto w-full lg:w-[902px]">
            <div className="mb-6 text-center">
              <FaRegCircleCheck className="mx-auto size-16 text-green-500" />
              <h1 className="text-travel-secondary mt-2 text-sm font-semibold sm:text-lg">
                Cảm ơn quý khách đã đặt tour.
              </h1>
              <p className="text-travel-secondary/80 mt-1 text-sm font-normal sm:text-[16px]">
                Chúng tôi sẽ liên hệ với quý khách trong thời gian sớm nhất.
              </p>
            </div>

            {orderDetail && (
              <>
                <ClearCart items={orderDetail.items} />

                <div className="mb-6 rounded-md bg-white p-4 shadow-md">
                  <h2 className="text-travel-primary mb-4 text-lg font-bold">
                    Thông tin đơn hàng
                  </h2>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-[16px]">
                      <div className="font-normal">Mã đơn hàng:</div>
                      <div className="font-medium">{orderDetail.orderCode}</div>
                    </div>
                    <div className="flex items-center gap-2 text-[16px]">
                      <div className="font-normal">Tên khách hàng:</div>
                      <div className="font-medium">{orderDetail.fullName}</div>
                    </div>
                    <div className="flex items-center gap-2 text-[16px]">
                      <div className="font-normal">Số điện thoại:</div>
                      <div className="font-medium">{orderDetail.phone}</div>
                    </div>
                    <div className="flex items-center gap-2 text-[16px]">
                      <div className="font-normal">Ghi chú:</div>
                      <div className="font-medium">
                        {orderDetail.note || "Không có"}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[16px]">
                      <div className="font-normal">Phương thức thanh toán:</div>
                      <div className="font-medium">
                        {orderDetail.paymentMethodName}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[16px]">
                      <div className="font-normal">Trạng thái thanh toán:</div>
                      <div className="font-medium">
                        {orderDetail.paymentStatusName}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[16px]">
                      <div className="font-normal">Trạng thái đơn hàng:</div>
                      <div className="font-medium">
                        {orderDetail.statusName}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[16px]">
                      <div className="font-normal">Ngày đặt:</div>
                      <div className="font-medium">
                        {orderDetail.createdAtFormat}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6 rounded-md bg-white p-4 shadow-md">
                  <h2 className="text-travel-primary mb-4 text-lg font-bold">
                    Danh sách tour
                  </h2>

                  <div className="mb-4 flex flex-col gap-4">
                    {orderDetail.items.map((item) => (
                      <div
                        key={item.tourId}
                        className="border-travel-secondary/10 flex flex-wrap border-b border-dashed pb-4"
                      >
                        <div className="mb-2.5 flex w-full items-start gap-2.5 sm:gap-4 lg:mb-0 lg:w-auto">
                          <div className="border-travel-secondary/10 aspect-[118/100] w-[118px] overflow-hidden rounded-md border lg:aspect-[150/120] lg:w-[150px]">
                            <img
                              src={
                                item.avatar ||
                                "https://placehold.co/1x1/white/black?text=No+Image"
                              }
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="w-full flex-1 lg:w-[280px] lg:flex-none">
                            <Link
                              href={`/tour/detail/${item.slug}`}
                              className="text-travel-secondary hover:text-travel-primary mb-1.5 line-clamp-2 text-sm font-medium transition-all duration-300 sm:mb-3 sm:text-[16px]"
                            >
                              {item.name}
                            </Link>
                            <div className="text-travel-gray-900 flex flex-col gap-1 text-xs sm:text-sm">
                              <div>
                                Ngày Khởi Hành:{" "}
                                <b>{item.departureDateFormat}</b>
                              </div>
                              <div>
                                Khởi Hành Tại: <b>{item.locationsFromFormat}</b>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex-1 lg:ml-2.5">
                          <label
                            htmlFor="Quantity"
                            className="text-travel-secondary mb-2 block text-sm font-normal lg:text-right"
                          >
                            Số Lượng Hành Khách
                          </label>
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center">
                              <label
                                htmlFor="Quantity Adult"
                                className="inline-block w-20 text-sm font-normal text-[#5D5E60]"
                              >
                                Người lớn:
                              </label>
                              <div className="flex-1 text-right font-normal">
                                <span className="text-sm text-[#898B8D]">
                                  {item.quantityAdult} x{" "}
                                </span>
                                <span className="text-travel-primary text-sm sm:text-[16px]">
                                  {item.priceNewAdult?.toLocaleString("vi-VN")}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <label
                                htmlFor="Quantity Children"
                                className="inline-block w-20 text-sm font-normal text-[#5D5E60]"
                              >
                                Trẻ em:
                              </label>
                              <div className="flex-1 text-right font-normal">
                                <span className="text-sm text-[#898B8D]">
                                  {item.quantityChildren} x{" "}
                                </span>
                                <span className="text-travel-primary text-sm sm:text-[16px]">
                                  {item.priceNewChildren?.toLocaleString(
                                    "vi-VN",
                                  )}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <label
                                htmlFor="Quantity Baby"
                                className="inline-block w-20 text-sm font-normal text-[#5D5E60]"
                              >
                                Em bé:
                              </label>
                              <div className="flex-1 text-right font-normal">
                                <span className="text-sm text-[#898B8D]">
                                  {item.quantityBaby} x{" "}
                                </span>
                                <span className="text-travel-primary text-sm sm:text-[16px]">
                                  {item.priceNewBaby?.toLocaleString("vi-VN")}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2 sm:gap-4">
                    <div className="text-travel-secondary flex items-center justify-between font-normal">
                      <div className="text-sm">Tạm tính: </div>
                      <div className="text-[16px]">
                        {orderDetail.subTotal?.toLocaleString("vi-VN")}{" "}
                        <span className="underline">đ</span>
                      </div>
                    </div>
                    <div className="text-travel-secondary flex items-center justify-between font-normal">
                      <div className="text-sm">Giảm: </div>
                      <div className="text-[16px]">
                        {orderDetail.discount?.toLocaleString("vi-VN")}{" "}
                        <span className="underline">đ</span>
                      </div>
                    </div>
                    <div className="text-travel-secondary flex items-center justify-between">
                      <div className="text-sm">Thanh toán: </div>
                      <div className="text-travel-primary text-[22px] font-bold">
                        {orderDetail.total?.toLocaleString("vi-VN")}{" "}
                        <span className="underline">đ</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            <Link
              href={"/"}
              className="border-travel-primary text-travel-primary hover:bg-travel-primary mx-auto flex h-10 w-60 items-center justify-center gap-2 rounded-md border bg-white text-sm font-medium shadow-md transition-all duration-300 hover:text-white"
            >
              <FaRegHandPointLeft /> Quay về trang chủ
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
