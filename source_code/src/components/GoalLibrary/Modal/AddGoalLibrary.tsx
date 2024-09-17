import React, { useCallback, useEffect, useRef, useState } from 'react';
import Modal, {
    AddInterventionModalFooter,
    ModalBody,
    ModalHeader,
} from '../../Generics/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { Field, FieldProps, Formik, FormikHelpers } from 'formik';
import Input from '../../Generics/Inputs/Input';
import * as Yup from 'yup';
import { getActiveAsync } from '../../../redux/slice/MineSlice/getMine';
import { openNotification } from '../../../redux/slice/Notification/notifications';
import { getAllAssignToCall } from '../../../redux/slice/Intervention/getAllAssign';
import AddGoalLibraryApi from '../../../api/services/GoalLibrary/AddGoalLibrary.service';
import Select from '../../Generics/Select/index';
import {
    descriptionValidation,
    nameValidation,
} from '../../../constants/ValidationMessages';
interface AddInterventionModalProps {
    readonly open: boolean;
    readonly onClose: () => void;
}
interface InterventionPlanValues {
    Name: string;
    Description: string;
    type: string;
}
const AddGoalLibrary: React.FC<AddInterventionModalProps> = ({
    open,
    onClose,
}) => {
    const dispatch = useDispatch<any>();
    const formikRef = useRef<any>(null);
    const [showError, setShowError] = useState(false);
    const [options, setOptions] = useState({ servicesData: [] });
    const initialValues: InterventionPlanValues = {
        Name: '',
        Description: '',
        type: '',
    };
    const servicesData = useSelector(
        ({ getAllClientInquiryDetailsCall }: any) =>
            getAllClientInquiryDetailsCall?.services?.data
    );
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const createIntervention = async (values: any): Promise<void> => {
        const data = {
            id: '',
            Name: values?.Name,
            therapyType: values?.type,
            Description: values?.Description,
            organizationId: userPermission?.value?.data?.orgId || '1',
            userId: userPermission?.value?.data?.userId || '2',
        };
        const response = await AddGoalLibraryApi.SaveGoalLibrary(data);
        if (response?.data?.error) {
            dispatch(
                openNotification({
                    success: false,
                    title: response.data.description || 'Error',
                    description: '',
                })
            );
        } else {
            dispatch(
                openNotification({
                    success: true,
                    title: 'Goal library created successfully',
                    description: '',
                })
            );
        }
        onClose();
        const initialData = {
            heading: '',
            roleId: userPermission?.userRoles?.data?.roleId,
            type: 'GOAL_LIBRARY',
            assignedTo: userPermission?.value?.data?.userId,
            pagination: { startIndex: 0, noOfRecords: 19 },
            order: '',
            name: '',
            filterValue: '',
            appointmentWith: '1',
            publishStatus: 'Published',
        };
        setTimeout(() => {
            onClose();
            dispatch(getActiveAsync(initialData));
        }, 1000);
    };
    const handleSubmitForm = async (
        values: InterventionPlanValues,
        { setSubmitting }: FormikHelpers<InterventionPlanValues>
    ): Promise<void> => {
        try {
            setSubmitting(true);
            await createIntervention(values);
        } catch (error) {
        } finally {
            setSubmitting(false);
        }
    };
    const validationSchema = Yup.object().shape({
        Name: Yup.string().matches(
            /^[\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{1,150}$/,
            nameValidation
        ),
        Description: Yup.string().matches(
            /^[\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{1,400}$/,
            descriptionValidation
        ),
        type: Yup.number().required('Type is required'),
    });
    const updateOptions = useCallback((services: any, key: string): void => {
        if (key === 'servicesData') {
            const optionsData = services?.map((item: any) => ({
                value: item?.id,
                label: item?.name,
            }));
            setOptions((prev) => ({
                ...prev,
                [key]: optionsData,
            }));
        }
    }, []);
    useEffect(() => {
        updateOptions(servicesData, 'servicesData');
    }, [servicesData, updateOptions]);
    return (
        <Modal open={open} id="add-Client-Doc-modal" expandModal={false}>
            <ModalHeader
                title="Add New Goal Library"
                icon={false}
                onExpand={undefined}
            />
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmitForm}
                validationSchema={validationSchema}
                validateOnChange={true}
                innerRef={formikRef}
                enableReinitialize
                validateOnBlur={true}
            >
                {(props: any) => {
                    const {
                        values,
                        handleChange,
                        handleSubmit,
                        setFieldTouched,
                    } = props;
                    return (
                        <form
                            onSubmit={handleSubmit}
                            className="px-4 w-auto h-auto"
                        >
                            <ModalBody expandModal={false}>
                                <div className="px-7 py-7 w-[55rem]">
                                    <div className="Name mb-5 w-[40rem]">
                                        <Field
                                            className="py-3 px-4 block w-full border-gray-200 rounded-lg outline-none text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                            label="Name"
                                            isRequired
                                            id="Name"
                                            name="Name"
                                            component={Input}
                                            value={values?.Name}
                                            onChange={(
                                                e: React.ChangeEvent<HTMLInputElement>
                                            ) => {
                                                handleChange(e);
                                                setFieldTouched(
                                                    'Name',
                                                    true,
                                                    false
                                                );
                                            }}
                                            placeholder="Enter goal library name"
                                            autoFocus
                                        />
                                    </div>
                                    <div className="Description mb-5 w-[40rem]">
                                        <Field
                                            className="py-3 px-4 block w-full border-gray-200 rounded-lg outline-none text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                            label="Description"
                                            id="Description"
                                            name="Description"
                                            component={Input}
                                            value={values?.Description}
                                            onChange={(
                                                e: React.ChangeEvent<HTMLInputElement>
                                            ) => {
                                                handleChange(e);
                                                setFieldTouched(
                                                    'Description',
                                                    true,
                                                    false
                                                );
                                            }}
                                            placeholder="Enter description"
                                        />
                                    </div>
                                    <div className="Type mb-5 w-[40rem]">
                                        <Field
                                            autoComplete="off"
                                            isRequired
                                            name="type"
                                            label="Type"
                                        >
                                            {({ field, form }: FieldProps) => (
                                                <Select
                                                    isRequired={true}
                                                    label={'Type'}
                                                    options={
                                                        options?.servicesData
                                                    }
                                                    onChange={(
                                                        value:
                                                            | string
                                                            | undefined
                                                    ) => {
                                                        form.setFieldValue(
                                                            field.name,
                                                            value?.[0]
                                                        );
                                                        setShowError(false);
                                                        setTimeout((): void => {
                                                            dispatch(
                                                                getAllAssignToCall(
                                                                    {
                                                                        type: value?.[0],
                                                                    }
                                                                )
                                                            );
                                                        }, 0);
                                                    }}
                                                    value={field?.value}
                                                    showSearch={true}
                                                    multi={false}
                                                    placeholder={''}
                                                    isDisabled={false}
                                                />
                                            )}
                                        </Field>
                                        {showError && (
                                            <span className="text-red-500 text-xs -mt-1">
                                                Goal library Plan of type
                                                already exist for this client
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </ModalBody>
                            <AddInterventionModalFooter
                                onClose={onClose}
                                handleSubmit={handleSubmit}
                            />
                        </form>
                    );
                }}
            </Formik>
        </Modal>
    );
};
export default AddGoalLibrary;
