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
            type={type}
            label={
              <span className="">
                {label}
                {required && <span className="ml-1 text-red-500">*</span>}
              </span>
            }
            disabled={disabled}
            className={`w-full rounded-lg border px-2 text-gray-500`}
            // Remove fullWidth to allow custom width control
            helperText={<ErrorMessage name={name} component="span" />}
            error={Boolean(form.errors[name] && form.touched[name])}
            onKeyDown={handleKeyDown} // Restrict key input to numbers
            onPaste={handlePaste} // Restrict paste input to numbers
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e, form)
            }
            inputProps={{ maxLength }}
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: "10px",
                backgroundColor: "#FAFAFA",
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
        )}
      </Field>
    </div>
  );
};

export default MUINumber;
