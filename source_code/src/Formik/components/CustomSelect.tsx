import React from "react";
import { Field, ErrorMessage, FieldProps } from "formik";
import TextError from "./TextError";

interface SelectProps {
  label: string;
  name: string;
  options: { value: string; key: string; code?: string | null }[];
  placeholder?: string; // Dynamic placeholder text
  skipCode?: boolean;
  className?: string;
  rightPosition?: string; // New prop for dynamic positioning
  leftPosition?: string; // New prop for dynamic positioning
  showStarIcon?: boolean;
}
const CustomSelect: React.FC<SelectProps> = ({
  label,
  name,
  options,
  placeholder = "Select an option",
  skipCode,
  className,
  rightPosition = "", // Default position
  leftPosition = "",
  showStarIcon = false,
  ...rest
}) => {
  return (
    <div className={`relative ${className}`}>
      <label htmlFor={name} className="mb-1 block text-gray-700">
        {label}
      </label>

      <Field name={name}>
        {({ field, meta }: FieldProps) => (
          <div className="relative">
            <select
              {...field}
              id={name}
              className={`w-full rounded-lg border bg-gray-100 px-2 py-4 text-gray-500 ${
                meta.touched && meta.error
                  ? "border-red-500"
                  : "border-gray-200"
              }`}
              {...rest}
            >
              <option value="">{placeholder}</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.key} {skipCode ? "" : option.code && option.code}
                </option>
              ))}
            </select>
            {showStarIcon && (
              <span
                className={`absolute ${rightPosition} ${leftPosition} top-3 text-red-600`}
              >
                *
              </span>
            )}
          </div>
        )}
      </Field>

      <ErrorMessage
        name={name}
        component={TextError as React.ComponentType<{}>}
      />
    </div>
  );
};

export default CustomSelect;
