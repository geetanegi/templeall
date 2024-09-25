import React from "react";
import { Info, FlagIcon } from "lucide-react";

interface hole {
  holeNumber: number;
  id: number;
  imageBase64?: string | null; // Made optional
  imageUrl?: string | null; // Made optional
  par: number;
  yardage?: number; // Made optional
}

const HoleNavigation: React.FC<{ hole: hole }> = ({ hole }) => {
  return (
    <div className="flex items-center gap-2 rounded-full border border-gray-400 bg-white px-3 py-2">
      <FlagIcon className="h-4 w-4 text-gray-500" />
      <span className="text-sm text-gray-700">
        Hole #{hole.holeNumber}- Par {hole.par}
      </span>
      <Info className="h-4 w-4 text-blue-700" />
    </div>
  );
};

export default HoleNavigation;
