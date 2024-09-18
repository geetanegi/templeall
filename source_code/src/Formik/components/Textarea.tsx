import React from "react";
import { Field, ErrorMessage, FieldAttributes } from "formik";
import TextError from "./TextError";

interface TextareaProps extends FieldAttributes<any> {
  label: string;
  name: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, name, ...rest }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Field as="textarea" name={name} id={name} {...rest} />
      <ErrorMessage
        name={name}
        component={TextError as React.ComponentType<{}>}
      />{" "}
    </div>
  );
};

export default Textarea;
