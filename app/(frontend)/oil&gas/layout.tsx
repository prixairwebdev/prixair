import type { Metadata } from "next";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PageTransition from "./comps/PageTransition";
import SubsidiaryBar from "../components/SubsidiaryBar";

export const metadata: Metadata = {
  title: "Prixair Oil & Gas",
  description: "Reliable petroleum products and energy solutions across Nigeria.",
};

export default function OilGasLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SubsidiaryBar name="Prixair Oil & Gas" />
      <Navbar />
      <PageTransition>{children}</PageTransition>
      <Footer />
    </>
  );
}
