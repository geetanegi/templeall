import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";
import TextField from "@mui/material/TextField";
import { Eye, EyeOff } from "lucide-react";

interface InputProps {
  label: string;
  name: string;
  type?: string;
  className?: string;
  required?: boolean;
  maxLength?: number;
  validateRegex?: RegExp;
  onFocus?: () => void;
  labelMarginRight?:any

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
  labelMarginRight=2
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle password visibility
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

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
    <div className={`${className}`}>
      <Field name={name} onFocus={onFocus}>
        {({ field, form }: { field: any; form: any }) => {
          const { value } = field;

          if (name === "countryCode" && !value) {
            form.setFieldValue(name, "+1");
          }
          return (
            <TextField
              {...field}
              type={type === "password" && !showPassword ? "password" : "text"} // Toggle between password and text
              onFocus={onFocus}
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
                      className={`text-loginValidationColor  mr-${labelMarginRight}`}
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
              InputLabelProps={{
                shrink: Boolean(field.value),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "15px",
                  fontSize: "14px",
                  height: "40px",
                  color: "#ffffff",
                  "& fieldset": {
                    borderColor: "#ffffff",
                    color: "#ffffff",
                  },
                  "&:hover fieldset": {
                    borderColor: "#ffffff",
                    color: "#ffffff",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#ffffff",
                    color: "#ffffff",
                  },
                  "&.Mui-error fieldset": {
                    borderColor: "#FFFF00",
                    color: "#ffffff",
                  },
                },
                "& .MuiInputBase-input": {
                  padding: "8px 14px",
                  fontSize: "14px",
                  height: "100%",
                  color: "#ffffff",
                  "&:-webkit-autofill": {
                    WebkitBoxShadow: "0 0 0px 1000px transparent inset",
                    WebkitTextFillColor: "#fff",
                    transition: "background-color 5000s ease-in-out 0s",
                  },
                },
                "& .MuiFormHelperText-root": {
                  color: () =>
                    Boolean(form.errors[name] && form.touched[name])
                      ? "#FFFF00"
                      : "rgba(255, 255, 255, 0.7)",
                  fontSize: "11px",
                  marginTop: "4px",
                },
                "& .MuiInputLabel-root": {
                  color: "rgba(255, 255, 255, 0.7)",
                  transform: "translate(14px, 8px) scale(1)",
                },
                "& .MuiInputLabel-shrink": {
                  transform: "translate(14px, -6px) scale(0.75)",
                },
                "&:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0px 1000px transparent inset",
                  WebkitTextFillColor: "#ffffff",
                  color: "#ffffff",
                  transition: "background-color 5000s ease-in-out 0s", 
                },
              }}
              InputProps={{
                endAdornment: type === "password" && (
                  <span
                    onClick={handleClickShowPassword}
                    style={{
                      cursor: "pointer",
                      // padding: ,
                      color: "rgb(238 235 235)",
                    }}
                  >
                    {showPassword ? (
                      <Eye color="rgb(238 235 235)"  />
                    ) : (
                      <EyeOff color="rgb(238 235 235)"  />
                    )}
                  </span>
                ),
              }}
            />
          );
        }}
      </Field>
    </div>
  );
};

export default Input;
