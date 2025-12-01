"use client";

import { useState } from "react";

export default function QuoteRequestForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    productType: "",
    quantity: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData); // Replace with API call
  };

  return (
    <div className="max-w-xl mx-auto my-12 px-6">
      <h2 className="text-2xl font-bold text-center mb-2">Quote Request Form</h2>
      <p className="text-sm text-center text-gray-600 mb-6">
        Fill the form below and get a response within 24 hours.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Full name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="mt-1 w-full border border-gray-300 rounded px-4 py-2"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="mt-1 w-full border border-gray-300 rounded px-4 py-2"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 w-full border border-gray-300 rounded px-4 py-2"
          />
        </div>

        {/* Product Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Product type</label>
          <select
            name="productType"
            value={formData.productType}
            onChange={handleChange}
            required
            className="mt-1 w-full border border-gray-300 rounded px-4 py-2"
          >
            <option value="">Select</option>
            <option value="50cl Bottle">50cl Bottle (Classic)</option>
            <option value="75cl Sports Bottle">75cl Sports Bottle</option>
            <option value="1.5L Family Bottle">1.5L Family Bottle</option>
            <option value="19L Refill Bottle">19L Refill Bottle (Dispenser)</option>
          </select>
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Quantity needed</label>
          <select
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="mt-1 w-full border border-gray-300 rounded px-4 py-2"
          >
            <option value="">Select</option>
            <option value="1-10">1 - 10</option>
            <option value="11-50">11 - 50</option>
            <option value="51-100">51 - 100</option>
            <option value="100+">100+</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Additional Note</label>
          <textarea
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded px-4 py-2"
            placeholder="Enter your message"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded font-semibold"
        >
          Send
        </button>
      </form>
    </div>
  );
}
