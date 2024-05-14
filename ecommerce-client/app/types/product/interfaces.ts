interface Products {
  [key: string]: any;
  name: string;
  brand_name: string;
  category_name: string;
  product_attr: any;
  product_img: any[];
  amount: number;
}

interface ProductResponse {
  data: Products[];
  meta: any;
}

interface Images {
  [key: string]: any;
}

interface Params {
  [key: string]: any;
  per_page?: number;
  page?: number;
  filters?: string;
  sorted?: string;
  prevState?:
    | {
        filters: filterData | string | undefined;
      }
    | string
    | undefined;
}

interface sortedData {
  column?: string;
  order?: string;
}

interface filterData {
  [key: string]: string;
}

interface ProductListProps {
  classNameImage?: string;
}

interface SwiperProductProps {
  perView: number;
  classNameImage?: string;
  type?: string;
  params?: Params;
}
interface ParamsContext {
  category?: string;
  brand?: string;
  page?: number;
  per_page?: number;
  sort_by?: string;
}

interface PaginationProps {
  active: number;
  total: number;
  onClick: (page: number) => void;
}

interface SortingProps {
  productTotal?: number;
  category?: string;
  sorted: string;
  onChange: (e: EventProps) => void;
}
interface EventProps { 
  target: { value: string } 
}

interface ProductByIdProps {
  product?: any;
  productFilterName?: any;
  [key: string]: any;
}

export type {
  Products,
  ProductResponse,
  Images,
  Params,
  ProductListProps,
  SwiperProductProps,
  ParamsContext,
  PaginationProps,
  SortingProps,
  sortedData,
  EventProps,
  ProductByIdProps
};
