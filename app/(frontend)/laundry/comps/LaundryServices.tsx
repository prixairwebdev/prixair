// CustomerReviews.tsx
import Image from "next/image";
import { motion, Variants } from "framer-motion";

type Feature = {
  title: string;
  description: string;
  icon: string;
};

type Review = {
  name: string;
  text: string;
  rating: number;
};

const features: Feature[] = [
  {
    title: "Multiple Service Options",
    description: "From wash & fold to commercial laundry — all your needs covered.",
    icon: "/icons/basket.png",
  },
  {
    title: "Easy Online Booking",
    description: "Schedule your laundry pickups and deliveries in just a few clicks.",
    icon: "/icons/calender.png",
  },
  {
    title: "Flexible Payment Options",
    description: "Pay securely with cards, mobile wallets, or cash on delivery.",
    icon: "/icons/card.png",
  },
  {
    title: "Personalized User Accounts",
    description: "Track orders, manage your profile, and view service history.",
    icon: "/icons/profile.png",
  },
];

const reviews: Review[] = [
  {
    name: "Sarah L.",
    text: "Prixair Laundry has transformed my laundry routine. The pickup and delivery service is so convenient, and my clothes always come back fresh and perfectly folded.",
    rating: 5,
  },
  {
    name: "Grace A.",
    text: "I booked online, and they picked it up right from my doorstep. Clothes came back clean, folded, and on time.",
    rating: 5,
  },
  {
    name: "Michael O.",
    text: "The quality and speed of service is unmatched. I'm a returning customer!",
    rating: 5,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.42, 0, 0.58, 1],
    },
  },
};

export default function CustomerSection() {
  return (
    <section className="w-full bg-white py-16 text-black">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-8">
          Why Customers love us
        </h2>
        
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-14"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              className="bg-white rounded-xl shadow text-center py-8 px-6 flex flex-col items-center"
              variants={itemVariants}
            >
              <div className="w-14 h-14 relative mb-4 flex items-center justify-center">
                <Image 
                  src={feature.icon} 
                  alt={feature.title} 
                  width={56}
                  height={56}
                  className="object-contain"
                  priority
                />
              </div>
              <h3 className="mt-3 mb-2 text-base font-semibold">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <h3 className="text-xl sm:text-2xl font-semibold text-center mb-2">
          What Our Customers Are Saying
        </h3>
        <p className="text-center text-gray-500 mb-8 text-sm">
          Real Stories, Real reviews from people who trust us with their laundry — every single week.
        </p>
        
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4 mb-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-xl shadow p-6 flex flex-col justify-between h-full"
              variants={itemVariants}
            >
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">{review.name}</h4>
                <p className="text-gray-600 text-sm">{review.text}</p>
              </div>
              <div className="mt-4 flex gap-1" aria-label={`${review.rating} star rating`}>
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-xl">★</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex justify-center">
          <a
            href="#"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded font-semibold transition"
          >
            See All Reviews
          </a>
        </div>
      </div>
    </section>
  );
}