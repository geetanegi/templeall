import React from "react";
import { Field, ErrorMessage, FieldAttributes, FieldProps } from "formik";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";

interface Option {
  key: string | number;
  value: string | number;
  code?: string | null;
}

interface SelectProps extends FieldAttributes<any> {
  label: string;
  name: string;
  options: Option[];
  skipCode?: boolean;
  required?: boolean;
  disabled?: boolean;
}

const MUISelect: React.FC<SelectProps> = ({
  label,
  name,
  options,
  skipCode,
  required = false,
  disabled = false,
  ...rest
}) => {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => (
        <Box sx={{ minWidth: 120 }}>
          <FormControl
            fullWidth
            variant="outlined"
            error={Boolean(form.errors[name] && form.touched[name])}
          >
            <InputLabel id={`${name}-label`}>
              <span style={{ display: "flex", alignItems: "center" }}>
                {label}
                {required && (
                  <span style={{ color: "red", marginLeft: "0.25rem" }}>*</span>
                )}
              </span>
            </InputLabel>
            <Select
              labelId={`${name}-label`}
              id={name}
              {...field}
              {...rest}
              value={field.value || ""} // Set default value to empty string if undefined
              onChange={(event: SelectChangeEvent<string>) => {
                form.setFieldValue(name, event.target.value);
              }}
              disabled={disabled}
              className={`w-full rounded-lg border px-2 text-gray-500`}
              label={label}
              sx={{
                backgroundColor: "#FAFAFA",
                borderRadius: "10px",
              }}
            >
              <MenuItem value="">
                <em>Select</em>
              </MenuItem>
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.key} {skipCode ? "" : (option.code ?? "")}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              <ErrorMessage name={name} />
            </FormHelperText>
          </FormControl>
        </Box>
      )}
    </Field>
  );
};

export default MUISelect;
