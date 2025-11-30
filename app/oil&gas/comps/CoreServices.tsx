"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const services = [
  {
    title: "Oilfield Logistics & Support",
    description:
      "Delivering reliable logistics, technical, and operational support for oil and gas field operations.",
    image: "/images/service1.png",
  },
  {
    title: "Energy Consultancy",
    description:
      "Helping organizations optimize energy efficiency, regulatory and operational strategies.",
    image: "/images/service2.png",
  },
  {
    title: "Renewable Integration",
    description:
      "Exploring sustainable and cleaner alternatives to reduce environmental impact.",
    image: "/images/service3.png",
  },
  {
    title: "Project Management",
    description:
      "End-to-end project management services for energy infrastructure development.",
    image: "/images/service4.png",
  },
];

export default function CoreServices() {
  return (
    <section className="py-16 bg-white text-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Core Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Flexible, reliable, and secure logistics solutions — tailored to your business needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="relative h-80 overflow-hidden shadow-lg group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                priority={index < 2}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-sm text-gray-200 leading-relaxed">
                  {service.description}
                </p>
                
                {/* Learn More Button */}
                <motion.button 
                  className="mt-4 px-4 py-2 bg-orange-500 text-white text-sm font-medium self-start opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        
      </div>
    </section>
  );
}