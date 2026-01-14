"use client";
import { FaChartLine, FaLeaf, FaHandshake, FaDollarSign } from "react-icons/fa";

const WhyInvestSection = () => {
  const benefits = [
    {
      icon: <FaChartLine className="text-3xl text-green-600" />,
      title: "Stable Growth",
      description:
        "Your investment works in a recession-proof industry—agriculture. With rising food demand, our farm guarantees consistent market relevance and sustainable long-term returns.",
    },
    {
      icon: <FaLeaf className="text-3xl text-green-600" />,
      title: "Sustainable Practices",
      description:
        "We use eco-friendly farming methods that improve yield while protecting the environment. Investors can feel confident knowing their money supports responsible farming.",
    },
    {
      icon: <FaHandshake className="text-3xl text-green-600" />,
      title: "Transparent Partnership",
      description:
        "From regular reports to farm visits, we keep our investors updated every step of the way. Transparency is at the heart of our operations.",
    },
    {
      icon: <FaDollarSign className="text-3xl text-green-600" />,
      title: "Guaranteed ROI",
      description:
        "With structured investment plans, you enjoy competitive returns backed by a proven track record in agricultural production and sales.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">
          Why Invest With Us
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-center mb-4">{benefit.icon}</div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyInvestSection;
