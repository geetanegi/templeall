import React from "react";
import { Field, ErrorMessage, FieldProps } from "formik";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextError from "./TextError";

interface Option {
  key: string;
  value: string;
}

interface RadioButtonsProps {
  label: string;
  name: string;
  options: Option[];
  className?: string; // Optional className prop
  disabled?: boolean;
}

const RadioButtons: React.FC<RadioButtonsProps> = ({
  label,
  name,
  options,
  className,
  disabled = false,
}) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <Field name={name}>
        {({ field }: FieldProps) => (
          <div className={className}>
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                control={
                  <Radio
                    {...field}
                    value={option.value}
                    checked={field.value === option.value}
                  />
                }
                label={option.key}
                disabled={disabled}
              />
            ))}
            <ErrorMessage
              name={name}
              component={TextError as React.ComponentType<{}>}
            />
          </div>
        )}
      </Field>
    </FormControl>
  );
};

export default RadioButtons;
