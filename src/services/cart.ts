import { api } from "@/lib/axios";
import { CartItem } from "@/types/store";

export const getCartDetail = async (cart: CartItem[]) => {
  const res = await api.post("/cart/detail", cart);
  return res.data;
};
