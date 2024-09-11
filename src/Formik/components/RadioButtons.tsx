import React, { Fragment } from "react";
import { Field, ErrorMessage, FieldProps } from "formik";
import TextError from "./TextError";

interface Option {
  key: string;
  value: string;
}

interface RadioButtonsProps {
  label: string;
  name: string;
  options: Option[];
  idstart: string;
  [key: string]: any;
}

const RadioButtons: React.FC<RadioButtonsProps> = ({
  label,
  name,
  options,
  idstart,
  ...rest
}) => {
  return (
    <div>
      <Field name={name}>
        {({ field }: FieldProps) => {
          return options.map((option) => (
            <Fragment key={option.key}>
              <div className="custom-control custom-radio">
                <input
                  type="radio"
                  {...field}
                  {...rest}
                  id={`${idstart}-${option.value}`}
                  value={option.value}
                  checked={field.value === option.value}
                />
                <label
                  className="custom-control-label"
                  htmlFor={`${idstart}-${option.value}`}
                >
                  {option.key}
                </label>
              </div>
            </Fragment>
          ));
        }}
      </Field>
      <ErrorMessage
        name={name}
        component={TextError as React.ComponentType<{}>}
      />{" "}
    </div>
  );
};

export default RadioButtons;
