import { API_URL } from "@/config/api";
import { handleResponse } from "@/lib/api";

export const getCityList = async () => {
  const res = await fetch(`${API_URL}/city/list`);
  return handleResponse(res);
};
