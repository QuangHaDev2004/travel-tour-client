import { getCategoryTourList } from "@/services/category";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export const useCategoryTourList = ({ slug }: { slug: string }) => {
  const searchParams = useSearchParams();

  const params: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    if (value) params[key] = value;
  });

  return useQuery({
    queryKey: ["categoryTourList", slug, params],
    queryFn: () => getCategoryTourList(slug, params),
    enabled: !!slug,
    placeholderData: keepPreviousData,
  });
};
