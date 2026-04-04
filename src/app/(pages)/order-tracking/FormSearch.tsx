"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiPhone } from "react-icons/fi";
import { orderTrackingSchema, OrderTrackingValues } from "@/validates/order";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

type FormSearchProps = {
  isLoading: boolean;
};

/**
 * Form nhập số điện thoại để tra cứu đơn hàng
 * @author QuangHaDev - 04.04.2026
 */
export const FormSearch = ({ isLoading }: FormSearchProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") || "";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OrderTrackingValues>({
    resolver: zodResolver(orderTrackingSchema),
    mode: "onChange", // validate realtime
  });

  const onSubmit: SubmitHandler<OrderTrackingValues> = async (data) => {
    router.push(`?phone=${data.phone}`);
  };

  useEffect(() => {
    if (phone) {
      setValue("phone", phone);
    }
  }, [phone, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-6 rounded-lg bg-gray-100 p-8 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
    >
      {/* Input */}
      <div className="mb-3">
        <div
          className={`flex h-12 items-center gap-4 rounded-lg border px-4 ${
            errors.phone ? "border-red-500" : "border-travel-gray-100"
          }`}
        >
          <FiPhone size={20} className="text-travel-gray-900" />

          <input
            {...register("phone")}
            type="text"
            placeholder="Nhập số điện thoại của bạn"
            className="text-travel-secondary placeholder:text-travel-gray-100 flex-1 text-sm outline-none"
          />
        </div>

        {/* Error message */}
        {errors.phone && (
          <p className="mt-1 text-left text-xs text-red-500">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="bg-travel-primary/80 hover:bg-travel-primary h-11 w-full cursor-pointer rounded-4xl text-white transition disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? "Đang tra cứu..." : "Tra cứu"}
      </button>
    </form>
  );
};
