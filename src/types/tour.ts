export type TourDetail = {
  images: string[];
  tourCode: string;
  vehicle: string;
  stockAdult: number;
  stockChildren: number;
  stockBaby: number;
  priceNewChildren: number;
  priceNewBaby: number;
  information: string;
  schedules: {
    title: string;
    description: string;
  }[];
  locationsToName: string[];
} & TourItem;

export type TourItem = {
  id: string;
  name: string;
  avatar: string;
  time: string;
  slug: string;
  priceNewAdult: number;
  departureDateFormat: string;
  locationsFromName: {
    _id: string;
    name: string;
  }[];
  discount: string;
};
