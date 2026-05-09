"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Nav from "../components/nav";
import Footer from "../components/footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessUnit: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          department: formData.businessUnit,
          message: formData.message,
          source: "Prixair Properties",
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setFormData({ name: "", email: "", businessUnit: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Nav />

      <section className="py-24 px-6 md:px-14 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium">Get in Touch</span>
            <h1 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Contact Us
            </h1>
            <p className="mt-4 text-gray-500 leading-relaxed">
              Have a question about our products or want to place a bulk order?
              Reach out and our team will get back to you promptly.
            </p>

            <div className="mt-10 space-y-6">
              {[
                { label: "Email", value: "properties@prixair.com" },
                { label: "Phone", value: "+234 801 000 0000" },
                { label: "Location", value: "Lagos, Nigeria" },
              ].map((item) => (
                <div key={item.label} className="border-b border-gray-100 pb-5">
                  <p className="text-xs tracking-widest uppercase text-gray-400 font-medium mb-1">{item.label}</p>
                  <p className="text-gray-900 font-semibold text-sm">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            {[
              { label: "Full Name", name: "name", type: "text", placeholder: "Your name" },
              { label: "Email Address", name: "email", type: "email", placeholder: "your@email.com" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-gray-900 transition-colors placeholder:text-gray-400"
                />
              </div>
            ))}

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Category
              </label>
              <select
                name="businessUnit"
                value={formData.businessUnit}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-gray-900 transition-colors appearance-none bg-white"
              >
                <option value="">Select a category</option>
                <option value="Construction">Construction</option>
                <option value="Interior Design">Interior Design</option>
                <option value="Real Estate">Real Estate</option>
                <option value="General Enquiry">General Enquiry</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Message
              </label>
              <textarea
                name="message"
                placeholder="Tell us how we can help..."
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-gray-900 transition-colors placeholder:text-gray-400 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full py-4 bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              {status === "sending"
                ? "Sending…"
                : status === "success"
                ? "✓ Message Sent!"
                : status === "error"
                ? "Error — Try Again"
                : "Send Message"}
            </button>
          </motion.form>
        </div>
      </section>

      <Footer />
    </>
  );
}
