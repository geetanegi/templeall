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
    <div className={`${className}`}>
      <Field name={name}>
        {({ field, form }: FieldProps) => (
          <TextField
            {...field}
            type={type}
            label={
              <span
              style={{
                display: "flex",
                alignItems: "center",
                color: "rgb(238 235 235)",  
                fontWeight: "normal",
                fontSize:"13px"
              }}
            >
              {label}
              {required && (
                <span
                  className="mr-2 text-loginValidationColor"
                  style={{ marginLeft: "0.25rem" }}
                >
                  *
                </span>
              )}
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
                  borderColor: "#FFFF00",
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
                    ? "#FFFF00"
                    : "rgba(255, 255, 255, 0.7)",
                fontSize: "12px",
              },
              "& .MuiInputLabel-root": {
                color: "#ffffff",
                transform: "translate(14px, 8px) scale(1)",
              },
              "& .MuiInputLabel-shrink": {
                transform: "translate(14px, -9px) scale(0.9)",
              },
            }}
          />
        )}
      </Field>
    </div>
  );
};

export default MUINumber;
