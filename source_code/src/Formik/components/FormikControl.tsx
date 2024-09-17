import React from "react";
import CheckBoxGroup from "./CheckBoxGroup";
import CustomCheckbox from "./CustomCheckbox";
import DatePicker from "./DatePicker";
import Input from "./Input";
import RadioButtons from "./RadioButtons";
import Select from "./Select";
import Textarea from "./Textarea";
import NumberInput from "./NumberInput";

interface FormikControlProps {
  control:
    | "input"
    | "textarea"
    | "select"
    | "radio"
    | "checkbox"
    | "customCheckbox"
    | "number"
    | "date";
  [key: string]: any;
}

const FormikControl: React.FC<FormikControlProps> = ({ control, ...rest }) => {
  switch (control) {
    case "input":
      return (
        <Input
          label={rest.label}
          name={rest.name}
          maxLength={rest.maxLength}
          {...rest}
        />
      );
    case "textarea":
      return (
        <Textarea
          label={rest.label}
          name={rest.name}
          maxDate={rest.maxDate}
          {...rest}
        />
      );
    case "select":
      return (
        <Select
          label={rest.label}
          name={rest.name}
          options={rest.options}
          {...rest}
        />
      );
    case "radio":
      return (
        <RadioButtons
          label={rest.label}
          name={rest.name}
          options={rest.options}
          idstart={rest.idstart}
          {...rest}
        />
      );
    case "checkbox":
      return (
        <CheckBoxGroup
          label={rest.label}
          name={rest.name}
          options={rest.options}
          {...rest}
        />
      );
    case "customCheckbox":
      return (
        <CustomCheckbox
          label={rest.label}
          name={rest.name}
          id={rest.id}
          {...rest}
        />
      );
    case "date":
      return <DatePicker label={rest.label} name={rest.name} {...rest} />;
    case "number":
      return <NumberInput label={rest.label} name={rest.name} {...rest} />;
    default:
      return null;
  }
};

export default FormikControl;
