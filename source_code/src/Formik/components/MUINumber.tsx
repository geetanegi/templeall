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
              <span className="text-[13px]">
                {label}
                {required && <span className="ml-1 text-red-500">*</span>}
              </span>
            }
            disabled={disabled}
            className="w-full"
            helperText={<span className="ml-3"><ErrorMessage name={name} component="span" /></span>}
            error={Boolean(form.errors[name] && form.touched[name])}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
              if(name === 'entriesPer24Hours'){
                console.log("!e.target.value", e.target.value, Number(e.target.value), (Number(e.target.value) === 0))
                if(Number(e.target.value)  !== 0){
                  handleChange(e, form)
                }else if(e.target.value === ''){
                    handleChange(e, form)
                }
              }else if(name === "waitTimeBetweenEntries" ){
                if(Number(e.target.value) < 24){
                  handleChange(e, form)
                }
              } else{
                handleChange(e, form)
              }
            }
            }
            inputProps={{ maxLength }}
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: "5px",
                backgroundColor: "#FAFAFA",
                padding: "9px", // Adjust padding as needed
                margin: 0, // Remove margin if needed
                // border: "1px solid #CACACA", // Adjust or remove border
                background: disabled ? "#e5e7eb" : ""
              },
              "& .MuiInputBase-input": {
                padding: "6px",
                fontSize: "14px", // Adjust input padding to align with your design
                background: disabled ? "#e5e7eb" : ""
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
              // "& .MuiInputLabel-root": {
              //   fontSize: "14px",
              // },
              // Label styles for centering and floating
              "& .MuiInputLabel-root": {
                fontSize: "14px", // Reduce label font size
                paddingLeft: "10px", // Reduce label padding
                transform: "translate(0, 12px) scale(1)",
              },
              // Label position when field is focused or filled
              "& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-root.MuiFormLabel-filled":
                {
                  transform: "translate(0, -6px) scale(0.75)", // Move label up and scale down
                  paddingLeft: "15px", // Optional: adjust padding when focused
                },
            }}
          />
        )}
      </Field>
    </div>
  );
};

export default MUINumber;
