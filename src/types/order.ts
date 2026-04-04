export type OrderDetail = {
  orderCode: string;
  fullName: string;
  phone: string;
  note: string;
  paymentMethodName: string;
  paymentStatusName: string;
  statusName: string;
  createdAtFormat: string;
  subTotal: number;
  discount: number;
  total: number;
  items: {
    tourId: string;
    priceNewAdult: number;
    priceNewBaby: number;
    priceNewChildren: number;
    quantityAdult: number;
    quantityBaby: number;
    quantityChildren: number;
    avatar: string;
    name: string;
    slug: string;
    departureDateFormat: string;
    locationsFromFormat: string;
  }[];
};

export type OrderTrackingItem = {
  tourId: string;
  name: string;
  avatar: string;
  slug: string;
  locationsFromFormat: string;
  departureDateFormat: string;
};

export type OrderTracking = {
  orderId: string;
  orderCode: string;
  createdAtFormat: string;
  paymentStatus: "paid" | "unpaid";
  status: "initial" | "done" | "cancel";
  total: number;
  items: OrderTrackingItem[];
};
