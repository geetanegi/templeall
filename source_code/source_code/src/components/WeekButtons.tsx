import React from "react";

interface Day {
  key:number;
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
    {key:1,  id: "MONDAY", label: "M" },
    {key:2, id: "TUESDAY", label: "T" },
    {key:3, id: "WEDNESDAY", label: "W" },
    {key:4, id: "THURSDAY", label: "T" },
    {key:5, id: "FRIDAY", label: "F" },
    {key:6, id: "SATURDAY", label: "S" },
    {key:7, id: "SUNDAY", label: "S" },
  ];

  const dayOrder: string[] = [
    "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"
  ];

  const handleClick = (id: string) => {
    setSelectedDays((prev) => {
      const newSelectedDays = prev.includes(id)
        ? prev.filter((d) => d !== id) 
        : [...prev, id]; 

      return newSelectedDays.sort((a, b) => {
        return dayOrder.indexOf(a) - dayOrder.indexOf(b);
      });
    });
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
