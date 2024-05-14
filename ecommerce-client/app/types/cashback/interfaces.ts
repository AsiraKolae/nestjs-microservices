interface CashbackData {
  [x: string]: any;
  data?: any;
  status?: any;
}
interface CashbackParam {
  [key: string]: any;
  per_page?: number;
  page?: number;
  filters?: {
    [key: string]: string;
  } | any;
  sorted?: {
    [key: string]: string;
  };
}

export type { CashbackData, CashbackParam };
