export interface Invoice {
  invoiceID: string;
  status: "Paid" | "Pending" | "Unpaid" | "Balance";
  customerName: string;
  date: Date;
  saleMan: string;
  amount: Number;
  paymentMethod: "CC" | "PayPal" | "Bank Transfer" | "CA" | "STRIPE";
}
