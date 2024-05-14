interface AddressOrder {
  district: string;
  amphoe: string;
  province: string;
  zipcode: string;
}

interface ProvinceData {
  [key: string]: AddressOrder[];
}

interface Info {
  address?: string;
  name?: string | undefined;
  tel?: string | undefined;
}

interface Order {
  [key: string]: any;
  shipping_address?: string;
  billing_address?: string;
}

interface fetchOrder {
  [key: string]: any;
  id: string;
  user: any[];
  items: any[];
  addresses: any[];
  billing_address: string;
}

interface OrderResponse {
  data: fetchOrder[];
  meta: any;
}

interface OrderParam {
  [key: string]: any;
  per_page?: number;
  page?: number;
  filters?: {
    [key: string]: string;
  };
  sorted?: {
    [key: string]: string;
  };
}

export type {
  AddressOrder,
  ProvinceData,
  Info,
  Order,
  OrderParam,
  OrderResponse,
  fetchOrder,
};
