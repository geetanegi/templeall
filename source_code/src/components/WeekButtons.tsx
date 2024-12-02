import React from "react";

interface Day {
  id: string; // Unique identifier for each day (now a string)
  label: string; // Day label
}

interface DayButtonProps {
  day: Day;
  isActive: boolean;
  onClick: () => void;
}

const DayButton: React.FC<DayButtonProps> = ({ day, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-8 rounded-md px-2 py-1 text-sm ${isActive ? "bg-primaryColor" : "bg-[#7b7887]"}`}
    >
      <span className="text-sm font-bold text-white"> {day.label}</span>
    </button>
  );
};

interface WeekButtonsProps {
  selectedDays: string[]; // Array of selected day Fullnames
  setSelectedDays: React.Dispatch<React.SetStateAction<string[]>>; // Function to update selected days
}

const WeekButtons: React.FC<WeekButtonsProps> = ({
  selectedDays,
  setSelectedDays,
}) => {
  const days: Day[] = [
    { id: "MONDAY", label: "M" },
    { id: "TUESDAY", label: "T" },
    { id: "WEDNESDAY", label: "W" },
    { id: "THURSDAY", label: "T" },
    { id: "FRIDAY", label: "F" },
    { id: "SATURDAY", label: "S" },
    { id: "SUNDAY", label: "S" },
  ];

  const handleClick = (id: string) => {
    // Toggle the day ID in the selectedDays array
    setSelectedDays((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id],
    );
  };

  return (
    <div className="flex space-x-2">
      {days.map((day) => (
        <DayButton
          key={day.id}
          day={day}
          isActive={selectedDays?.includes(day?.id)} // Check if the day ID is in the selectedDays array
          onClick={() => handleClick(day.id)}
        />
      ))}
    </div>
  );
};

export default WeekButtons;
