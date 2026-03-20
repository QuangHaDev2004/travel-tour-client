export const CartSummary = ({
  subTotal,
  discount,
  total,
}: {
  subTotal: number;
  discount: number;
  total: number;
}) => {
  return (
    <div className="flex flex-col gap-2 sm:gap-4">
      <div className="text-travel-secondary flex items-center justify-between font-normal">
        <div className="text-sm">Tạm tính: </div>
        <div className="text-[16px]">
          {subTotal.toLocaleString("vi-VN")}
          <span className="underline">đ</span>
        </div>
      </div>
      <div className="text-travel-secondary flex items-center justify-between font-normal">
        <div className="text-sm">Giảm: </div>
        <div className="">
          {discount.toLocaleString("vi-VN")}
          <span className="underline">đ</span>
        </div>
      </div>
      <div className="text-travel-secondary flex items-center justify-between">
        <div className="text-sm">Thanh toán: </div>
        <div className="text-travel-primary text-[22px] font-bold">
          {total.toLocaleString("vi-VN")}
          <span className="underline">đ</span>
        </div>
      </div>
    </div>
  );
};
