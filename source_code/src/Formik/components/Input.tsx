// Input.tsx
import React from "react";
import { Field, ErrorMessage } from "formik";

interface InputProps {
  label: string;
  name: string;
  type?: string;
  className?: string;
  required?: boolean;
  maxLength?: number;
  validateRegex?: RegExp;
  authFlow?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  type = "text",
  className = "",
  required = false,
  maxLength,
  validateRegex,
  authFlow,
}) => {
  // Function to validate input and block special characters and spaces
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const char = String.fromCharCode(event.which);
    // Check if the character is not alphanumeric
    if (validateRegex) {
      if (!validateRegex.test(char)) {
        event.preventDefault(); // Block the input
      }
    }
  };

  return (
    <div className={` ${className}`}>
      {name !== "countryCode" ? (
        <label
          htmlFor={name}
          className="mb-1 block text-sm font-thin text-white"
        >
          {label}
          {required && (
            <span className={authFlow ? "text-[#FFDE59]" : "text-red-500"}>
              {" "}
              *
            </span>
          )}
        </label>
      ) : null}
      <Field name={name}>
        {({ field, form }: { field: any; form: any }) => {
          const { value } = field;

          if (name === "countryCode" && !value) {
            form.setFieldValue(name, "+1");
          }
          return (
            <div>
              <input
                {...field}
                id={name}
                type={type}
                maxLength={maxLength}
                onKeyPress={handleKeyPress}
                className={`mb-[2px] w-full h-[40px] border bg-transparent px-4 py-[5px] text-white ${
                  form.errors[name] && form.touched[name]
                    ? authFlow
                      ? "border-[#FFDE59]"
                      : "border-red-500"
                    : "border-white"
                } rounded-[15px] focus:outline-none ${
                  form.errors[name] && form.touched[name]
                    ? authFlow
                      ? "focus:border-[#FFDE59] focus:ring-0"
                      : "focus:border-red-500 focus:ring-0"
                    : "focus:border-white focus:ring-0"
                } placeholder:pr-10`}
                placeholder={label}
              />
              <ErrorMessage
                name={name}
                component="div"
                className={`text-[11px] ${
                  authFlow ? "text-[#FFDE59]" : "text-red-500"
                }`}
              />
            </div>
          );
        }}
      </Field>
    </div>
  );
};

export default Input;
