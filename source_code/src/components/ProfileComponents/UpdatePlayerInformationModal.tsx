import React, { useEffect, useState } from "react";
import Modal from "../ModalComponent";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../reducers/loader/loader";
import { ToastInfo, ToastSuccess } from "../Toast";
import { API_URL } from "../../services/enums";
import { RootState } from "../../store";
import apiService from "../../services/apiService";
import moment from "moment";
// import {
//   // CardCvcElement,
//   // CardExpiryElement,
//   CardNumberElement,
//   useElements,
//   useStripe,
// } from "@stripe/react-stripe-js";
import PageLoader from "../PageLoader";
import { validationConstant } from "../../utils/validationEnums";
import FormikControl from "../../Formik/components/FormikControl";
import MUINumber from "../../Formik/components/MUINumber";
import MUISelect from "../../Formik/components/MUISelect";
interface userProfileType {
  contactNumber?: string;
  ball?: string;
  city?: string;
  dateOfBirth?: string;
  ghin?: string;
  location?: string;
  alternateEmail?: string;
  clubs: string;
  handicap: number;
  countryCode: string;
}
interface userDataTypes {
  userCourseAndClubInfo: any;
  firstName?: string;
  lastName?: string;
  email?: string;
  clubId?: string;
  cardDetails?: string;
  fullNameOnCard?: string;
  expirationDate?: string;
  cvv?: number;
  username?: string;
  courseIds?: string;
  userProfile: userProfileType;
}

interface updateProfileModalprops {
  isModalOpen: boolean;
  setIsModalOpen: (val: boolean) => void;
  fetchUserInformation: () => void;
  userData: userDataTypes;
}

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contactNumber: "",
  ghin: "",
  clubId: "",
  ball: "",
  location: "",
  city: "",
  alternateEmail: "",
  dateOfBirth: "",
  cardDetails: "",
  fullNameOnCard: "",
  expirationDate: "",
  cvv: "",
  username: "",
  courseIds: "",
  clubs: "",
  countryCode: "+1",
  handicap: "",
};

const validationSchema = Yup.object({
  firstName: Yup.string()
    .required(validationConstant.firstNameRequired)
    .matches(/^[A-Za-z]+$/, validationConstant.firstNameContains)
    .max(25, validationConstant.firstNameMaxLength),
  lastName: Yup.string()
    .required(validationConstant.lastNameRequired)
    .matches(/^[A-Za-z]+$/, validationConstant.lastNameContains)
    .max(100, validationConstant.lastNameMaxLength),
  email: Yup.string()
    .email(validationConstant.validEmail)
    .required(validationConstant.emailRequired),
  contactNumber: Yup.string()
    .matches(/^\+?[1-9]\d{1,14}$/, validationConstant.phoneNumberContains)
    .min(10, validationConstant.validPhone)
    .max(10, validationConstant.validPhone),
  location: Yup.string().matches(
    /^[A-Za-z0-9\s]+$/,
    validationConstant.locationContains,
  ),
  city: Yup.string().matches(/^[A-Za-z\s]+$/, validationConstant.cityContains),
  ghin: Yup.string().matches(
    /^\+?[1-9]\d{1,14}$/,
    validationConstant.invalidGHIN,
  ),
  alternateEmail: Yup.string().email(validationConstant.validEmail),
  handicap: Yup.string()
    .typeError(validationConstant.handicapNumberContains)
    .matches(/^\d+(\.\d+)?$/, validationConstant.validHandiCapNumber)
    .required(validationConstant.handicapNumberReq),
});

const UpdatePlayerInformationModal: React.FC<updateProfileModalprops> = ({
  isModalOpen,
  setIsModalOpen,
  fetchUserInformation,
  userData,
}) => {
  // const stripe = useStripe();
  // const elements = useElements();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const loader = useSelector((state: RootState) => state.loader.isLoading);
  // const [maxDate, setMaxDate] = useState("");
  const [courses, setCourses] = useState<any[]>([]);
  // const [cardTouched, setCardTouched] = useState(false);
  // const [_cardError, setCardError] = useState<string | null>(null);
  // const [isCardEmpty, setIsCardEmpty] = useState(true);
  const fetchCourseList = async () => {
    try {
      const res = await apiService.post<any>(
        API_URL.getCourseList,
        {
          data: {},
        },
      );
      if (res.status === 200 && !res.data.error) {
        const courseData =
          res?.data?.data?.map((course: any) => ({
            value: course.id,
            key: course.courseName,
          })) || [];
        setCourses(courseData);
      } else if (res.data.error) {
        ToastInfo(res.data.description || "Error fetching course data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // getCurrentDate();
    fetchCourseList();
  }, []);

  // const getCurrentDate = () => {
  //   const today = new Date();
  //   today.setDate(today.getDate() - 1);
  //   const maxDateString = today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  //   setMaxDate(maxDateString);
  // };
  const dispatch = useDispatch();

  const handleSubmit = async (
    values: any,
    { setSubmitting }: FormikHelpers<any>,
  ) => {
    // setCardTouched(false);
    dispatch(setLoading(true));
    try {
      const payload = {
        data: {
          ...values,
          selectedUserId:
            typeof userInfo === "object" ? userInfo.userId : undefined,
        },
      };
      const { data, status } = await apiService.post<any>(
        API_URL.updateUserProfile,
        payload,
      );
      if (status === 200 && data?.data != null && !data?.error) {
        ToastSuccess(data.data.message);
        fetchUserInformation();
        setIsModalOpen(false);
      } else if (data?.error && data.description) {
        ToastInfo(data.description);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
      dispatch(setLoading(false));
    }

    // if (!stripe || !elements) {
    //   // Stripe.js has not loaded yet
    //   return;
    // }
    // const cardNumberElement = elements?.getElement(CardNumberElement);
    // if ((cardTouched && !cardNumberElement) || isCardEmpty) {
    //   setCardError("Card details are required");
    //   setSubmitting(false);
    //   setIsCardEmpty(true);
    //   return;
    // }
  };

  return (
    <PageLoader isActive={loader}>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit Profile"
      >
        <Formik
          initialValues={
            userData
              ? {
                  firstName: userData?.firstName,
                  lastName: userData?.lastName,
                  email: userData?.email,
                  contactNumber: userData?.userProfile?.contactNumber || "",
                  ghin: userData?.userProfile?.ghin || "",
                  location: userData?.userProfile?.location || "",
                  city: userData?.userProfile?.city || "",
                  alternateEmail: userData?.userProfile?.alternateEmail || "",
                  dateOfBirth:
                    moment
                      .utc(userData?.userProfile?.dateOfBirth)
                      .local()
                      .format("MM-DD-YYYY") || "",
                  cardDetails: "",
                  fullNameOnCard: "",
                  expirationDate: "",
                  username: userData?.username || "",
                  ball: userData?.userProfile?.ball || "",
                  clubId: userData?.userCourseAndClubInfo?.[0]?.club?.id || "",
                  courseIds:
                    userData?.userCourseAndClubInfo?.[0]?.club?.courseList?.[0]
                      .id,
                  clubs: userData?.userProfile?.clubs || "",
                  cvv: "",
                  countryCode: userData?.userProfile?.countryCode || "+1",
                  handicap: userData?.userProfile?.handicap || "",
                }
              : initialValues
          }
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            handleSubmit,
            isSubmitting,
          }) => {
            let maxLength = 7
              if(values.handicap){
                const inputValue =  String(values.handicap);
                const isDecimal = inputValue.includes(".");
                maxLength = isDecimal ? 8 : 7;
              }
            return (
              <form onSubmit={handleSubmit}>
                <div
                  className="scrollbar-hidden h-[340px] overflow-auto"
                >
                  <div className="mx-5 mt-1 flex w-full justify-between gap-4 md:w-[430px]">
                    <div className="flex">
                      <FormikControl
                        label="First Name"
                        name="firstName"
                        control="customInput"
                        className="w-full"
                        placeholder="First Name"
                        maxLength={25}
                        type="text"
                        required={true}
                        disabled={true}
                      />
                    </div>
                    <div className="flex">
                      <FormikControl
                        label="Last Name"
                        name="lastName"
                        control="customInput"
                        maxLength={25}
                        className="w-full"
                        placeholder="Last Name"
                        type="text"
                        required={true}
                        disabled={true}
                      />
                    </div>
                  </div>
                                <div className="mx-5 w-full md:w-[430px]">
                    <FormikControl
                      label="Username"
                      name="username"
                      control="customInput"
                      className="w-full"
                      placeholder="Username"
                      type="text"
                      required={true}
                      disabled={true}
                    />
                   
                  </div>
                  <div className="mx-5 w-full md:w-[430px]">
                    <FormikControl
                      label="DOB"
                      name="dateOfBirth"
                      control="customInput"
                      className="w-full"
                      placeholder="DOB"
                      type="text"
                      required={true}
                      disabled={true}
                    />
                   
                  </div>
                  <div className="mx-5 flex w-[90%] gap-4 md:w-[430px]">
                    <div className="w-1/2">
                      <FormikControl
                        label="Location"
                        name="location"
                        control="customInput"
                        className="w-full"
                        placeholder="Location"
                        maxLength={25}
                        type="text"
                      />
                
                    </div>

                    <div className="w-1/2">
                      <FormikControl
                        label="City"
                        name="city"
                        control="customInput"
                        className="w-full"
                        placeholder="City"
                        maxLength={25}
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="mx-5 flex w-full gap-4 md:w-[430px]">
                    <div className="flex w-[30%]">
                      <FormikControl
                        label="Country Code"
                        name="countryCode"
                        control="customInput"
                        className="w-full"
                        placeholder="Country Code"
                        type="text"
                        disabled={true}
                      />
                    </div>
                    <div className="flex w-full">
                      <MUINumber
                        label="Phone"
                        name="mobile"
                        className="h-full w-full"
                        type="text"
                        maxLength={10}
                        disabled={true}
                      />
                    </div>
                  </div>
                 
                  <div className="mx-5 w-full md:w-[430px]">
                    <FormikControl
                      label="Email"
                      name="email"
                      control="customInput"
                      className="w-full"
                      placeholder="Email"
                      type="email"
                      required={true}
                      disabled={true}
                    />
                  </div>
                  <div className="mx-5 w-full md:w-[430px]">
                    <FormikControl
                      label="Alternate Email"
                      name="alternateEmail"
                      control="customInput"
                      className="w-full"
                      placeholder="Alternate Email"
                      type="email"
                    />
                  </div>
                  
                  <div className="-mb-4 mx-5 w-full md:w-[430px]">
                    <MUINumber
                      label="GHIN"
                      name="ghin"
                      className="h-full w-full"
                      type="text"
                      maxLength={7}
                    />
                  
                  </div>
                  <div className="mx-5 w-full md:w-[430px]">
                  <FormikControl
                      label="HDCP"
                      name="handicap"
                      control="customInput"
                      className="w-full"
                      validateRegex={/^\d*\.?\d*$/}
                      maxLength={maxLength}
                      placeholder="HDCP"
                      required={true}
                      type="text"
                    />
                    
                  </div>
                  <div className="mx-5 flex w-[90%] gap-4 md:w-[430px]">
                    <div className="w-1/2">
                    <FormikControl
                      label="Clubs"
                      name="clubs"
                      control="customInput"
                      className="w-full"
                      validateRegex={/^\d*\.?\d*$/}
                      maxLength={maxLength}
                      placeholder="Clubs"
                      type="text"
                    />
                    
                    </div>

                    <div className="w-1/2">
                    <FormikControl
                      label="Ball"
                      name="ball"
                      control="customInput"
                      className="w-full"
                      validateRegex={/^\d*\.?\d*$/}
                      maxLength={maxLength}
                      placeholder="Ball"
                      type="text"
                    />
                    
                    </div>
                  </div>
                  <div className="mb-5  mx-5">
                  <MUISelect
                    label="Course"
                    name="courseIds"
                    
                    options={courses ? courses :  []}
                  />
                  </div>

                  {/* Card Inforemation */}
                  {/* <div className="mb-3 ml-5 text-[20px] font-semibold">
                    Card Information
                  </div>
                  <div className="flex flex-col">
                    <div
                      className={`mx-5 w-[90%] rounded-lg border border-gray-200 bg-[#F5F6F7] px-2 py-3 text-gray-500 md:w-[430px] ${
                        cardTouched && cardError
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      <CardNumberElement
                        options={{
                          placeholder: "Card Number",
                          style: {
                            base: {
                              fontSize: "16px",
                              color: "#6B7280",
                              "::placeholder": {
                                color: "#6B7280",
                              },
                            },
                            invalid: {
                              color: "red",
                            },
                          },
                        }}
                      />
                    </div>
                    <div className="mx-5 my-5 flex w-[90%] gap-4 md:w-[430px]">
                      <div
                        className={`w-[90%] rounded-lg border border-gray-200 bg-[#F5F6F7] px-2 py-3 text-gray-500 lg:w-3/4 ${
                          cardTouched && cardError
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      >
                        <CardExpiryElement
                          options={{
                            placeholder: "Expiry Date",
                            style: {
                              base: {
                                fontSize: "16px",
                                color: "#6B7280",
                                "::placeholder": {
                                  color: "#6B7280",
                                },
                              },
                              invalid: {
                                color: "red",
                              },
                            },
                          }}
                        />
                      </div>
                      <div
                        className={`w-[90%] rounded-lg border border-gray-200 bg-[#F5F6F7] px-2 py-3 text-gray-500 lg:w-1/4 ${
                          cardTouched && cardError
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      >
                        <CardCvcElement
                          options={{
                            placeholder: "CVV",
                            style: {
                              base: {
                                fontSize: "16px",
                                color: "#6B7280",
                                "::placeholder": {
                                  color: "#6B7280",
                                },
                              },
                              invalid: {
                                color: "red",
                              },
                            },
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-5">
                    <input
                      type="text"
                      name="fullNameOnCard"
                      placeholder="Full Name on Card"
                      id="fullNameOnCard"
                      value={values.fullNameOnCard}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="mx-5 w-[90%] rounded-lg border border-gray-200 bg-[#F5F6F7] px-2 py-3 text-[#6B7280] md:w-[430px]"
                    />
                  </div> */}
                </div>

                <div className="flex w-full items-center justify-end rounded-bl-lg rounded-br-lg border border-gray-200 bg-[#F5F6F7] p-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="mr-5 w-32 rounded-md bg-[#7B7887] py-2 text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-32 rounded-md bg-primaryColor py-2 text-white"
                  >
                    Save
                  </button>
                </div>
              </form>
            );
          }}
        </Formik>
      </Modal>
    </PageLoader>
  );
};

export default UpdatePlayerInformationModal;
