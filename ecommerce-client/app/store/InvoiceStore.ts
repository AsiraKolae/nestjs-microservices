import { create } from "zustand";
import { InvoiceData } from "../types/invoice/interfaces";

type InvoiceStore = {
  invoice: InvoiceData;
  showInvoice: (InvoiceNumber?: string) => Promise<void>;
};

const useInvoiceStore = create<InvoiceStore>()((set) => ({
  invoice: {
    order_number: "",
    orders: [],
    invoice_number: "",
    user: {
      name: "",
      user_info: {
        address: "",
        tax_id: "",
        phone: "",
      },
    },
  },
  showInvoice: async (InvoiceNumber?: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/invoice?InvoiceNumber=${InvoiceNumber}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = await response.json();
      
      if (res.status?.code == 200) {
        set({ invoice: res.data });
      }
    } catch (error) {
      console.log("error", error);
    }
  },
}));

export { useInvoiceStore };
