import React from "react";
import { ErrorMessage } from "formik";
import TextError from "./TextError";

interface CustomCheckboxProps {
  label: string;
  name: string;
  id: string;
  isChecked?: boolean;
  [key: string]: any;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  label,
  name,
  id,
  isChecked,
  ...rest
}) => {
  return (
    <div className="custom-control custom-checkbox">
      <label className="custom-control-label" htmlFor={id}>
        {label}
      </label>
      <input
        className="custom-control-input"
        type="checkbox"
        name={name}
        id={id}
        checked={isChecked}
        {...rest}
      />
      <ErrorMessage
        name={name}
        component={TextError as React.ComponentType<{}>}
      />{" "}
    </div>
  );
};

export default CustomCheckbox;
