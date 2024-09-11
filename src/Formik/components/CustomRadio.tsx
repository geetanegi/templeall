import React, { Fragment } from "react";
import { Field, ErrorMessage, FieldProps } from "formik";
import TextError from "./TextError";

interface CustomRadioProps {
  label: string;
  name: string;
  id: string;
  value: string;
  [key: string]: any;
}

const CustomRadio: React.FC<CustomRadioProps> = ({
  label,
  name,
  id,
  value,
  ...rest
}) => {
  return (
    <Field name={name}>
      {({ field }: FieldProps) => (
        <Fragment key={id}>
          <div className="custom-control custom-radio">
            <label className="custom-control-label" htmlFor={id}>
              {label}
            </label>
            <input
              className="custom-control-input"
              type="radio"
              name={name}
              id={id}
              value={value}
              checked={field.value === value}
              {...rest}
            />
            <ErrorMessage
              name={name}
              component={TextError as React.ComponentType<{}>}
            />{" "}
          </div>
        </Fragment>
      )}
    </Field>
  );
};

export default CustomRadio;
