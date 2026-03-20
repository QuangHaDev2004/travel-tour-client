/* eslint-disable @next/next/no-img-element */

export const EmptyCart = () => {
  return (
    <>
      <div className="text-center">
        <img
          src="/assets/images/img-empty.png"
          alt=""
          className="mx-auto h-auto w-1/3"
        />
        <p className="text-travel-primary text-xl font-semibold">
          Giỏ hàng của bạn hiện tại đang trống
        </p>
      </div>
    </>
  );
};
