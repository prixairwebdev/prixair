import MiningHero from "./components/MiningHero";
import Whoweare from "./whoweare";
import FeaturedProjects from "./featuredprojects";
import ESGSection from "./ESGSection";
import NewsSection from "./NewsSection";

export default function Home() {
  return (
    <div>
      <MiningHero
        label="Prixair Resources"
        title="Powering the Future with Responsible Mining"
        subtitle="Developing critical resources while protecting people, planet, and prosperity."
        bg="/mininglandingbg.png"
        cta={{ text: "Explore Our Operations", href: "/mining/operations" }}
      />
      <Whoweare />
      <FeaturedProjects />
      <ESGSection />
      <NewsSection />
    </div>
  );
}
