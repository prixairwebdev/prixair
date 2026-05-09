"use client";

import { useState } from "react";
import MiningHero from "../components/MiningHero";

const inputCls =
  "w-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-900 focus:bg-white transition-colors rounded-none";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organisation: "",
    topic: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
          department: `${formData.topic} | Organisation: ${formData.organisation}`,
          message: formData.message,
          source: "Prixair Mining",
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setFormData({ name: "", email: "", organisation: "", topic: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div>
      <MiningHero
        label="Contact Us"
        title="Let's Connect"
        subtitle="Whether you're a stakeholder, investor, community representative, or partner — we welcome your questions and opportunities for collaboration."
        bg="/contactbg.png"
        short
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-14 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: Context */}
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-3">
              Reach Out
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
              We're Open to Every Conversation
            </h2>
            <div className="w-12 h-0.5 bg-gray-900 mb-6" />
            <p className="text-gray-500 text-sm leading-relaxed mb-10 max-w-md">
              From investment and partnership inquiries to community concerns and
              media requests — Prixair Resources is committed to open, transparent
              communication with all stakeholders.
            </p>

            <div className="space-y-6 text-sm text-gray-600">
              <div>
                <p className="font-semibold text-gray-900 mb-1">Head Office</p>
                <p>Plot 688, Markus Kangye Blvd,<br />Off Oladipo Diya Way, Gaduwa, Abuja.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">Phone</p>
                <p>08181888892</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">General Enquiries</p>
                <p>info@prixairresources.com</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">Investor Relations</p>
                <p>investors@prixairresources.com</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">Office Hours</p>
                <p>Monday – Friday &nbsp;·&nbsp; 8:00 AM – 5:00 PM WAT</p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                Full Name <span className="text-gray-400 normal-case tracking-normal font-normal">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Chukwuemeka Obi"
                value={formData.name}
                onChange={handleChange}
                className={inputCls}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                Email Address <span className="text-gray-400 normal-case tracking-normal font-normal">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="e.g. chukwuemeka@yourorg.com"
                value={formData.email}
                onChange={handleChange}
                className={inputCls}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                Organisation / Company
              </label>
              <input
                type="text"
                name="organisation"
                placeholder="e.g. ABC Capital Partners"
                value={formData.organisation}
                onChange={handleChange}
                className={inputCls}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                Topic <span className="text-gray-400 normal-case tracking-normal font-normal">*</span>
              </label>
              <select
                name="topic"
                required
                value={formData.topic}
                onChange={handleChange}
                className={inputCls + " cursor-pointer"}
              >
                <option value="" disabled>Select the most relevant topic</option>
                <option value="Investment & Funding">Investment &amp; Funding</option>
                <option value="Partnership & Joint Venture">Partnership &amp; Joint Venture</option>
                <option value="Operations & Project Inquiry">Operations &amp; Project Inquiry</option>
                <option value="Community Relations">Community Relations</option>
                <option value="Media & Press">Media &amp; Press</option>
                <option value="Careers & Recruitment">Careers &amp; Recruitment</option>
                <option value="General Inquiry">General Inquiry</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                Message <span className="text-gray-400 normal-case tracking-normal font-normal">*</span>
              </label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Describe your inquiry, project details, investment interest, or any questions for our team…"
                value={formData.message}
                onChange={handleChange}
                className={inputCls + " resize-none"}
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-gray-900 text-white py-3 text-sm font-semibold hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              {status === "sending"
                ? "Sending…"
                : status === "success"
                ? "✓ Message Sent"
                : status === "error"
                ? "Error — Try Again"
                : "Send Message"}
            </button>

            {status === "success" && (
              <p className="text-center text-sm text-gray-500">
                We'll respond within two business days.
              </p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
