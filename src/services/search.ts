import { api } from "@/lib/axios";

export const getSearchResults = async (params: Record<string, string>) => {
  const res = await api.get(`/search`, { params });
  return res.data;
};
