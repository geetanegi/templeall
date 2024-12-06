import React, { useEffect, useState } from "react";
import Modal from "../ModalComponent";
import apiService from "../../services/apiService";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { ToastInfo, ToastSuccess } from "../Toast";
import { API_URL } from "../../services/enums";
import { setLoading } from "../../reducers/loader/loader";
import { useDispatch } from "react-redux";

interface userDataType {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  status?: any;
  action?: any;
  id: number;
  roleIds?: number;
}

interface AddAdminModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (flag: boolean) => void;
  userData?: userDataType;
  closeModal: () => void;
  handleRefreshUserCount: () => void;
  refreashUserData: () => void;
  selectedUserTab: number | string;
}

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
  username: Yup.string()
    .required("Username is required")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Username must contain only alphanumeric characters",
    )
    .min(3, "Username must be at least 3 characters")
    .max(25, "Username must be less than 25 characters"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[a-zA-Z\d@$!%*#?&]{8,25}$/,
      "Password must be 8-25 characters long, include at least one letter, one number, and one special character.",
    ),
  mobile: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must only contain numbers")
    .required("Phone number is required"),
  countryCode: Yup.string()
    .required("Phone number is required")
    .max(4, "Country code must be less than 4 numbers"),
  emailId: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

const AddAdminModal: React.FC<AddAdminModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  userData,
  closeModal,
  handleRefreshUserCount,
  refreashUserData,
  selectedUserTab,
}) => {
  const [, setRoles] = useState<any[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    getRoles();
  }, []);

  const getRoles = async () => {
    try {
      const { data, status } = await apiService.post<any>(
        API_URL.getAllRole,
        {},
      );
      if (status === 200 && data?.data != null && !data?.error) {
        const adminRoles = data?.data.filter((item: any) => item.roleId !== 3);
        setRoles(adminRoles);
      } else if (data?.error && data.description) {
        ToastInfo(data.description);
      } else if (data.description) {
        ToastInfo(data.description);
      }
    } catch (error) {
      ToastInfo("Error fetching roles");
    }
  };

  const handleSubmit = async (
    values: any,
    { setSubmitting }: FormikHelpers<any>,
  ) => {
    dispatch(setLoading(true));
    try {
      let payload = {
        data: {
          countryCode: values.countryCode,
          mobile: values.mobile,
        },
      };
      if (userData) {
        payload = {
          data: {
            ...values,
            password: null,
            selectedUserId: userData ? userData.id : null,
            roleIds: selectedUserTab === 1 ? 1 : 2,
          },
        };
      }
      payload = {
        data: {
          ...values,
          selectedUserId: userData ? userData.id : null,
          roleIds: selectedUserTab === 1 ? 1 : 2,
        },
      };
      const { data, status } = await apiService.post<any>(
        API_URL.addAdmin,
        payload,
      );
      if (status === 200 && data?.data != null && !data?.error) {
        ToastSuccess(data.data.message || "");
        handleRefreshUserCount();
        refreashUserData();
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
  };

  return (
    <Modal isOpen={isModalOpen} onClose={() => closeModal()} title="Add User">
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          username: "",
          emailId: "",
          password: "",
          roleIds: "",
          countryCode: "+1",
          mobile: "",
        }}
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
        }) => (
          <form
            onSubmit={handleSubmit}
            className="w-full overflow-y-auto overflow-x-hidden rounded-lg md:w-[480px]"
            style={{ maxHeight: "70vh" }}
          >
            <div className="relative mb-5 ml-5 mr-7">
              <input
                type="text"
                value={selectedUserTab === 2 ? "Course Admin" : "Super Admin"}
                disabled
                className={`w-full rounded-lg border bg-[#E6E6E6] px-2 py-3 text-gray-500`}
              />
              {/* Asterisk styled to appear as if inside the select */}
            </div>

            <div className="mx-5 mb-5 flex w-full justify-between md:w-[430px]">
              <div>
                <div className="relative">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    id="name"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    maxLength={100}
                    className={`rounded-lg border bg-gray-100 px-2 py-3 text-gray-500 ${touched.firstName &&
                      errors.firstName &&
                      typeof errors.firstName === "string"
                      ? "border-red-500"
                      : "border-gray-200"
                      } `}
                  />
                  <span
                    className={`pointer-events-none absolute left-[45%] top-3 text-red-500 ${values.firstName ? "hidden" : ""}`}
                  >
                    *
                  </span>
                </div>

                <div>
                  {touched.firstName &&
                    errors.firstName &&
                    typeof errors.firstName === "string" && (
                      <span className="text-red-600">{errors.firstName}</span>
                    )}
                </div>
              </div>
              <div>
                <div className="relative">
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    id="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    maxLength={100}
                    className={`rounded-lg border bg-gray-100 px-2 py-3 text-gray-500 ${touched.lastName &&
                      errors.lastName &&
                      typeof errors.lastName === "string"
                      ? "border-red-500"
                      : "border-gray-200"
                      } `}
                  />
                  <span
                    className={`pointer-events-none absolute left-[45%] top-3 text-red-500 ${values.lastName ? "hidden" : ""}`}
                  >
                    *
                  </span>
                </div>
                <div>
                  {touched.lastName &&
                    errors.lastName &&
                    typeof errors.lastName === "string" && (
                      <span className="text-red-600">{errors.lastName}</span>
                    )}
                </div>
              </div>
            </div>

            <div className="relative">
              <input
                type="text"
                name="username"
                placeholder="Username"
                id="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={25}
                className="mx-5 w-full rounded-lg border border-gray-200 bg-gray-100 px-2 py-3 text-gray-500 md:w-[430px]"
              />
              <span
                className={`pointer-events-none absolute left-[22%] top-3 text-red-500 ${values.username ? "hidden" : ""}`}
              >
                *
              </span>
            </div>
            <div className="mb-5 ml-6">
              {touched.username &&
                errors.username &&
                typeof errors.username === "string" && (
                  <span className="text-red-600">{errors.username}</span>
                )}
            </div>
            <div className="relative">
              <input
                type="password"
                name="password"
                placeholder="Password"
                id="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={25}
                className="mx-5 w-full rounded-lg border border-gray-200 bg-gray-100 px-2 py-3 text-gray-500 md:w-[430px]"
              />
              <span
                className={`pointer-events-none absolute left-[21%] top-3 text-red-500 ${values.password ? "hidden" : ""}`}
              >
                *
              </span>
            </div>
            <div className="mb-5 ml-6">
              {touched.password &&
                errors.password &&
                typeof errors.password === "string" && (
                  <span className="text-red-600">{errors.password}</span>
                )}
            </div>
            <div className="relative">
              <input
                type="email"
                name="emailId"
                placeholder="Email"
                id="emailId"
                value={values.emailId}
                onChange={handleChange}
                onBlur={handleBlur}
                className="mx-5 w-full rounded-lg border border-gray-200 bg-gray-100 px-2 py-3 text-gray-500 md:w-[430px]"
              />
              <span
                className={`pointer-events-none absolute left-[15%] top-3 text-red-500 ${values.emailId ? "hidden" : ""}`}
              >
                *
              </span>
            </div>

            <div className="mb-5 ml-6">
              {touched.emailId &&
                errors.emailId &&
                typeof errors.emailId === "string" && (
                  <span className="text-red-600">{errors.emailId}</span>
                )}
            </div>
            <div className="relative mx-5 flex gap-1">
              <input
                type="text"
                name="countryCode"
                placeholder="Country Code"
                id="countryCode"
                maxLength={4}
                value={values.countryCode}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full rounded-lg border border-gray-200 bg-gray-100 px-2 py-3 text-gray-500 md:w-[80px]"
              />
              <span
                className={`pointer-events-none absolute left-[5%] top-3 text-red-500 ${values.countryCode ? "hidden" : ""}`}
              >
                *
              </span>
              <span className="relative">
                <input
                  type="text"
                  name="mobile"
                  placeholder="Phone"
                  id="emailId"
                  value={values.mobile}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength={10}
                  className="w-full rounded-lg border border-gray-200 bg-gray-100 px-2 py-3 text-gray-500 md:w-[340px]"
                />
                <span
                  className={`pointer-events-none absolute left-[18%] top-3 text-red-500 ${values.mobile ? "hidden" : ""}`}
                >
                  *
                </span>
              </span>
            </div>
            <div className="mb-5 ml-6">
              {touched.mobile &&
                errors.mobile &&
                typeof errors.mobile === "string" && (
                  <span className="text-red-600">{errors.mobile}</span>
                )}
            </div>
            <div className="flex w-full items-center justify-end rounded-bl-lg rounded-br-lg border border-gray-200 bg-[#F5F6F7] p-6 md:w-[480px]">
              <button
                type="button"
                onClick={closeModal}
                className="mr-5 w-32 rounded-md bg-[#7B7887] py-2 text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-32 rounded-md bg-primaryColor py-2 text-white"
              >
                {userData ? "Edit User" : "Add User"}
              </button>
            </div>
          </form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddAdminModal;
