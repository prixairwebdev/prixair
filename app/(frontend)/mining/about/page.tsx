import MiningHero from "../components/MiningHero";
import About from "./About";
import Mission from "./Missionvision";
import Vision from "./vision";

export default function AboutPage() {
  return (
    <div>
      <MiningHero
        label="About Us"
        title="Driven By Purpose. Grounded In Responsibility."
        subtitle="Discover our history, leadership, and commitment to sustainable mining across Nigeria and beyond."
        bg="/mininglandingbg.png"
        short
      />
      <About />
      <Mission />
      <Vision />
    </div>
  );
}
