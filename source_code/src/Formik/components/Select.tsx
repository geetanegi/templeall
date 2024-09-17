import React from "react";
import { Field, ErrorMessage, FieldAttributes } from "formik";
import TextError from "./TextError";

interface Option {
  key: string;
  value: string;
  code?: string | null;
}

interface SelectProps extends FieldAttributes<any> {
  label: string;
  name: string;
  options: Option[];
  skipCode?: boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  name,
  options,
  skipCode,
  ...rest
}) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Field as="select" id={name} name={name} {...rest}>
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.key} {skipCode ? "" : option.code ?? ""}
          </option>
        ))}
      </Field>
      <ErrorMessage
        name={name}
        component={TextError as React.ComponentType<{}>}
      />{" "}
    </div>
  );
};

export default Select;
