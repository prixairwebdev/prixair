"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Nav from "../components/nav";
import Footer from "../components/footer";
import { ArrowRight } from "lucide-react";

const posts = [
  {
    title: "Planned Preventative Maintenance: What You Need to Know",
    excerpt: "Proactive maintenance in building management helps prevent problems from occurring and extends the lifespan of your property.",
    date: "June 24, 2025",
    img: "/blog/feature1.png",
    featured: true,
  },
  {
    title: "Why Is Building Maintenance Important?",
    excerpt: "Building maintenance is crucial for keeping structures safe, clean, and durable for years to come.",
    date: "May 18, 2025",
    img: "/blog/maintain.png",
  },
  {
    title: "Simple Interior House Design — The New Year Guide",
    excerpt: "A simple interior house design we love — part 1 of our ultimate guide to refreshing your home.",
    date: "January 3, 2025",
    img: "/blog/interior.png",
  },
  {
    title: "Security Door Prices & Types of Burglar Doors in Nigeria",
    excerpt: "In this post we'll discuss security door prices in Nigeria and the different types of burglar doors available.",
    date: "March 10, 2025",
    img: "/blog/doors.png",
  },
  {
    title: "What is a Smart Door Lock, and Why Do You Need One?",
    excerpt: "Smart door locks enhance home security and ease through remote operation via smartphones and keypads.",
    date: "April 5, 2025",
    img: "/blog/smartlock.png",
  },
];

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <>
      <Nav />

      {/* Header */}
      <section className="pt-32 pb-12 px-6 md:px-14 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium block mb-3"
          >
            Blog
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-gray-900"
          >
            Insights & Ideas
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-3 text-gray-500 max-w-lg"
          >
            Industry insights, design guides, and product news from the Prixair Properties team.
          </motion.p>
        </div>
      </section>

      <section className="py-16 px-6 md:px-14 bg-white">
        <div className="max-w-7xl mx-auto">

          {/* Featured Post */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group mb-16 grid md:grid-cols-2 gap-8 border-b border-gray-100 pb-16"
          >
            <div className="relative h-72 md:h-96 overflow-hidden bg-gray-100">
              <Image
                src={featured.img}
                alt={featured.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-gray-900 text-white text-[10px] font-semibold uppercase tracking-widest px-3 py-1">
                Featured
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-xs text-gray-400 mb-3">{featured.date}</p>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight mb-4">{featured.title}</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">{featured.excerpt}</p>
              <Link
                href="/properties/blog"
                className="flex items-center gap-2 text-sm font-semibold text-gray-900 w-fit border-b border-gray-900 pb-0.5 hover:border-gray-400 transition-colors"
              >
                Read More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Other Posts */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {rest.map((post, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="group border-t-2 border-gray-200 hover:border-gray-900 transition-all duration-300 pt-0"
              >
                <div className="relative h-44 overflow-hidden bg-gray-100 mb-5">
                  <Image
                    src={post.img}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <p className="text-[10px] text-gray-400 mb-2">{post.date}</p>
                <h3 className="font-bold text-gray-900 text-sm leading-snug mb-3">{post.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                <Link
                  href="/properties/blog"
                  className="text-xs font-semibold text-gray-900 flex items-center gap-1 group-hover:gap-2 transition-all"
                >
                  Read More <ArrowRight className="w-3 h-3" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
