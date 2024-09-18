import React from "react";
import { Field, ErrorMessage } from "formik";
import TextField from "@mui/material/TextField";

interface NumberInputProps {
  label: string;
  name: string;
  className?: string;
  required?: boolean;
}

const NumberInput: React.FC<NumberInputProps> = ({
  label,
  name,
  className = "",
  required = false,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = [
      "Backspace",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
      "Tab",
    ];
    if (
      !allowedKeys.includes(event.key) && // Allow backspace, delete, arrows, and tab
      !/^[0-9]$/.test(event.key) // Only allow number keys
    ) {
      event.preventDefault();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = event.clipboardData.getData("text");
    if (!/^\d+$/.test(pasteData)) {
      // Allow only numeric paste data
      event.preventDefault();
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    form: any,
  ) => {
    const { value } = event.target;
    // Only allow numeric values
    if (/^\d*$/.test(value)) {
      form.setFieldValue(name, value);
    }
  };

  return (
    <div className={`mb-4 ${className}`}>
      <Field name={name}>
        {({ field, form }: { field: any; form: any }) => (
          <TextField
            {...field}
            type="text"
            label={
              <span style={{ display: "flex", alignItems: "center" }}>
                {label}
                {required && (
                  <span style={{ color: "red", marginLeft: "0.25rem" }}>*</span>
                )}
              </span>
            }
            variant="filled"
            fullWidth
            required={required}
            helperText={<ErrorMessage name={name} component="span" />}
            error={Boolean(form.errors[name] && form.touched[name])}
            onKeyDown={handleKeyDown} // Restrict key input to numbers
            onPaste={handlePaste} // Restrict paste input to numbers
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e, form)
            } // Restrict change input to numbers
            sx={{
              "& .MuiInputBase-root": {
                backgroundColor: "rgba(83, 83, 83, 0.8)",
                color: "white",
                borderRadius: "5px",
                border: "1.5px solid white",
                "&:hover": {
                  backgroundColor: "rgba(83, 83, 83, 0.8)", // Ensure consistency on hover
                },
                "&.Mui-focused": {
                  backgroundColor: "rgba(83, 83, 83, 0.8)", // Ensure consistency on focus
                  border: "1.5px solid white",
                },
                "&.Mui-error": {
                  backgroundColor: "rgba(83, 83, 83, 0.8) !important", // Ensure consistency on error
                  border: "1.5px solid red !important",
                },
                "&.Mui-error:hover": {
                  backgroundColor: "rgba(83, 83, 83, 0.8) !important", // Ensure consistency on error hover
                  border: "1.5px solid red !important",
                },
                "&.Mui-error.Mui-focused": {
                  backgroundColor: "rgba(83, 83, 83, 0.8) !important", // Ensure consistency on error focus
                  border: "1.5px solid red !important",
                },
              },
              "& .MuiInputLabel-root": {
                color: "white",
                display: "flex",
                alignItems: "center",
                "&.Mui-focused": {
                  color: "white",
                },
                // Hide default asterisk
                "& .MuiInputLabel-asterisk": {
                  visibility: "hidden",
                },
              },
              "& .MuiInputBase-input": {
                color: "white",
                // Autofill styles to maintain color consistency
                "&:-webkit-autofill": {
                  WebkitBoxShadow:
                    "0 0 0 100px rgba(83, 83, 83, 0.8) inset !important", // Ensures background color consistency
                  WebkitTextFillColor: "white !important", // Ensures text color consistency
                },
                "&:-webkit-autofill:hover": {
                  WebkitBoxShadow:
                    "0 0 0 100px rgba(83, 83, 83, 0.8) inset !important", // Ensures background color consistency on hover
                  WebkitTextFillColor: "white !important", // Ensures text color consistency on hover
                },
                "&:-webkit-autofill:focus": {
                  WebkitBoxShadow:
                    "0 0 0 100px rgba(83, 83, 83, 0.8) inset !important", // Ensures background color consistency on focus
                  WebkitTextFillColor: "white !important", // Ensures text color consistency on focus
                },
              },
              "& .MuiFormHelperText-root": {
                color: "red",
                marginLeft: "5px",
              },
            }}
          />
        )}
      </Field>
    </div>
  );
};

export default NumberInput;
