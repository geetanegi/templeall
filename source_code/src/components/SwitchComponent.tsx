import React, { useEffect, useState } from 'react';

interface SwitchComponentProps {
  isChecked?: boolean;
  onChange?: (checked: boolean) => void;
  id?: number
}

const SwitchComponent: React.FC<SwitchComponentProps> = ({ isChecked = false, id, onChange }) => {

  const [checked, setChecked] = useState(isChecked);
  useEffect(() => {
    setChecked(isChecked)
  }, [isChecked, id])

  const handleToggle = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    if (onChange) {
      onChange(newChecked);
    }
  };

  return (
    <div className="flex items-center">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleToggle}
          className="sr-only peer"
        />
        <div
          className={`w-11 h-6 bg-gray-200 rounded-full   ${checked ? 'bg-lime-600' : 'bg-gray-200'
            } transition duration-200 ease-in-out`}
        ></div>
        <span
          className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transform ${checked ? 'translate-x-5' : 'translate-x-0'
            } transition-transform duration-200 ease-in-out`}
        ></span>
      </label>
    </div>
  );
};

export default SwitchComponent;
