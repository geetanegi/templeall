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
                    fontWeight: "normal",
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
                    borderColor: "#FFDE59", 
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
                "& .MuiFormHelperText-root": {
                  color: () =>
                    Boolean(form.errors[name] && form.touched[name])
                      ? "#FFDE59"
                      : "rgba(255, 255, 255, 0.7)", 
                  fontSize: "12px", 
                  marginTop: "4px", 
                },

                "& .MuiInputLabel-root": {
                  color: "rgba(255, 255, 255, 0.7)",
                  transform: "translate(14px, 6px) scale(1)", 
                },
                "& .MuiInputLabel-shrink": {
                  transform: "translate(14px, -6px) scale(0.75)",
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
