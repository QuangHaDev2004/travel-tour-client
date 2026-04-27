import { z } from "zod";

/**
 * Schema Zod dùng để xác thực thông tin khách hàng khi đặt hàng.
 * Kiểm tra họ tên, định dạng số điện thoại Việt Nam và phương thức thanh toán.
 * @author QuangHaDev - 04.04.2026
 */
export const orderSchema = z.object({
  fullName: z.string().min(1, "Vui lòng nhập họ tên."),
  phone: z
    .string()
    .min(1, "Vui lòng nhập số điện thoại.")
    .regex(
      /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-6|8|9]|9[0-9])[0-9]{7}$/,
      "Số điện thoại không đúng định dạng.",
    ),
  email: z
    .string()
    .min(1, "Vui lòng nhập email của bạn.")
    .email("Email không đúng định dạng."),
  note: z.string().optional(),
  paymentMethod: z.string(),
});

export type OrderInputs = z.infer<typeof orderSchema>;

/**
 * Schema Zod dùng để xác thực dữ liệu đầu vào khi tra cứu đơn hàng.
 * Ràng buộc số điện thoại phải đúng định dạng nhà mạng Việt Nam.
 * @author QuangHaDev - 04.04.2026
 */
export const orderTrackingSchema = z.object({
  phone: z
    .string()
    .min(1, "Vui lòng nhập số điện thoại.")
    .regex(
      /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-6|8|9]|9[0-9])[0-9]{7}$/,
      "Số điện thoại không đúng định dạng.",
    ),
});

export type OrderTrackingValues = z.infer<typeof orderTrackingSchema>;
