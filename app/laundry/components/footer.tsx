'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation, Variants, cubicBezier } from 'framer-motion';

// Animation
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: cubicBezier(0.25, 0.1, 0.25, 1)
    }
  }
};

const Footer = () => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    const node = ref.current;
    if (node) observer.observe(node);
    return () => { if (node) observer.unobserve(node); };
  }, []);

  useEffect(() => {
    controls.start(inView ? 'visible' : 'hidden');
  }, [inView, controls]);

  return (
    <footer ref={ref} className="bg-[#111] text-white py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">

        {/* Left Column */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={controls}
        >
          <div className="mb-4">
            <img src="/laundrylogo.png" alt="Logo" className="h-10 mb-3" />
            <p className="text-sm text-gray-300">Clean Clothes. Clean Life.</p>
          </div>
          <div className="mt-6">
            <h4 className="uppercase font-semibold mb-3">Socials</h4>
            <div className="flex space-x-4 text-2xl">
              <a href="#" aria-label="X" className="hover:text-blue-400">
                {/* X/Twitter SVG */}
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M8.77 3H5l5.18 6.72L3 21h4.74l4.05-5.25L17 21h3.77l-5.47-7.09L21 3h-4.63l-3.52 4.57L8.77 3z"/></svg>
              </a>
              <a href="#" aria-label="Facebook" className="hover:text-blue-500">
                {/* Facebook SVG */}
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5 3.66 9.06 8.44 9.88V16.17H7.9v-2.17h2.54V12.85c0-2.5 1.49-3.89 3.79-3.89 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.25 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.17h-2.34v5.71C18.34 21.06 22 17 22 12"/></svg>
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-pink-400">
                {/* Instagram SVG */}
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><circle cx="12" cy="12" r="3.2"/><path d="M16 2a4 4 0 014 4v12a4 4 0 01-4 4H8a4 4 0 01-4-4V6a4 4 0 014-4h8zm2.5 6.5a1 1 0 10-2 0 1 1 0 002 0z"/></svg>
              </a>
              <a href="#" aria-label="YouTube" className="hover:text-red-500">
                {/* YouTube SVG */}
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M23.498 6.186a2.996 2.996 0 00-2.113-2.12C19.115 3.576 12 3.576 12 3.576s-7.115 0-9.385.49a2.996 2.996 0 00-2.113 2.12A29.998 29.998 0 000 12a29.998 29.998 0 00.502 5.814 2.996 2.996 0 002.113 2.12c2.27.49 9.385.49 9.385.49s7.116 0 9.385-.49a2.996 2.996 0 002.113-2.12A29.998 29.998 0 0024 12a29.998 29.998 0 00-.502-5.814zM9.545 15.568V8.432l6.82 3.568-6.82 3.568z"/></svg>
              </a>
              <a href="#" aria-label="Pinterest" className="hover:text-red-400">
                {/* Pinterest SVG */}
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M13.1 2.5c-6.1 0-8.3 4.4-8.3 7.2 0 2.6 1.1 4.2 3.5 4.2 1.1 0 2-.5 2.4-1.4l.7-2.1c.2-.8-.2-1.1-.7-1.1-.6 0-1 .3-1.2.9-.2.5-.7 1.8-1 2.3-.2.2-.5.1-.7-.4-.6-1.1-.7-2.6-.7-3.3 0-3.4 2.4-5.8 6.2-5.8 3.1 0 5.6 1.9 5.6 5.6 0 3.7-2.1 6.4-4.5 6.4-1.1 0-1.9-.9-1.7-2 .3-1.2.6-2.6.6-3.5 0-.8.9-1.7 1.7-1.7.7 0 .8.5.8 1v.8l-.3 1.2c-.1.3.1.7.4.7.2 0 .7-.6.7-1.7 0-1.3-.9-2.2-2.3-2.2-1.6 0-2.7 1.7-2.7 3.6 0 .3 0 .6.1 1-.2 1.2-.8 3.2-1.2 4.3-.2.7-.9.6-1.3-.1-.5-.8-1.4-5.1-1.3-6.1C3.6 12.1 4.8 7.7 10.4 7.7c3.4 0 6.3 2.5 6.3 6.4 0 3.7-2 6.8-5.2 6.8-1.5 0-3-.7-4.1-1.5-.4-.3-.9-.3-1.2.2-.2.4-.1.7.2.9.9 1.1 2.8 1.8 4.2 1.8 4.7 0 8.6-4.3 8.6-9.6 0-5.3-4.1-9.4-9-9.4z"/></svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-blue-400">
                {/* LinkedIn SVG */}
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><circle cx="6" cy="6" r="2"/><rect x="2" y="8" width="4" height="12"/><rect x="8" y="8" width="4" height="12"/><rect x="14" y="12" width="4" height="8"/><circle cx="16" cy="10" r="2"/></svg>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Center Column */}
        <motion.div variants={fadeInUp} initial="hidden" animate={controls}>
          <h4 className="uppercase font-semibold mb-4">Quick Link</h4>
          <ul className="space-y-2 text-gray-300">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/service" className="hover:text-white transition">Our Services</a></li>
            <li><a href="/booking" className="hover:text-white transition">Book a Pickup</a></li>
            <li><a href="/servicearea" className="hover:text-white transition">Service Area</a></li>
            <li><a href="contact" className="hover:text-white transition">Contact Us</a></li>
          </ul>
        </motion.div>

        {/* Right Column */}
        <motion.div variants={fadeInUp} initial="hidden" animate={controls}>
          <h4 className="uppercase font-semibold mb-4">Newsletter</h4>
          <form className="flex flex-col space-y-3">
            <input
              type="text"
              placeholder="Enter name"
              className="p-3 rounded bg-white text-black placeholder-gray-500"
            />
            <input
              type="email"
              placeholder="Enter email address"
              className="p-3 rounded bg-white text-black placeholder-gray-500"
            />
            <button
              type="submit"
              className="self-start bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
            >
              SEND
            </button>
          </form>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
