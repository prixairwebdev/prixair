import type { Metadata } from "next";
import "./globals.css";
import PageWrapper from "./components/PageWrapper";

export const metadata: Metadata = {
  title: "Prixair Group",
  description: "Prixair Group",
};

// Import the Montserrat font
import { Montserrat } from 'next/font/google';
import { CartProvider } from "@/components/CartContext";

// Configure the font subset, weight, and style
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'optional',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} overflow-x-hidden scroll-smooth`}>
      <body
        className="overflow-x-hidden bg-white font-sans" // font-sans will use Montserrat
        suppressHydrationWarning
      >
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}