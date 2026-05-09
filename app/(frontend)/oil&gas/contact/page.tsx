import { CtaSection } from "../comps/CtaSection";
import ContactSection from "./ContactSection";
import OilGasHero from "../comps/OilGasHero";

export default function ContactPage() {
  return (
    <div className="w-full">
      <OilGasHero
        label="Prixair Oil & Gas"
        title="Get in Touch"
        subtitle="Reach out about petroleum supply, logistics, partnership, or any energy solution your business needs."
        short
      />
      <ContactSection />
      <CtaSection />
    </div>
  );
}
