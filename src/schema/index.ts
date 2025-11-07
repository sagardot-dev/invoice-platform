import * as z from "zod";

export const InvoiceSchema = z.object({
  // Basic invoice info
  invoiceID: z.string().min(1, "invoiceId is required"),
  status: z.enum(["Paid", "Pending", "Unpaid", "Balance"]),
  customerName: z.string().min(1, "customer name is required"),
  date: z.date(),
  saleMan: z.string().min(1, "saleman name is required"),
  amount: z.number(),
  paymentMethod: z.enum(["CC", "PayPal", "Bank Transfer", "CA", "STRIPE"]),

  // Jacket measurements
  jacket: z.object({
    chest: z.number().default(0),
    waist: z.number().default(0),
    hip: z.number().default(0),
    shoulder: z.number().default(0),
    sleeve: z.number().default(0),
    arm: z.number().default(0),
    front: z.number().default(0),
    back: z.number().default(0),
    nack: z.number().default(0),
    length: z.number().default(0),
    vestLength: z.number().default(0),
  }),

  // Pant measurements
  pant: z.object({
    waist: z.number().default(0),
    hip: z.number().default(0),
    croth: z.number().default(0),
    thigh: z.number().default(0),
    knee: z.number().default(0),
    bow: z.number().default(0),
    length: z.number().default(0),
  }),

  // Shirt measurements
  shirt: z.object({
    chest: z.number().default(0),
    waist: z.number().default(0),
    hip: z.number().default(0),
    shoulder: z.number().default(0),
    sleeve: z.number().default(0),
    arm: z.number().default(0),
    front: z.number().default(0),
    back: z.number().default(0),
    nack: z.number().default(0),
    length: z.number().default(0),
  }),

  customerSignature: z.string(), 
});




export const onBoardSchema = z.object({
  name : z.string().min(1, "name is required"),
  email: z.string().email().min(1, 'email is required'),
  image: z.string().optional(),
  address: z.string().min(5, 'address is required'),
  phoneNumber: z.string().min(9, 'phone number is required'),
  taxId : z.string().optional(),
  websiteUrl: z.string().optional(),
  whatsappNumber: z.string().min(1, "Whatsapp number is required")
})
