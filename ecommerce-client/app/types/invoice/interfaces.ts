interface Order {
  [key: string]: any;
  shipping_address?: string;
  billing_address?: string;
}
interface InvoiceProps {
  invoiceNumber: string | undefined;
}

interface InvoiceData {
  [x: string]: any;
  order_number?: string;
  invoice_number?: string;
  orders?: {
    items: OrderItem[];
    billing_address?: string;
  }[];
  vat_type?: string;
  user?: {
    name?: string;
    user_info?: {
      address?: string;
      phone?: string;
      tax_id?: string;
    };
  };
}

interface ProductImage {
  [key: string]: {
      desktop: string;
      tablet: string;
      mobile: string;
  };
}

interface OrderItem {
  amount: number;
  product?: {
    name?: string;
    product_img?: ProductImage[];
    product_attr?: {
      price_ex_vat?: number;
      price?: number;
    };
  };
}

export type { InvoiceData, InvoiceProps, Order, OrderItem };
