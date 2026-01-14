import Image from "next/image";

const farmActivities = [
  {
    title: "Crop Farming",
    image: "/images/crop-farming.png",
  },
  {
    title: "Animal Farming",
    image: "/images/animal-farming.png",
  },
  {
    title: "Processing & Packaging",
    image: "/images/processing.png",
  },
  {
    title: "Farm Life",
    image: "/images/farm-life.png",
  },
];

const FarmInAction = () => {
  return (
    <section className="py-20 bg-white text-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h2 className="text-2xl font-bold mb-2">Our Farm in Action</h2>
        <p className="text-gray-600 mb-10">
          A look into our day-to-day activities — from planting to processing.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {farmActivities.map((activity, idx) => (
            <div key={idx} className="relative group overflow-hidden rounded-lg">
              <Image
                src={activity.image}
                alt={activity.title}
                width={600}
                height={400}
                className="object-cover w-full h-64 group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 bg-opacity-40 flex items-end">
                <h3 className="text-white font-semibold text-lg p-4">
                  {activity.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FarmInAction;
