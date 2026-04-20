/* eslint-disable @next/next/no-img-element */
type EmptyStateProps = {
  primaryMsg: string;
  subMsg: string;
};

/**
 * Component hiển thị trạng thái trống khi không có dữ liệu.
 * Bao gồm hình ảnh minh họa, thông báo chính và thông báo phụ.
 * @param {EmptyStateProps} props - Thuộc tính bao gồm nội dung thông báo.
 * @author QuangHaDev - 04.04.2026
 */
export const EmptyState = ({ primaryMsg, subMsg }: EmptyStateProps) => {
  return (
    <>
      <div className="flex flex-col items-center text-center">
        <div className="w-full">
          <img
            src="/assets/images/img-empty.png"
            alt="Empty Image"
            className="mx-auto h-auto w-[35%]"
          />
        </div>
        <div className="text-travel-primary mt-6 mb-3 text-2xl font-bold">
          {primaryMsg}
        </div>
        <div className="text-travel-secondary text-sm font-normal italic">
          {subMsg}
        </div>
      </div>
    </>
  );
};
