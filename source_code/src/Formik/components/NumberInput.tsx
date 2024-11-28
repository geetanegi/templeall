import React from "react";
import { Field, ErrorMessage } from "formik";
import TextField from "@mui/material/TextField";

interface NumberInputProps {
  label: string;
  name: string;
  className?: string;
  required?: boolean;
  authFlow?: boolean;
  maxLength?: number;
  placeholder?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({
  label,
  name,
  className = "",
  required = false,
  authFlow = false,
  maxLength,
  placeholder,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = [
      "Backspace",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
      "Tab",
    ];
    if (
      !allowedKeys.includes(event.key) && // Allow backspace, delete, arrows, and tab
      !/^[0-9]$/.test(event.key) // Only allow number keys
    ) {
      event.preventDefault();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = event.clipboardData.getData("text");
    if (!/^\d+$/.test(pasteData)) {
      // Allow only numeric paste data
      event.preventDefault();
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    form: any,
  ) => {
    const { value } = event.target;
    // Only allow numeric values
    if (/^\d*$/.test(value) && (!maxLength || value.length <= maxLength)) {
      form.setFieldValue(name, value);
    }
  };

  return (
    <div className={`mb-[20px] ${className}`}>
      <label htmlFor={name} className="mb-1 block text-sm font-thin text-white">
        {label}
        {required && (
          <span className={authFlow ? "text-yellow-400" : "text-red-500"}>
            {" "}
            *
          </span>
        )}
      </label>
      <Field name={name}>
        {({ field, form }: { field: any; form: any }) => (
          <div>
            <input
              {...field}
              id={name}
              type="text"
              maxLength={maxLength}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              className={`w-full border bg-transparent px-4 py-[5px] text-white ${
                form.errors[name] && form.touched[name]
                  ? authFlow
                    ? "border-yellow-400"
                    : "border-red-500"
                  : "border-white"
              } rounded-[12px] focus:outline-none ${
                form.errors[name] && form.touched[name]
                  ? authFlow
                    ? "focus:border-yellow-400 focus:ring-0"
                    : "focus:border-red-500 focus:ring-0"
                  : "focus:border-white focus:ring-0"
              } `}
              placeholder={placeholder}
            />
            <ErrorMessage
              name={name}
              component="div"
              className={`text-[11px] ${
                authFlow ? "text-yellow-400" : "text-red-500"
              }`}
            />
          </div>
        )}
      </Field>
    </div>
  );
};

export default NumberInput;
