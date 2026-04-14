import FindRoomBar from "../components/FindRoomBar";
import RoomsCategories from "./RoomsCategories";
import FeaturedRooms from "./FeaturedRooms";
import GuestReviews from "./GuestReviews";
import ConciergeHelp from "./ConciergeHelp";
import RoomsHero from "./RoomsHero";
import { Suspense } from "react";
import { getHotels } from "@/app/actions/hotel";

export default async function RoomsPage(props: {
  searchParams: Promise<{ type?: string; location?: string; guests?: string; hotel?: string }>;
}) {
  const searchParams = await props.searchParams;
  const roomType = searchParams.type;
  const hotelSlug = searchParams.hotel;
  const location = searchParams.location;
  const guests = searchParams.guests ? parseInt(searchParams.guests) : undefined;
  
  const hotels = await getHotels();

  return (
    <>
      <RoomsHero />
      <FindRoomBar hotels={hotels} />
      <Suspense fallback={<div>Loading categories...</div>}>
        <RoomsCategories />
      </Suspense>
      <FeaturedRooms 
        hotelSlug={hotelSlug}
        roomType={roomType} 
        location={location}
        guests={guests}
      />
      <GuestReviews />
      <ConciergeHelp />
    </>
  );
}
