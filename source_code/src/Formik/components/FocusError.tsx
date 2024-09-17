import React, { useEffect } from "react";
import { useFormikContext, FormikErrors } from "formik";

const FocusError: React.FC = () => {
  const { errors, isSubmitting, isValidating, submitCount } =
    useFormikContext<any>();

  useEffect(() => {
    if (isSubmitting && !isValidating) {
      const keys = Object.keys(errors) as Array<keyof FormikErrors<any>>;

      if (keys.length > 0) {
        const selector = `[name="${String(keys[0])}"]`;
        const errorElement = document.querySelector(selector) as HTMLElement;

        if (errorElement) {
          errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
          errorElement.focus({ preventScroll: true });
        }
      }
    }
  }, [errors, isSubmitting, isValidating, submitCount]);

  return null;
};

export default FocusError;
