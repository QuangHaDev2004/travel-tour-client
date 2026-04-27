"use client";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa6";
import { Logo } from "../common/Logo";
import { FormSendEmail } from "./FormSendEmail";
import { WebsiteInfo } from "@/types/home";

export const Footer = ({ websiteInfo }: { websiteInfo: WebsiteInfo }) => {
  return (
    <div className="rounded-tl-[25px] rounded-tr-[25px] bg-[#ECECEC] pt-10 pb-10 sm:rounded-tl-[40px] sm:rounded-tr-[40px] sm:pt-[60px]">
      <div className="container">
        <div className="flex flex-col gap-[30px] sm:gap-10">
          <div className="bg-travel-primary flex flex-wrap items-center gap-5 rounded-2xl p-5 sm:gap-6 sm:p-8">
            <div className="w-full text-center text-lg font-bold text-[#FDFDFD] capitalize lg:w-[389px] lg:text-left lg:text-[20px]">
              Đăng ký ngay để không bỏ lỡ các chương trình của chúng tôi
            </div>
            <FormSendEmail />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-y-5 lg:justify-between">
            <nav>
              <ul className="text-travel-secondary flex flex-wrap items-center justify-center gap-x-[25px] gap-y-2.5 text-sm font-medium sm:gap-x-10">
                <li>
                  <Link
                    href={""}
                    className="hover:text-travel-primary transition-all duration-300"
                  >
                    Trang Chủ
                  </Link>
                </li>
                <li>
                  <Link
                    href={""}
                    className="hover:text-travel-primary transition-all duration-300"
                  >
                    Tour Trong Nước
                  </Link>
                </li>
                <li>
                  <Link
                    href={""}
                    className="hover:text-travel-primary transition-all duration-300"
                  >
                    Tour Nước Ngoài
                  </Link>
                </li>
                <li>
                  <Link
                    href={""}
                    className="hover:text-travel-primary transition-all duration-300"
                  >
                    Tin Tức
                  </Link>
                </li>
                <li>
                  <Link
                    href={""}
                    className="hover:text-travel-primary transition-all duration-300"
                  >
                    Liên Hệ
                  </Link>
                </li>
              </ul>
            </nav>
            <nav>
              <ul className="flex items-center gap-[25px] sm:gap-10">
                <li>
                  <Link href={""} target="_blank">
                    <FaFacebook className="text-2xl text-[#1877F2]" />
                  </Link>
                </li>
                <li>
                  <Link href={""} target="_blank">
                    <FaTwitter className="text-2xl text-[#1DA1F2]" />
                  </Link>
                </li>
                <li>
                  <Link href={""} target="_blank">
                    <FaInstagram className="text-2xl text-[#E4405F]" />
                  </Link>
                </li>
                <li>
                  <Link href={""} target="_blank">
                    <FaYoutube className="text-2xl text-[#CD201F]" />
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <hr className="text-[#CCD1D2]" />
          <div className="flex flex-wrap items-center gap-y-5">
            <div className="order-1 w-full text-center text-[13px] font-medium text-[#667479] lg:order-none lg:w-[calc(50%-112px)] lg:text-left">
              © {new Date().getFullYear()} 36Travel. All rights reserved.
            </div>
            <div className="w-full lg:w-[224px]">
              <Logo websiteInfo={websiteInfo} />
            </div>
            <div className="flex w-full items-center justify-center gap-[25px] text-[13px] font-medium text-[#667479] sm:gap-[30px] lg:w-[calc(50%-112px)] lg:justify-end">
              <Link
                href={""}
                className="hover:text-travel-primary transition-all duration-300"
              >
                Điều khoản dịch vụ
              </Link>
              <Link
                href={""}
                className="hover:text-travel-primary transition-all duration-300"
              >
                Chính sách bảo mật
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
