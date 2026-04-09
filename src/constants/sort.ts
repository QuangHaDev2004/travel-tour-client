/**
 * Danh sách các tùy chọn sắp xếp (Sort Options) cho giao diện danh sách Tour.
 * @author QuangHaDev - 02.12.2025
 * Cập nhật bởi: QuangHaDev - 09.04.2026: Đổi value từ price thành => priceNewAdult
 */
export const sortList = [
  {
    label: "Tất cả",
    value: "",
  },
  {
    label: "Giá tăng dần",
    value: "priceNewAdult-asc",
  },
  {
    label: "Giá giảm dần",
    value: "priceNewAdult-desc",
  },
  {
    label: "Ngày khởi hành gần nhất",
    value: "departureDate-asc",
  },
];
