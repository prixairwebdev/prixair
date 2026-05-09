import { WhyChooseUs } from "../comps/WhyChooseUs";
import { CtaSection } from "../comps/CtaSection";
import { Testimonials } from "../comps/Testimonials";
import AboutSection from "./AboutSection";
import OilGasHero from "../comps/OilGasHero";

export default function AboutPage() {
  return (
    <div className="w-full">
      <OilGasHero
        label="About Us"
        title="Who We Are"
        subtitle="Built on the pillars of quality, safety, and integrity — powering Nigeria's energy needs, one delivery at a time."
        ctas={[{ text: "Our Services", href: "/oil&gas/services" }]}
        short
      />
      <AboutSection />
      <WhyChooseUs />
      <Testimonials />
      <CtaSection />
    </div>
  );
}
