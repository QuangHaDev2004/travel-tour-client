import { API_URL } from "@/config/api";
import { handleResponse } from "@/lib/api";

export const getCategoryTourList = async (slug: string) => {
  const res = await fetch(`${API_URL}/category/${slug}`);
  return handleResponse(res);
};
