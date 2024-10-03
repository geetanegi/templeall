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
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Optional onChange prop
}

const RadioButtons: React.FC<RadioButtonsProps> = ({
  label,
  name,
  options,
  className,
  disabled = false,
  onChange, // Destructure onChange prop
}) => {
  return (
    <FormControl component="fieldset" className={className} disabled={disabled}>
      <FormLabel component="legend">{label}</FormLabel>
      <Field name={name}>
        {({ field, form }: FieldProps) => (
          <div>
            {options.map((option) => (
              <FormControlLabel
                sx={{
                  "& .MuiTypography-root": {
                    fontWeight: "bold",
                    fontSize: "14px",
                  },
                }}
                key={option.value}
                control={
                  <Radio
                    {...field}
                    value={option.value}
                    checked={field.value === option.value}
                    disabled={disabled}
                    onChange={(event) => {
                      // Update Formik field value
                      form.setFieldValue(name, event.target.value);

                      // Call the additional onChange logic if provided
                      if (onChange) {
                        onChange(event);
                      }
                    }}
                  />
                }
                label={option.key}
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
