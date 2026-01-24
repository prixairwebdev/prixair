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
import LiveChat from "./components/LiveChat";

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
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

        <CartProvider>
          {children}
          <LiveChat />
        </CartProvider>
      </body>
    </html>
  );
}