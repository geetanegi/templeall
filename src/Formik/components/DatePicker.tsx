import React from "react";
import { Field, ErrorMessage, FieldProps } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker as MUIDatePicker } from "@mui/x-date-pickers/DatePicker";
import TextError from "./TextError"; // Ensure you have this component for error messages
import dayjs, { Dayjs } from "dayjs";

interface DatePickerProps {
  label: string;
  name: string;
  placeholder?: string;
  [key: string]: any;
  maxDate?: Dayjs | string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  name,
  placeholder,
  maxDate,
  ...rest
}) => {
  return (
    <div>
      <Field name={name}>
        {({ form, field }: FieldProps) => {
          const { setFieldValue, errors, touched } = form;
          const { value } = field;
          const hasError = Boolean(touched[name] && errors[name]);
          const isValuePresent = Boolean(value); // Check if value is present
          // Convert maxDate to Dayjs object if it's a string
          const maxDateValue =
            typeof maxDate === "string" ? dayjs(maxDate) : maxDate;

          return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div style={{ position: "relative" }}>
                <MUIDatePicker
                  label={placeholder}
                  value={value ? dayjs(value) : null}
                  onChange={(newValue: Dayjs | null) => {
                    setFieldValue(
                      name,
                      newValue ? newValue.toISOString() : null,
                    );
                  }}
                  maxDate={maxDateValue}
                  {...rest}
                  sx={{
                    "& .MuiInputBase-root": {
                      backgroundColor: "rgba(83, 83, 83, 0.8)",
                      color: "white",
                      borderRadius: "5px",
                      border: "1.5px solid",
                      borderColor: hasError ? "red" : "white",
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: hasError ? "red" : "lightgray",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: hasError ? "red" : "white",
                        borderWidth: "0",
                      },
                      "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                        borderColor: "red !important",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "white",
                      position: "absolute",
                      left: "10px",
                      top: isValuePresent ? "35%" : "50%", // Adjust based on value presence
                      transform: isValuePresent
                        ? "translateY(-100%)"
                        : "translateY(-50%)",
                      transition: "0.2s",
                      padding: "0 4px",
                      pointerEvents: "none",
                      fontSize: isValuePresent ? "0.75rem" : "1rem", // Smaller font when focused
                      "&.Mui-focused": {
                        top: "35%",
                        left: "10px",
                        transform: "translateY(-100%)",
                        fontSize: "0.75rem",
                        color: "white",
                      },
                    },
                    "& .MuiFormHelperText-root": {
                      color: "red",
                      marginLeft: "5px",
                    },
                  }}
                />
              </div>
            </LocalizationProvider>
          );
        }}
      </Field>
      <ErrorMessage
        name={name}
        component={TextError as React.ComponentType<{}>}
      />
    </div>
  );
};

export default DatePicker;
