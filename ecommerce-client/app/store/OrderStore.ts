import { create } from "zustand";
import { Order, OrderParam, OrderResponse } from "../types/order/interfaces";

type OrderStore = {
  order: Order;
  setOrder: (order: Order) => Promise<void>;
  fetchOrder: (param: OrderParam) => Promise<void>;
  OrderParam: OrderParam;
  setOrderParam: (OrderParam: OrderParam) => Promise<void>;
  updateOrderParam: (newParams: Partial<OrderParam>) => void;
  orders: OrderResponse[];
  setOrders: (orders: OrderResponse[]) => void;
};

const useOrderStore = create<OrderStore>()((set) => ({
  order: {
    name: "",
    email: "",
    user_info: {
      phone: "",
    },
  },
  setOrder: async (order: Order) => {
    set({ order: order });
  },
  fetchOrder: async (param: OrderParam) => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string;
      let url = `${baseUrl}/api/order?per_page=${param.per_page}&page=${
        param.page
      }&sorted=${param.sorted}`;

      if (param?.filters) {
        // Append filters query parameter
        url += `&filters=${JSON.stringify(param.filters)}`;
      }
      const response = await fetch(url, {
        method: "GET",
      });
      const data = await response.json();
      set({ orders: data });
    } catch (error) {
      console.error("Error get data");
    }
  },
  OrderParam: {
    per_page: 5,
    page: 1,
    sorted: {
      created_at: "desc",
    },
  },
  setOrderParam: async (OrderParam: OrderParam) => {
    set({ OrderParam: OrderParam });
  },
  updateOrderParam: (newParams: Partial<OrderParam>) => {
    set((state) => ({
      OrderParam: {
        ...state.OrderParam,
        ...newParams,
      },
    }));
  },
  orders: [],
  setOrders: (orders: OrderResponse[]) => {
    set({ orders });
  },
}));

export { useOrderStore };
