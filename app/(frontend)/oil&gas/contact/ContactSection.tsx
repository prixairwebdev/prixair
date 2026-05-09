"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [form, setForm] = useState({
    firstName: "",
    email: "",
    phone: "",
    reason: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.firstName,
          email: form.email,
          department: `${form.reason} | Phone: ${form.phone}`,
          message: form.message,
          source: "Prixair Oil & Gas",
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ firstName: "", email: "", phone: "", reason: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputCls =
    "w-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-900 focus:bg-white transition-colors rounded-none";

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* Left: Context */}
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-3">
            Contact Us
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
            Let's Talk Energy Solutions
          </h2>
          <div className="w-12 h-0.5 bg-gray-900 mb-6" />
          <p className="text-gray-500 text-sm leading-relaxed mb-10 max-w-md">
            Whether you need bulk petroleum supply, oilfield logistics support,
            energy consultancy, or want to explore a partnership — our team is
            ready to work with you.
          </p>

          <div className="space-y-6 text-sm text-gray-600">
            <div>
              <p className="font-semibold text-gray-900 mb-1">Office Address</p>
              <p>Plot 688, Markus Kangye Blvd,<br />Off Oladipo Diya Way, Gaduwa, Abuja.</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-1">Phone</p>
              <p>08181888892</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-1">Email</p>
              <p>prixairwebdev@gmail.com</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-1">Operating Hours</p>
              <p>Monday – Friday &nbsp;·&nbsp; 8:00 AM – 6:00 PM WAT</p>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
              Full Name <span className="text-gray-400 normal-case tracking-normal font-normal">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              required
              placeholder="e.g. Emeka Johnson"
              value={form.firstName}
              onChange={handleChange}
              className={inputCls}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
              Business Email <span className="text-gray-400 normal-case tracking-normal font-normal">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="e.g. emeka@yourcompany.com"
              value={form.email}
              onChange={handleChange}
              className={inputCls}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="e.g. +234 801 234 5678"
              value={form.phone}
              onChange={handleChange}
              className={inputCls}
            />
          </div>

          {/* Reason */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
              Nature of Inquiry <span className="text-gray-400 normal-case tracking-normal font-normal">*</span>
            </label>
            <select
              name="reason"
              required
              value={form.reason}
              onChange={handleChange}
              className={inputCls + " cursor-pointer"}
            >
              <option value="" disabled>Select the most relevant option</option>
              <option value="Petroleum Supply & Distribution">Petroleum Supply &amp; Distribution</option>
              <option value="Oilfield Logistics & Support">Oilfield Logistics &amp; Support</option>
              <option value="Energy Consultancy">Energy Consultancy</option>
              <option value="Renewable Integration">Renewable Integration</option>
              <option value="Project Management">Project Management</option>
              <option value="Partnership Opportunity">Partnership Opportunity</option>
              <option value="General Inquiry">General Inquiry</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
              Message <span className="text-gray-400 normal-case tracking-normal font-normal">*</span>
            </label>
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Describe your energy needs, supply volume, project scope, or any questions you have for our team…"
              value={form.message}
              onChange={handleChange}
              className={inputCls + " resize-none"}
            />
          </div>

          {/* Submit */}
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
              We'll get back to you within one business day.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
