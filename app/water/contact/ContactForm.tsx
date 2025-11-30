"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData); // 🔁 Replace with API call if needed
  };

  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-2xl font-semibold">Contact us</h2>
        <p className="text-sm text-gray-600 mt-2">
          Working with Prixair Group is more than a job. <br />
          It’s about building businesses that shape communities, delivering
          services that matter, and creating lasting impact across industries.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto mt-8 bg-white p-6 rounded shadow space-y-4"
      >
        <div>
          <label className="block text-sm text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full mt-1 border border-gray-300 px-4 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full mt-1 border border-gray-300 px-4 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700">Your Message</label>
          <textarea
            name="message"
            placeholder="Enter your message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            required
            className="w-full mt-1 border border-gray-300 px-4 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded font-semibold"
        >
          Send
        </button>
      </form>
    </section>
  );
}
