import React from "react";
import { Field, FieldProps } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import moment, { Moment } from "moment";

interface TimePickerProps {
  label?: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  minTime?: Moment | string;
  maxTime?: Moment | string;
  CustomClockIcon?:any
  [key: string]: any;

}

const CustomTimePicker: React.FC<TimePickerProps> = ({
  label,
  name,
  required,
  minTime,
  maxTime,
  CustomClockIcon,
  ...rest
}) => {

    const minTimeValue =minTime ? moment(minTime, "HH:mm") : undefined; 
  const maxTimeValue = typeof maxTime === "string" ? moment(maxTime, "HH:mm") : maxTime;
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Field name={name}>
        {({ form, field, meta }: FieldProps) => {
          const { setFieldValue } = form;
          const { value } = field;

          return (
            <TimePicker
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
              minTime={minTimeValue}
              maxTime={maxTimeValue}
              value={value ? moment(value) : null}
              onChange={(newValue: Moment | null) => {
                setFieldValue(name, newValue ? moment(newValue.toISOString()).format('HH:mm:ss.SSS') : null);
              }}
              {...rest}
              slots={CustomClockIcon && {
                openPickerIcon: () => CustomClockIcon, // Replaces the clock icon
              }}
              slotProps={{
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

export default CustomTimePicker;
