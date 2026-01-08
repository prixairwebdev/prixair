"use client";
import Image from "next/image";

const AboutSection = () => {
  return (
    <section className="relative w-full h-[80vh] flex items-center justify-center mt-10">
      {/* Background Image */}
      <Image
        src="/farmaboutbg.png"
        alt="Farm field background"
        fill
        className="object-cover"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Content */}
      <div className="relative z-10 bg-white rounded-lg shadow-lg max-w-3xl text-center p-8 md:p-12">
        <h2 className="text-green-600 font-semibold text-xl mb-4">About us</h2>
        <p className="text-gray-700 leading-relaxed">
          We are more than just a farm — we’re a team of passionate growers, animal
          caretakers, and sustainability advocates working together to produce wholesome
          food you can trust. From carefully cultivated crops to ethically raised poultry
          and livestock, everything we do is rooted in a commitment to quality, care, and
          the environment. Our farm combines modern techniques with traditional values to
          deliver fresh, nutrient-rich products that nourish families and communities.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
