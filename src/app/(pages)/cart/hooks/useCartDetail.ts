import { getCartDetail } from "@/services/cart";
import { CartItem } from "@/types/store";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useCartDetail = ({ cart }: { cart: CartItem[] }) => {
  return useQuery({
    queryKey: ["cartDetail", cart],
    queryFn: () => getCartDetail(cart),
    placeholderData: keepPreviousData,
  });
};
