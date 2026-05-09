"use client";

import { motion } from "framer-motion";
import Nav from "../components/nav";
import Footer from "../components/footer";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content:
      "By accessing or using the Prixair Properties website and services, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.",
  },
  {
    title: "2. Products & Orders",
    content:
      "All products listed on our platform are subject to availability. Prices are displayed in Nigerian Naira (₦) and are inclusive of applicable taxes unless stated otherwise. We reserve the right to refuse or cancel any order at our discretion.",
  },
  {
    title: "3. Payment",
    content:
      "We accept bank transfers, card payments, and other approved payment methods. Payment must be confirmed before orders are processed. Prixair Properties is not liable for failed transactions resulting from third-party payment systems.",
  },
  {
    title: "4. Delivery",
    content:
      "Delivery timelines are estimates and may vary based on location and availability. Free delivery applies within Lagos for qualifying orders. Additional delivery charges apply for orders outside Lagos. We are not responsible for delays caused by external factors.",
  },
  {
    title: "5. Returns & Refunds",
    content:
      "Returns are accepted within 7 days of delivery for items in their original, undamaged condition. Refunds are processed within 14 business days of return confirmation. Custom orders and cut-to-size products are non-returnable.",
  },
  {
    title: "6. Intellectual Property",
    content:
      "All content on this website — including images, text, logos, and product descriptions — is the property of Prixair Properties Nigeria Limited. Unauthorized reproduction or use of our content is prohibited.",
  },
  {
    title: "7. Limitation of Liability",
    content:
      "Prixair Properties shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or services. Our liability is limited to the purchase price of the product in question.",
  },
  {
    title: "8. Privacy",
    content:
      "Your personal information is collected and used solely to process orders and improve our services. We do not sell or share your data with third parties without your consent, except as required by law.",
  },
  {
    title: "9. Changes to Terms",
    content:
      "We reserve the right to update these Terms and Conditions at any time. Changes take effect immediately upon posting to this page. Continued use of our services constitutes acceptance of the revised terms.",
  },
  {
    title: "10. Contact",
    content:
      "For questions about these terms, please contact us at properties@prixair.com or visit our Contact page.",
  },
];

export default function TermsPage() {
  return (
    <>
      <Nav />

      <section className="pt-32 pb-8 px-6 md:px-14 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium block mb-3"
          >
            Legal
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900"
          >
            Terms & Conditions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-3 text-sm text-gray-400"
          >
            Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </motion.p>
        </div>
      </section>

      <section className="py-16 px-6 md:px-14 bg-white">
        <div className="max-w-3xl mx-auto space-y-10">
          {sections.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
            >
              <h2 className="text-sm font-bold text-gray-900 mb-3">{s.title}</h2>
              <p className="text-sm text-gray-500 leading-relaxed">{s.content}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
