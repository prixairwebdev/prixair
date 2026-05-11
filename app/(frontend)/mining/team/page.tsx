import MiningHero from "../components/MiningHero";
import CeoProfile from "./ceoprofile";
import Team from "./management";

export default function TeamPage() {
  return (
    <div>
      <MiningHero
        label="Our Team"
        title="Meet the Visionaries Driving Our Mission"
        subtitle="A multidisciplinary team of leaders, engineers, and strategists powering the future of sustainable mining in Nigeria."
        bg="/images/exploration-bg.png"
      />
      <CeoProfile />
      <Team />
    </div>
  );
}
