import type { Metadata } from "next";
import "./globals.css";
import PageWrapper from "./components/PageWrapper";

export const metadata: Metadata = {
  title: "Prixair Group",
  description: "Prixair Group",
  icons: {
    icon: [
      { url: "/iconlogo.png", type: "image/png" },
    ],
    shortcut: "/iconlogo.png",
    apple: "/iconlogo.png",
  },
};

// Import the Montserrat font
import { Montserrat } from 'next/font/google';
import { CartProvider } from "@/components/CartContext";
import { WishlistProvider } from "@/components/contexts/WishlistContext";
import { AuthProvider } from "@/components/contexts/AuthContext";
import { OrderProvider } from "@/components/contexts/OrderContext";
import AccessRestriction from "./components/AccessRestriction";

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
      
      <head>
        <link rel="icon" href="/iconlogo.png" type="image/png" />
        <link rel="shortcut icon" href="/iconlogo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/iconlogo.png" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/695e3d96aad9c019814f9cf1/1jec21572';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
                })();
                `,
              }}
            />
          </head>
          <body
            className="overflow-x-hidden bg-white font-sans" // font-sans will use Montserrat
            suppressHydrationWarning
          >
            <AccessRestriction />
            <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <OrderProvider>
                {children}
              </OrderProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}