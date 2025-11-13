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

export const GenderEnum = z.enum(["MALE", "FEMALE"]);
export const CustomerStatusEnum = z.enum([
  "PAID",
  "BALANCE",
  "UNPAID",
  "PENDING",
]);
export const PaymentMethodEnum = z.enum([
  "CC",
  "CA",
  "BANKTRANSFER",
  "CRYPTO",
  "CHECK",
]);
export const JacketTypeEnum = z.enum([
  "NORMAL",
  "LEATHER",
  "WEEDING",
  "SPORT",
  "LINEN",
  "DENIM",
  "CROCODILE",
  "WINTER",
]);
export const PantTypeEnum = z.enum([
  "NORMAL",
  "LEATHER",
  "WEEDING",
  "LINEN",
  "DENIM",
  "CROCODILE",
  "ChINO",
]);
export const ShirtTypeEnum = z.enum([
  "DRESSSHIRT",
  "DESIGNER",
  "LINEN",
  "TUXEDO",
  "POLO",
  "LONGSLEEVE",
  "SHORTSLEEVE",
  "DRESS",
  "SKIRT",
  "BLOUSE",
]);

export const PantLengthEnum = z.enum(["TROUSER", "SHORT"]);

export const jacketSchema = z.object({
  quantity: z.number().optional(),
  tailorName: z.string().optional(),
  fittingDate: z.date().optional(),
  addVest: z.boolean().optional(),
  addMonogram: z.boolean().optional(),
  jacketType: JacketTypeEnum.optional(),
  jacketFabricImage: z.string().optional(),
  jacketStyleDrawing: z.string().optional(),
  jacketCustomStyle: z.string().optional(),
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

  note: z.string().optional(),
});


export const pantSchema = z.object({
  quantity: z.number().optional(),
  tailorName: z.string().optional(),
  fittingDate: z.date().optional(),
  addInnerLining: z.boolean().optional(),

  pantType: PantTypeEnum.optional(),
  pantLength: PantLengthEnum.optional(),
  pantFabricImage: z.string().optional(),
  pantStyleDrawing: z.string().optional(),
  pantCustomStyle: z.string().optional(),
  monogramName: z.string().optional(),
  monogramImage: z.string().optional(),

  wa: z.number().optional(),
  hip: z.number().optional(),
  cr: z.number().optional(),
  th: z.number().optional(),
  kn: z.number().optional(),
  bo: z.number().optional(),
  lg: z.number().optional(),

  slantingPkt: z.boolean().optional(),
  straightPkt: z.boolean().optional(),
  americanPkt: z.boolean().optional(),
  backRhtPkt: z.boolean().optional(),
  backLhtPkt: z.boolean().optional(),
  cuffs: z.boolean().optional(),
  wpIn: z.boolean().optional(),
  wpOut: z.boolean().optional(),
  flatB: z.boolean().optional(),
  lowFront: z.boolean().optional(),
  underBelly: z.boolean().optional(),

  note: z.string().optional(),
});


export const shirtSchema = z.object({
  quantity: z.number().optional(),
  tailorName: z.string().optional(),
  fittingDate: z.date().optional(),
  addMonogram: z.boolean().optional(),
  addTie: z.boolean().optional(),
  shirtType: ShirtTypeEnum.optional(),

  shirtFabricImage: z.string().optional(),
  shirtStyleDrawing: z.string().optional(),
  shirtCustomStyle: z.string().optional(),
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

  stb: z.number().optional(),
  stw: z.number().optional(),
  ah: z.number().optional(),
  dressLg: z.number().optional(),
  skirtLg: z.number().optional(),
  nLow: z.number().optional(),

  sqSho: z.boolean().optional(),
  rdSho: z.boolean().optional(),
  sloSho: z.boolean().optional(),
  brBly: z.boolean().optional(),
  sloNk: z.boolean().optional(),

  note: z.string().optional(),
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

export type shapeType = z.infer<typeof shapeType>;

const pantMeasurementType = pantSchema.pick({
  wa: true,
  hip: true,
  cr: true,
  th: true,
  kn: true,
  bo: true,
  lg: true,
});

const pantStyleType = pantSchema.pick({
  slantingPkt: true,
  straightPkt: true,
  americanPkt: true,
  backRhtPkt: true,
  backLhtPkt: true,
  cuffs: true,
  wpIn: true,
  wpOut: true,
  flatB: true,
  lowFront: true,
  underBelly: true,
});

export type PantMeasurementType = z.infer<typeof pantMeasurementType>;
export type PantStyleType = z.infer<typeof pantStyleType>;

const shirtMeasurementType = shirtSchema.pick({
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
  stb: true,
  stw: true,
  ah: true,
  dressLg: true,
  skirtLg: true,
  nLow: true,
});

const shirtShapeType = shirtSchema.pick({
  sqSho: true,
  rdSho: true,
  sloSho: true,
  brBly: true,
  sloNk: true,
});

export type ShirtMeasurementType = z.infer<typeof shirtMeasurementType>;
export type ShirtShapeType = z.infer<typeof shirtShapeType>;

export const customerSchema = z.object({
  name: z.string().min(1),
  phoneNumber: z.string().min(5),
  address: z.string().optional(),
  email: z.string().min(1, "email is required"),
  gender: GenderEnum,
  userId: z.string().uuid(),
  height: z.number().optional(),
  weight: z.number().optional(),
  stayDays: z.number().optional(),
});

export const invoiceSchema = z.object({
  invoiceNumber: z.string().min(1, "Invoice number is required"),
  date: z.date(),
  customerStatus: CustomerStatusEnum,
  paymentMethod: PaymentMethodEnum,
  totalAmount: z.number().min(0),
  notes: z.string().optional(),
  reselling: z.boolean(),
  isReadymade: z.boolean(),
  isMultiSaleMan: z.boolean(),
  customerId: z.string().optional(),
  customer: customerSchema,

  salesMan: z.string(),
  moreSaleMan: z.array(z.string().optional()),

  helperId: z.string().optional(),
  customerSignature: z.string().optional(),
  jacket: jacketSchema.optional(),
  pant: pantSchema.optional(),
  shirt: shirtSchema.optional(),
  onBoard: onBoardSchema,
});

export type InvoiceFormValues = z.infer<typeof invoiceSchema>;
