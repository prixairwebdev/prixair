import Nav from "../components/nav";
    import Footer from "../components/footer";

export default function ContactForm() {
  return (
    <>
    <Nav/>
    <section className="w-full flex justify-center py-16 bg-white text-black">
      <div className="w-full max-w-xl border rounded-lg shadow-sm p-8 bg-white">
        <h2 className="text-center text-2xl font-semibold mb-8">Contact Form</h2>

        {/* First Name */}
        <div className="mb-5">
          <label className="block text-sm mb-1">First Name</label>
          <input
            type="text"
            placeholder="Enter"
            className="w-full border rounded px-3 py-2 bg-gray-100 text-sm"
          />
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter"
            className="w-full border rounded px-3 py-2 bg-gray-100 text-sm"
          />
        </div>

        {/* Business Unit */}
        <div className="mb-5">
          <label className="block text-sm mb-1">Business Unit</label>
          <div className="relative">
            <select className="w-full border rounded px-3 py-2 bg-gray-100 text-sm appearance-none">
              <option>Select</option>
              <option>Construction</option>
              <option>Interior Design</option>
              <option>Real Estate</option>
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">
              ▼
            </span>
          </div>
        </div>

        {/* Message */}
        <div className="mb-5">
          <label className="block text-sm mb-1">Your Message</label>
          <textarea
            placeholder="Enter your message"
            className="w-full border rounded px-3 py-2 bg-gray-100 text-sm h-40 resize-none"
          ></textarea>
        </div>

        {/* Send Button */}
        <button className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white text-sm rounded">
          Send
        </button>
      </div>
    </section>
    <Footer/>
    </>
  );
}