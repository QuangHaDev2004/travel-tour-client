"use client";
import { EmptyCart } from "./EmptyCart";
import { CartHeader } from "./CartHeader";
import { CartCoupon } from "./CartCoupon";
import { CartDetail } from "@/types/store";
import { CartSummary } from "./CartSummary";
import { BookingForm } from "./BookingForm";
import { QuantityState } from "@/types/cart";
import { CartItemsList } from "./CartItemsList";
import { useCartStore } from "@/store/useCartStore";
import { useEffect, useMemo, useState } from "react";
import { useCartDetail } from "../hooks/useCartDetail";
import { CartItemSkeleton } from "@/components/skeleton/CartItemSkeleton";

/**
 * Component Container quản lý toàn bộ giao diện và logic của giỏ hàng.
 * @author QuangHaDev - 04.12.2025
 */
export const CartContainer = () => {
  const { cart, updateCartItem, removeFromCart, checkCartItem } =
    useCartStore();
  const { data, isLoading } = useCartDetail({ cart });
  const cartDetail: CartDetail[] = useMemo(() => data?.cart ?? [], [data]);
  const [quantities, setQuantities] = useState<QuantityState>({});
  const [isRedirecting, setIsRedirecting] = useState(false);

  // display default quantity
  useEffect(() => {
    if (cartDetail && cartDetail.length > 0) {
      const newQuantity: QuantityState = {};
      cartDetail.forEach((item) => {
        newQuantity[item.tourId] = {
          quantityAdult: item.quantityAdult,
          quantityChildren: item.quantityChildren,
          quantityBaby: item.quantityBaby,
          inputAdult: item.quantityAdult.toString(),
          inputChildren: item.quantityChildren.toString(),
          inputBaby: item.quantityBaby.toString(),
        };
      });

      setQuantities(newQuantity);
    }
  }, [cartDetail]);

  const subTotal = cartDetail.reduce((acc, item) => {
    if (!item.checked) return acc;
    return (
      acc +
      item.quantityAdult * item.priceNewAdult +
      item.quantityChildren * item.priceNewChildren +
      item.quantityBaby * item.priceNewBaby
    );
  }, 0);

  const discount = 0;
  const total = subTotal - discount;

  return (
    <>
      <div className="mx-auto w-full lg:w-[902px]">
        <div className="mb-[30px] rounded-2xl bg-white px-4 py-5 shadow-md sm:py-8">
          <CartHeader />

          <div className="min-h-[300px]">
            {isLoading ? (
              Array(3)
                .fill("")
                .map((_, index) => <CartItemSkeleton key={index} />)
            ) : cartDetail.length === 0 && !isRedirecting ? (
              <EmptyCart />
            ) : (
              <>
                <CartItemsList
                  cartDetail={cartDetail}
                  quantities={quantities}
                  setQuantities={setQuantities}
                  removeFromCart={removeFromCart}
                  checkCartItem={checkCartItem}
                  updateCartItem={updateCartItem}
                />
                <CartCoupon />
                <CartSummary
                  subTotal={subTotal}
                  discount={discount}
                  total={total}
                />
              </>
            )}
          </div>
        </div>

        {cartDetail && cartDetail.length > 0 && (
          <BookingForm setIsRedirecting={setIsRedirecting} />
        )}
      </div>
    </>
  );
};
