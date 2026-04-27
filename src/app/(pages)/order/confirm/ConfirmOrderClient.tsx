/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegCircleCheck, FaRegHandPointLeft } from "react-icons/fa6";
import { IoInformationCircleOutline } from "react-icons/io5";

type Status = "loading" | "success" | "error";

export const ConfirmOrderClient = ({ token }: { token: string }) => {
  const [status, setStatus] = useState<Status>("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const confirmOrder = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/order/confirm?token=${token}`,
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Xác nhận thất bại");
        }

        setStatus("success");
        setMessage(data.message);
      } catch (error: any) {
        setStatus("error");
        setMessage(error.message);
      }
    };

    if (token) {
      confirmOrder();
    }
  }, [token]);

  // LOADING
  if (status === "loading") {
    return (
      <div className="py-20 text-center">
        <p>Đang xác nhận đơn hàng...</p>
      </div>
    );
  }

  // ERROR
  if (status === "error") {
    return (
      <div className="py-[45px] sm:py-[60px]">
        <div className="container text-center">
          <div className="mx-auto w-full rounded-2xl bg-white py-8 shadow-md lg:w-[902px]">
            <div className="text-center">
              <IoInformationCircleOutline className="mx-auto size-16 text-red-500" />
              <h1 className="text-travel-secondary mt-4 mb-2 text-xl font-bold">
                Xác nhận thất bại.
              </h1>
              <p className="mb-4">{message}</p>
            </div>

            <Link
              href="/"
              className="border-travel-primary text-travel-primary hover:bg-travel-primary mx-auto flex h-10 w-50 items-center justify-center gap-2 rounded-md border bg-white text-sm font-medium shadow-md transition-all duration-300 hover:text-white"
            >
              <FaRegHandPointLeft /> Quay về trang chủ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // SUCCESS
  return (
    <div className="py-[45px] sm:py-[60px]">
      <div className="container">
        <div className="mx-auto w-full rounded-2xl bg-white py-8 shadow-md lg:w-[902px]">
          <div className="text-center">
            <FaRegCircleCheck className="mx-auto size-16 text-green-500" />
            <h1 className="text-travel-secondary mt-4 mb-2 text-xl font-bold">
              Xác nhận đặt tour thành công.
            </h1>

            <p className="text-travel-secondary mb-4 italic opacity-90">
              Cảm ơn bạn đã đặt tour tại <b>36Travel</b>.
              <br />
              Chúc bạn có một hành trình vạn dặm bình an và hạnh phúc.
            </p>
          </div>

          <Link
            href="/"
            className="border-travel-primary text-travel-primary hover:bg-travel-primary mx-auto flex h-10 w-50 items-center justify-center gap-2 rounded-md border bg-white text-sm font-medium shadow-md transition-all duration-300 hover:text-white"
          >
            <FaRegHandPointLeft /> Quay về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
};
