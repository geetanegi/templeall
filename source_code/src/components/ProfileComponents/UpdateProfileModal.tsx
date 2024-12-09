import React from "react";
import Modal from "../ModalComponent";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../reducers/loader/loader";
import { ToastInfo, ToastSuccess } from "../Toast";
import { API_URL } from "../../services/enums";
import { RootState } from "../../store";
import apiService from "../../services/apiService";
import { validationConstant } from "../../utils/validationEnums";

interface userDataTypes {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  courseId: number | null;
  clubId:number | null;
  countryCode: string | null

}

interface updateProfileModalprops {
  isModalOpen: boolean;
  setIsModalOpen: (val: boolean) => void;
  fetchUserInformation: () => {};
  userData: userDataTypes;
}

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contactNumber: "",
  countryCode: "",
};

const validationSchema = Yup.object({
  firstName: Yup.string()
    .required(validationConstant.firstNameRequired)
    .matches(
      /^[A-Za-z]+$/,
      validationConstant.firstNameContains,
    )
    .max(25, validationConstant.firstNameMaxLength),
  lastName: Yup.string()
    .required(validationConstant.lastNameRequired)
    .matches(/^[A-Za-z]+$/, validationConstant.lastNameContains)
    .max(25, validationConstant.lastNameMaxLength),
  email: Yup.string()
    .email(validationConstant.validEmail)
    .required(validationConstant.emailRequired),
  contactNumber: Yup.string()
    .matches(/^\+?[1-9]\d{1,14}$/, validationConstant.phoneNumberContains)
    .min(10, validationConstant.validPhone)
    .max(10, validationConstant.validPhone),
});

const UpdateProfileModal: React.FC<updateProfileModalprops> = ({
  isModalOpen,
  setIsModalOpen,
  fetchUserInformation,
  userData,
}) => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const dispatch = useDispatch();

  const handleSubmit = async (
    values: any,
    { setSubmitting }: FormikHelpers<any>,
  ) => {
    dispatch(setLoading(true));
    try {
      const payload = {
        data: {
          ...values,
          selectedUserId:
            typeof userInfo === "object" ? userInfo.userId : undefined,
            clubId: userData?.clubId,
            courseIds: userData.courseId
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
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title="Edit Profile"
    >
      <Formik
        initialValues={
          userData
            ? {
                firstName: userData?.firstName || '',
                lastName: userData?.lastName || '',
                email: userData?.email || '',
                contactNumber: userData.contactNumber || '',
                countryCode: userData.countryCode || '',
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
        }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                id="firstName"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                className="mx-5 w-[90%] rounded-lg border border-gray-200 bg-[#F5F6F7] px-2 py-3 text-gray-500 md:w-[430px]"
              />
              <div className="mb-5 ml-6">
                {touched.firstName &&
                  errors.firstName &&
                  typeof errors.firstName === "string" && (
                    <span className="text-red-600">{errors.firstName}</span>
                  )}
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  id="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mx-5 w-[90%] rounded-lg border border-gray-200 bg-[#F5F6F7] px-2 py-3 text-gray-500 md:w-[430px]"
                />
                <div className="mb-5 ml-6">
                  {touched.lastName &&
                    errors.lastName &&
                    typeof errors.lastName === "string" && (
                      <span className="text-red-600">{errors.lastName}</span>
                    )}
                </div>
              </div>
            </div>
            <div>
              <input
                type="text"
                name="email"
                placeholder="Email"
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
              <div className="mb-4 flex gap-4">
                <input
                  name="countryCode"
                  className="ml-5 w-[15%] rounded-lg border border-gray-200 bg-[#E6E6E6] cursor-not-allowed px-4 py-3 "
                  value={values.countryCode}
                  disabled
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
                  disabled
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength={10}
                  className="w-[71%] rounded-lg border border-gray-200 bg-[#E6E6E6] cursor-not-allowed px-2 py-3 text-gray-500"
                />
              </div>
              <div className="mb-5 ml-6">
                {touched.contactNumber &&
                  errors.contactNumber &&
                  typeof errors.contactNumber === "string" && (
                    <span className="text-red-600">{errors.contactNumber}</span>
                  )}
              </div>
            </div>
            <div className="flex w-full items-center justify-end rounded-bl-lg rounded-br-lg border border-gray-200 bg-[#F5F6F7] p-6 md:w-[480px]">
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
        )}
      </Formik>
    </Modal>
  );
};

export default UpdateProfileModal;
