/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { FaXmark } from "react-icons/fa6";
import { QuantityState } from "@/types/cart";
import { CartDetail, CartItem } from "@/types/store";
import { CounterInput } from "@/components/common/CounterInput";

export const CartItemsList = ({
  cartDetail,
  quantities,
  setQuantities,
  removeFromCart,
  checkCartItem,
  updateCartItem,
}: {
  cartDetail: CartDetail[];
  quantities: QuantityState;
  setQuantities: React.Dispatch<React.SetStateAction<QuantityState>>;
  removeFromCart: (id: string) => void;
  checkCartItem: (id: string, checked: boolean) => void;
  updateCartItem: (tour: CartItem) => void;
}) => {
  return (
    <div className="mb-4 flex flex-col gap-4">
      {cartDetail.map((item) => (
        <div
          key={item.tourId}
          className="border-travel-secondary/10 flex flex-wrap border-b border-dashed pb-4"
        >
          <div className="mb-2.5 flex w-full flex-row-reverse items-center justify-between gap-9 lg:mr-2.5 lg:mb-0 lg:w-auto lg:flex-col lg:justify-start">
            <button onClick={() => removeFromCart(item.tourId)}>
              <FaXmark className="size-4 cursor-pointer text-[#828282] transition-all duration-300 hover:text-[#DA0808]" />
            </button>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={(e) => checkCartItem(item.tourId, e.target.checked)}
              className="checkbox checkbox-primary h-5 w-5 rounded-sm"
            />
          </div>

          <div className="mb-2.5 flex items-start gap-2.5 sm:gap-4 lg:mb-0">
            <div className="border-travel-secondary/10 aspect-[118/100] w-[118px] overflow-hidden rounded-md border lg:aspect-[150/120] lg:w-[150px]">
              <img
                src={
                  item.avatar ||
                  "https://placehold.co/1x1/white/black?text=No+Image"
                }
                alt={item.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="w-full flex-1 lg:w-[280px] lg:flex-none">
              <Link
                href={`/tour/detail/${item.slug}`}
                className="text-travel-secondary hover:text-travel-primary mb-1.5 line-clamp-2 text-sm font-medium transition-all duration-300 sm:mb-3 sm:text-[16px]"
              >
                {item.name}
              </Link>
              <div className="text-travel-gray-900 flex flex-col gap-1 text-xs sm:text-sm">
                <div>
                  Ngày Khởi Hành: <b>{item.departureDateFormat}</b>
                </div>
                <div>
                  Khởi Hành Tại:{" "}
                  <b>
                    {item.locationsFromName.map((item) => item.name).join(", ")}
                  </b>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 lg:ml-2.5">
            <label
              htmlFor="Quantity"
              className="text-travel-secondary mb-2 block text-sm font-normal lg:text-right"
            >
              Số Lượng Hành Khách
            </label>
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <label
                  htmlFor="Quantity Adult"
                  className="text-travel-secondary inline-block w-20 text-sm font-normal"
                >
                  Người lớn:
                </label>
                <CounterInput
                  min={1}
                  max={item.stockAdult}
                  value={quantities[item.tourId]?.inputAdult ?? ""}
                  setQuantity={(val) => {
                    setQuantities((prev) => ({
                      ...prev,
                      [item.tourId]: {
                        ...prev[item.tourId],
                        quantityAdult: Number(val),
                        inputAdult: String(val),
                      },
                    }));
                    updateCartItem({
                      tourId: item.tourId,
                      quantityAdult: Number(val),
                      quantityChildren:
                        quantities[item.tourId]?.quantityChildren || 0,
                      quantityBaby: quantities[item.tourId]?.quantityBaby || 0,
                    });
                  }}
                  setInput={(val) =>
                    setQuantities((prev) => ({
                      ...prev,
                      [item.tourId]: {
                        ...prev[item.tourId],
                        inputAdult: String(val),
                      },
                    }))
                  }
                />
                <div className="text-travel-gray-900 flex-1 text-right">
                  <span className="text-travel-primary text-sm font-semibold sm:text-[16px]">
                    {item.priceNewAdult.toLocaleString("vi-VN")}
                    <span className="underline">đ</span>
                  </span>
                  <span className="text-xs font-medium"> / Khách</span>
                </div>
              </div>
              <div className="flex items-center">
                <label
                  htmlFor=""
                  className="text-travel-secondary inline-block w-20 text-sm font-normal"
                >
                  Trẻ em:
                </label>
                <CounterInput
                  min={0}
                  max={item.stockChildren}
                  value={quantities[item.tourId]?.inputChildren ?? ""}
                  setQuantity={(val) => {
                    setQuantities((prev) => ({
                      ...prev,
                      [item.tourId]: {
                        ...prev[item.tourId],
                        quantityChildren: Number(val),
                        inputChildren: String(val),
                      },
                    }));
                    updateCartItem({
                      tourId: item.tourId,
                      quantityAdult: quantities[item.tourId].quantityAdult || 0,
                      quantityChildren: Number(val),
                      quantityBaby: quantities[item.tourId].quantityBaby || 0,
                    });
                  }}
                  setInput={(val) =>
                    setQuantities((prev) => ({
                      ...prev,
                      [item.tourId]: {
                        ...prev[item.tourId],
                        inputChildren: String(val),
                      },
                    }))
                  }
                />
                <div className="text-travel-gray-900 flex-1 text-right">
                  <span className="text-travel-primary text-sm font-semibold sm:text-[16px]">
                    {item.priceNewChildren.toLocaleString("vi-VN")}
                    <span className="underline">đ</span>
                  </span>
                  <span className="text-xs font-medium"> / Khách</span>
                </div>
              </div>
              <div className="flex items-center">
                <label
                  htmlFor=""
                  className="text-travel-secondary inline-block w-20 text-sm font-normal"
                >
                  Em bé:
                </label>
                <CounterInput
                  min={0}
                  max={item.stockBaby}
                  value={quantities[item.tourId]?.inputBaby ?? ""}
                  setQuantity={(val) => {
                    setQuantities((prev) => ({
                      ...prev,
                      [item.tourId]: {
                        ...prev[item.tourId],
                        quantityBaby: Number(val),
                        inputBaby: String(val),
                      },
                    }));
                    updateCartItem({
                      tourId: item.tourId,
                      quantityAdult: quantities[item.tourId].quantityAdult || 0,
                      quantityChildren:
                        quantities[item.tourId]?.quantityChildren || 0,
                      quantityBaby: Number(val),
                    });
                  }}
                  setInput={(val) =>
                    setQuantities((prev) => ({
                      ...prev,
                      [item.tourId]: {
                        ...prev[item.tourId],
                        inputBaby: String(val),
                      },
                    }))
                  }
                />
                <div className="text-travel-gray-900 flex-1 text-right">
                  <span className="text-travel-primary text-sm font-semibold sm:text-[16px]">
                    {item.priceNewBaby.toLocaleString("vi-VN")}
                    <span className="underline">đ</span>
                  </span>
                  <span className="text-xs font-medium"> / Khách</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
