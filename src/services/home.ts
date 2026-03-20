import { API_URL } from "@/config/api";
import { handleResponse } from "@/lib/api";
import { CategoryTreeResponse, WebsiteInfoResponse } from "@/types/response";

export const getWebsiteInfo = async (): Promise<WebsiteInfoResponse> => {
  const res = await fetch(`${API_URL}/website-info`, { cache: "no-store" });
  return handleResponse(res);
};

export const getCategoryTree = async (): Promise<CategoryTreeResponse> => {
  const res = await fetch(`${API_URL}/category`, { cache: "no-store" });
  return handleResponse(res);
};

export const getLastMinuteDeals = async () => {
  const res = await fetch(`${API_URL}/deal`, { cache: "no-store" });
  return handleResponse(res);
};

export const getTourList = async () => {
  const res = await fetch(`${API_URL}/tour/list`, { cache: "no-store" });
  return handleResponse(res);
};
