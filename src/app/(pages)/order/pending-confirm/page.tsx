export default function PendingConfirmPage() {
  const EXPIRE_HOURS = 12;

  return (
    <div className="py-[45px] sm:py-[60px]">
      <div className="container">
        <div className="mx-auto w-full rounded-2xl bg-white py-8 shadow-md lg:w-[902px]">
          <div className="text-center">
            <h1 className="mb-4 text-xl font-bold">📩 Xác nhận email</h1>
            <div className="text-travel-secondary text-[16px] font-medium italic opacity-90">
              <p>Chúng tôi đã gửi email xác nhận đến email của bạn.</p>
              <p>Vui lòng kiểm tra email để xác nhận đơn hàng.</p>
            </div>

            <p className="mt-2 font-medium text-red-500">
              ⏰ Link có hiệu lực trong {EXPIRE_HOURS} giờ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
