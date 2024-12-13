import React from "react";
import { Field, FieldProps } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment, { Moment } from "moment";

interface DatePickerProps {
  label?: string;
  name: string;
  placeholder?: string;
  maxDate?: Moment | string;    
  minDate?: Moment | string;
  required?: boolean;
  [key: string]: any;
}

const CustomDatePicker: React.FC<DatePickerProps> = ({
  label,
  name,
  maxDate,
  minDate,
  required,
  ...rest
}) => {
  const minDateValue = typeof minDate === "string" ? moment(minDate) : minDate;
  const maxDateValue = typeof maxDate === "string" ? moment(maxDate) : maxDate;
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Field name={name}>
        {({ form, field, meta }: FieldProps) => {
          const { setFieldValue, setFieldTouched } = form;
          const { value } = field;

          return (
            <div onClick={()=> setFieldTouched(name, true)}>
              <DatePicker
                label={
                  <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "rgb(238 235 235)",  
                    fontWeight: "normal",
                  }}
                >
                  {label}
                  {required && (
                    <span
                      className="mr-2 text-loginValidationColor"
                      style={{ marginLeft: "0.25rem" }}
                    >
                      *
                    </span>
                  )}
                </span>
                }
                minDate={minDateValue}
                maxDate={maxDateValue}
                {...field}
                {...rest}
                value={value ? moment(value) : null}
                onChange={(newValue: Moment | null) => {
                  setFieldValue(
                    name,
                    newValue ? moment(newValue.toISOString()).format('YYYY-MM-DD') : null,
                  );
                }}
                
                
                slotProps={{
                  actionBar: {
                      actions: ["accept"],
                    },
                  textField: {
                      error: Boolean(meta.error && meta.touched),
                      helperText: meta.touched && meta.error,
  
                      sx: {
                        "& .MuiOutlinedInput-root": { 
                          borderRadius: "15px",
                          fontSize: "14px",
                          height: "40px",
                          color: "#ffffff",
                          "& fieldset": {
                            borderColor: "#ffffff",
                          },
                          "&:hover fieldset": {
                            borderColor: "#ffffff",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#ffffff",
                          },
                          "&.Mui-error fieldset": {
                            borderColor: "#FFFF00",
                          },
                        },
                        "& .MuiSvgIcon-root": {
                          color: "rgba(255, 255, 255, 0.7)"
                        },
                        "& .MuiInputBase-input": {
                          padding: "8px 14px",
                          fontSize: "14px",
                          height: "100%",
                          "&:-webkit-autofill": {
                            WebkitBoxShadow: "0 0 0px 1000px transparent inset",
                            WebkitTextFillColor: "#fff",
                            transition: "background-color 5000s ease-in-out 0s",
                          },
                        },
                        "& .MuiFormHelperText-root": {
                          color: () =>
                            Boolean(form.errors[name] && form.touched[name])
                              ? "#FFFF00"
                              : "rgba(255, 255, 255, 0.7)",
                          fontSize: "11px",
                          marginTop: "4px",
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255, 255, 255, 0.7)",
                          transform: "translate(14px, 8px) scale(1)",
                        },
                        "& .MuiInputLabel-shrink": {
                          color: "rgba(255, 255, 255, 0.7)",
                          transform: "translate(14px, -6px) scale(0.75)",
                        },
                      },
                    },
                }}
              />
            </div>
          );
        }}
      </Field>
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
