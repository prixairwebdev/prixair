"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Nav from "../components/nav";
import Footer from "../components/footer";

const openings = [
  {
    title: "Sales Executive",
    type: "Full-time",
    location: "Lagos, Nigeria",
    description: "Drive sales of our premium building materials portfolio to contractors, developers, and homeowners.",
  },
  {
    title: "Interior Design Consultant",
    type: "Full-time",
    location: "Lagos, Nigeria",
    description: "Guide customers in selecting the right tiles, doors, and furnishings to match their vision.",
  },
  {
    title: "Warehouse & Logistics Officer",
    type: "Full-time",
    location: "Lagos, Nigeria",
    description: "Manage inventory, dispatch, and delivery of products to clients across Nigeria.",
  },
  {
    title: "Digital Marketing Specialist",
    type: "Full-time / Remote",
    location: "Lagos, Nigeria",
    description: "Lead our online presence — social media, ads, SEO, and content for Prixair Properties.",
  },
];

export default function CareersPage() {
  return (
    <>
      <Nav />

      {/* Header */}
      <section className="pt-32 pb-16 px-6 md:px-14 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium block mb-3"
          >
            Careers
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight max-w-2xl"
          >
            Join the Prixair Properties Team
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 text-gray-500 max-w-lg leading-relaxed"
          >
            We're a growing team passionate about quality materials and exceptional service. If you share those values, we'd love to hear from you.
          </motion.p>
        </div>
      </section>

      {/* Openings */}
      <section className="py-24 px-6 md:px-14 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <span className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium">Open Roles</span>
            <h2 className="mt-2 text-2xl font-bold text-gray-900">Current Openings</h2>
          </motion.div>

          <div className="space-y-4">
            {openings.map((job, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="border border-gray-100 hover:border-gray-300 transition-all duration-300 p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4 group"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-gray-900">{job.title}</h3>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 border border-gray-200 px-2 py-0.5">
                      {job.type}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">{job.location}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{job.description}</p>
                </div>
                <Link
                  href="/properties/contact"
                  className="whitespace-nowrap px-5 py-2.5 border border-gray-900 text-gray-900 text-sm font-semibold hover:bg-gray-900 hover:text-white transition-colors"
                >
                  Apply Now
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 border-t border-gray-100 pt-12"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-3">Don't see your role?</h3>
            <p className="text-gray-500 text-sm mb-6 max-w-lg">
              We're always open to talented people. Send your CV and a short note about yourself to our team.
            </p>
            <Link
              href="/properties/contact"
              className="inline-block px-6 py-3 bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 transition-colors"
            >
              Send an Open Application
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
