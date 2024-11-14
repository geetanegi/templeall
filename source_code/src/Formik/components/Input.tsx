// Input.tsx
import React from "react";
import { Field, ErrorMessage } from "formik";
import TextField from "@mui/material/TextField";

interface InputProps {
  label: string;
  name: string;
  type?: string;
  className?: string;
  required?: boolean;
  maxLength?: number;
  validateRegex?: RegExp;
  authFlow?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  type = "text",
  className = "",
  required = false,
  maxLength,
  validateRegex,
  authFlow,
}) => {
  // Function to validate input and block special characters and spaces
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const char = String.fromCharCode(event.which);
    // Check if the character is not alphanumeric
    if (validateRegex) {
      if (!validateRegex.test(char)) {
        event.preventDefault(); // Block the input
      }
    }
  };

  return (
    <div className={`mb-4 ${className}`}>
      <Field name={name}>
        {({ field, form }: { field: any; form: any }) => (
          <TextField
            {...field}
            type={type}
            label={
              <span style={{ display: "flex", alignItems: "center" }}>
                {label}
                {required && (
                  <span
                    style={{
                      color: authFlow ? "#FFDE59" : "red",
                      marginLeft: "0.25rem",
                    }}
                  >
                    *
                  </span>
                )}
              </span>
            }
            variant="filled"
            fullWidth
            InputLabelProps={{ shrink: true }}
            helperText={
              <span
                style={{
                  color: authFlow ? "#FFDE59" : "red",
                  fontSize: "0.875rem",
                }}
              >
                <ErrorMessage name={name} component="span" />
              </span>
            }
            error={Boolean(form.errors[name] && form.touched[name])}
            inputProps={{ maxLength }}
            onKeyPress={handleKeyPress} // Attach the key press handler
            sx={{
              "& .MuiInputBase-root": {
                backgroundColor: "#00000099",
                color: "white",
                borderRadius: "5px",
                border: "1.5px solid white",
                "&:hover": {
                  backgroundColor: "#00000099", // Ensure consistency on hover
                },
                "&.Mui-focused": {
                  backgroundColor: "#00000099", // Ensure consistency on focus
                  border: "1.5px solid white",
                },
                "&.Mui-error": {
                  backgroundColor: "#00000099 !important", // Ensure consistency on error
                  border: `1.5px solid ${authFlow ? "#FFDE59" : "red"} !important`,
                },
                "&.Mui-error:hover": {
                  backgroundColor: "#00000099 !important", // Ensure consistency on error hover
                  border: `1.5px solid ${authFlow ? "#FFDE59" : "red"} !important`,
                },
                "&.Mui-error.Mui-focused": {
                  backgroundColor: "#00000099 !important", // Ensure consistency on error focus
                  border: `1.5px solid ${authFlow ? "#FFDE59" : "red"} !important`,
                },
              },
              "& .MuiInputLabel-root": {
                color: "white",
                display: "flex",
                alignItems: "center",
                "&.Mui-focused": {
                  color: "white",
                },
                "&.Mui-error": {
                  color: `${authFlow ? "#FFDE59" : "red"}`, // Custom color for error label
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
                  WebkitBoxShadow: "0 0 0 100px #00000099 inset !important", // Ensures background color consistency
                  WebkitTextFillColor: "white !important", // Ensures text color consistency
                },
                "&:-webkit-autofill:hover": {
                  WebkitBoxShadow: "0 0 0 100px #00000099 inset !important", // Ensures background color consistency on hover
                  WebkitTextFillColor: "white !important", // Ensures text color consistency on hover
                },
                "&:-webkit-autofill:focus": {
                  WebkitBoxShadow: "0 0 0 100px #00000099 inset !important", // Ensures background color consistency on focus
                  WebkitTextFillColor: "white !important", // Ensures text color consistency on focus
                },
              },
              "& .MuiFormHelperText-root": {
                color: `${authFlow ? "#FFDE59" : "red"}`,
                marginLeft: "5px",
              },
            }}
          />
        )}
      </Field>
    </div>
  );
};

export default Input;
