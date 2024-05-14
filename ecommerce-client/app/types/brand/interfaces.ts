interface Params {
  per_page?: number;
  page?: number;
  filters?: string;
  sorted?: string;
}

interface SwiperBrandProps {
  perView: number;
  delayView?: number;
  classNameImage?: string;
  params?: Params
}

interface Images {
  [key: string]: any;
};

export type { SwiperBrandProps, Params, Images };