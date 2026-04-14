import FindRoomBar from "./components/FindRoomBar";
import HotelShowcase from "./comps/HotelShowcase";
import ExploreAndReviews from "./comps/ExploreAndReviews";
import HotelHero from "./comps/HotelHero";
import { getFirstHotel, getRooms, getHotels } from "@/app/actions/hotel";

export default async function Home() {
  const hotel = await getFirstHotel();
  const hotels = await getHotels();
  const rooms = await getRooms(hotel?.slug, undefined, 3);

  return (
    <>
      <HotelHero />
      <FindRoomBar hotels={hotels} />

      <HotelShowcase hotel={hotel} featuredRooms={rooms} />
      <ExploreAndReviews />
    </>
  );
}
