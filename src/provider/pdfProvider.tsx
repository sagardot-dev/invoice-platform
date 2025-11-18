"use client";
import { Document, PDFViewer, DocumentProps } from "@react-pdf/renderer";

export default function PdfViewerClient({
  children,
}: {
  children: React.ReactElement<DocumentProps>;
}) {
  return (
    <PDFViewer  width="100%" height="100%">
      {children}
    </PDFViewer>
  );
}
