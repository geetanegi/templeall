import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react"; // Import the ChevronDown icon

interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  options: Option[];
  onChange: (selectedValues: string[]) => void;
  className?: string; // Optional prop for custom classes
  disabled?: boolean; // Add the disabled prop
  label?: string; // Default label when no option is selected
  maxDisplayCount?: number; // Number of options to display before showing "+X more"
}

const CheckboxDropdown: React.FC<DropdownProps> = ({
  options,
  onChange,
  className,
  disabled = false, // Set a default value for the disabled prop
  label = "Select options", // Set a default value for the label prop
  maxDisplayCount = 2, // Set a default number of options to display in the label
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Update selectedOptions and isAllSelected when options change
    setIsAllSelected(selectedOptions.length === options.length);
    // If there are no matching options in the new list, reset selectedOptions
    setSelectedOptions((prevSelected) =>
      prevSelected.filter((item) => options.some((opt) => opt.value === item)),
    );
  }, [options]);

  useEffect(() => {
    // Update isAllSelected whenever selectedOptions changes
    setIsAllSelected(selectedOptions.length === options.length);
  }, [selectedOptions, options]);

  const handleCheckboxChange = (value: string) => {
    if (disabled) return; // Prevent changes if disabled
    setSelectedOptions((prev) => {
      const newSelectedOptions = prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value];
      onChange(newSelectedOptions);
      return newSelectedOptions;
    });
  };

  const handleSelectAll = () => {
    if (disabled) return; // Prevent changes if disabled
    if (isAllSelected) {
      setSelectedOptions([]);
      onChange([]);
    } else {
      const allValues = options.map((option) => option.value);
      setSelectedOptions(allValues);
      onChange(allValues);
    }
  };

  const toggleDropdown = () => {
    if (disabled) return; // Prevent opening if disabled
    setIsOpen((prev) => !prev);
  };

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Generate the label with selected options
  const getLabel = () => {
    if (selectedOptions.length === 0) return label;
    const selectedLabels = selectedOptions
      .map((value) => options.find((opt) => opt.value === value)?.label)
      .filter(Boolean) as string[];

    if (selectedLabels.length <= maxDisplayCount) {
      return selectedLabels.join(", ");
    }

    const displayedLabels = selectedLabels.slice(0, maxDisplayCount).join(", ");
    const remainingCount = selectedLabels.length - maxDisplayCount;
    return `${displayedLabels} +${remainingCount} more`;
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        className={`${
          disabled ? "cursor-not-allowed" : ""
        } flex w-full items-center justify-between rounded-lg text-left transition duration-150 ease-in-out`}
        onClick={toggleDropdown}
        disabled={disabled}
      >
        <span>{getLabel()}</span>
        <ChevronDown className="ml-2 h-5 w-5 text-gray-500" />
      </button>
      {isOpen && (
        <div className="absolute left-0 z-10 mt-2 w-full rounded-lg bg-gray-100 shadow-lg">
          <div className="p-2 text-sm">
            <label
              className={`mb-2 block flex cursor-pointer rounded-lg p-1 transition duration-150 ease-in-out ${
                isAllSelected
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-50 focus:bg-gray-50"
              }`}
              onClick={handleSelectAll}
            >
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={handleSelectAll}
                className="mr-2 h-5 w-5"
              />
              Select All
            </label>
            {options.map((option) => (
              <label
                key={option.value}
                className={`mb-2 flex cursor-pointer items-center rounded-lg p-1 transition duration-150 ease-in-out ${
                  selectedOptions.includes(option.value)
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-50 focus:bg-gray-50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option.value)}
                  onChange={() => handleCheckboxChange(option.value)}
                  className="mr-2 h-5 w-5"
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckboxDropdown;
