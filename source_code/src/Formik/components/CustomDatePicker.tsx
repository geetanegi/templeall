import React from "react";
import { Field, FieldProps } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";

interface DatePickerProps {
  label?: string;
  name: string;
  placeholder?: string;
  maxDate?: Dayjs | string;
  [key: string]: any;
  required?: boolean;
  minDate?: Dayjs | string;
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
  const minDateValue = typeof minDate === "string" ? dayjs(minDate) : minDate;
  return (
    <div>
      <Field name={name}>
        {({ form, field, meta }: FieldProps) => {
          const { setFieldValue } = form;
          const { value } = field;

          return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div>
                <DateTimePicker
                  // label={label}
                  label={
                    <span style={{ display: "flex", alignItems: "center" }}>
                      {label}
                      {required && (
                        <span style={{ color: "red", marginLeft: "0.25rem" }}>
                          *
                        </span>
                      )}
                    </span>
                  }
                  minDate={minDateValue}
                  {...field}
                  {...rest}
                  value={value ? dayjs(value) : null}
                  onChange={(newValue: Dayjs | null) => {
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
                      // helperText: ,
                      // helperText: (
                      //   <ErrorMessage
                      //     name={name}
                      //     component={TextError as React.ComponentType<{}>}
                      //   />
                      // ),
                      sx: {
                        "& .MuiInputBase-root-MuiOutlinedInput-root": {
                          // backgroundColor: "#FAFAFA",
                        },
                        width: "100%",
                        // borderRadius: "10px",
                        // // border: `2px solid ${meta.error && meta.touched ? "red" : "gray.500"}`,
                        // padding: "2",
                        // color: "gray.500",
                        "& .MuiInputBase-root": {
                          borderRadius: "10px",
                          backgroundColor: "#FAFAFA",
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
