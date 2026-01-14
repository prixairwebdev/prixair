// components/AboutSection.tsx
import Image from "next/image";

const guidingPrinciples = [
  {
    icon: "/icons/pastries.png", // Replace with actual path
    title: "Quality First",
    desc: "Only the best ingredients, baked with care.",
  },
  {
    icon: "/icons/heart.png",
    title: "Customer-Centered Service",
    desc: "Every customer is family — always welcomed with warmth.",
  },
  {
    icon: "/icons/nigeria.png",
    title: "Proudly Nigerian",
    desc: "Inspired by tradition. Baked for today.",
  },
  {
    icon: "/icons/lightbulb.png",
    title: "Consistency & Innovation",
    desc: "Reliable quality with a taste of something new.",
  },
];

const AboutSection = () => (
  <section>
    {/* Hero/intro */}
    <div className=" bg-black/60 text-white py-10 px-4 md:px-0"
    style={{ backgroundImage: "url('/iconbg.png')" }}>
      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-2">
          <span className="font-bold text-yellow-400 text-3xl tracking-wide">GAVI</span>
        </div>
        <p className="text-lg leading-relaxed font-medium mt-4">
          GAVI was born from a love of fresh food and a desire to bring quality baked goods to everyday Nigerians. From local classics like meat pie and coconut bread to our signature rolls, we’re proud to serve warmth in every bite.<br /><br />
          At GAVI, we believe baking is an art of love. Every loaf, pastry, and cake is made fresh daily with premium ingredients and a passion for perfection.<br /><br />
          Whether it’s a family gathering or a sweet solo treat, we’ve got something for everyone
        </p>
      </div>
    </div>

    {/* Mission & Vision */}
    <div className="bg-[#6f6c69] md:flex items-center justify-between py-10 px-4 md:px-0">
      <div className="max-w-lg mx-auto md:mx-0 md:ml-20 text-white">
        <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
        <p className="mb-8 text-lg">
          To bring joy to every home and table through freshly baked Nigerian-inspired treats, crafted with care, quality ingredients, and heartfelt service.
        </p>
        <h3 className="text-2xl font-bold mb-4 mt-6">Our Vision</h3>
        <p className="text-lg">
          To become Nigeria’s leading neighborhood bakery, celebrated for our exceptional taste, consistency, and connection to tradition — one bite at a time.
        </p>
      </div>
      <div className="hidden md:block md:w-[380px] md:mr-20">
        {/* Croissant image, update src as needed */}
        <Image
          src="/menu/bread/sourdough-loaf.png"
          alt="GAVI Croissants"
          width={380}
          height={250}
          className="rounded-lg object-cover"
        />
      </div>
    </div>

    {/* Guiding Principles */}
    <div className="bg-[#ecebe6] py-12 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h3 className="font-bold text-2xl mb-2">Our Guiding Principles</h3>
        <p className="text-md text-gray-700 font-medium mb-10">
          Baked with purpose, guided by tradition, and delivered with heart.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {guidingPrinciples.map((principle) => (
            <div
              key={principle.title}
              className="bg-white rounded-lg p-6 shadow border border-gray-200 flex flex-col items-center"
            >
              <Image
                src={principle.icon}
                alt={principle.title}
                width={60}
                height={60}
                className="mb-4"
              />
              <p className="font-semibold text-gray-900 mb-2">{principle.title}</p>
              <p className="text-sm text-gray-600">{principle.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
