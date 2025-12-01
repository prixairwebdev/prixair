"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 1️⃣ Define FAQ type
type FAQ = {
  question: string;
  answer: string;
};

// 2️⃣ FAQ data
const faqs: FAQ[] = [
  {
    question: "Why is my tracking number not working?",
    answer:
      "Your tracking number may not be active yet or could be entered incorrectly. Please double-check and try again.",
  },
  {
    question: "How often is tracking information updated?",
    answer:
      "Tracking information is updated in real time as soon as status changes are reported by carriers.",
  },
  {
    question: "Can I track multiple shipments at once?",
    answer:
      "Yes, you can enter multiple tracking numbers separated by commas to track all your shipments together.",
  },
  {
    question: "What does 'In Transit' mean?",
    answer:
      "‘In Transit’ means your shipment is currently on the way to its destination.",
  },
];

// 3️⃣ FAQ Accordion
const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="bg-white py-16 px-6 md:px-16">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-start">
        {/* Left Section */}
        <div className="md:w-1/3">
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">
            Got Questions? We’ve Got Answers.
          </h2>
          <p className="text-gray-600 mb-5 text-sm leading-relaxed">
            Have questions about your shipment, delivery times, or tracking
            updates? We’ve compiled answers to the most common concerns to help
            you ship and receive with ease.
          </p>
          <button className="bg-[#FB6404] text-white px-6 py-2 rounded-md font-medium hover:bg-[#E55A00] transition-colors duration-200">
            See More
          </button>
        </div>

        {/* Right Section - Accordion */}
        <div className="md:w-2/3 w-full">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="border-b border-gray-200"
            >
              <button
                onClick={() => handleToggle(idx)}
                className="w-full flex justify-between items-center py-4 px-2 text-left text-gray-800 font-medium hover:text-[#FB6404] transition-colors duration-150"
              >
                <span>{faq.question}</span>
                <motion.span
                  animate={{ rotate: openIndex === idx ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-500 text-lg select-none"
                >
                  ▼
                </motion.span>
              </button>

              {/* Animate Answer Section */}
              <AnimatePresence initial={false}>
                {openIndex === idx && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-2 pb-4 text-gray-600 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 4️⃣ Move Something Section
const MoveSomethingSection: React.FC = () => (
  <section
    className="relative w-full flex items-center justify-center text-center bg-cover bg-center py-20"
    style={{
      backgroundImage: "url('/lmst.png')", // Replace with your relevant hero image
    }}
  >
    <div className="absolute inset-0 bg-black/50" />
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative z-10 max-w-2xl mx-auto px-8"
    >
      <h2 className="text-white text-3xl md:text-4xl font-bold mb-4 leading-tight">
        Let’s Move Something Together.
      </h2>
      <p className="text-gray-200 mb-8 text-sm md:text-lg leading-relaxed">
        From small parcels to full-scale freight, we provide smart, reliable
        logistics solutions that keep your business running smoothly. Ready to
        get started?
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <a
          href="/quote"
          className="bg-[#FB6404] text-white px-6 py-3 rounded-md font-medium hover:bg-[#E55A00] transition-colors duration-200"
        >
          Request a Quote
        </a>
        <a
          href="/contact"
          className="bg-white text-gray-800 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors duration-200"
        >
          Contact Us
        </a>
      </div>
    </motion.div>
  </section>
);

// 5️⃣ Full Page Export
const MainPage: React.FC = () => (
  <>
    <FAQAccordion />
    <MoveSomethingSection />
  </>
);

export default MainPage;
