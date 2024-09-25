import React from "react";

interface FloatingLabelInputProps {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  id,
  label,
  type = "text",
  required = false,
}) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        placeholder={label}
        className=" peer placeholder-transparent h-11 w-full border border-gray-300 rounded-md px-3 pt-2 pb-2 text-gray-900 focus:outline-none focus:border-blue-500 "
      />

      <label
        htmlFor={id}
        className="absolute left-3 top-2 text-gray-500 transition-all transform -translate-y-3 scale-75 origin-left peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-3 peer-focus:-translate-y-3 peer-focus:scale-75"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    </div>
  );
};

export default FloatingLabelInput;
