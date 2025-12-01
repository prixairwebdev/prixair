"use client";

import { useState } from "react";

export default function ContactForm() {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    // Add submit logic here
  };

  return (
    <div className="flex justify-center py-12  bg-white text-black ">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white shadow-lg rounded-lg p-8"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          Contact Form
        </h2>

        {/* First Name */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter"
            value={form.firstName}
            onChange={handleChange}
            className="w-full border placeholder:text-gray-400 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter"
            value={form.phone}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Reason For Inquiry */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">
            Reason for Inquiry
          </label>
          <select
            name="reason"
            value={form.reason}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 outline-none bg-white focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Select</option>
            <option value="support">Support</option>
            <option value="sales">Sales</option>
            <option value="partnership">Partnership</option>
          </select>
        </div>

        {/* Message */}
        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium">Your Message</label>
          <textarea
            name="message"
            placeholder="Enter your message"
            rows={4}
            value={form.message}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 outline-none resize-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-3 rounded-md font-medium hover:bg-orange-600 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
