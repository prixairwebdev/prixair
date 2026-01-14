import type { Metadata } from "next";

import Nav from "./components/nav";
import Footer from "./components/footer";
import PageWrapper from "./components/PageWrapper";

export const metadata: Metadata = {
  title: "Prixair Logistics",
  description: "Prixair Logistics",
};

// Import the Montserrat font


// Configure the font subset, weight, and style


export default function LogisticsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PageWrapper>
      <Nav />
      {children}
      <Footer />
    </PageWrapper>
  );
}