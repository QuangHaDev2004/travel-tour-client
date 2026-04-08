import { api } from "@/lib/axios";

export const getCategoryTourList = async (
  slug: string,
  params: Record<string, string>,
) => {
  const res = await api.get(`/category/${slug}`, { params });
  return res.data;
};
