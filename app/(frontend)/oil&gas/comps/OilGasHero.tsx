import Link from "next/link";

interface HeroProps {
  label: string;
  title: string;
  subtitle: string;
  bg?: string;
  ctas?: { text: string; href: string; variant?: "solid" | "outline" }[];
  short?: boolean;
}

export default function OilGasHero({
  label,
  title,
  subtitle,
  bg = "/oil&gasbg.png",
  ctas,
  short = false,
}: HeroProps) {
  return (
    <section className={`relative w-full ${short ? "h-[52vh] min-h-[380px]" : "h-screen min-h-[600px]"}`}>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${bg}')` }}
      />
      <div className="absolute inset-0 bg-black/65" />

      <div className="relative z-10 h-full flex flex-col justify-end px-5 sm:px-8 md:px-16 pb-14 sm:pb-16 md:pb-20 max-w-7xl mx-auto w-full">
        <p className="text-gray-400 text-[10px] sm:text-xs uppercase tracking-widest font-medium mb-3">
          {label}
        </p>
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl">
          {title}
        </h1>
        <p className="text-gray-300 mt-4 max-w-xl text-sm sm:text-base md:text-lg leading-relaxed">
          {subtitle}
        </p>
        {ctas && ctas.length > 0 && (
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            {ctas.map((cta, i) =>
              cta.variant === "outline" ? (
                <Link
                  key={i}
                  href={cta.href}
                  className="border border-white/60 text-white px-6 py-3 text-sm font-semibold hover:bg-white/10 transition-colors text-center"
                >
                  {cta.text}
                </Link>
              ) : (
                <Link
                  key={i}
                  href={cta.href}
                  className="bg-white text-gray-900 px-6 py-3 text-sm font-semibold hover:bg-gray-100 transition-colors text-center"
                >
                  {cta.text}
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}
