interface Params {
  per_page?: number;
  page?: number;
  filters?: string;
  sorted?: string;
}

interface SwiperCategoryProps {
  perView: number;
  delayView?: number;
  classNameImage?: string;
  params?: Params
}

interface Images {
  [key: string]: any;
};

export type { SwiperCategoryProps, Params, Images };
