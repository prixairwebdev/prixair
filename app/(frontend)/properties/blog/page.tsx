import Image from "next/image";
import Nav from "../components/nav";
import Footer from "../components/footer";

export default function BlogPage() {
  return (
    <>
    <Nav/>
    <section className="w-full px-6 md:px-20 py-12 bg-white text-black">
      <h2 className="text-2xl font-semibold mb-2">Blog</h2>
      <p className="text-gray-700 text-sm mb-8 max-w-xl">
        Stay informed with our latest press releases, industry insights, and media highlights
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Main Feature Post */}
        <div className="relative h-96 w-full">
          <Image
            src="/blog/feature1.png"
            alt="Planned Preventative Maintenance"
            fill
            className="object-cover rounded"
          />
          <div className="absolute inset-0 bg-black/40 rounded p-4 flex flex-col justify-end text-white">
            <h3 className="font-semibold text-lg mb-1">
              Planned Preventative Maintenance: What You Need to Know
            </h3>
            <p className="text-xs max-w-md">
              Proactive maintenance in building management helps prevent problems from occurring...
            </p>
            <p className="text-xs mt-2">June 24, 2025</p>
            <button className="text-orange-400 text-sm mt-2 underline">Read More</button>
          </div>
        </div>

        {/* Right Column Posts */}
        <div className="grid grid-cols-1 gap-6">
          {/* Post 1 */}
          <div className="flex gap-4">
            <div className="relative w-40 h-32 flex-shrink-0">
              <Image
                src="/blog/maintain.png"
                alt="Building Maintenance"
                fill
                className="object-cover rounded"
              />
            </div>
            <div className="flex flex-col justify-between">
              <h4 className="font-semibold text-sm mb-1">
                Why Is Building Maintenance Important?
              </h4>
              <p className="text-xs text-gray-700">
                Building maintenance is crucial for keeping structures safe, clean, and durable...
              </p>
              <button className="text-orange-500 text-xs mt-2 underline">Read More</button>
            </div>
          </div>

          {/* Post 2 */}
          <div className="relative w-full h-40">
            <Image
              src="/blog/interior.png"
              alt="Interior House Design"
              fill
              className="object-cover rounded"
            />
            <div className="absolute inset-0 bg-white/90 p-3 rounded text-black">
              <h4 className="font-semibold text-sm mb-1">
                Simple Interior House Design (The New Year Guide 1)
              </h4>
              <p className="text-xs text-gray-700">
                A simple interior house design we love (Part 1 of the Ultimate New Year Guide)...
              </p>
              <button className="text-orange-500 text-xs mt-2 underline">Read More</button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {/* Card 1 */}
        <div className="bg-white border rounded p-3 shadow-sm">
          <div className="relative w-full h-40 mb-3">
            <Image src="/blog/doors.png" alt="Security Doors" fill className="object-cover rounded" />
          </div>
          <h4 className="font-semibold text-sm mb-1">Security Doors Prices and types of Burglar Doors</h4>
          <p className="text-xs text-gray-700 mb-2">
            In this post, we'll discuss the security door prices in Nigeria, the different types of burglar doors...
          </p>
          <button className="text-orange-500 text-xs underline">Read More</button>
        </div>

        {/* Card 2 */}
        <div className="bg-white border rounded p-3 shadow-sm">
          <div className="relative w-full h-40 mb-3">
            <Image src="/blog/smartlock.png" alt="Smart Door Lock" fill className="object-cover rounded" />
          </div>
          <h4 className="font-semibold text-sm mb-1">
            What is a Smart Door Lock, and why do you need one
          </h4>
          <p className="text-xs text-gray-700 mb-2">
            Smart door locks enhance home security and ease through remote operation via smartphones...
          </p>
          <button className="text-orange-500 text-xs underline">Read More</button>
        </div>

        {/* Empty placeholder for symmetry (optional) */}
        <div></div>
      </div>
    </section>
    <Footer/>
    </>
  );
}