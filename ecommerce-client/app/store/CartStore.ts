import { create } from "zustand";
import { ProductByIdProps } from "../types/product/interfaces";
import { NewCartItem, NewCartItemDelete, ResApi, cartItems } from "../types/cart/interfaces";
import { persist, createJSONStorage } from 'zustand/middleware'

type ProductAmountStore = {
  amount: number;
  setAmount: (amount: number) => void;
};

type CartStore = {
  cartItems: cartItems[];
  fetchCartData: () => Promise<void>;
  removeFromCart: (itemId: number) => void;
  removeCart: (preparedData: NewCartItemDelete) => Promise<void>;
  updateAmount: (itemId: number, newAmount: number) => void ;
  updateNewCart: (preparedData: NewCartItem) => Promise<ResApi>;
};

type AmountItemsStore = {
  amountItems: number;
  setAmountItems: (amount: number) => void;
};

const useProductAmountStore = create<ProductAmountStore>()((set) => ({
  amount: 1,
  setAmount: (amount) => set(() => ({ amount: amount })),
}));

const addToCart = async ({ product }: ProductByIdProps) => {
  const amount = useProductAmountStore.getState().amount;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/cart`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: product.id,
          amount: amount,
        }),
      }
    );

    const res = await response.json();

    if (res.status?.code == 401) {
      window.location.href = "/login";
    }
    useAmountItemsStore.setState(() => ({ amountItems: res.data.totalAmount }));
    return res;
  } catch (error) {
    console.log("error", error);
  }
};

const showCart = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/cart`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res = await response.json();

    if (res.status?.code == 401) {
      return [];
    }

    useAmountItemsStore.setState(() => ({ amountItems: res.data.totalAmount}));

    return res;
  } catch (error) {
    console.log("error", error);
  }
};

const useCartStore = create<CartStore>()((set) => ({
  cartItems: [],
  fetchCartData: async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + `/api/cart`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    set({ cartItems: data.data?.items });
  },
  removeFromCart: (itemId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== itemId),
    })),

  updateAmount: (itemId, newAmount) => {
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === itemId ? { ...item, amount: newAmount } : item
      ),
    }));
    return true;
  },
  prepareData: (cartItems: any[]) => {
    return {
      cart_items: cartItems.map((item) => ({
        product_id: item.product.id,
        amount: item.amount,
      })),
    };
  },
  updateNewCart: async (preparedData: NewCartItem) => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + `/api/cart`,
        {
          method: "PUT",
          body: JSON.stringify(preparedData),
        }
      );
      const data = await response.json();
      set({ cartItems: data.data.items });
      useAmountItemsStore.setState(() => ({ amountItems: data.data.totalAmount}));
      return data.status;
    } catch (error) {
      console.error("Error updating data");
    }
  },
  removeCart: async (preparedData: NewCartItemDelete) => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + `/api/cart`,
        {
          method: "DELETE",
          body: JSON.stringify(preparedData),
        }
      );
      await response.json();
    } catch (error) {
      console.error("Error delete data");
    }
  },
}));


const useAmountItemsStore = create<AmountItemsStore>()(
  persist(
    (set, get) => ({
      amountItems: 0,
      setAmountItems: (amountItems) => set(() => ({ amountItems: amountItems }))
    }),
    {
      name: 'cart-item-storage', // name of item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default the 'localStorage' is used
      partialize: (state) => ({ amountItems: state.amountItems }),
    },
  ),
)

export {
  useProductAmountStore,
  addToCart,
  showCart,
  useCartStore,
  useAmountItemsStore
};
