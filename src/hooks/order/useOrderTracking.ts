import { getOrderTracking } from "@/services/order";
import { useQuery } from "@tanstack/react-query";

/**
 * Hook thực hiện truy vấn danh sách đơn hàng dựa trên số điện thoại.
 * Tự động kích hoạt truy vấn khi có giá trị phone.
 * @param {string} phone - Số điện thoại dùng để tra cứu đơn hàng.
 * @author QuangHaDev - 04.04.2026
 */
export const useOrderTracking = (phone: string) => {
  return useQuery({
    queryKey: ["orderTracking", phone],
    queryFn: () => getOrderTracking({ phone }),
    enabled: !!phone,
  });
};
