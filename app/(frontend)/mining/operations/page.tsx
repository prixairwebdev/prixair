import MiningHero from "../components/MiningHero";
import WhereWeOperate from "./where-we-operate";
import Commitment from "./commitment";
import Partnership from "./partnership";
import Mining from "../whatwedo/Mining";
import Miningtwo from "../whatwedo/mining2";
import Exploration from "../whatwedo/exploration";

export default function OperationsPage() {
  return (
    <div>
      <MiningHero
        label="Our Operations"
        title="Mining Nigeria's Mineral Future with Precision"
        subtitle="From Niger to Plateau — sustainable extraction, responsible operations, and lasting community impact."
        bg="/images/exploration-bg.png"
        cta={{ text: "Contact Our Team", href: "/mining/contact" }}
      />
      <Mining />
      <Miningtwo />
      <Exploration />
      <WhereWeOperate />
      <Commitment />
      <Partnership />
    </div>
  );
}
