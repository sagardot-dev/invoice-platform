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
  name: z.string().min(1, "name is required"),
  email: z.string().email().min(1, "email is required"),
  image: z.string().optional(),
  address: z.string().min(5, "address is required"),
  phoneNumber: z.string().min(9, "phone number is required"),
  taxId: z.string().optional(),
  websiteUrl: z.string().optional(),
  whatsappNumber: z.string().min(1, "Whatsapp number is required"),
});

export const saleManSchema = z.object({
  name: z.string().min(1, "name is required"),
  email: z.string().email().min(1, "email is required"),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});

export const helperSchema = z.object({
  name: z.string().min(1, "name is required"),
  email: z.string().email().min(1, "email is required"),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});




export const GenderEnum = z.enum(["FEMALE", "MALE"]);
export const CustomerStatusEnum = z.enum(["PAID", "BALANCE", "UNPAID", "PENDING"]);
export const PaymentMethodEnum = z.enum(["CC", "CA", "BANKTRANSFER", "CRYPTO", "CHECK"]);
export const JacketTypeEnum = z.enum(["NORMAL", "LEATHER", "WEEDING", "SPORT", "LINEN", "DENIM", "CROCODILE", "WINTER"]);
export const PantTypeEnum = z.enum(["NORMAL", "LEATHER", "WEEDING", "LINEN", "DENIM", "CROCODILE", "ChINO"]);
export const ShirtTypeEnum = z.enum(["DRESSSHIRT", "DESIGNER", "LINEN", "TUXEDO", "POLO"]);


export const customerSchema = z.object({
  name: z.string().min(1),
  phoneNumber: z.string().min(5),
  address: z.string().optional(),
  gender: GenderEnum.default("MALE"),
  userId: z.string().uuid(),
});


export const jacketSchema = z.object({
  quantity: z.number().min(1),
  tailorName: z.string().min(1),
  fittingDate: z.date(),
  addVest: z.boolean().default(false),
  addMonogram: z.boolean().default(false),
  jacketType: JacketTypeEnum.default("NORMAL"),
  jacketFabricImage: z.string().optional(),
  jacketStyleDrawing: z.string().optional(),
  monogramName: z.string().optional(),
  monogramImage: z.string().optional(),
  liningImage: z.string().optional(),
  ch: z.number().optional(),
  wa: z.number().optional(),
  hip: z.number().optional(),
  nk: z.number().optional(),
  sh: z.number().optional(),
  sleeve: z.number().optional(),
  arm: z.number().optional(),
  fr: z.number().optional(),
  ba: z.number().optional(),
  lg: z.number().optional(),
  vLg: z.number().optional(),
  ocLg: z.number().optional(),

  nSho: z.boolean().optional(),
  sqSho: z.boolean().optional(),
  rdSho: z.boolean().optional(),
  sloSho: z.boolean().optional(),

  hBk: z.boolean().optional(),
  curveBk: z.boolean().optional(),
  shoNk: z.boolean().optional(),
  bigM: z.boolean().optional(),

  holBk: z.boolean().optional(),
  holCh: z.boolean().optional(),
  brBly: z.boolean().optional(),
  lLo: z.boolean().optional(),

  rLo: z.boolean().optional(),
  erect: z.boolean().optional(),
  flatB: z.boolean().optional(),

  note: z.string().optional()
});


const shapeType = jacketSchema.pick({
  nSho: true,
  sqSho: true,
  rdSho: true,
  sloSho: true,
  hBk: true,
  curveBk: true,
  shoNk: true,
  bigM: true,
  holBk: true,
  holCh: true,
  brBly: true,
  lLo: true,
  rLo: true,
  erect: true,
  flatB: true,
});


const measurementType = jacketSchema.pick({
  ch: true,
  wa: true,
  hip: true,
  nk: true,
  sh: true,
  sleeve: true,
  arm: true,
  fr: true,
  ba: true,
  lg: true,
  vLg: true,
  ocLg: true,
});

export type MeasurementType = z.infer<typeof measurementType>;

export type shapeType = z.infer<typeof shapeType>



export const pantSchema = z.object({
  quantity: z.number().min(1),
  tailorName: z.string().min(1),
  addLining: z.boolean().default(false),
  pantType: PantTypeEnum.default("NORMAL"),
  pantFabricImage: z.string().optional(),
  pantStyleDrawing: z.string().optional(),
  wa: z.number().optional(),
  hip: z.number().optional(),
  cr: z.number().optional(),
  th: z.number().optional(),
  kn: z.number().optional(),
  bo: z.number().optional(),
  lg: z.number().optional(),
});

export const shirtSchema = z.object({
  quantity: z.number().min(1),
  tailorName: z.string().min(1),
  addTie: z.boolean().default(false),
  shirtType: ShirtTypeEnum.default("DRESSSHIRT"),
  shirtFabricImage: z.string().optional(),
  shirtStyleDrawing: z.string().optional(),
  shirtMonogramName: z.string().optional(),
  shirtMonogramImage: z.string().optional(),
  ch: z.number().optional(),
  wa: z.number().optional(),
  hip: z.number().optional(),
  nk: z.number().optional(),
  sh: z.number().optional(),
  sleeve: z.number().optional(),
  arm: z.number().optional(),
  fr: z.number().optional(),
  ba: z.number().optional(),
  lg: z.number().optional(),
  vLg: z.number().optional(),
});


export const invoiceSchema = z.object({
  invoiceNumber: z.string().min(1),
  customerSignature: z.string().optional(),
  customerStatus: CustomerStatusEnum.default("UNPAID"),
  paymentMethod: PaymentMethodEnum.default("CA"),
  totalAmount: z.number().optional(),
  notes: z.string().optional(),
  reselling: z.boolean().default(false),
  isReadymade: z.boolean().default(false),

  // Customer relation (existing or new)
  customerId: z.string().uuid().optional(),
  customer: customerSchema.optional(),

  salesmanId: z.string().uuid(),
  helperId: z.string().uuid().optional(),

  jacket: jacketSchema,
  pant: pantSchema,
  shirt: shirtSchema,
});


export type InvoiceFormValues = z.infer<typeof invoiceSchema>;




