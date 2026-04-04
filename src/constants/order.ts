/**
 * Danh sách cấu hình trạng thái đơn hàng.
 * Định nghĩa nhãn hiển thị, giá trị định danh và màu sắc tương ứng cho UI.
 * @author QuangHaDev - 04.04.2026
 */
export const orderStatusList = [
  {
    label: "Khởi tạo",
    value: "initial",
    color: "#ffa756",
    colorBg: "rgba(255, 167, 86, 0.2)",
  },
  {
    label: "Hoàn thành",
    value: "done",
    color: "#00b69b",
    colorBg: "rgba(0, 182, 155, 0.2)",
  },
  {
    label: "Đã hủy",
    value: "cancel",
    color: "#ef3826",
    colorBg: "rgba(239, 56, 38, 0.2)",
  },
];

/**
 * Danh sách trạng thái thanh toán của đơn hàng.
 * Dùng để đối chiếu và hiển thị nhãn dựa trên dữ liệu từ API.
 * @author QuangHaDev - 04.04.2026
 */
export const paymentStatusList = [
  {
    label: "Chưa thanh toán",
    value: "unpaid",
  },
  {
    label: "Đã thanh toán",
    value: "paid",
  },
];
