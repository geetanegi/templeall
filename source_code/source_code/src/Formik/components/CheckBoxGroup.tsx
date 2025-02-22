import React, { Fragment } from "react";
import { Field, ErrorMessage, FieldProps } from "formik";
import TextError from "./TextError";

interface Option {
  key: string;
  value: string;
}

interface CheckBoxGroupProps {
  label: string;
  name: string;
  options: Option[];
  [key: string]: any;
}

const CheckBoxGroup: React.FC<CheckBoxGroupProps> = ({
  label,
  name,
  options,
  ...rest
}) => {
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <Field name={name}>
        {({ field }: FieldProps) => {
          return options.map((option) => (
            <Fragment key={option.key}>
              <input
                type="checkbox"
                id={option.value}
                {...field}
                {...rest}
                value={option.value}
                checked={field.value.includes(option.value)}
              />
              <label htmlFor={option.value}>{option.key}</label>
            </Fragment>
          ));
        }}
      </Field>
      <ErrorMessage
        name={name}
        component={TextError as React.ComponentType<{}>}
      />
    </div>
  );
};

export default CheckBoxGroup;
