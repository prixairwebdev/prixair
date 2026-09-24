'use client';
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, Star, Truck } from "lucide-react";
import FloatingCart from "./FloatingCart";

interface BrandHeroProps {
  title: React.ReactNode;
  subtitle: string;
  /** Full-bleed background photo (cover / frame layouts) */
  bgImage?: string;
  /** Focal point for the cover image, e.g. "70% center" */
  bgPosition?: string;
  /** 1–3 food photos shown as a collage (split layout) */
  images?: string[];
  /** Brand logo shown in the top bar */
  logo?: string;
  brandName?: string;
  /**
   * cover — photo fills the screen, text on a gradient
   * split — tinted backdrop, text left, photo collage right
   * frame — light backdrop, centered text (for flat-lay photos with an empty middle)
   */
  layout?: "cover" | "split" | "frame";
  tagline?: string;
  primaryColor?: string;
  secondaryColor?: string;
  onOrderClick?: () => void;
  onMenuClick?: () => void;
  store?: string;
}

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

const highlights = [
  { icon: Clock, label: "Made fresh daily" },
  { icon: Truck, label: "Fast delivery" },
  { icon: Star, label: "Loved by thousands" },
];

const BrandHero = ({
  title,
  subtitle,
  bgImage,
  bgPosition = "center",
  images = [],
  logo,
  brandName = "",
  layout,
  tagline,
  primaryColor = "#B5D04E",
  secondaryColor = "#F3A35C",
  onOrderClick,
  onMenuClick,
  store,
}: BrandHeroProps) => {
  const mode = layout ?? (images.length > 0 ? "split" : "cover");
  const light = mode === "frame";
  const backdrop = bgImage ?? images[0];

  const copy = (
    <motion.div
      className={`relative z-10 w-full ${light ? "max-w-2xl mx-auto text-center" : "max-w-xl"}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {tagline && (
        <motion.p
          variants={item}
          className="mb-4 text-base md:text-lg font-semibold"
          style={{ color: secondaryColor }}
        >
          {tagline}
        </motion.p>
      )}

      <motion.h1
        variants={item}
        className={`text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight ${
          light ? "text-gray-900" : "text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)]"
        }`}
      >
        {title}
      </motion.h1>

      <motion.p
        variants={item}
        className={`text-base md:text-lg mb-9 leading-relaxed ${
          light ? "text-gray-600 max-w-lg mx-auto" : "text-white/80 max-w-md"
        }`}
      >
        {subtitle}
      </motion.p>

      <motion.div variants={item} className={`flex flex-wrap items-center gap-3 ${light ? "justify-center" : ""}`}>
        {onOrderClick && (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOrderClick}
            className="group inline-flex items-center gap-2 text-white pl-7 pr-6 py-4 rounded-full font-bold text-sm tracking-wide shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]"
            style={{ backgroundColor: primaryColor }}
          >
            Order Now
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
        )}
        {onMenuClick && (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onMenuClick}
            className={`px-7 py-4 rounded-full font-bold text-sm tracking-wide border backdrop-blur-sm transition-colors ${
              light
                ? "bg-white/80 text-gray-900 border-gray-900/15 hover:bg-white"
                : "bg-white/10 text-white border-white/25 hover:bg-white/20"
            }`}
          >
            View Menu
          </motion.button>
        )}
      </motion.div>

      <motion.ul
        variants={item}
        className={`mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold ${
          light ? "justify-center text-gray-600" : "text-white/70"
        }`}
      >
        {highlights.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-2">
            <Icon className="w-4 h-4" style={{ color: secondaryColor }} />
            {label}
          </li>
        ))}
      </motion.ul>
    </motion.div>
  );

  return (
    <section
      className={`relative min-h-[100svh] w-full overflow-hidden flex flex-col ${light ? "bg-[#f7f5f2]" : "bg-[#0e0c0a]"}`}
    >
      {store && <FloatingCart storeSlug={store} accentColor={secondaryColor} />}

      {/* ---------- Backgrounds ---------- */}
      {mode === "cover" && backdrop && (
        <>
          <Image
            src={backdrop}
            alt=""
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: bgPosition }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
        </>
      )}

      {mode === "split" && (
        <>
          {backdrop && (
            <Image
              src={backdrop}
              alt=""
              fill
              priority
              unoptimized
              sizes="100vw"
              className="object-cover scale-110 blur-3xl opacity-40"
            />
          )}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(60% 60% at 85% 40%, ${primaryColor}55 0%, transparent 70%), radial-gradient(50% 50% at 10% 90%, ${secondaryColor}40 0%, transparent 70%), linear-gradient(180deg, rgba(14,12,10,0.55) 0%, rgba(14,12,10,0.85) 100%)`,
            }}
          />
          {/* fine grain so the gradient doesn't band */}
          <div
            className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />
        </>
      )}

      {mode === "frame" && backdrop && (
        <>
          <Image
            src={backdrop}
            alt=""
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: bgPosition }}
          />
          {/* keeps the centre readable on narrow screens where the pastries crowd in */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(247,245,242,0.92)_0%,rgba(247,245,242,0.75)_40%,rgba(247,245,242,0)_75%)]" />
        </>
      )}

      {/* ---------- Top bar ---------- */}
      {logo && (
        <div className="relative z-20 w-full max-w-7xl mx-auto px-5 md:px-10 pt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center overflow-hidden p-1.5">
              <Image src={logo} alt={`${brandName} logo`} width={56} height={56} unoptimized className="w-full h-full object-contain" />
            </div>
            {brandName && <span className="hidden sm:block text-white font-bold tracking-tight text-lg">{brandName}</span>}
          </div>
          <Link
            href="/food"
            className="inline-flex items-center gap-2 text-xs font-semibold text-white/80 hover:text-white px-4 py-2 rounded-full border border-white/20 bg-black/20 backdrop-blur-sm transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Prixair Foods</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </div>
      )}

      {/* ---------- Content ---------- */}
      {mode === "split" ? (
        <div className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-5 md:px-10 py-12 md:py-16 grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-8 items-center">
          {copy}
          <HeroCollage images={images} accent={secondaryColor} />
        </div>
      ) : mode === "frame" ? (
        <div className="relative z-10 flex-1 w-full flex items-center justify-center px-5 md:px-10 pt-36 pb-20">
          {copy}
        </div>
      ) : (
        <div className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-5 md:px-10 flex items-end md:items-center pb-20 md:pb-10 pt-16">
          {copy}
        </div>
      )}
    </section>
  );
};

const HeroCollage = ({ images, accent }: { images: string[]; accent: string }) => {
  const [main, second, third] = images;
  return (
    <motion.div
      className="relative w-full max-w-md mx-auto lg:max-w-none lg:ml-auto aspect-[4/5] lg:h-[min(78vh,640px)] lg:w-auto"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* glow */}
      <div className="absolute -inset-6 rounded-[3rem] blur-3xl opacity-40" style={{ backgroundColor: accent }} />

      <div className={`absolute ${second ? "left-0 top-0 w-[78%] h-[84%]" : "inset-0"} rounded-[2rem] overflow-hidden ring-1 ring-white/15 shadow-2xl`}>
        <Image src={main} alt="" fill priority unoptimized sizes="(min-width:1024px) 40vw, 90vw" className="object-cover" />
      </div>

      {second && (
        <motion.div
          className="absolute right-0 bottom-0 w-[52%] aspect-square rounded-[1.5rem] overflow-hidden ring-4 ring-[#0e0c0a] shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image src={second} alt="" fill unoptimized sizes="(min-width:1024px) 20vw, 45vw" className="object-cover" />
        </motion.div>
      )}

      {third && (
        <motion.div
          className="absolute right-[4%] top-[6%] w-[30%] aspect-square rounded-full overflow-hidden ring-4 ring-[#0e0c0a] shadow-2xl hidden sm:block"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image src={third} alt="" fill unoptimized sizes="15vw" className="object-cover" />
        </motion.div>
      )}
    </motion.div>
  );
};

export default BrandHero;
