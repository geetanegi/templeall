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
  onFocus?:()=>void
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  type = "text",
  className = "",
  required = false,
  maxLength,
  validateRegex,
  onFocus=()=>{}
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
      <Field name={name} onFocus={()=>{
              onFocus()}}>
        {({ field, form }: { field: any; form: any }) => (
          <TextField
            {...field}
            type={type}
            onFocus={()=>{
              onFocus()}}
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
            helperText={<ErrorMessage name={name} component="span" />}
            error={Boolean(form.errors[name] && form.touched[name])}
            inputProps={{ maxLength }}
            onKeyUp={handleKeyPress} // Attach the key press handler
            sx={{
              "& .MuiInputBase-root-MuiOutlinedInput-root": {},
              width: "100%",
              "& .MuiInputBase-root": {
                borderRadius: "5px",
                backgroundColor: "#FAFAFA",
                fontSize: "14px",
                padding: "0px 10px 0px 6px",
                height: "40px",
              },
            }}
          />
        )}
      </Field>
    </div>
  );
};

export default Input;
