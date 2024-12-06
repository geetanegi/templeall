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
          const { setFieldValue } = form;
          const { value } = field;

          return (
            <DatePicker
              label={
                <span style={{ fontSize: "14px" }}>
                  {label}
                  {required && (
                    <span style={{ color: "red", marginLeft: "0.25rem" }}>
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
                      "& .MuiInputBase-root-MuiOutlinedInput-root": {},
                      width: "100%",
                      "& .MuiInputBase-root": {
                        borderRadius: "5px",
                        backgroundColor: "#FAFAFA",
                        fontSize: "14px",
                        padding: "0px 16px 0px 6px",
                        height: "46px",
                      },
                      // Center label in empty state
                      "& .MuiInputLabel-root": {
                        fontSize: "14px",
                        paddingLeft: "10px",
                        transform: "translate(0, 12px) scale(1)", // Center in the empty state
                      },
                      // Adjust label when field is filled or focused
                      "& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-root.MuiFormLabel-filled":
                        {
                          transform: "translate(0, -6px) scale(0.75)", // Float the label when focused
                          paddingLeft: "15px", // Adjust padding when the field is focused
                        },
                    },
                  },
              }}
            />
          );
        }}
      </Field>
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
