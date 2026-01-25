"use client";

import { useState } from "react";
import Nav from "../components/nav";
import Footer from "../components/footer";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessUnit: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Create mailto link with form data
    const subject = encodeURIComponent(`Contact Form: ${formData.businessUnit || 'Prixair Homes'}`);
    const bodyText = `Name: ${formData.name}\r\nEmail: ${formData.email}\r\nBusiness Unit: ${formData.businessUnit}\r\n\r\nMessage:\r\n${formData.message}`;
    const body = encodeURIComponent(bodyText);
    
    const mailtoLink = `mailto:info@prixairgroup.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;

    // Reset form
    setFormData({ name: "", email: "", businessUnit: "", message: "" });
    setLoading(false);
  };

  return (
    <>
      <Nav />
      <section className="w-full flex justify-center py-16 bg-white text-black">
        <form onSubmit={handleSubmit} className="w-full max-w-xl border rounded-lg shadow-sm p-8 bg-white">
          <h2 className="text-center text-2xl font-semibold mb-8">Contact Form</h2>

          {/* First Name */}
          <div className="mb-5">
            <label className="block text-sm mb-1">First Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 bg-gray-100 text-sm"
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 bg-gray-100 text-sm"
            />
          </div>

          {/* Business Unit */}
          <div className="mb-5">
            <label className="block text-sm mb-1">Business Unit</label>
            <div className="relative">
              <select
                name="businessUnit"
                value={formData.businessUnit}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2 bg-gray-100 text-sm appearance-none"
              >
                <option value="">Select</option>
                <option value="Construction">Construction</option>
                <option value="Interior Design">Interior Design</option>
                <option value="Real Estate">Real Estate</option>
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs pointer-events-none">
                ▼
              </span>
            </div>
          </div>

          {/* Message */}
          <div className="mb-5">
            <label className="block text-sm mb-1">Your Message</label>
            <textarea
              name="message"
              placeholder="Enter your message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 bg-gray-100 text-sm h-40 resize-none"
            ></textarea>
          </div>

          {/* Send Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white text-sm rounded transition-colors disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </section>
      <Footer />
    </>
  );
}