import Image from "next/image";
import Link from "next/link";

export function CtaSection() {
  return (
    <section className="flex flex-col md:flex-row min-h-[440px]">
      {/* Left: Dark panel */}
      <div className="flex-1 bg-gray-900 flex flex-col justify-center px-10 md:px-16 py-16">
        <p className="text-gray-400 text-xs uppercase tracking-widest font-medium mb-5">
          Get In Touch
        </p>
        <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight mb-5 max-w-md">
          Let's Build the Future of Energy Together.
        </h2>
        <p className="text-gray-400 text-base leading-relaxed max-w-md mb-8">
          Reach out to discuss bulk supply, logistics, or partnership
          opportunities.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="px-8 py-3 bg-white text-gray-900 text-sm font-semibold hover:bg-gray-100 transition-colors">
            Explore Services
          </button>
          <Link
            href="/oil&gas/contact"
            className="px-8 py-3 border border-white/40 text-white text-sm font-semibold hover:bg-white/10 transition-colors text-center"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Right: Image — no overlay */}
      <div className="flex-1 relative min-h-[300px] md:min-h-0">
        <Image
          src="/ctaoil&gas.png"
          alt="Energy infrastructure"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={85}
        />
      </div>
    </section>
  );
}
