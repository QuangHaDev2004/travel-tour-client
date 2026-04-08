"use client";
import { TPagination } from "@/types/category";
import { useRouter, useSearchParams } from "next/navigation";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

type PaginationProps = {
  pagination: TPagination;
};

export const Pagination = ({ pagination }: PaginationProps) => {
  const { totalPage, currentPage } = pagination;
  const router = useRouter();
  const searchParams = useSearchParams();

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
  };

  const renderPages = () => {
    const pages = [];

    for (let i = 1; i <= totalPage; i++) {
      pages.push(
        <div
          key={i}
          onClick={() => changePage(i)}
          className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-sm border text-sm ${
            i === currentPage
              ? "bg-travel-primary text-white"
              : "text-travel-primary border-travel-primary"
          } `}
        >
          {i}
        </div>,
      );
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-3">
      {/* Prev */}
      <div
        onClick={() => currentPage > 1 && changePage(currentPage - 1)}
        className={`flex h-10 w-10 items-center justify-center rounded-sm border ${
          currentPage === 1
            ? "cursor-not-allowed opacity-50"
            : "border-travel-primary cursor-pointer"
        } `}
      >
        <FaAnglesLeft className="text-travel-primary text-xs" />
      </div>

      {renderPages()}

      {/* Next */}
      <div
        onClick={() => currentPage < totalPage && changePage(currentPage + 1)}
        className={`flex h-10 w-10 items-center justify-center rounded-sm border ${
          currentPage === totalPage
            ? "cursor-not-allowed opacity-50"
            : "border-travel-primary cursor-pointer"
        } `}
      >
        <FaAnglesRight className="text-travel-primary text-xs" />
      </div>
    </div>
  );
};
