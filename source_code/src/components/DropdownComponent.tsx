// Dropdown.tsx
import { ChevronDown } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

interface DropdownProps {
  options: string[];
  onSelect?: (option: string) => void;
  placeholder?: any
  className?: any
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect, className, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close the dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: string) => {
    if (onSelect) {
      onSelect(option);
    }
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block text-left  ${className}`} ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`flex align-center justify-between w-full`}
      >
        {placeholder}
        <ChevronDown />
      </button>
      {isOpen && (
        <div className="absolute w-full right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
          <div className="py-1 w-full">
            {options?.map((option: any) => (
              <button
                key={option}
                onClick={() => handleOptionClick(option)}
                className="block px-4 py-2 w-full text-gray-800 hover:bg-gray-100 w-full text-left"
              >
                {option.roleName}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
