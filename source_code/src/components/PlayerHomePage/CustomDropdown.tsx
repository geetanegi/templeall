import React, { useEffect, useRef, useState } from "react";
import { leaderBoard } from "./LeaderBoard";
import { ChevronDown } from "lucide-react"; // Import the dropdown icon

interface Props {
  dropDownList: leaderBoard[];
  selectedValue: string; // This should still be the scheduleContestId
  setSelectedValue?: (value: string | number) => void;
}

const PlayerCustomDropdown: React.FC<Props> = ({
  dropDownList,
  setSelectedValue,
  selectedValue,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [selectedText, setSelectedText] = useState<string>("");

  // Set default selected text based on selectedValue
  useEffect(() => {
    const selectedItem = dropDownList.find(
      (item) => item.scheduleContestId.toString() === selectedValue.toString(),
    );
    if (selectedItem) {
      setSelectedText(
        `${selectedItem.clubName} Hole #${selectedItem.holeNumber} - Par ${selectedItem.par}, ${selectedItem.teeName} (${selectedItem.yardage})`,
      );
    } else {
      setSelectedText(""); // Clear if no match found
    }
  }, [dropDownList, selectedValue]);

  const handleSelect = (item: leaderBoard) => {
    setSelectedValue?.(item.scheduleContestId); // Set the selected value as the ID
    setSelectedText(
      `${item.clubName} Hole #${item.holeNumber} - Par ${item.par}, ${item.teeName} (${item.yardage})`,
    ); // Store full option text
    setIsOpen(false); // Close the dropdown after selecting an option
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex cursor-pointer items-center rounded border p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex-grow">{selectedText || "Select an option"}</span>{" "}
        {/* Display full text here */}
        <ChevronDown className="ml-2 h-4 w-4" /> {/* Add dropdown icon */}
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-2 max-h-36 w-full overflow-y-auto rounded border bg-white shadow-md">
          {dropDownList &&
            dropDownList.map((item) => {
              const optionText = `${item.clubName} Hole #${item.holeNumber} - Par ${item.par}, ${item.teeName} (${item.yardage})`;
              return (
                <div
                  key={item.scheduleContestId}
                  className="cursor-pointer p-2 hover:bg-[#a5e99f]"
                  onClick={() => handleSelect(item)} // Pass the whole item to handleSelect
                >
                  <p>{optionText.split(" ").slice(0, 9).join(" ")}</p>
                  <p className="text-sm text-gray-500">
                    {optionText.split(" ").slice(9).join(" ")}
                  </p>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default PlayerCustomDropdown;
