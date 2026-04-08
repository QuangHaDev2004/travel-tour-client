export type CategoryDetail = {
  name: string;
  slug: string;
  description: string;
};

export type BreadCrumbDetail = {
  id: string;
  name: string;
  avatar: string;
  slug: string;
};

export type TPagination = {
  skip: number;
  totalRecord: number;
  totalPage: number;
  currentPage: number;
};
