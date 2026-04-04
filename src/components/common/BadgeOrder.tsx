"use client";
import { orderStatusList } from "@/constants/order";

type Props = {
  status: string;
};

/**
 * Component hiển thị nhãn trạng thái đơn hàng.
 * Tự động xác định màu sắc và nội dung dựa trên danh sách cấu hình.
 * @param {Props} props - Thuộc tính status của đơn hàng.
 * @author QuangHaDev - 04.04.2026
 */
export const BadgeOrder = ({ status }: Props) => {
  const statusItem = orderStatusList.find((item) => item.value === status);

  if (!statusItem) return null;

  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
      style={{
        color: statusItem.color,
        backgroundColor: statusItem.colorBg,
      }}
    >
      {statusItem.label}
    </span>
  );
};
