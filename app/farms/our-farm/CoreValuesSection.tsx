"use client";
import { FaLeaf, FaTractor, FaPeopleArrows, FaHammer } from "react-icons/fa";
import CoreValueCard from "./CoreValueCard";

const CoreValuesSection = () => {
  return (
    <section className="py-20 bg-green-50 text-black">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">Core Values</h2>
        <p className="text-gray-600">
          Emphasizing values as the foundation of your agricultural mission.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">
        <CoreValueCard
          icon={<FaLeaf className="text-green-500" />}
          title="Sustainability"
          description="We use eco-friendly and organic methods to ensure long-term environmental health and soil fertility."
        />
        <CoreValueCard
          icon={<FaHammer className="text-yellow-500" />}
          title="Hard Work"
          description="We are deeply committed to the daily grind—from planting to harvest—ensuring every product reflects the passion and effort we put into our land."
        />
        <CoreValueCard
          icon={<FaPeopleArrows className="text-gray-700" />}
          title="Community Impact"
          description="We create jobs, support local markets, and give back to our community through agriculture."
        />
        <CoreValueCard
          icon={<FaTractor className="text-green-700" />}
          title="Innovation"
          description="We adopt modern farming technologies to improve productivity while maintaining sustainability."
        />
      </div>
    </section>
  );
};

export default CoreValuesSection;
