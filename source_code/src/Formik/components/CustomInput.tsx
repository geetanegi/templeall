import React from "react";
import { Field, ErrorMessage, FieldProps } from "formik";
import TextError from "./TextError";

interface InputProps {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
}

const CustomInput: React.FC<InputProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  className,
  ...rest
}) => {
  return (
    <div className={`relative ${className}`}>
      <Field name={name}>
        {({ field, meta }: FieldProps) => (
          <>
            <input
              {...field}
              type={type}
              id={name}
              placeholder={placeholder || label}
              className={`rounded-lg border bg-gray-100 px-2 py-3 text-gray-500 ${
                meta.touched && meta.error && typeof meta.error === "string"
                  ? "border-red-500"
                  : "border-gray-200"
              } w-full`}
              {...rest}
            />
            <span
              className={`pointer-events-none absolute left-[45%] top-3 text-red-600 ${
                field.value ? "hidden" : ""
              }`}
            >
              *
            </span>
          </>
        )}
      </Field>
      <ErrorMessage
        name={name}
        component={TextError as React.ComponentType<{}>}
      />
    </div>
  );
};

export default CustomInput;
