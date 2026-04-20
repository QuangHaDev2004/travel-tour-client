/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";

export const ClearCart = ({ items }: { items: any[] }) => {
  const { removeFromCart } = useCartStore();

  useEffect(() => {
    items.forEach((item) => {
      removeFromCart(item.tourId);
    });
  }, []);

  return null;
};
