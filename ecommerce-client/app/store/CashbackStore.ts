import { create } from "zustand";
import { CashbackData, CashbackParam } from "../types/cashback/interfaces";

type CashbackStore = {
  cashbackSummarize: CashbackData;
  cashback: CashbackData;
  fetchCashback: (param: CashbackParam) => Promise<void>;
  exchangeCashback: number;
  setExchangeCashback: (exchangeCashback: number) => void;
  CashbackParam: CashbackParam;
  updateCashbackParam: (CashbackParam: Partial<CashbackParam>) => void;
  setCashbackParam: (CashbackParam: CashbackParam) => Promise<void>;
};

const useCashbackStore = create<CashbackStore>()((set) => ({
  cashbackSummarize: [],
  cashback: [],
  setCashback: async (cashback: CashbackData) => {
    set({ cashback: cashback });
  },
  fetchCashback: async (param: CashbackParam) => {
    try {
      let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/cashback?`;

      if(Object.keys(param.filters).includes('summarize')){
        url += `filters=${JSON.stringify(param.filters)}`;
      }else{
        url += `filters=${JSON.stringify(param.filters)}&per_page=${
          param.per_page
        }&page=${param.page}&sorted=${param.sorted}`;
      }
      const response = await fetch(
        url,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = await response.json();
      if (res.status?.code == 200) {
        if(Object.keys(param.filters).includes('summarize')){
          set({ cashbackSummarize: res.data });
        }else{
          set({ cashback: res.data });
        }

      }
    } catch (error) {
      console.log("error", error);
    }
  },
  CashbackParam: {
    per_page: 10,
    page: 1,
    sorted: {
      created_at: "desc",
    },
    filters: {
      summarize: "all"
    }
  },
  setCashbackParam: async (CashbackParam: CashbackParam) => {
    set({ CashbackParam: CashbackParam });
  },
  updateCashbackParam: (newParams: Partial<CashbackParam>) => {
    set((state) => ({
      CashbackParam: {
        ...state.CashbackParam,
        ...newParams,
      },
    }));
  },
  exchangeCashback: 0,
  setExchangeCashback: (exchangeCashback) => set(() => ({ exchangeCashback })),
}));

export { useCashbackStore };
