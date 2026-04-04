import { cancelOrder } from "@/services/order";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

/**
 * Hook xử lý nghiệp vụ hủy đơn hàng.
 * Tự động hiển thị thông báo và làm mới dữ liệu tra cứu sau khi thành công.
 * @author QuangHaDev - 04.04.2026
 */
export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelOrder,
    onSuccess: (data) => {
      toast.success(data?.message ?? "Hủy đơn hàng thành công.");
      queryClient.invalidateQueries({ queryKey: ["orderTracking"] });
    },
    onError: (errors: AxiosError<{ message: string }>) => {
      toast.error(
        errors?.response?.data?.message ?? "Đã có lỗi xảy ra vui lòng thử lại.",
      );
    },
  });
};
