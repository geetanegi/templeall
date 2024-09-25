import React from "react";
import { Field, ErrorMessage, FieldProps } from "formik";
import TextField from "@mui/material/TextField";

interface InputProps {
  label: string;
  name: string;
  type?: string;
  className?: string;
  required?: boolean;
  maxLength?: number;
  disabled?: boolean;
}

const MUINumber: React.FC<InputProps> = ({
  label,
  name,
  type = "text",
  className = "",
  required = false,
  maxLength,
  disabled = false,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = [
      "Backspace",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
      "Tab",
    ];
    if (!allowedKeys.includes(event.key) && !/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = event.clipboardData.getData("text");
    if (!/^\d+$/.test(pasteData)) {
      event.preventDefault();
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    form: FieldProps["form"],
  ) => {
    const { value } = event.target;
    if (/^\d*$/.test(value)) {
      form.setFieldValue(name, value);
    }
  };

  return (
    <div className={`mb-4 ${className}`}>
      <Field name={name}>
        {({ field, form }: FieldProps) => (
          <TextField
            {...field}
            type={type}
            label={
              <span>
                {label}
                {required && <span className="ml-1 text-red-500">*</span>}
              </span>
            }
            disabled={disabled}
            className="w-full"
            helperText={<ErrorMessage name={name} component="span" />}
            error={Boolean(form.errors[name] && form.touched[name])}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e, form)
            }
            inputProps={{ maxLength }}
            sx={{

              "& .MuiInputBase-root": {
                borderRadius: "5px",
                backgroundColor: "#FAFAFA",
                padding: "6px", // Adjust padding as needed
                margin: 0, // Remove margin if needed
                // border: "1px solid #CACACA", // Adjust or remove border
              },
              "& .MuiInputBase-input": {
                padding: "6px",
                fontSize: "14px" // Adjust input padding to align with your design
              },
              "& .MuiFormHelperText-root": {
                margin: 0, // Remove margin from helper text
              },
              "& .MuiOutlinedInput-notchedOutline": {
                // borderColor: "#CACACA", // Adjust border color
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                // borderColor: "#CACACA", // Adjust border color on hover
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                // borderColor: "#CACACA", // Adjust border color when focused
              },
              "& .MuiInputLabel-root": {
                fontSize: '14px',
              }
            }}
          />
        )}
      </Field>
    </div>
  );
};

export default MUINumber;
