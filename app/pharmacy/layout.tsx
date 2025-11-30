import type { Metadata } from "next";

import Nav from "./components/nav";
import Footer from "./components/footer";
import PageWrapper from "./components/PageWrapper";


export const metadata: Metadata = {
  title: "Prixair Pharmacy",
  description: "Prixair Pharmacy",
};

// Configure the Montserrat font


export default function PharmacyLayout({
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