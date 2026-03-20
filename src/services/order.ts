import { api } from "@/lib/axios";
import { OrderDetail } from "@/types/order";
import { CartItem } from "@/types/store";

export const createOrder = async (dataFinal: {
  items: CartItem[];
  fullName: string;
  phone: string;
  paymentMethod: string;
  note?: string | undefined;
}) => {
  const res = await api.post("/order/create", dataFinal);
  return res.data;
};

export const getOrderDetail = async ({
  orderCode,
  phone,
}: {
  orderCode: string;
  phone: string;
}): Promise<OrderDetail> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/order/success?orderCode=${orderCode}&phone=${phone}`,
    {
      cache: "no-store",
    },
  );
  const data = await res.json();
  return data.orderDetail;
};
