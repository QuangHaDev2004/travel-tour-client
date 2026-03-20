export const CartCoupon = () => {
  return (
    <div className="mb-4 flex items-center justify-end">
      <div className="flex w-full sm:w-[429px]">
        <input
          type="text"
          placeholder="Nhập mã giảm giá"
          className="text-travel-secondary border-travel-primary h-10 flex-1 rounded-tl-sm rounded-bl-sm border px-3 text-sm font-medium"
        />
        <button className="bg-travel-primary h-10 w-[110px] cursor-pointer rounded-tr-sm rounded-br-sm text-sm font-normal text-white capitalize">
          Dùng Mã
        </button>
      </div>
    </div>
  );
};
