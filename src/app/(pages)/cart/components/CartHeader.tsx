import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";

export const CartHeader = () => {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
      <h2 className="text-travel-primary text-[16px] font-semibold capitalize sm:text-[20px]">
        Giỏ Hàng
      </h2>
      <Link
        href={`/`}
        className="group/back flex items-center gap-1 text-xs font-normal text-[#52575C] transition-all duration-300 sm:text-sm"
      >
        <span className="group-hover/back:text-travel-primary">
          Quay lại mua hàng
        </span>
        <FaChevronRight className="group-hover/back:text-travel-primary size-3 text-[#52575C]" />
      </Link>
    </div>
  );
};
