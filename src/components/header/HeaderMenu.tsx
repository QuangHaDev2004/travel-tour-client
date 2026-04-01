import { CategoryTree } from "@/types/home";
import Link from "next/link";
import { FaCaretDown } from "react-icons/fa6";

export const HeaderMenu = ({
  categoryTree,
}: {
  categoryTree: CategoryTree[];
}) => {
  return (
    <nav className="hidden lg:block">
      <ul className="flex gap-6 xl:gap-10">
        <li>
          <Link
            href="/"
            className="text-travel-secondary text-[16px] font-medium capitalize"
          >
            Trang Chủ
          </Link>
        </li>
        {categoryTree.map((cate) => (
          <li
            key={cate.id}
            className="group/sub-1 relative flex items-center gap-1.5"
          >
            <Link
              href={`/category/${cate.slug}`}
              className="text-travel-secondary text-[16px] font-medium capitalize"
            >
              {cate.name}
            </Link>
            {cate.children && cate.children.length > 0 && (
              <>
                <FaCaretDown className="text-sm" />
                <ul className="invisible absolute top-full left-0 w-[280px] translate-y-2 rounded-br-lg rounded-bl-lg bg-white py-2 opacity-0 shadow-md transition-all duration-300 group-hover/sub-1:visible group-hover/sub-1:translate-y-0 group-hover/sub-1:opacity-100">
                  {cate.children.map((cate2) => (
                    <li key={cate2.id}>
                      <Link
                        href={`/category/${cate2.slug}`}
                        className="text-travel-primary hover:bg-travel-primary block px-[22px] py-2 text-[16px] font-normal capitalize transition-all duration-300 hover:text-white"
                      >
                        {cate2.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </li>
        ))}

        <li>
          <Link
            href=""
            className="text-travel-secondary text-[16px] font-medium capitalize"
          >
            Tra cứu đơn hàng
          </Link>
        </li>
        {/* <li>
          <Link
            href=""
            className="text-travel-secondary text-[16px] font-medium capitalize"
          >
            Liên Hệ
          </Link>
        </li> */}
      </ul>
    </nav>
  );
};
