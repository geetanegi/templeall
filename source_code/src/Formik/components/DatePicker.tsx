import React, { useState, useEffect } from "react";
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
  const [isFocused, setIsFocused] = useState(false);
  const [isIncomplete, setIsIncomplete] = useState(false);
  const [error, setError] = useState<boolean | string | null>(false);

  return (
    <div>
      <Field name={name}>
        {({ form, field }: FieldProps) => {
          const { setFieldValue, errors, touched } = form;
          const { value } = field;
          const hasError = Boolean(touched[name] && errors[name]);
          const isDateTyped = Boolean(value);
          const maxDateValue =
            typeof maxDate === "string" ? dayjs(maxDate) : maxDate;

          useEffect(() => {
            if (value) {
              const date = dayjs(value);
              setIsIncomplete(!date.isValid());
            } else {
              setIsIncomplete(false);
            }
          }, [value]);

          const marginTop = () => {
            if (isFocused || isDateTyped || hasError || isIncomplete) {
              return "12px"; // Label should be up for focused, typed, error, or incomplete state
            }
            return "0"; // Default state
          };

          return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div
                style={{
                  position: "relative",
                  // padding: "5px",
                  borderRadius: "5px",
                  //   hasError || isIncomplete ? "" : "rgba(83, 83, 83, 0.8)",
                  transition: "background-color 0.3s ease",
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              >
                <MUIDatePicker
                  label={placeholder}
                  value={value ? dayjs(value) : null}
                  onChange={(newValue: Dayjs | null) => {
                    setFieldValue(
                      name,
                      newValue ? newValue.toISOString() : null,
                    );
                    setIsIncomplete(
                      newValue ? !dayjs(newValue).isValid() : false,
                    );
                  }}
                  onError={(error) => {
                    setError(error);
                    if (error) {
                      setIsIncomplete(true);
                    } else {
                      setIsIncomplete(false);
                    }
                  }}
                  maxDate={maxDateValue}
                  {...rest}
                  sx={{
                    "& .MuiInputBase-root": {
                      // backgroundColor: "transparent",
                      backgroundColor: "rgba(83, 83, 83, 0.8)",
                      color: "white",
                      borderRadius: "5px",
                      border: "1.5px solid",
                      borderColor: hasError || isIncomplete ? "red" : "white",
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
                      color: hasError || isIncomplete ? "red" : "white",
                      position: "absolute",
                      pointerEvents: "none",
                      marginTop: error ? "12px" : marginTop(),
                      "&.Mui-focused": {
                        marginTop: "12px",
                        color: hasError ? "red" : "white",
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
