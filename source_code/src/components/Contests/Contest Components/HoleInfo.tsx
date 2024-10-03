import React from "react";
import { PlusCircle, MinusCircle } from "lucide-react";

interface Hole {
  name: string;
  price: string;
  isActive: boolean;
  dateRange: string;
  image: string;
}

interface HoleInfoProps {
  hole: Hole;
  isAdded: boolean;
  toggleHole: () => void;
}

const HoleInfo: React.FC<HoleInfoProps> = ({ hole, isAdded, toggleHole }) => {
  return (
    <div className="flex items-center justify-between border-b p-4">
      <div className="flex items-center space-x-4">
        <img src={hole.image} alt={hole.name} className="h-10 w-10" />
        <div>
          <h4 className="font-semibold">{hole.name}</h4>
          <p className="text-sm text-gray-500">{hole.dateRange}</p>
          <p className={`text-${hole.isActive ? "green" : "red"}-500`}>
            {hole.isActive ? "Active" : "Inactive"}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <span className="font-bold text-red-500">{hole.price}</span>
        <button onClick={toggleHole}>
          {isAdded ? (
            <MinusCircle size={24} className="text-red-500" />
          ) : (
            <PlusCircle size={24} className="text-green-500" />
          )}
        </button>
      </div>
    </div>
  );
};

export default HoleInfo;
