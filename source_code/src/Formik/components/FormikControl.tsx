import React from "react";
import CheckBoxGroup from "./CheckBoxGroup";
import CustomCheckbox from "./CustomCheckbox";
import DatePicker from "./DatePicker";
import Input from "./Input";
import RadioButtons from "./RadioButtons";
import Select from "./MUISelect";
import Textarea from "./Textarea";
import NumberInput from "./NumberInput";
import MUIInput from "./MUIInput";

interface FormikControlProps {
  control:
    | "input"
    | "textarea"
    | "select"
    | "radio"
    | "checkbox"
    | "customCheckbox"
    | "number"
    | "date"
    | "customInput";

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
          validateRegex={rest.validateRegex}
          authFlow={rest.authFlow}
          {...rest}
        />
      );
    case "customInput":
      return (
        <MUIInput
          label={rest.label}
          name={rest.name}
          maxLength={rest.maxLength}
          validateRegex={rest.validateRegex}
          {...rest}
        />
      );
    case "textarea":
      return (
        <Textarea
          label={rest.label}
          name={rest.name}
          maxLength={rest.maxLength}
          validateRegex={rest.validateRegex}
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
          disabled={rest.disabled}
          onChange={rest.onChange}
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
          onFocus={rest.onFocus}
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
