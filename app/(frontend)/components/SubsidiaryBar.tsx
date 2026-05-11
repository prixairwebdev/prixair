"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface SubsidiaryBarProps {
  name: string;
  color?: string; // brand hex color, e.g. "#FE0000". Defaults to near-black.
}

export default function SubsidiaryBar({ name, color }: SubsidiaryBarProps) {
  const bg = color ?? "#030712";
  return (
    <div
      className="fixed top-0 left-0 w-full z-[70] border-b border-white/20"
      style={{ backgroundColor: bg }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-12 h-9 flex items-center justify-between">
        {/* Back to group */}
        <Link
          href="/"
          className="flex items-center gap-1 text-white/80 hover:text-white transition-colors duration-200 text-xs font-semibold group"
        >
          <ChevronLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
          Prixair Group
        </Link>

        {/* Current subsidiary */}
        <span className="text-white/60 text-xs font-medium tracking-wide hidden sm:block">
          {name}
        </span>

        {/* Explore other subsidiaries */}
        <Link
          href="/#subsidiaries"
          className="text-white/80 hover:text-white transition-colors duration-200 text-xs font-semibold"
        >
          All subsidiaries
        </Link>
      </div>
    </div>
  );
}
