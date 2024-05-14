import { create } from "zustand";
import { DataTrans, TransactionData } from "../types/transaction/interfaces";
import { ResApiUpdate } from "../types/profile/interfaces";
import { FilePondFile } from "filepond";

type transactionStore = {
  transaction: DataTrans;
  setTransaction: (data: DataTrans) => Promise<void>;
  files: FilePondFile[],
  setFiles: (files: FilePondFile[]) => Promise<void>;
  createTransaction: (invoice_id: number | any) => Promise<ResApiUpdate>;
  updateTransaction: (name: string, value: string | boolean) => boolean;
};

const useTransactionStore = create<transactionStore>()((set) => ({
  transaction: {},
  setTransaction: async (transaction: DataTrans) => {
    set({ transaction: transaction });
  },
  files: [],
  setFiles: async (files: FilePondFile[]) => {
    set({ files: files });
  },
  createTransaction: async (invoice_id: number | any) => {
    try {
      const files = useTransactionStore.getState().files;
      const transaction = useTransactionStore.getState().transaction;
  
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`transaction_img`, file.file);
      });
  
      const transactionData: DataTrans = transaction;
      formData.append('invoice_id', invoice_id.invoice_id);
      formData.append('amount', transactionData.amount ?? '');
      formData.append('payment_datetime', transactionData.payment_datetime ?? '');
      formData.append('status', 'pending');
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/transaction`, {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Failed to create transaction');
      }
  
      const data = await response.json();
      
      return data;
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error; // Rethrow the error to propagate it to the caller
    }
  },
  updateTransaction: (name, value) => {
    set((state) => ({
      transaction: {
        ...state.transaction,
        [name]: value,
      },
    }));
    return true;
  },
}));


export { useTransactionStore };