import type { Metadata } from "next";
import Nav from "./components/nav";
import Footer from "./components/footer";
import PageWrapper from "./components/PageWrapper";

export const metadata: Metadata = {
  title: "Prixair Media | Professional Event Equipment Rentals",
  description: "Lending high-quality sound and visual equipment including mics, speakers, and mixers for your events.",
};

export default function MediaLayout({
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
