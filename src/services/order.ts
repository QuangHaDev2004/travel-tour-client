import { api } from "@/lib/axios";
import { OrderDetail } from "@/types/order";
import { CartItem } from "@/types/store";

/**
 * Gửi yêu cầu tạo đơn hàng mới.
 * @param {Object} dataFinal - Dữ liệu đơn hàng bao gồm giỏ hàng và thông tin khách hàng.
 * @author QuangHaDev - 28.11.2025
 */
export const createOrder = async (dataFinal: {
  items: CartItem[];
  fullName: string;
  phone: string;
  paymentMethod: string;
  note?: string | undefined;
}) => {
  const res = await api.post("/order/create", dataFinal);
  return res.data;
};

/**
 * Lấy thông tin chi tiết của một đơn hàng cụ thể.
 * Sử dụng fetch để đảm bảo dữ liệu luôn mới.
 * @param {Object} params - Tham số gồm mã đơn hàng và số điện thoại.
 * @author QuangHaDev - 29.11.2025
 */
export const getOrderDetail = async ({
  orderCode,
  phone,
}: {
  orderCode: string;
  phone: string;
}): Promise<OrderDetail> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/order/success?orderCode=${orderCode}&phone=${phone}`,
    {
      cache: "no-store",
    },
  );
  const data = await res.json();
  return data.orderDetail;
};

/**
 * Truy vấn danh sách lịch sử đơn hàng dựa trên số điện thoại.
 * @param {Object} params - Tham số phone để lọc đơn hàng.
 * @author QuangHaDev - 04.04.2026
 */
export const getOrderTracking = async (params: { phone: string }) => {
  const res = await api.get("/order/tracking", { params });
  return res.data;
};

/**
 * Thực hiện cập nhật trạng thái hủy cho một đơn hàng.
 * @param {Object} dataFinal - Đối tượng chứa ID của đơn hàng cần hủy.
 * @author QuangHaDev - 04.04.2026
 */
export const cancelOrder = async (dataFinal: { orderId: string }) => {
  const res = await api.patch("/order/cancel", dataFinal);
  return res.data;
};
