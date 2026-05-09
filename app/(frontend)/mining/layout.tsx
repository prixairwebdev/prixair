import type { Metadata } from "next";
import PageWrapper from "./components/PageWrapper";

export const metadata: Metadata = {
  title: "Prixair Mining",
  description: "Prixair Resources — sustainable mineral exploration across Nigeria and beyond.",
};

export default function MiningLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <PageWrapper>{children}</PageWrapper>;
}
