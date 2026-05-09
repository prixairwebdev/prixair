import { WhyChooseUs } from "../comps/WhyChooseUs";
import CoreServices from "../comps/CoreServices";
import { CtaSection } from "../comps/CtaSection";
import { Testimonials } from "../comps/Testimonials";
import Link from "next/link";
import OilGasHero from "../comps/OilGasHero";

export default function ServicesPage() {
  return (
    <div className="w-full">
      <OilGasHero
        label="Our Services"
        title="Delivering Energy. Powering Progress."
        subtitle="Explore our full range of petroleum distribution, logistics, and consultancy services — designed to keep industries running without interruption."
        ctas={[
          { text: "Request a Quote", href: "/oil&gas/contact" },
          { text: "Learn About Us", href: "/oil&gas/about", variant: "outline" },
        ]}
      />

      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <p className="text-gray-600 text-sm leading-relaxed max-w-2xl">
            From sourcing and storage to last-mile distribution, every service we
            offer is underpinned by the same commitment — reliable delivery,
            strict safety compliance, and a team available around the clock.
          </p>
          <Link
            href="/oil&gas/contact"
            className="shrink-0 bg-gray-900 text-white px-6 py-3 text-sm font-semibold hover:bg-gray-700 transition-colors"
          >
            Talk to Our Team →
          </Link>
        </div>
      </div>

      <CoreServices />
      <WhyChooseUs />
      <Testimonials />
      <CtaSection />
    </div>
  );
}
