export interface Invoice {
  invoiceID: string;
  status: "Paid" | "Pending" | "Unpaid" | "Balance";
  customerName: string;
  date: Date;
  saleMan: string;
  amount: Number;
  paymentMethod: "CC" | "PayPal" | "Bank Transfer" | "CA" | "STRIPE";
}

export type GetSignApiRes = {
  success: boolean;
  message: string;
  fileName: string;
  signUrl: string;
};

export type ApiResponse<T = any> = {
  success: boolean;
  title: string;
  description?: string;
  code: string;
  status: "success" | "error";
  data?: T;
};
