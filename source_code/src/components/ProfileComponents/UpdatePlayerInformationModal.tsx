import React, { useEffect, useState } from "react";
import Modal from "../ModalComponent";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../reducers/loader/loader";
import { ToastError, ToastSuccess } from "../Toast";
import { API_URL } from "../../services/enums";
import { RootState } from "../../store";
import apiService from "../../services/apiService";
import { CourseApiResponse } from "../AdminPanel/courses/courses.interface";
import { ChevronDown } from "lucide-react";
import moment from "moment";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import PageLoader from "../PageLoader";
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
    .required("First Name is required ")
    .matches(
      /^[A-Za-z]+$/,
      "First Name must contain only alphabetic characters",
    )
    .max(100, "First Name must be less than 100 characters"),
  lastName: Yup.string()
    .required("Last Name is required ")
    .matches(/^[A-Za-z]+$/, "Last Name must contain only alphabetic characters")
    .max(100, "Last Name must be less than 100 characters"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is Required"),
  contactNumber: Yup.string()
    .matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone number.")
    .min(10, "Please enter valid phone number.")
    .max(10, "Please enter valid phone number."),
  location: Yup.string().matches(
    /^[A-Za-z]+$/,
    "Location must contain only alphabetic characters",
  ),
  city: Yup.string().matches(
    /^[A-Za-z]+$/,
    "City must contain only alphabetic characters",
  ),
  ghin: Yup.string().matches(/^\+?[1-9]\d{1,14}$/, "Invalid GHIN Number."),
  alternateEmail: Yup.string().email("Please enter a valid email address"),
  handicap: Yup.string()
    .typeError("Handicap number Must be a number")
    .matches(/^\d+(\.\d+)?$/, "Handicap must be a valid number")
    .required("Handicap number is required"),
});

const UpdatePlayerInformationModal: React.FC<updateProfileModalprops> = ({
  isModalOpen,
  setIsModalOpen,
  fetchUserInformation,
  userData,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const loader = useSelector((state: RootState) => state.loader.isLoading);
  const [maxDate, setMaxDate] = useState("");
  const [courses, setCourses] = useState<CourseApiResponse | null>(null);
  const [cardTouched, setCardTouched] = useState(false);
  const [cardError, setCardError] = useState<string | null>(null);
  const [isCardEmpty, setIsCardEmpty] = useState(true);
  const fetchCourseList = async () => {
    try {
      const res = await apiService.post<CourseApiResponse>(
        API_URL.getCourseList,
        {
          data: {},
        },
      );
      if (res.status === 200 && !res.data.error) {
        setCourses(res.data);
      } else if (res.data.error) {
        ToastError(res.data.description || "Error fetching course data");
      }
    } catch (error) {
      ToastError("Error fetching course data");
    }
  };

  useEffect(() => {
    getCurrentDate();
    fetchCourseList();
  }, []);

  const getCurrentDate = () => {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    const maxDateString = today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
    setMaxDate(maxDateString);
  };
  const dispatch = useDispatch();

  const handleSubmit = async (
    values: any,
    { setSubmitting }: FormikHelpers<any>,
  ) => {
    setCardTouched(false);
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
        ToastError(data.description);
      }
    } catch (error) {
      ToastError("Something went wrong");
    } finally {
      setSubmitting(false);
      dispatch(setLoading(false));
    }

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }
    const cardNumberElement = elements?.getElement(CardNumberElement);
    if ((cardTouched && !cardNumberElement) || isCardEmpty) {
      setCardError("Card details are required");
      setSubmitting(false);
      setIsCardEmpty(true);
      return;
    }
  };
  // const scrollbarStyles: React.CSSProperties = {
  //   overflow: "auto", // Enable scrolling
  //   scrollbarWidth: "none", // Firefox
  //   msOverflowStyle: "none", // IE and Edge
  // };

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
                  dateOfBirth: userData?.userProfile?.dateOfBirth || "",
                  cardDetails: "",
                  fullNameOnCard: "",
                  expirationDate: "",
                  username: userData?.username || "",
                  ball: userData?.userProfile?.ball || "",
                  clubId: "1",
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
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                <div
                  className="scrollbar-hidden h-[340px] overflow-auto"
                  // style={scrollbarStyles}
                >
                  <div className="flex w-[90%] gap-4 md:w-[430px]">
                    <div className="w-1/2">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        id="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        max={100}
                        disabled
                        className="mx-5 w-full cursor-not-allowed rounded-lg border border-gray-200 bg-[#E6E6E6] px-2 py-3 text-[#7B7887]"
                      />
                      <div className="mb-5 ml-6">
                        {touched.firstName &&
                          errors.firstName &&
                          typeof errors.firstName === "string" && (
                            <span className="text-red-600">
                              {errors.firstName}
                            </span>
                          )}
                      </div>
                    </div>
                    <div className="w-1/2">
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        id="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        max={100}
                        disabled
                        className="mx-5 w-full cursor-not-allowed rounded-lg border border-gray-200 bg-[#E6E6E6] px-2 py-3 text-[#7B7887]"
                      />
                      <div className="mb-5 ml-6">
                        {touched.lastName &&
                          errors.lastName &&
                          typeof errors.lastName === "string" && (
                            <span className="text-red-600">
                              {errors.lastName}
                            </span>
                          )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      disabled
                      id="username"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="mx-5 w-[90%] cursor-not-allowed rounded-lg border border-gray-200 bg-[#E6E6E6] px-2 py-3 text-[#7B7887] text-gray-500 md:w-[430px]"
                    />
                    <div className="mb-5 ml-6">
                      {touched.username &&
                        errors.username &&
                        typeof errors.username === "string" && (
                          <span className="text-red-600">
                            {errors.username}
                          </span>
                        )}
                    </div>
                  </div>
                  <div className="mb-5">
                    <input
                      type="text"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      placeholder="DOB"
                      value={
                        values.dateOfBirth &&
                        moment(values?.dateOfBirth).format("MM/DD/YYYY")
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                      max={maxDate}
                      disabled
                      className="mx-5 w-[90%] cursor-not-allowed rounded-lg border border-gray-200 bg-[#E6E6E6] px-2 py-3 text-[#7B7887] text-gray-500 md:w-[430px]"
                    />
                  </div>
                  <div className="mb-5 flex w-[90%] gap-4 md:w-[430px]">
                    <div className="w-1/2">
                      <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        id="location"
                        value={values.location}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="mx-5 w-[90%] rounded-lg border border-gray-200 bg-[#F5F6F7] px-2 py-3 text-gray-500"
                      />
                      <div className="mx-5">
                        {touched.location &&
                          errors.location &&
                          typeof errors.location === "string" && (
                            <span className="text-red-600">
                              {errors.location}
                            </span>
                          )}
                      </div>
                    </div>

                    <div className="w-1/2">
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        id="city"
                        value={values.city}
                        onChange={(e) => {
                          const inputValue = e.target.value;

                          const regex = /^[A-Za-z\s]*$/;

                          if (regex.test(inputValue)) {
                            handleChange(e);
                          }
                        }}
                        onBlur={handleBlur}
                        className="mx-5 w-full rounded-lg border border-gray-200 bg-[#F5F6F7] px-2 py-3 text-gray-500"
                      />
                      <div className="mx-5">
                        {touched.city &&
                          errors.city &&
                          typeof errors.city === "string" && (
                            <span className="text-red-600">{errors.city}</span>
                          )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-4 flex w-[100%] gap-4 lg:w-auto">
                      <input
                        name="countryCode"
                        className="ml-5 w-[15%] rounded-lg border border-gray-200 bg-[#F5F6F7] px-4 py-3"
                        value={values.countryCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                      />
                      <input
                        type="text"
                        name="contactNumber"
                        placeholder="Phone number"
                        id="contactNumber"
                        value={values.contactNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        maxLength={10}
                        className="w-[71%] rounded-lg border border-gray-200 bg-[#F5F6F7] px-2 py-3 text-gray-500"
                      />
                    </div>
                    <div className="mb-5 ml-6">
                      {touched.contactNumber &&
                        errors.contactNumber &&
                        typeof errors.contactNumber === "string" && (
                          <span className="text-red-600">
                            {errors.contactNumber}
                          </span>
                        )}
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      name="email"
                      placeholder="Primary Email Address"
                      id="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled
                      className="mx-5 w-[90%] cursor-not-allowed rounded-lg border border-gray-200 bg-[#E6E6E6] px-2 py-3 text-[#7B7887] text-gray-500 md:w-[430px]"
                    />
                    <div className="mb-5 ml-6">
                      {touched.email &&
                        errors.email &&
                        typeof errors.email === "string" && (
                          <span className="text-red-600">{errors.email}</span>
                        )}
                    </div>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="alternateEmail"
                      placeholder="Alternate Email"
                      id="alternateEmail"
                      value={values.alternateEmail}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="mx-5 w-[90%] rounded-lg border border-gray-200 bg-[#F5F6F7] px-2 py-3 text-gray-500 md:w-[430px]"
                    />
                    <div className="mb-5 ml-6">
                      {touched.alternateEmail &&
                        errors.alternateEmail &&
                        typeof errors.alternateEmail === "string" && (
                          <span className="text-red-600">
                            {errors.alternateEmail}
                          </span>
                        )}
                    </div>
                  </div>
                  <div className="mb-5">
                    <input
                      type="text"
                      name="ghin"
                      placeholder="GHIN"
                      id="ghin"
                      value={values.ghin}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="mx-5 w-[90%] rounded-lg border border-gray-200 bg-[#F5F6F7] px-2 py-3 text-gray-500 md:w-[430px]"
                    />
                    <div className="mx-5">
                      {touched.ghin &&
                        errors.ghin &&
                        typeof errors.ghin === "string" && (
                          <span className="text-red-600">{errors.ghin}</span>
                        )}
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      name="handicap"
                      placeholder="HDCP"
                      id="handicap"
                      value={values.handicap}
                      onChange={(e) => {
                        const inputValue = e.target.value;

                        const regex = /^\d*\.?\d*$/;

                        if (regex.test(inputValue)) {
                          const isDecimal = inputValue.includes(".");
                          const maxLength = isDecimal ? 8 : 7;

                          if (inputValue.length <= maxLength) {
                            handleChange(e);
                          }
                        }
                      }}
                      onBlur={handleBlur}
                      maxLength={8}
                      className="mx-5 w-[90%] rounded-lg border border-gray-200 bg-[#F5F6F7] px-2 py-3 text-[#7B7887] text-gray-500 md:w-[430px]"
                    />
                    <span
                      className={`pointer-events-none absolute left-[17%] top-3 text-red-500 ${values.handicap ? "hidden" : ""}`}
                    >
                      *
                    </span>
                    <div className="mb-5 ml-6">
                      {touched.handicap &&
                        errors.handicap &&
                        typeof errors.handicap === "string" && (
                          <span className="text-red-600">
                            {errors.handicap}
                          </span>
                        )}
                    </div>
                  </div>
                  <div className="mb-5 flex w-[90%] gap-4 md:w-[430px]">
                    <div className="w-1/2">
                      <input
                        type="text"
                        name="clubs"
                        placeholder="Clubs"
                        id="clubs"
                        value={values.clubs}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="mx-5 w-full rounded-lg border border-gray-200 bg-[#F5F6F7] px-2 py-3 text-gray-500"
                      />
                    </div>

                    <div className="w-1/2">
                      <input
                        type="text"
                        name="ball"
                        placeholder="Ball"
                        id="ball"
                        value={values.ball}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="mx-5 w-full rounded-lg border border-gray-200 bg-[#F5F6F7] px-2 py-3 text-gray-500"
                      />
                    </div>
                  </div>
                  <div className="relative mb-5">
                    <select
                      id="courseIds"
                      name="courseIds"
                      value={values.courseIds}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="mx-5 w-[90%] appearance-none rounded-lg border border-gray-200 bg-gray-100 px-2 py-3 text-gray-500 md:w-[430px]"
                    >
                      <option value="" label="Select Courses" />
                      {courses?.data?.map((course: any) => (
                        <option
                          key={course.id}
                          value={course.id}
                          selected={values.courseIds === course.id}
                          label={course.courseName}
                        />
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-10 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-500" />
                  </div>

                  {/* Card Inforemation */}
                  <div className="mb-3 ml-5 text-[20px] font-semibold">
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
                  </div>
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
                    className="w-32 rounded-md bg-lime-500 py-2 text-white"
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
