import React, { useEffect, useState } from "react";
import Modal from "../ModalComponent";
import apiService from "../../services/apiService";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { ToastInfo, ToastSuccess } from "../Toast";
import { API_URL } from "../../services/enums";
import { setLoading } from "../../reducers/loader/loader";
import { useDispatch } from "react-redux";
import { validationConstant } from "../../utils/validationEnums";
import FormikControl from "../../Formik/components/FormikControl";
import MUISelect from "../../Formik/components/MUISelect";
import MUINumber from "../../Formik/components/MUINumber";

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



const AddAdminModal: React.FC<AddAdminModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  userData,
  closeModal,
  handleRefreshUserCount,
  refreashUserData,
  selectedUserTab,
}) => {


  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required(validationConstant.firstNameRequired)
      .matches(/^[A-Za-z]+$/, validationConstant.firstNameContains)
      .max(25, validationConstant.firstNameMaxLength),
    lastName: Yup.string()
      .required(validationConstant.lastNameRequired)
      .matches(/^[A-Za-z]+$/, validationConstant.lastNameContains)
      .max(25, validationConstant.lastNameMaxLength),
    username: Yup.string()
      .required(validationConstant.usernameRequired)
      .matches(/^[a-zA-Z0-9]+$/, validationConstant.userNameContains)
      .min(3, validationConstant.usernameMinWordLimit)
      .max(25, validationConstant.userNameMaxWordLimit),
    password: Yup.string()
      .required(validationConstant.passwordIsRequired)
      .matches(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[a-zA-Z\d@$!%*#?&]{8,25}$/,
        validationConstant.passwordContains,
      ),
    mobile: Yup.string()
      .matches(/^[0-9]+$/, validationConstant.phoneNumberContains)
      .required(validationConstant.phoneNumberIsRequired),
    countryCode: Yup.string()
      .required(validationConstant.countryCodeRequired)
      .max(4, validationConstant.countryCodeMaxLength),
    emailId: Yup.string()
      .email(validationConstant.validEmail)
      .required(validationConstant.emailRequired),
    courseIds:selectedUserTab === 2? Yup.string().required(validationConstant.courseRequired) :  Yup.string().when("selectedUserTab", {
      is: (selectedUserTab: number | string) => selectedUserTab === 2, // Make sure this logic is correct
      then: Yup.string().required(validationConstant.courseRequired),
      otherwise: Yup.string().nullable(),
    }),
  });

  const [, setRoles] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const fetchCourseList = async () => {
    try {
      const res = await apiService.post<any>(API_URL.getCourseList, {
        data: {},
      });
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

  const dispatch = useDispatch();

  let initialValues = {}
  if(selectedUserTab === 2){
    initialValues = {
      firstName: "",
      lastName: "",
      username: "",
      emailId: "",
      password: "",
      roleIds: "",
      countryCode: "+1",
      mobile: "",
      courseIds: ""
    }
  }else {
    initialValues = {
      firstName: "",
      lastName: "",
      username: "",
      emailId: "",
      password: "",
      roleIds: "",
      countryCode: "+1",
      mobile: "",
    }
  }

  useEffect(() => {
    getRoles();
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      fetchCourseList();
    }
  }, [isModalOpen]);

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
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ isSubmitting }) => (
          // <form
          // onSubmit={handleSubmit}
          // className="w-full rounded-lg md:w-[480px]"
          // >
            <Form>
            <div
              className="h-full w-full overflow-y-auto overflow-x-hidden md:w-[480px]"
              style={{ maxHeight: "60vh" }}
            >
              <div className="relative mx-5 mb-5">
                <input
                  type="text"
                  value={selectedUserTab === 2 ? "Course Admin" : "Super Admin"}
                  disabled
                  className={`w-full cursor-not-allowed rounded-md border border-gray-400 bg-gray-200 px-2 py-3 text-gray-500`}
                />
              </div>
              {selectedUserTab === 2 ? (
                <div className="mb-3 px-5">
                  <MUISelect
                    label="Course"
                    name="courseIds"
                    required={true}
                    options={courses}
                  />
                </div>
              ) : null}
              <div className="mx-5 flex justify-between gap-4">
                <div className="flex">
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
                <div className="flex">
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
              <div className="mx-5 flex">
                <FormikControl
                  label="Username"
                  name="username"
                  control="customInput"
                  className="w-full"
                  placeholder="Username"
                  type="text"
                  required={true}
                />
              </div>
              <div className="mx-5 flex">
                <FormikControl
                  label="Password"
                  name="password"
                  control="customInput"
                  className="w-full"
                  placeholder="Password"
                  type="password"
                  required={true}
                />
              </div>
              <div className="mx-5 flex">
                <FormikControl
                  label="Email"
                  name="emailId"
                  control="customInput"
                  className="w-full"
                  placeholder="Email"
                  type="email"
                  required={true}
                />
              </div>
              <div className="relative mx-5 flex gap-1">
                <div className="flex w-[30%]">
                  <FormikControl
                    label="Country Code"
                    name="countryCode"
                    control="customInput"
                    className="w-full"
                    maxLength={5}
                    placeholder="Country Code"
                    maxLength={5}
                    validateRegex={/^\+?[0-9]+$/}
                    type="text"
                    required={true}
                  />
                </div>
                <div className="flex w-full">
                  <MUINumber
                    label="Phone"
                    name="mobile"
                    className="h-full w-full"
                    type="text"
                    required={true}
                    maxLength={10}
                  />
                </div>
              </div>
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
          </Form>
          // </form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddAdminModal;
