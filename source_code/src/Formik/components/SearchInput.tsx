import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import React from "react";
import { useFormikContext, ErrorMessage } from "formik";
interface SearchInputProps {
  options: Array<any>;
  label: string;
  name: string;
  type?: string;
  className?: string;
  value:string;
  required?: boolean;
  maxLength?: number;
  validateRegex?: RegExp;
  onFocus?: () => void;
  onInputChange?:(a:any, b:any) => void;
  onSelect:(value:any)=>void
  noOptionsText?:string
}

const SearchInput: React.FC<SearchInputProps> = ({
  options = [],
  label,
  name,
  type = "text",
  className = "",
  required = false,
  validateRegex,
  value,
  onFocus = () => {},
  onInputChange=() =>{},
  onSelect=()=>{},
  noOptionsText="No options available"
}) => {
  const { errors, touched, setFieldValue  } = useFormikContext<any>(); // Access Formik context

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const char = String.fromCharCode(event.which);
    if (validateRegex && !validateRegex.test(char)) {
      event.preventDefault(); // Block the input
    }
  };

  const handleInputChange = (
    event: React.SyntheticEvent,

  ) => {
   
    if (onInputChange) onInputChange(event, value);
    setFieldValue(name, value); // Update Formik value
  };

  const handleSelectionChange = (_:any, selectedValue: any) => { 
    onSelect(selectedValue)
    setFieldValue(name, selectedValue);
  };

  return (
    <Autocomplete
      disablePortal
      options={options}
      onChange={handleSelectionChange}
      noOptionsText={noOptionsText} 
      sx={{
        "& .MuiInputBase-root": {
          borderRadius: "5px",
          backgroundColor: "#FAFAFA",
          height: "48px",
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          type={type}
          onFocus={onFocus}
          autoComplete="off"
          value={value}
          onChange={handleInputChange}
          label={
            <span>
              {label}
              {required && <span className="ml-1 text-red-500">*</span>}
            </span>
          }
          className={`w-full rounded-lg border px-2 text-gray-500 ${className}`}
          helperText={<ErrorMessage name={name} component="span" />}
          error={Boolean(errors[name] && touched[name])}
          // inputProps={{ maxLength }}
          onKeyPress={handleKeyPress}
          InputLabelProps={{ shrink: true }}
          sx={{
            "& .MuiInputBase-root": {
              borderRadius: "5px",
              backgroundColor: "#FAFAFA",
            },
          }}
        />
      )}
    />
  );
};

export default SearchInput;
