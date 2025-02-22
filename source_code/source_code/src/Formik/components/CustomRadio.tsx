import React from "react";
import { Field, ErrorMessage, FieldProps } from "formik";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextError from "./TextError";

interface CustomRadioProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
}

const CustomRadio: React.FC<CustomRadioProps> = ({ label, name, options }) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <Field name={name}>
        {({ field }: FieldProps) => (
          <div>
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
                label={option.label}
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

export default CustomRadio;
