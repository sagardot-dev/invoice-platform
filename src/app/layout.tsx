import type { Metadata } from "next";
import { Manrope, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/provider/theme-provider";
import { Toaster } from "sonner";
import Providers from "@/provider/QueryClientProvider";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const poppins = Manrope({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "D-invoice",
  description: "Control your tailor business with D-invoice",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased bar`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <NuqsAdapter>{children}</NuqsAdapter>
          </Providers>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
