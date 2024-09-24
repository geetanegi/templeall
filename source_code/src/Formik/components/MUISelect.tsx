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
        <Box sx={{ minWidth: "200px" }}>
          {" "}
          {/* Define the minimum width */}
          <FormControl
            fullWidth
            variant="outlined"
            error={Boolean(form.errors[name] && form.touched[name])}
            sx={{
              // Control the overall width of the select component
              width: "100%", // This ensures it adapts to parent width or can be set explicitly like '300px'
              minWidth: "150px", // Reduce default width
              "& .MuiInputBase-root": {
                padding: "4px", // Reduce default padding inside the Select
              },
            }}
          >
            <InputLabel
              id={`${name}-label`}
              sx={{
                fontSize: "14px", // Reduce label font size
                paddingLeft: "4px", // Reduce label padding
              }}
            >
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
              value={field.value || ""}
              onChange={(event: SelectChangeEvent<string>) => {
                // Ensure form value is updated
                form.setFieldValue(name, event.target.value);

                // If additional logic is needed when changing the value (e.g., reset dependent fields), it can be added here.
                if (rest.onChange) {
                  rest.onChange(event); // Call any additional onChange logic passed via props
                }
              }}
              disabled={disabled}
              label={label}
              sx={{
                backgroundColor: "#FAFAFA",
                padding: "6px", // Reduce the padding inside the select
                borderRadius: "6px", // Reduce border radius
                fontSize: "14px", // Adjust font size to make it smaller
                "& .MuiSelect-select": {
                  padding: "8px 12px", // Reduce the internal padding of the text inside the select
                },
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  // borderColor: "blue", // Custom focus border color
                },
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
            <FormHelperText
              sx={{
                paddingLeft: "4px", // Reduce padding for helper text
                fontSize: "12px", // Reduce font size for helper text
              }}
            >
              <ErrorMessage name={name} />
            </FormHelperText>
          </FormControl>
        </Box>
      )}
    </Field>
  );
};

export default MUISelect;
