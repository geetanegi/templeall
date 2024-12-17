import React, { useCallback, useMemo } from "react";
import { Field, ErrorMessage, FieldProps } from "formik";
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

interface SelectProps {
  label: string;
  name: string;
  options: Option[];
  skipCode?: boolean;
  required?: boolean;
  disabled?: boolean;
  onChange?: (event: SelectChangeEvent<string>) => void;
}

const formControlStyles = {
  width: "100%",
  minWidth: "150px",
  "& .MuiInputBase-root": { padding: "4px" },
};

const inputLabelStyles = {
  fontSize: "14px",
  paddingLeft: "10px",
  transform: "translate(0, 12px) scale(1)",
  "&.MuiFormLabel-filled, &.Mui-focused": {
    transform: "translate(0, -6px) scale(0.75)",
    paddingLeft: "15px",
  },
};

const selectStyles = {
  backgroundColor: "#FAFAFA",
  padding: "2px",
  borderRadius: "6px",
  fontSize: "14px",
  "& .MuiSelect-select": { padding: "10px 12px" },
  "&:hover": { backgroundColor: "#f0f0f0" },
};

const MUISelect: React.FC<SelectProps> = ({
  label,
  name,
  options,
  skipCode,
  required = false,
  disabled = false,
  onChange,
}) => {
  const renderedOptions = useMemo(
    () =>
      options?.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.key} {skipCode ? "" : (option.code ?? "")}
        </MenuItem>
      )),
    [options, skipCode],
  );

  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => {
        const handleSelectChange = useCallback(
          (event: SelectChangeEvent<string>) => {
            form.setFieldValue(name, event.target.value);
            onChange?.(event);
          },
          [form, name, onChange],
        );

        return (
          <Box sx={{ minWidth: "200px" }}>
            <FormControl
              fullWidth
              variant="outlined"
              error={Boolean(form.errors[name] && form.touched[name])}
              sx={formControlStyles}
            >
              <InputLabel id={`${name}-label`} sx={inputLabelStyles}>
                <span className="text-[13px]" style={{ display: "flex", alignItems: "center" }}>
                  {label}
                  {required && (
                    <span style={{ color: "red", marginLeft: "0.25rem" }}>
                      *
                    </span>
                  )}
                </span>
              </InputLabel>
              <Select
                labelId={`${name}-label`}
                id={name}
                {...field}
                value={field.value || ""}
                onChange={handleSelectChange}
                disabled={disabled}
                label={label}
                sx={selectStyles}
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                {renderedOptions}
              </Select>
              <FormHelperText sx={{ fontSize: "12px", paddingRight: "0px" }}>
                <ErrorMessage name={name}  />
              </FormHelperText>
            </FormControl>
          </Box>
        );
      }}
    </Field>
  );
};

export default MUISelect;
