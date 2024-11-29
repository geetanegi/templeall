import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import aceCampLogo from "../../assets/images/Logo_png with heading.png";
import FormikControl from "../../Formik/components/FormikControl";
import { viewPdf } from "../../utils/downloadUtils";
import TermsAndConditionsPdf from "../../assets/Pdf/AceCamGolfTermsandConditions.pdf";
import { Link } from "react-router-dom";
import * as Yup from "yup";

interface SocialLoginInputsInterface {
  username: string;
  firstName: string;
  lastName: string;

  countryCode: string;
  phone: number | string;
  acceptTerms: boolean;
}
const SocialLoginScreen: React.FC = () => {
  const initialValues: SocialLoginInputsInterface = {
    firstName: "",
    lastName: "",
    username: "",
    phone: "",
    countryCode: "+1",
    acceptTerms: false,
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("First Name is required ")
      .matches(
        /^[A-Za-z]+$/,
        "First Name must contain only alphabetic characters",
      )
      .max(100, "First Name must be less than 100 characters"),
    lastName: Yup.string()
      .required("Last Name is required ")
      .matches(
        /^[A-Za-z]+$/,
        "Last Name must contain only alphabetic characters",
      )
      .max(100, "Last Name must be less than 100 characters"),
    username: Yup.string()
      .required("Username is Required")
      .matches(
        /^[a-zA-Z0-9]+$/,
        "Username must contain only alphanumeric characters  ",
      )
      .min(3, "Username must be at least 3 characters")
      .max(25, "Username must be less than 25 characters"),
    acceptTerms: Yup.bool().oneOf(
      [true],
      "You must agree to the Terms and Conditions to proceed",
    ),
    phone: Yup.string().required("Phone is Required"),
  });

  const downloadTermsAndConditionsFunc = () => {
    viewPdf(TermsAndConditionsPdf);
  };
  return (
    <div className="bg-back-600 flex h-auto w-full flex-col items-center rounded-xl md:w-full md:p-0">
      <img src={aceCampLogo} alt="" className="mb-[5px] w-[220px]" />
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={() => {}}
        >
          <Form className="w-full max-w-sm md:max-w-md">
            <div className="flex gap-2">
              <div className="flex w-1/2 flex-col">
                <FormikControl
                  label=" First Name"
                  name="firstName"
                  control="input"
                  className="w-full"
                  placeholder=" Your First Name"
                  type="text"
                  required={true}
                  authFlow={true}
                />
              </div>
              <div className="flex w-1/2 flex-col">
                <FormikControl
                  label=" Last Name"
                  name="lastName"
                  control="input"
                  className="w-full"
                  placeholder=" Your Last Name"
                  type="text"
                  required={true}
                  authFlow={true}
                />
              </div>
            </div>
            <div className="mb-4">
              <FormikControl
                label="Username"
                name="username"
                control="input"
                className="w-full"
                placeholder="userName"
                type="text"
                required={true}
                maxLength={25}
                // validateRegex={ALPHANUMERIC_REGEX}
                authFlow={true}
              />
            </div>
            <div className="flex items-center">
              <div className="w-20 pr-2">
                <FormikControl
                  authFlow={true}
                  label="Phone"
                  name="countryCode"
                  control="input"
                  className="w-full"
                  type="text"
                  required={true}
                />
              </div>
              <div className="flex w-full flex-col">
                <FormikControl
                  label="&nbsp;"
                  name="phone"
                  control="number"
                  className="w-full"
                  placeholder="Phone"
                  // required={true}
                  authFlow={true}
                  maxLength={10}
                />
              </div>
            </div>
            <div className="mb-6 flex flex-col">
              <label className="inline-flex items-center">
                <Field
                  type="checkbox"
                  name="acceptTerms"
                  className="form-checkbox h-4 w-4 leading-tight text-blue-400"
                />
                <span className={`ml-2 text-[13px] text-primaryText`}>
                  Agreeing to{" "}
                  <Link
                    onClick={downloadTermsAndConditionsFunc}
                    className={`px-1 text-[13px] text-link underline hover:underline`}
                    to=""
                  >
                    Terms and Conditions
                  </Link>
                  of the contest
                </span>
              </label>
              <span
                style={{
                  color: "#FFDE59",
                  fontSize: "0.875rem",
                }}
              >
                <ErrorMessage
                  name="acceptTerms"
                  component="div"
                  className="text-[13px]"
                />
              </span>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className={`w-[200px] rounded-[12px] border bg-buttonPrimary py-2 text-white hover:bg-lime-600`}
                // disabled={}
              >
                Create Account
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default SocialLoginScreen;
