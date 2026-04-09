import { api } from "@/lib/axios";

/**
 * Truy vấn danh sách tour thuộc một danh mục cụ thể dựa trên slug.
 * @author QuangHaDev - 08.04.2026
 */
export const getCategoryTourList = async (
  slug: string,
  params?: Record<string, string>,
) => {
  const res = await api.get(`/category/${slug}`, { params });
  return res.data;
};
