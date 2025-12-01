import type { Metadata } from "next";

import Nav from "./components/nav";
import Footer from "./components/footer";
import PageWrapper from "./components/PageWrapper";


// Configure the Montserrat font


export const metadata: Metadata = {
  title: "Prixair Gavi",
  description: "Prixair Gavi",
};

export default function GaviLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageWrapper>
      <Nav />
      {children}
      <Footer />
    </PageWrapper>
  );
}
