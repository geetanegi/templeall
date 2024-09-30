import React from "react";
import { Field, ErrorMessage } from "formik";
import TextField from "@mui/material/TextField";

interface TextAreaProps {
  label: string;
  name: string;
  required?: boolean;
  maxLength?: number;
  validateRegex?: RegExp;
  rows?: number;
}

const MUITextArea: React.FC<TextAreaProps> = ({
  label,
  name,
  required = false,
  maxLength,
  validateRegex,
  rows = 4,
}) => {
  // Function to validate input and block special characters and spaces
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
          <TextField
            {...field}
            label={
              <span>
                {label}
                {required && <span className="ml-1 text-red-500">*</span>}
              </span>
            }
            multiline
            rows={rows}
            className={`w-full rounded-lg border px-2 text-gray-500`}
            helperText={<ErrorMessage name={name} component="span" />}
            error={Boolean(form.errors[name] && form.touched[name])}
            inputProps={{ maxLength }}
            onKeyPress={handleKeyPress} // Add key press handler if needed
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: "10px",
                backgroundColor: "#FAFAFA",
              },
            }} // Set width to 100% to fill parent
          />
        )}
      </Field>
    </div>
  );
};

export default MUITextArea;
