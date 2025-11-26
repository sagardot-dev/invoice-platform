"use client";
import { SaleMan } from "@/generated/prisma/client";
import { useGetInvoice } from "@/modules/invoices/server/use-get-invoice";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import dynamic from "next/dynamic";

const PdfViewerClient = dynamic(() => import("@/provider/pdfProvider"), {
  ssr: false,
});

const jacketFieldLabels = {
  ch: "อก",
  tm: "พุง",
  wa: "เอว",
  hip: "สะโพก",
  sh: "ไหล่",
  sleeve: "แขน",
  fr: "บ่าหน้า",
  ba: "บ่าหลัง",
  nk: "คอ",
  stb: "ไหล่-อก",
  stw: "ไหล่-เอว",
  ah: "รักแร้",
  lg: "ยาว",
  vLg: "เสื้อกั๊กยาว",
  ocLg: "เสื้อโค้ทยาว",
  arm: "รอบแขน",
  nSho: "ไหล่ธรรมดา",
  sqSho: "ไหล่ตั้ง",
  rdSho: "ไหล่มน",
  sloSho: "ไหล่เท",
  hBk: "หลังค่อม",
  curveBk: "หลังแอ่น",
  shoNk: "คอสั้น",
  bigM: "กล้ามใหญ่",
  holBk: "ไหล่ห่อ",
  holCh: "อกห่อ",
  brBly: "พุงใหญ่",
  lLo: "ซ้ายต่ำ",
  rLo: "ขวาต่ำ",
  erect: "ยกอก",
  flatB: "กันแน่น",
};

const pantFieldLabels = {
  wa: "เอว",
  hip: "สะโพก",
  cr: "เป้า",
  th: "โคนขา",
  kn: "เข่า",
  bo: "ปลายขา",
  lg: "ยาว",
  slantingPkt: "กระเป๋าเฉียง",
  straightPkt: "กระเป๋าตรง",
  americanPkt: "กระเป๋าแบบอเมริกัน",
  backRhtPkt: "กระเป๋าหลังขวา",
  backLhtPkt: "กระเป๋าหลังซ้าย",
  cuffs: "ขาเฉลียง",
  wpIn: "กระเป๋าใน",
  wpOut: "กระเป๋านอก",
  flatB: "กันแน่น",
  lowFront: "หน้าต่ำ",
  underBelly: "ใต้พุง",
};

const shirtFieldLabels = {
  ch: "อก",
  wa: "เอว",
  hip: "สะโพก",
  sh: "ไหล่",
  sleeve: "แขน",
  nk: "คอ",
  fr: "บ่าหน้า",
  ba: "บ่าหลัง",
  stb: "ไหล่ถึงอก",
  stw: "ไหล่ถึงเอว",
  ah: "รักแร้",
  lg: "ยาว",
  dressLg: "เดรสยาว",
  skirtLg: "กระโปรงยาว",
  arm: "รอบแขน",
  nLow: "คอต่ำ",
  sqSho: "ไหล่ตั้ง",
  rdSho: "ไหล่มน",
  sloSho: "ไหล่เท",
  sloNk: "คอสั้น",
  brBly: "พุงใหญ่",
};

Font.register({
  family: "Niramit",
  fonts: [
    {
      src: "/fonts/Niramit-Regular.ttf",
      fontWeight: 400,
    },
    {
      src: "/fonts/Niramit-MediumItalic.ttf",
      fontWeight: 500,
      fontStyle: "italic",
    },
    {
      src: "/fonts/Niramit-SemiBold.ttf",
      fontWeight: 600,
    },
    {
      src: "/fonts/Niramit-LightItalic.ttf",
      fontWeight: 300,
      fontStyle: "italic",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    fontFamily: "Niramit",
    fontSize: 9,
    padding: 48,
    color: "#0a0a0a",
  },
  noteLabels: {
    fontSize: 16,
    fontWeight: 600,
    color: "#0A3D91",
    marginBottom: 16,
  },
  header: {
    marginBottom: 50,
  },
  invoiceTitle: {
    fontSize: 11,
    fontWeight: 600,
    color: "#6b7280",
    letterSpacing: 0.5,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  invoiceNumber: {
    fontSize: 28,
    fontWeight: 600,
    color: "#0a0a0a",
    marginBottom: 24,
  },
  infoGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 24,
    borderTop: "1px solid #e5e7eb",
  },
  infoColumn: {
    width: "48%",
  },
  infoLabel: {
    fontSize: 8,
    color: "#6b7280",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  infoValue: {
    fontSize: 10,
    color: "#0a0a0a",
    marginBottom: 12,
    lineHeight: 1.5,
  },
  garmentSection: {
    marginTop: 32,
    marginBottom: 32,
  },
  garmentCard: {
    backgroundColor: "#fafafa",
    borderRadius: 8,
    padding: 19,
    marginBottom: 14,
    border: "1px solid #f0f0f0",
  },
  garmentTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: "#0a0a0a",
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingBottom: 16,
    borderBottom: "1px solid #e5e7eb",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaLabel: {
    fontSize: 8,
    color: "#6b7280",
    marginRight: 6,
  },
  metaValue: {
    fontSize: 9,
    color: "#0a0a0a",
    fontWeight: 500,
  },
  measurementsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  measurementItem: {
    width: "29%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#ffffff",
    borderRadius: 4,
    border: '1px',
    borderColor: "#E5E7EB",
  },
  measurementLabel: {
    fontSize: 8,
    color: "#6b7280",
  },
  measurementValue: {
    fontSize: 9,
    fontWeight: 600,
    color: "#0a0a0a",
  },
  notesSection: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#fffbeb",
    borderRadius: 6,
    borderLeft: "3px solid #f59e0b",
    minHeight: 70,
  },
  noteLabel: {
    fontSize: 7,
    color: "#92400e",
    marginBottom: 4,
    textTransform: "uppercase",
    fontWeight: 600,
  },
  noteText: {
    fontSize: 8,
    color: "#78350f",
    lineHeight: 1.5,
  },
  imageContainer: {
    marginTop: 20,
    height: 240,
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    border: "1px solid #e5e7eb",
    justifyContent: "center",
    alignItems: "center",
  },
  styleImage: {
    width: "100%",
    height: 340,
    objectFit: "cover",
    borderRadius: 8,
  },
  imagePlaceholder: {
    fontSize: 9,
    color: "#9ca3af",
  },
  summarySection: {
    marginTop: 32,
    paddingTop: 24,
    borderTop: "2px solid #e5e7eb",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 9,
    color: "#6b7280",
  },
  summaryValue: {
    fontSize: 9,
    color: "#0a0a0a",
    fontWeight: 500,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 16,
    marginTop: 16,
    borderTop: "1px solid #e5e7eb",
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: 600,
    color: "#0a0a0a",
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 600,
    color: "#0a0a0a",
  },
  footer: {
    position: "absolute",
    bottom: 48,
    left: 48,
    right: 48,
    paddingTop: 20,
    borderTop: "1px solid #e5e7eb",
  },
  footerText: {
    fontSize: 7,
    color: "#9ca3af",
    textAlign: "center",
  },
  signatureSection: {
    marginTop: 20,
    alignItems: "flex-end",
  },
  signatureImage: {
    width: 100,
    height: 50,
    marginBottom: 8,
  },
  signatureLine: {
    width: 200,
    borderTop: "1px solid #d1d5db",
    paddingTop: 8,
  },
  signatureLabel: {
    fontSize: 7,
    color: "#6b7280",
    textAlign: "center",
  },
  badge: {
    backgroundColor: "#dbeafe",
    color: "#1e40af",
    padding: "4px 10px",
    borderRadius: 12,
    fontSize: 7,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  statusPaid: {
    backgroundColor: "#dcfce7",
    color: "#166534",
  },
  statusPending: {
    backgroundColor: "#fef3c7",
    color: "#92400e",
  },
  pageTitle: {
    fontSize: 20,
    fontFamily: "Niramit",
    marginBottom: 20,
  },

  columnImages: {
    flexDirection: "column",
    gap: 20,
  },

  imageWrapper: {
    width: "100%",
    height: 250,
    border: "1pt solid #ccc",
    padding: 10,
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
});

const hasImages = (...imgs: (string | undefined)[]) =>
  imgs.some((img) => img && img.trim() !== "");

const formatDate = (dateString: string | null | undefined) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const MeasurementSection = ({ measurements, labels }: any) => {
  const numericMeasurements = Object.entries(measurements).filter(
    ([key, value]) => typeof value === "number" && value > 0 && labels[key]
  );

  const activeBooleans = Object.entries(measurements).filter(
    ([key, value]) => value === true && labels[key]
  );

  return (
    <View>
      <View style={styles.measurementsGrid}>
        {numericMeasurements.map(([key, value]) => (
          <View style={styles.measurementItem} key={key}>
            <Text style={styles.measurementLabel}>
              {`${key} ${labels[key]}`}
            </Text>

            <Text style={styles.measurementValue}>{`${value}"`}</Text>
          </View>
        ))}
      </View>

      {activeBooleans.length > 0 && (
        <View
          style={{
            marginTop: 16,
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          {activeBooleans.map(([key]) => (
            <View key={key} style={styles.badge}>
              <Text>{`✓ ${key} ${labels[key]}`}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export const Doc = ({ data }: any) => {
  if (!data) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>Loading invoice data...</Text>
          </View>
        </Page>
      </Document>
    );
  }

  const {
    customer,
    jacket,
    pant,
    shirt,
    invoiceNumber,
    date,
    totalAmount,
    customerSignature,
    saleMen,
    paymentMethod,
    customerStatus,
  } = data;

  return (
    <Document>
      {/* Garments Section */}

      {jacket && (
        <Page size="A4" style={styles.page}>
          <View style={styles.garmentCard}>
            <Text style={styles.invoiceTitle}>Order No:</Text>
            <Text style={styles.noteLabels}>#{invoiceNumber}</Text>
            <Text style={styles.garmentTitle}>
              Jacket — {jacket.jacketType}
            </Text>

            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>TAILOR</Text>
                <Text style={styles.metaValue}>{jacket.tailorName}</Text>
              </View>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>FITTING</Text>
                <Text style={styles.metaValue}>
                  {formatDate(jacket.fittingDate)}
                </Text>
              </View>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>QTY</Text>
                <Text style={styles.metaValue}>{jacket.quantity}</Text>
              </View>
            </View>

            <MeasurementSection
              measurements={jacket}
              labels={jacketFieldLabels}
            />

            {
              <View style={styles.imageContainer}>
                <Image
                  src={jacket.jacketStyleDrawing}
                  style={styles.styleImage}
                />
              </View>
            }

            {
              <View style={styles.notesSection}>
                <Text style={styles.noteLabel}>Notes</Text>
                <Text style={styles.noteText}>{jacket.note}</Text>
              </View>
            }
          </View>
        </Page>
      )}

      {pant && (
        <Page size="A4" style={styles.page}>
          <View style={styles.garmentCard}>
            <Text style={styles.invoiceTitle}>Order No:</Text>
            <Text style={styles.noteLabels}>#{invoiceNumber}</Text>
            <Text style={styles.garmentTitle}>Pant — {pant.pantType}</Text>

            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>TAILOR</Text>
                <Text style={styles.metaValue}>{pant.tailorName}</Text>
              </View>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>FITTING</Text>
                <Text style={styles.metaValue}>
                  {formatDate(pant.fittingDate)}
                </Text>
              </View>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>QTY</Text>
                <Text style={styles.metaValue}>{pant.quantity}</Text>
              </View>
            </View>

            <MeasurementSection measurements={pant} labels={pantFieldLabels} />

            {
              <View style={styles.imageContainer}>
                <Image src={pant.pantStyleDrawing} style={styles.styleImage} />
              </View>
            }

            {
              <View style={styles.notesSection}>
                <Text style={styles.noteLabel}>Notes</Text>
                <Text style={styles.noteText}>{pant.note}</Text>
              </View>
            }
          </View>
        </Page>
      )}

      {shirt && (
        <Page size="A4" style={styles.page}>
          <View style={styles.garmentCard}>
            <Text style={styles.invoiceTitle}>Order No:</Text>
            <Text style={styles.noteLabels}>#{invoiceNumber}</Text>
            <Text style={styles.garmentTitle}>Shirt — {shirt.shirtType}</Text>

            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>TAILOR</Text>
                <Text style={styles.metaValue}>{shirt.tailorName}</Text>
              </View>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>FITTING</Text>
                <Text style={styles.metaValue}>
                  {formatDate(shirt.fittingDate)}
                </Text>
              </View>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>QTY</Text>
                <Text style={styles.metaValue}>{shirt.quantity}</Text>
              </View>
            </View>

            <MeasurementSection
              measurements={shirt}
              labels={shirtFieldLabels}
            />

            {
              <View style={styles.imageContainer}>
                <Image
                  src={shirt.shirtStyleDrawing}
                  style={styles.styleImage}
                />
              </View>
            }

            {
              <View style={styles.notesSection}>
                <Text style={styles.noteLabel}>Notes</Text>
                <Text style={styles.noteText}>{shirt.note}</Text>
              </View>
            }
          </View>
        </Page>
      )}

      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.invoiceTitle}>Invoice</Text>
          <Text style={styles.invoiceNumber}>#{invoiceNumber}</Text>

          <View style={styles.infoGrid}>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>From</Text>
              <Text style={styles.infoValue}>Company Name</Text>
              <Text style={styles.infoValue}>123 Tailor Street</Text>
              <Text style={styles.infoValue}>Bangkok, Thailand 10110</Text>
              <Text style={styles.infoValue}>Tel: +66 XXX XXX XXX</Text>
            </View>

            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>Bill To</Text>
              <Text style={styles.infoValue}>{customer?.name || "-"}</Text>
              <Text style={styles.infoValue}>
                {customer?.phoneNumber || "-"}
              </Text>
              <Text style={styles.infoValue}>{customer?.email || "-"}</Text>
              <Text style={styles.infoValue}>{customer?.address || "-"}</Text>

              <Text style={[styles.infoLabel, { marginTop: 12 }]}>
                Issue Date
              </Text>
              <Text style={styles.infoValue}>{formatDate(date)}</Text>
            </View>
          </View>
        </View>
        <View style={styles.summarySection}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Payment Method</Text>
            <Text style={styles.summaryValue}>{paymentMethod || "Cash"}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Status</Text>
            <View
              style={[
                styles.badge,
                customerStatus === "PAID"
                  ? styles.statusPaid
                  : styles.statusPending,
              ]}
            >
              <Text>{customerStatus || "Pending"}</Text>
            </View>
          </View>
          {saleMen && saleMen.length > 0 && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Salesman</Text>
              <Text style={styles.summaryValue}>
                {saleMen.map((s: SaleMan) => s.name).join(", ")}
              </Text>
            </View>
          )}

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalAmount}>
              THB {"   "}
              {totalAmount.toLocaleString()}
            </Text>
          </View>

          {customerSignature && (
            <View style={styles.signatureSection}>
              <Image src={customerSignature} style={styles.signatureImage} />
              <View style={styles.signatureLine}>
                <Text style={styles.signatureLabel}>Customer Signature</Text>
              </View>
            </View>
          )}
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Thank you for your business • Invoice generated on{" "}
            {formatDate(date)}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

interface PdfTemplateProps {
  invoiceId: string;
}

export const PdfTemplate = ({ invoiceId }: PdfTemplateProps) => {
  const invoiceQuery = useGetInvoice(invoiceId);

  return (
    <div className="w-full h-full bar">
      <PdfViewerClient>
        <Doc data={invoiceQuery.data} />
      </PdfViewerClient>
    </div>
  );
};
