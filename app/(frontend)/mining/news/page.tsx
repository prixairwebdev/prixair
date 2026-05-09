import MiningHero from "../components/MiningHero";
import NewsRoomSection from "./NewsRoomSection";

export default function NewsPage() {
  return (
    <div>
      <MiningHero
        label="Newsroom"
        title="Insights That Power Progress"
        subtitle="The latest updates, exploration breakthroughs, and strategic moves from Prixair Resources."
        bg="/newsbg.png"
      />
      <NewsRoomSection />
    </div>
  );
}
