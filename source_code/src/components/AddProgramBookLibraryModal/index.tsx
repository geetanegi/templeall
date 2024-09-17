/* eslint-disable max-len */
import React from 'react';
import Modal, {
    ModalBody,
    ModalHeader,
    ProgramBookModalFooter,
} from '../Generics/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { saveProgramBookLibraryActiveAsync } from '../../redux/slice/ProgramBookLibrarySlice/saveProgramBookLibrarySlice';
import { Field, Formik, FormikErrors, FormikHelpers } from 'formik';
import Input from '../Generics/Inputs/Input';
import * as Yup from 'yup';
import { getActiveAsync } from '../../redux/slice/MineSlice/getMine';
import { openNotification } from '../../redux/slice/Notification/notifications';
import {
    descriptionValidation,
    nameValidation,
} from '../../constants/ValidationMessages';
interface AddProgramBookLibraryModalProps {
    open: boolean;
    onClose: () => void;
}

interface Values {
    name: string;
    description: string;
}

export default function AddProgramBookLibraryModal({
    open,
    onClose,
}: AddProgramBookLibraryModalProps): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const CreateProgramLibrary = (values: any): void => {
        const data = {
            id: '',
            name: values?.name,
            description: values?.description,
            createdBy: userPermission?.value?.data?.userId || '1',
            modifiedBy: userPermission?.value?.data?.userId || '1',
        };
        dispatch(saveProgramBookLibraryActiveAsync(data));
        const initialData = {
            heading: '',
            roleId: userPermission?.userRoles?.data?.roleId,
            type: 'PROGRAMBOOK_LIBRARY',
            assignedTo: userPermission?.value?.data?.userId,
            pagination: { startIndex: 0, noOfRecords: 19 },
            order: '',
            name: '',
            filterValue: '',
            appointmentWith: '1',
            publishStatus: 'Published',
        };
        const title = 'Program Book Library created successfully';
        dispatch(
            openNotification({
                success: true,
                title: title,
                description: '',
            })
        );
        setTimeout(() => {
            onClose();
            dispatch(getActiveAsync(initialData));
        }, 1000);
    };
    const initialValues: any = {
        name: '',
        description: '',
    };
    const handleSubmitForm = async (
        values: Values,
        { setSubmitting }: FormikHelpers<Values>
    ): Promise<any> => {
        setSubmitting(true);
        CreateProgramLibrary(values);
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()

            .matches(
                /^[\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{1,150}$/,
                nameValidation
            ),
        description: Yup.string().matches(
            /^[\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{1,400}$/,
            descriptionValidation
        ),
    });

    return (
        <Modal open={open} id={'add-Client-Doc-modal'} expandModal={false}>
            <ModalHeader title={'Add New'} icon={false} onExpand={undefined} />
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmitForm}
                validationSchema={validationSchema}
                validateOnChange={true}
                validateOnBlur={true}
            >
                {(props: any) => {
                    const {
                        values,
                        handleChange,
                        handleSubmit,
                        setFieldTouched,
                        errors,
                    } = props;
                    const hasErrors = (
                        errorVal: FormikErrors<Values>
                    ): boolean =>
                        Object.values(errorVal).some(
                            (error) =>
                                typeof error === 'string' && error.length > 0
                        );

                    const shouldDisable = hasErrors(errors);
                    return (
                        <form
                            onSubmit={handleSubmit}
                            className="px-4 w-auto h-auto"
                        >
                            <ModalBody expandModal={false}>
                                <div className="px-7 py-7 w-[35rem]">
                                    <div className="nameProgramBookLibrary">
                                        <Field
                                            className="py-3 px-4  block w-full border-gray-200 rounded-lg outline-none text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                            label="Name"
                                            isRequired={true}
                                            id="name"
                                            name="name"
                                            component={Input}
                                            value={values?.name}
                                            onChange={(e: any) => {
                                                handleChange(e);
                                                setFieldTouched(
                                                    'name',
                                                    true,
                                                    false
                                                );
                                            }}
                                            placeholder="Name"
                                            autoFocus={true}
                                        />
                                    </div>

                                    <div className="DescriptionProgramBookLibrary mt-5">
                                        <Field
                                            className="py-3 px-4  block w-full border-gray-200 rounded-lg outline-none text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                            label="Description"
                                            isRequired={false}
                                            id="description"
                                            name="description"
                                            component={Input}
                                            value={values?.description}
                                            onChange={(e: any) => {
                                                handleChange(e);
                                                setFieldTouched(
                                                    'description',
                                                    true,
                                                    false
                                                );
                                            }}
                                            placeholder="description"
                                        />
                                    </div>
                                </div>
                            </ModalBody>
                            <ProgramBookModalFooter
                                onClose={onClose}
                                handleSubmit={handleSubmit}
                                saveDisabled={shouldDisable}
                            />
                        </form>
                    );
                }}
            </Formik>
        </Modal>
    );
}
