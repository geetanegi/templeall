import React from "react";
import { Field, FieldProps } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import moment, { Moment } from "moment";

interface DatePickerProps {
  label?: string;
  name: string;
  placeholder?: string;
  maxDate?: Moment | string;
  required?: boolean;
  minDate?: Moment | string;
  [key: string]: any;
}

const CustomDatePicker: React.FC<DatePickerProps> = ({
  label,
  name,
  placeholder,
  maxDate,
  required,
  minDate,
  ...rest
}) => {
  const minDateValue = typeof minDate === "string" ? moment(minDate) : minDate;
  const maxDateValue = typeof maxDate === "string" ? moment(maxDate) : maxDate;

  return (
    <div>
      <Field name={name}>
        {({ form, field, meta }: FieldProps) => {
          const { setFieldValue } = form;
          const { value } = field;

          return (
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <div>
                <DateTimePicker
                  label={
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "14px",
                        padding: "0",
                      }}
                    >
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
                      newValue ? newValue.toISOString() : null,
                    );
                  }}
                  onError={(error) => {
                    console.log("error", error);
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
                          height: "48px",
                        },
                      },
                    },
                  }}
                />
              </div>
            </LocalizationProvider>
          );
        }}
      </Field>
    </div>
  );
};

export default CustomDatePicker;
