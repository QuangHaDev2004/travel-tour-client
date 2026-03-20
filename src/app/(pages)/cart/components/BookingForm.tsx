/* eslint-disable @next/next/no-img-element */
"use client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { OrderInputs, orderSchema } from "@/validates/order";
import { useCreateOrder } from "@/hooks/order/useCreateOrder";

export const BookingForm = () => {
  const router = useRouter();
  const { cart, removeFromCart } = useCartStore();
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderInputs>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      paymentMethod: "money",
    },
  });

  const { mutate, isPending } = useCreateOrder();

  const paymentMethod = watch("paymentMethod");
  const cartCheck = cart.filter((item) => item.checked);

  const handleBookingForm: SubmitHandler<OrderInputs> = (data) => {
    if (cartCheck.length === 0) {
      toast.error("Vui lòng chọn ít nhất 1 tour!");
      return;
    }

    const dataFinal = {
      ...data,
      items: cartCheck,
    };

    mutate(dataFinal, {
      onSuccess: (data) => {
        cart.forEach((item) => {
          if (item.checked) removeFromCart(item.tourId);
        });
        reset();

        switch (dataFinal.paymentMethod) {
          case "money":
          case "bank":
            toast.success(data.message);
            router.push(
              `/order/success?orderCode=${data.orderCode}&phone=${dataFinal.phone}`,
            );
            break;

          case "zalopay":
            window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/order/payment-zalopay?orderCode=${data.orderCode}&phone=${dataFinal.phone}`;
            break;

          case "vnpay":
            window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/order/payment-vnpay?orderCode=${data.orderCode}&phone=${dataFinal.phone}`;
            break;
        }
      },
    });
  };

  return (
    <>
      <div className="mb-[30px] rounded-2xl bg-white px-4 py-5 shadow-md sm:py-8">
        <h2 className="text-travel-primary mb-4 text-[16px] font-semibold capitalize sm:text-[20px]">
          Thông Tin Khách Hàng
        </h2>

        <form onSubmit={handleSubmit(handleBookingForm)}>
          <div className="mb-[30px] grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
            <div>
              <input
                {...register("fullName")}
                type="text"
                placeholder="Nhập họ tên"
                className={`text-travel-secondary h-[50px] w-full rounded-md border px-5 text-sm font-medium ${errors.fullName ? "border-red-500" : "focus:border-travel-primary border-[#E0E0E0]"}`}
              />
              {errors.fullName && (
                <p className="mt-1 text-sm font-medium text-red-500">
                  {errors.fullName.message}
                </p>
              )}
            </div>
            <div>
              <input
                {...register("phone")}
                type="text"
                placeholder="Nhập số điện thoại"
                className={`text-travel-secondary h-[50px] w-full rounded-md border px-5 text-sm font-medium ${errors.phone ? "border-red-500" : "focus:border-travel-primary border-[#E0E0E0]"}`}
              />
              {errors.phone && (
                <p className="mt-1 text-sm font-medium text-red-500">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <textarea
              {...register("note")}
              placeholder="Ghi chú"
              className="text-travel-secondary focus:border-travel-primary h-[150px] resize-none rounded-md border border-[#E0E0E0] px-5 py-3 text-sm font-medium sm:col-span-2"
            ></textarea>
          </div>

          <h2 className="text-travel-primary mb-4 text-[16px] font-semibold capitalize sm:text-[20px]">
            Chọn phương thức thanh toán
          </h2>
          <div className="mb-5 flex flex-col gap-1.5 sm:gap-2.5">
            <label className="flex cursor-pointer items-center gap-2.5">
              <input
                {...register("paymentMethod")}
                type="radio"
                value="money"
                className="radio radio-primary h-5 w-5"
              />
              <div className="text-travel-secondary text-sm font-normal">
                Thanh toán tiền mặt khi đi tour
              </div>
              <img
                src="/assets/images/money.svg"
                alt=""
                className="h-[35px] w-[70px] rounded-md border border-[#E0E0E0] object-contain px-1"
              />
            </label>
            <label className="flex cursor-pointer items-center gap-2.5">
              <input
                {...register("paymentMethod")}
                type="radio"
                value="zalopay"
                className="radio radio-primary h-5 w-5"
              />
              <div className="text-travel-secondary text-sm font-normal">
                ZaloPay
              </div>
              <img
                src="/assets/images/zalopay.png"
                alt=""
                className="h-[35px] w-[70px] rounded-md border border-[#E0E0E0] object-contain px-1"
              />
            </label>
            <label className="flex cursor-pointer items-center gap-2.5">
              <input
                {...register("paymentMethod")}
                type="radio"
                value="vnpay"
                className="radio radio-primary h-5 w-5"
              />
              <div className="text-travel-secondary text-sm font-normal">
                VNPay
              </div>
              <img
                src="/assets/images/vnpay.png"
                alt=""
                className="h-[35px] w-[70px] rounded-md border border-[#E0E0E0] object-contain px-1"
              />
            </label>
            <label className="flex cursor-pointer items-center gap-2.5">
              <input
                {...register("paymentMethod")}
                type="radio"
                value="bank"
                className="radio radio-primary h-5 w-5"
              />
              <div className="text-travel-secondary text-sm font-normal">
                Chuyển khoản ngân hàng
              </div>
              <img
                src="/assets/images/bank.svg"
                alt=""
                className="h-[35px] w-[70px] rounded-md border border-[#E0E0E0] object-contain px-1"
              />
            </label>
          </div>

          {paymentMethod === "bank" && (
            <div className="rounded-sm bg-[#F3F3F3] p-4">
              <div className="text-travel-primary mb-2.5 text-[16px] font-semibold">
                Thông tin chuyển khoản
              </div>
              <div className="text-travel-secondary flex flex-col gap-1.5 text-sm font-normal">
                <div className="">Ngân hàng : Vietcombank</div>
                <div className="">Tên tài khoản: Le Van A</div>
                <div className="">STK: 0123456789</div>
              </div>
            </div>
          )}

          <div className="mt-8 text-center">
            <button
              disabled={isPending}
              className="bg-travel-primary h-[46px] w-full cursor-pointer rounded-lg text-[20px] font-semibold text-white uppercase sm:w-[480px]"
            >
              ĐẶT Tour
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
