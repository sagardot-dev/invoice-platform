export interface Invoice {
  invoiceID: string;
  status: "Paid" | "Pending" | "Unpaid";
  customerName: string;
  date: string;
  saleMan: string;
  amount: string;
  paymentMethod: "Credit Card" | "PayPal" | "Bank Transfer";
  action: string;
}
