import Link from "next/link";
import Image from "next/image";

interface MiningHeroProps {
  label: string;
  title: string;
  subtitle: string;
  bg?: string;
  cta?: { text: string; href: string };
  short?: boolean;
}

export default function MiningHero({
  label,
  title,
  subtitle,
  bg = "/mininglandingbg.jpg",
  cta,
  short = false,
}: MiningHeroProps) {
  return (
    <section className={`relative w-full ${short ? "h-[52vh] min-h-[380px]" : "h-screen min-h-[600px]"}`}>
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={bg}
          alt={title}
          fill
          priority={!short}
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="absolute inset-0 bg-black/65" />

      {/* Content — anchored to bottom-left, padded from nav at top */}
      <div className="relative z-10 h-full flex flex-col justify-end px-5 sm:px-8 md:px-14 pb-14 sm:pb-16 md:pb-20 max-w-7xl mx-auto w-full">
        <p className="text-gray-400 text-[10px] sm:text-xs uppercase tracking-widest font-medium mb-3">
          {label}
        </p>
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight max-w-2xl">
          {title}
        </h1>
        <p className="text-gray-300 mt-4 text-sm sm:text-base leading-relaxed max-w-lg">
          {subtitle}
        </p>
        {cta && (
          <div className="mt-7">
            <Link
              href={cta.href}
              className="inline-block bg-white text-gray-900 px-6 py-3 text-sm font-semibold hover:bg-gray-100 transition-colors"
            >
              {cta.text}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
