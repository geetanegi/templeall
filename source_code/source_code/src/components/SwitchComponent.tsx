import React, { useEffect, useState } from "react";

interface SwitchComponentProps {
  isChecked?: boolean;
  onChange?: (checked: boolean, revert: () => void) => void; // Added a `revert` callback
  id?: number;
}

const SwitchComponent: React.FC<SwitchComponentProps> = ({ isChecked = false, id, onChange }) => {
  const [checked, setChecked] = useState(isChecked);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked, id]);

  const handleToggle = () => {
    if (isLoading) return; // Prevent toggling during API call

    const newChecked = !checked;
    setChecked(newChecked);
    setIsLoading(true); // Set loading state

    if (onChange) {
      onChange(newChecked, () =>setChecked(!newChecked)); // Pass a revert function
    }

    // Simulate a delay for API (you'll remove this in production)
    setTimeout(() => setIsLoading(false), 1000); 
  };

  return (
    <div className="flex items-center">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleToggle}
          className="sr-only peer"
          disabled={isLoading} // Disable interaction during API call
        />
        <div
          className={`w-11 h-6 rounded-full transition duration-200 ease-in-out ${
            checked ? "bg-primaryColor" : "bg-[#7B7887]"
          }`}
        ></div>
        <span
          className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transform transition-transform duration-200 ease-in-out ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        ></span>
      </label>
    </div>
  );
};

export default SwitchComponent;
