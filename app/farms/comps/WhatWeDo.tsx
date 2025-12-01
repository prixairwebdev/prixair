import Image from "next/image";

const WhatWeDo = () => {
  return (
    <section className="bg-green-50 py-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center px-6 lg:px-12">
        {/* Text Content */}
        <div>
          <h2 className="text-green-600 font-semibold text-lg mb-4">
            WHAT WE DO
          </h2>
          <p className="text-gray-700 leading-relaxed">
            At our farm, we are deeply committed to sustainable and responsible agriculture.
            Our operations focus on two key areas: crop farming and animal farming.
            We grow a variety of fresh produce including maize, vegetables, and rice,
            using eco-friendly and hybrid methods that enrich the soil and promote
            healthy growth.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Alongside our crops, we raise poultry, goats, cattle, and fish in
            well-maintained environments, ensuring humane care, natural feeding,
            and clean housing. Sustainability is at the core of everything we do —
            from organic practices to environmentally conscious techniques that
            protect the land for future generations.
          </p>
        </div>

        {/* Image */}
        <div className="flex justify-center">
          <Image
            src="/images/what-we-do.png"
            alt="Farmer holding vegetables"
            width={600}
            height={400}
            className="rounded-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
