import { ReactNode } from "react";

interface CoreValueCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const CoreValueCard: React.FC<CoreValueCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition">
      <div className="flex justify-center mb-4 text-4xl">{icon}</div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default CoreValueCard;
