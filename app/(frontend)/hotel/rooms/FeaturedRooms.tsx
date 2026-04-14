import Image from "next/image";
import { FaStar, FaWhatsapp, FaUser, FaBed } from "react-icons/fa";
import { getRooms, HotelRoom } from "@/app/actions/hotel";

function buildWhatsAppMessage(room: HotelRoom): string {
  return [
    `Hello, I'd like to book a room at ${room.hotel.name}.`,
    '',
    `Room: ${room.name}`,
    `Type: ${room.roomType.charAt(0).toUpperCase() + room.roomType.slice(1)}`,
    `Price: ₦${room.pricePerNight.toLocaleString()} / night`,
    `Location: ${room.hotel.location}`,
    '',
    'Please let me know availability and next steps.',
  ].join('\n');
}

function RoomCard({ room }: { room: HotelRoom }) {
  const whatsappNumber = room.hotel.whatsappNumber?.replace(/[^\d]/g, '') || '';
  const message = buildWhatsAppMessage(room);
  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    : '#';

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow bg-white flex flex-col">
      <div className="relative w-full h-56">
        {room.image?.url ? (
          <Image
            src={room.image.url}
            alt={room.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <FaBed className="text-gray-300 text-5xl" />
          </div>
        )}
        <span className="absolute top-3 left-3 bg-[#FB6404] text-white text-xs font-semibold px-3 py-1 rounded-full capitalize">
          {room.roomType}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h4 className="font-semibold text-gray-900 text-lg mb-1">{room.name}</h4>
        <p className="text-sm text-gray-500 mb-1">{room.hotel.name} · {room.hotel.location}</p>

        {room.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{room.description}</p>
        )}

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          {room.maxGuests && (
            <span className="flex items-center gap-1">
              <FaUser className="text-[#FB6404]" />
              {room.maxGuests} {room.maxGuests === 1 ? 'Guest' : 'Guests'}
            </span>
          )}
          {room.size && <span>{room.size}</span>}
          {room.bedType && <span className="capitalize">{room.bedType} bed</span>}
        </div>

        <div className="flex items-center text-[#FB6404] mb-3">
          {Array(Math.floor(room.rating))
            .fill(0)
            .map((_, idx) => (
              <FaStar key={idx} className="text-sm" />
            ))}
          <span className="text-gray-600 ml-2 text-sm">{room.rating.toFixed(1)}</span>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">From</p>
            <p className="text-xl font-bold text-gray-900">₦{room.pricePerNight.toLocaleString()}</p>
            <p className="text-xs text-gray-400">per night</p>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
              whatsappNumber
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none'
            }`}
          >
            <FaWhatsapp className="text-base" />
            Book Now
          </a>
        </div>
      </div>
    </div>
  );
}

export default async function FeaturedRooms({
  hotelSlug,
  roomType,
  location,
  guests,
}: {
  hotelSlug?: string;
  roomType?: string;
  location?: string;
  guests?: number;
}) {
  const rooms = await getRooms(hotelSlug, roomType, 50, location, guests);

  if (rooms.length === 0) {
    return (
      <section className="py-20 bg-white text-gray-800 text-center">
        <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-2">Featured Rooms</h2>
        <p className="text-gray-500 mt-4">No rooms available at the moment. Please check back soon.</p>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white text-gray-800">
      <h2 className="text-2xl md:text-3xl font-serif font-semibold text-center mb-2">
        Featured Rooms
      </h2>
      <p className="text-center text-gray-500 mb-10">
        Experience comfort and style in every stay.
      </p>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </section>
  );
}
