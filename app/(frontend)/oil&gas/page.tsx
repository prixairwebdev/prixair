import Ceo from "./comps/ceo";
import Features from "./comps/featuredprojects";
import { WhyChooseUs } from "./comps/WhyChooseUs";
import CoreServices from "./comps/CoreServices";
import { CtaSection } from "./comps/CtaSection";
import { Testimonials } from "./comps/Testimonials";
import OilGasHero from "./comps/OilGasHero";

export default function LandingPage() {
  return (
    <div className="w-full">
      <OilGasHero
        label="Prixair Oil & Gas"
        title="Powering Progress Through Reliable Energy Solutions"
        subtitle="Delivering premium petroleum products and services that keep industries, businesses, and communities moving."
        ctas={[
          { text: "Explore Our Services", href: "/oil&gas/services" },
          { text: "Partner With Us", href: "/oil&gas/contact", variant: "outline" },
        ]}
      />
      <Ceo />
      <CoreServices />
      <WhyChooseUs />
      <Features />
      <Testimonials />
      <CtaSection />
    </div>
  );
}
