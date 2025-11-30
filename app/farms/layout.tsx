import type { Metadata } from "next";

import Nav from "./components/nav";
import Footer from "./components/footer";
import PageWrapper from "./components/PageWrapper";


export const metadata: Metadata = {
  title: "Prixair Farms",
  description: "Prixair Farms",
};

// Configure the Montserrat font


export default function FarmsLayout({
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