import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InvoiceAction } from "./invoice-action";

const invoices = [
  {
    invoiceID: "INV001",
    status: "Paid",
    customerName: "John Doe",
    date: "2025-11-01",
    saleMan: "Alice",
    amount: "$250.00",
    paymentMethod: "Credit Card",
    action: "View",
  },
  {
    invoiceID: "INV002",
    status: "Pending",
    customerName: "Jane Smith",
    date: "2025-11-02",
    saleMan: "Bob",
    amount: "$150.00",
    paymentMethod: "PayPal",
    action: "View",
  },
  {
    invoiceID: "INV003",
    status: "Unpaid",
    customerName: "Michael Lee",
    date: "2025-11-03",
    saleMan: "Charlie",
    amount: "$350.00",
    paymentMethod: "Bank Transfer",
    action: "View",
  },
  {
    invoiceID: "INV004",
    status: "Paid",
    customerName: "Emily Davis",
    date: "2025-11-04",
    saleMan: "Alice",
    amount: "$450.00",
    paymentMethod: "Credit Card",
    action: "View",
  },
  {
    invoiceID: "INV005",
    status: "Paid",
    customerName: "David Brown",
    date: "2025-11-05",
    saleMan: "Bob",
    amount: "$550.00",
    paymentMethod: "PayPal",
    action: "View",
  },
  {
    invoiceID: "INV006",
    status: "Pending",
    customerName: "Sarah Wilson",
    date: "2025-11-06",
    saleMan: "Charlie",
    amount: "$200.00",
    paymentMethod: "Bank Transfer",
    action: "View",
  },
  {
    invoiceID: "INV007",
    status: "Unpaid",
    customerName: "James Taylor",
    date: "2025-11-07",
    saleMan: "Alice",
    amount: "$300.00",
    paymentMethod: "Credit Card",
    action: "View",
  },
];

export function InvoiceTable() {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader className=" bg-chart-1/5">
        <TableRow>
          <TableHead className="w-[100px]">InvoiceID</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Customer-Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Sale-man</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoiceID}>
            <TableCell className="font-medium">{invoice.invoiceID}</TableCell>
            <TableCell>{invoice.status}</TableCell>
            <TableCell>{invoice.customerName}</TableCell>
            <TableCell>{invoice.date}</TableCell>
            <TableCell>{invoice.saleMan}</TableCell>
            <TableCell >{invoice.amount}</TableCell>
            <TableCell className="text-right">
              <InvoiceAction/>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={6}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
