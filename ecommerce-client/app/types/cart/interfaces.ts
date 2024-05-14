interface cartItems {
    [x: string]: any;
    id: number;
    user: object;
    totalAmount: number;
    items: any[];
};

interface CartItemsProps {
  [key: string]: any;
  data: any[];
}

interface PriceSummaryProps {
  [key: string]: any;
  data: any[];
}

interface ListWithIconProps {
  [key: string]: any;
}

interface cartItems {
  id: number;
  user: object;
  items: any[];
};

interface NewCartItemDelete {
  ids: any[];
}

interface NewCartItem {
  cart_items: any[];
}

interface ResApi {
  [x: string]: any;
  data: any;
  status: any;
}

export type {
  CartItemsProps,
  PriceSummaryProps,
  ListWithIconProps,
  cartItems,
  NewCartItemDelete,
  NewCartItem,
  ResApi
};
