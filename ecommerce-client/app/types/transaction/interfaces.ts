import { FilePondFile } from "filepond";

interface DataTrans {
  invoice_id?: number | undefined,
  amount?: string | undefined,
  payment_datetime?: string | undefined,
  transaction_img?: FilePondFile[] | undefined,
}

interface TransactionData {
  [x: string]: any;
}


export type {
  TransactionData,
  DataTrans
};
