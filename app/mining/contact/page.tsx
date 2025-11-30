"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1] as const, // Fixed with 'as const'
    },
  },
};

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessUnit: "",
    message: "",
  });

  const [isInView, setIsInView] = useState({
    hero: false,
    legacy: false,
  });

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  // Legacy section animations
  const legacyContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const legacyItem = {
    hidden: { opacity: 0, x: 50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center pb-10">
      <section
        className="relative h-screen w-full"
        aria-label="Prixair Group Hero Section"
      >
        {/* Background image with gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url('/contactbg.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          role="img"
          aria-label="Prixair Group corporate background"
        />

        {/* Content container */}
        <div className="relative z-10 h-full flex items-center justify-center sm:justify-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-24">
            <motion.div
              className="max-w-2xl lg:max-w-3xl xl:max-w-4xl"
              variants={container}
              initial="hidden"
              animate={isInView.hero ? "show" : "hidden"}
              onViewportEnter={() =>
                setIsInView((prev) => ({ ...prev, hero: true }))
              }
              onViewportLeave={() =>
                setIsInView((prev) => ({ ...prev, hero: false }))
              }
              viewport={{ once: false }}
            >
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight text-white"
                variants={item}
              >
                Let's Connect — We're Here to Answer{" "}
              </motion.h1>

              <motion.p
                className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-gray-400/90 leading-relaxed max-w-3xl"
                variants={item}
              >
                Whether you're a stakeholder, investor, community
                representative, or partner — reach out to Prixair Resources. We
                welcome your questions, insights, and opportunities for
                collaboration.
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <Image
            src="/arrowdown.png"
            alt="Scroll down indicator"
            width={30}
            height={40}
            className="w-6 h-10"
            priority
          />
        </div>
      </section>

      <div className="w-full h-[80px] bg-black mb-8" />

      <motion.div
        className="max-w-xl w-full flex flex-col items-center text-center text-gray-600 text-sm"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }}
      >
        <motion.h1
          className="text-2xl font-semibold mb-2 text-black"
          variants={itemVariants}
        >
          Contact us
        </motion.h1>
        <motion.p className="mb-1" variants={itemVariants}>
          Working with Prixair group is more than a job.
        </motion.p>
        <motion.p className="mb-6" variants={itemVariants}>
          It's about building businesses that shape communities, delivering
          services that matter, and creating lasting impact across industries.
        </motion.p>
      </motion.div>

      <motion.div
        className="max-w-xl w-full bg-white p-6 rounded shadow"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div variants={itemVariants}>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              name="name"
              type="text"
              placeholder=""
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder=""
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Business Unit
            </label>
            <select
              name="businessUnit"
              className="w-full border border-gray-300 rounded px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={formData.businessUnit}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Prixair Supermarket">Prixair Supermarket</option>
              <option value="Prixair BUKA">Prixair BUKA</option>
              <option value="Prixair Resources">Prixair Resources</option>
              <option value="Prixair Hotels">Prixair Hotels</option>
              <option value="Prixair Furnitures">Prixair Furnitures</option>
              <option value="Prixair Farms">Prixair Farms</option>
              <option value="Prixair Real-Estates">Prixair Real-Estates</option>
              <option value="Prixair Waters">Prixair Waters</option>
              <option value="Prixair Logistics">Prixair Logistics</option>
            </select>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Your Message
            </label>
            <textarea
              name="message"
              placeholder="Enter your message"
              rows={4}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </motion.div>

          <motion.button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
            variants={itemVariants}
          >
            Send
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default ContactPage;