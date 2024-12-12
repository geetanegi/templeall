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
  onFocus?: () => void;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  type = "text",
  className = "",
  required = false,
  maxLength,
  validateRegex,
  onFocus = () => {},
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
      <Field
        name={name}
        onFocus={() => {
          onFocus();
        }}
      >
        {({ field, form }: { field: any; form: any }) => {
          return (
            <TextField
              {...field}
              type={type}
              onFocus={() => {
                onFocus();
              }}
              label={
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "rgb(238 235 235)",
                    fontWeight: "normal"
                  }}
                >
                  {label}
                  {required && (
                    <span
                      className="mr-2 text-yellowText"
                      style={{ marginLeft: "0.25rem" }}
                    >
                      *
                    </span>
                  )}
                </span>
              }
              variant="outlined"
              fullWidth
              helperText={<ErrorMessage name={name} component="span" />}
              error={Boolean(form.errors[name] && form.touched[name])}
              inputProps={{ maxLength }}
              onKeyPress={handleKeyPress}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "15px",
                  fontSize: "14px",
                  height: "36px",
                  color: "#ffffff",

                  "& fieldset": {
                    borderColor: "#ffffff", // Default border color
                  },
                  "&:hover fieldset": {
                    borderColor: "#ffffff", // Border color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#ffffff", // Border color when focused
                  },
                  "&.Mui-error fieldset": {
                    borderColor: "#FFDE59", // Border color when there's an error
                  },
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
                "& .MuiInputLabel-root": {
                  color: "rgba(255, 255, 255, 0.7)", // Placeholder color changes on error
                  transform: "translate(14px, 6px) scale(1)", // Adjust initial position for label
                },
                "& .MuiInputLabel-shrink": {
                  transform: "translate(14px, -6px) scale(0.75)", // Position when placeholder shrinks
                },
                "& .MuiFormHelperText-root": {
                  color: "#FFDE59", // Error message color
                },
              }}
            />
          );
        }}
      </Field>
    </div>
  );
};

export default Input;
