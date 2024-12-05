import React from "react";
import { Field, ErrorMessage } from "formik";
import TextField from "@mui/material/TextField";

interface TextAreaProps {
  label: string;
  name: string;
  placeholder?: string; // Add placeholder prop
  required?: boolean;
  maxLength?: number;
  validateRegex?: RegExp;
  rows?: number;
  disabled?: boolean;
  strink?:boolean
}

const MUITextArea: React.FC<TextAreaProps> = ({
  label,
  name,
  placeholder = "", // Default placeholder value if not provided
  required = false,
  maxLength,
  validateRegex,
  rows = 4,
  disabled = false,
  strink,
}) => {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const char = String.fromCharCode(event.which);
    if (validateRegex && !validateRegex.test(char)) {
      event.preventDefault(); // Block the input
    }
  };

  return (
    <div className="mb-4 h-full w-full">
      <Field name={name}>
        {({ field, form }: { field: any; form: any }) => (
          <>
            <TextField
              {...field}
              label={
                <span className={strink ?'' : "text-[13px]"}>
                  {label}
                  {required && <span className="ml-1 text-red-500">*</span>}
                </span>
              }
              multiline
              disabled={disabled}
              placeholder={placeholder} // Use the placeholder prop here
              rows={rows}
              InputLabelProps={{ shrink: strink }}
              className="w-full rounded-lg border px-2 text-gray-500"
              error={Boolean(form.errors[name] && form.touched[name])}
              helperText={<span className=""><ErrorMessage name={name} component="span" /></span>}
              inputProps={{ maxLength }}
              onKeyPress={handleKeyPress}
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "5px",
                  backgroundColor: "#FAFAFA",
                },
              }}
            />
            {/* ErrorMessage with custom styling */}
            {/* <ErrorMessage name={name}>
              {(msg) => (
                <span
                  style={{
                    color: "#d32f2f",
                    fontSize: "12px",
                    textAlign: "left",
                    display: "block",
                    "fontFamily": "Helvetica",
                    fontWeight: 400

                  }}
                >
                  {msg}
                </span>
              )}
            </ErrorMessage> */}
          </>
        )}
      </Field>
    </div >
  );
};

export default MUITextArea;
