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
  disabled?: boolean;
}

const MUIInput: React.FC<InputProps> = ({
  label,
  name,
  type = "text",
  className = "",
  required = false,
  maxLength,
  validateRegex,
  onFocus = () => {},
  disabled = false,
}) => {
  // Function to validate input and block special characters and spaces
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const char = String.fromCharCode(event.which);
    if (validateRegex && !validateRegex.test(char)) {
      event.preventDefault(); // Block the input
    }
  };

  return (
    <div className={`mb-4 ${className}`}>
      <Field name={name}>
        {({ field, form }: { field: any; form: any }) => {
          const { value } = field;
          if (name === "countryCode" && !value) {
            form.setFieldValue(name, "+1");
          }
          return (
            <TextField
              {...field}
              type={type}
              onFocus={onFocus}
              autoComplete="off"
              label={
                <span className="text-[13px]">
                  {label}
                  {required && <span className="ml-1 text-red-500">*</span>}
                </span>
              }
              className={`w-full rounded-lg border px-2 text-gray-500`}
              disabled={disabled}
              // Remove fullWidth to allow custom width control
              helperText={<ErrorMessage name={name} component="span" />}
              error={Boolean(form.errors[name] && form.touched[name])}
              inputProps={{ maxLength }}
              onKeyPress={handleKeyPress} // Add key press handler if needed
              // InputLabelProps={{ shrink: true }}
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "5px",
                  backgroundColor: "#FAFAFA",
                  height: "50px",
                  background: disabled ? "#e5e7eb" : ""
                },
                // width: "100%",
                // borderRadius: "10px",
                // borderColor: "#CACACA",
                // // backgroundColor: "#FAFAFA",
                // padding: "2",
                // color: "gray.500",
                // "& .MuiInputBase-root": {
                //   // color: "white",
                //   borderRadius: "10px",
                //   // border: "1.5px solid white",
                // },
                // "& .MuiOutlinedInput-notchedOutline": {
                //   borderColor: "#CACACA",
                // },
                // "&:hover .MuiOutlinedInput-notchedOutline": {
                //   // borderColor: "#CACACA",
                // },
                // "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                //   // borderColor: "blue.500", // Change color when focused
                // },
              }} // Set width to 100% to fill parent
            />
          );
        }}
      </Field>
    </div>
  );
};

export default MUIInput;
