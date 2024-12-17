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
import FormikControl from "../../Formik/components/FormikControl";
import MUINumber from "../../Formik/components/MUINumber";

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
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="mx-5 w-full md:w-[430px]">
              <div>
              <FormikControl
                    label="First Name"
                    name="firstName"
                    control="customInput"
                    className="w-full"
                    placeholder="First Name"
                    type="text"
                    required={true}
                  />
              </div>
              <div>
              <FormikControl
                    label="Last Name"
                    name="lastName"
                    control="customInput"
                    className="w-full"
                    placeholder="Last Name"
                    type="text"
                    required={true}
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
              <div className="mb-4 flex gap-4">
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
                    className="h-full w-full "
                    type="text"
                    maxLength={10}
                    disabled={true}
                  />
                </div>
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
