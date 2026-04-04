import Swal from "sweetalert2";

/**
 * Hiển thị hộp thoại xác nhận hủy đơn hàng.
 * @author QuangHaDev - 04.04.2026
 */
export const confirmCancel = async () => {
  const result = await Swal.fire({
    title: "Xác nhận hủy đơn",
    text: "Hành động của bạn không thể hoàn tác.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#e11d48",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Xác nhận",
    cancelButtonText: "Hủy",
  });

  return result.isConfirmed;
};
