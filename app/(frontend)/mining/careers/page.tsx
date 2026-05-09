import MiningHero from "../components/MiningHero";
import Whyworkwithus from "./workwithus";
import Link from "next/link";

export default function CareersPage() {
  return (
    <div>
      <MiningHero
        label="Careers"
        title="Your Future Starts Here"
        subtitle="At Prixair Resources, we're not just building businesses — we're building people, careers, and legacies."
        bg="/joinusbg.png"
        cta={{ text: "View Open Roles", href: "/mining/contact" }}
      />

      <Whyworkwithus />

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-4">
            Join the Team
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Ready to Take the Next Step?
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Join a team that's shaping industries and changing lives across
            Nigeria's mineral sector.
          </p>
          <Link
            href="mailto:hr@prixair.com"
            className="bg-white text-gray-900 px-8 py-3 text-sm font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Contact HR
          </Link>
        </div>
      </section>
    </div>
  );
}
