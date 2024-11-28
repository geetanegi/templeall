import React, { useState, useEffect } from "react";
import { Field, ErrorMessage, FieldProps } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs, { Dayjs } from "dayjs";

interface DatePickerProps {
  label: string;
  name: string;
  placeholder?: string;
  maxDate?: Dayjs | string;
  required?: boolean;
  authFlow?: boolean;
  [key: string]: any;
}

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  name,
  placeholder,
  maxDate,
  required = false,
  authFlow,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isIncomplete, setIsIncomplete] = useState(false);
  const [error, setError] = useState<boolean | string | null>(false);

  return (
    <div className="mb-[20px]">
      <Field name={name}>
        {({ form, field }: FieldProps) => {
          const { setFieldValue, setTouched, errors, touched } = form;
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

          const labelMarginTop = () => {
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
                  borderRadius: "12px",
                  transition: "background-color 0.3s ease",
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => {
                  setIsFocused(false);
                  setTouched({ ...touched, [name]: true }); // Mark field as touched on blur
                }}
              >
                <label
                  htmlFor={name}
                  className="mb-1 block text-sm font-thin text-white"
                >
                  {label}
                  {required && (
                    <span
                      className={authFlow ? "text-yellow-400" : "text-red-500"}
                    >
                      {" "}
                      *
                    </span>
                  )}
                </label>
                <DesktopDatePicker
                  value={value ? dayjs(value) : null}
                  onChange={(newValue: Dayjs | null) => {
                    setFieldValue(
                      name,
                      newValue ? newValue?.format("MM/DD/YYYY") : null, // Store the formatted date
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
                      backgroundColor: "transparent",
                      color: "white",
                      borderRadius: "12px",
                      border: "1.5px solid", // Ensure border is visible
                      borderColor: hasError ? "#ffde59 !important" : "white", // Cyan border on error, force it with !important
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: hasError ? "#ffde59" : "lightgray",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: hasError ? "cyan" : "",
                        borderWidth: "0",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: hasError || isIncomplete ? "#ffde59" : "white",
                      position: "absolute",
                      pointerEvents: "none",
                      marginTop: error ? "12px" : labelMarginTop(),
                      "&.Mui-focused": {
                        marginTop: "12px",
                        color: hasError ? "cyan" : "white", // Change label color to cyan on error
                      },
                    },
                    "& .MuiSvgIcon-fontSizeMedium": {
                      color: "#ffffff",
                    },
                    "& .MuiFormHelperText-root": {
                      color: "#ffde59",
                      marginLeft: "5px",
                    },
                    "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
                      padding: "5px 16px",
                      fontSize: "14px",
                    },
                    "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                      borderColor: "cyan !important", // Force cyan border color on error
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
        component="div"
        className={`text-[11px] ${authFlow ? "text-yellow-400" : "text-red-500"}`}
      />
    </div>
  );
};

export default DatePicker;
