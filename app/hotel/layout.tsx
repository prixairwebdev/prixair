import type { Metadata } from "next";

import Nav from "./components/nav";
import Footer from "./components/footer";
import PageWrapper from "./components/PageWrapper";


export const metadata: Metadata = {
  title: "Prixair Hotel",
  description: "Prixair Hotel",
};

// Configure the Montserrat font


export default function HotelLayout({
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