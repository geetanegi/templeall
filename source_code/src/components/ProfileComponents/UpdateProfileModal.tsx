import React from 'react'
import Modal from '../ModalComponent'
import { Formik, FormikHelpers } from 'formik';
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../reducers/loader/loader';
import { ToastError, ToastSuccess } from '../Toast';
import { API_URL } from '../../services/enums';
import { RootState } from '../../store';
import apiService from '../../services/apiService';

interface userDataTypes {
    firstName: string;
    lastName: string;
    email: string;
    contactNumber: string;
    
}

interface updateProfileModalprops {
    isModalOpen: boolean;
    setIsModalOpen: (val: boolean) => void;
    fetchUserInformation: () => {}
    userData: userDataTypes

}

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    countryCode: "+1"

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
    email: Yup.string()
        .email("Please enter a valid email address")
        .required("Email is Required"),
    contactNumber: Yup.string().matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number.')
    .min(10, "Please enter valid phone number.")
    .max(10, "Please enter valid phone number.")

});

const UpdateProfileModal: React.FC<updateProfileModalprops> = ({ isModalOpen, setIsModalOpen, fetchUserInformation, userData }) => {

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
                },
            };
            const { data, status } = await apiService.post<any>(
                API_URL.updateUserProfile,
                payload,
            );
            if (status === 200 && data?.data != null && !data?.error) {
                ToastSuccess(data.data.message);
                fetchUserInformation()
                setIsModalOpen(false);
            } else if (data?.error && data.description) {
                ToastError(data.description);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
            dispatch(setLoading(false));
        }
    };

    return (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title='Edit Profile'

        >
            <Formik
                initialValues={userData ? {
                    firstName: userData?.firstName,
                    lastName: userData?.lastName,
                    email: userData?.email,
                    contactNumber: userData.contactNumber,
                    countryCode: "+1"
                } : initialValues}
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

                    >
                        <div>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                id="firstName"
                                value={values.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="mx-5  rounded-lg border border-gray-200 bg-[#F5F6F7] px-2 py-3 text-gray-500 w-[90%] md:w-[430px]"
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
                                    className="mx-5  rounded-lg border border-gray-200 bg-[#F5F6F7] px-2 py-3 text-gray-500 w-[90%] md:w-[430px]"
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
                                className="mx-5 rounded-lg border border-gray-200 bg-[#E6E6E6] text-[#7B7887] cursor-not-allowed px-2 py-3 text-gray-500 w-[90%] md:w-[430px]"
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
                                    className="ml-5 border border-gray-200 bg-[#F5F6F7] w-[15%] rounded-lg px-4 py-3"
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
                                    className=" rounded-lg w-[71%] border border-gray-200 bg-[#F5F6F7] px-2 py-3 text-gray-500 "
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
                                className="w-32 rounded-md bg-lime-500 py-2 text-white"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
        </Modal >
    )
}

export default UpdateProfileModal
