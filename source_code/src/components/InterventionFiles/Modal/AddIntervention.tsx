/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import React, { useEffect, useRef, useState } from 'react';
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
import AddInterventionApi from '../../../api/services/Intervention/AddIntervention.service';
import { getAllAssignToCall } from '../../../redux/slice/Intervention/getAllAssign';
import VerifyProgramBookApi from '../../../api/services/ProgramBook/VerifyProgramBookApi.service';
import Select from '../../Generics/Select';
import { nameValidation } from '../../../constants/ValidationMessages';
interface AddInterventionModalProps {
    open: boolean;
    onClose: () => void;
}
interface InterventionPlanValues {
    clientName: string;
    interventionPlanName: string;
    type: string;
    assignedTo: string;
    assignToMe: false;
}
export default function AddIntervention({
    open,
    onClose,
}: AddInterventionModalProps): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const [showError, setShowError] = useState(false);
    const [showErrorInterventionName, setShowErrorInterventionName] =
        useState(false);
    const [options, setOptions] = useState({
        servicesData: [],
        clientName: [],
        assignTo: [],
    });
    const initialValues: InterventionPlanValues = {
        clientName: '',
        interventionPlanName: '',
        type: '',
        assignedTo: '',
        assignToMe: false,
    };
    const servicesData = useSelector(
        ({ getAllClientInquiryDetailsCall }: any) =>
            getAllClientInquiryDetailsCall?.services?.data
    );
    const assignNames = useSelector(({ getUser }: any) => getUser?.value?.data);
    const getAllUsers = useSelector(({ users }: any) => users?.value);
    const getGridData = useSelector(({ getMine }: any) => getMine);
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const CreateIntervention = async (values: any): Promise<void> => {
        try {
            const data = {
                id: '',
                interventionPlanName: values?.interventionPlanName,
                therapyType: values?.type,
                assignedTo: values?.assignedTo,
                clientName: values?.clientName,
            };
            const responseForVerify =
                await VerifyProgramBookApi.VerifyProgramBook({
                    clientId: values?.clientName,
                    therapyType: values?.type,
                });
            if (responseForVerify?.data?.error) {
                setShowError(true);
                return;
            }
            const response = await AddInterventionApi.SaveIntervention(data);
            if (response?.data?.error) {
                setShowErrorInterventionName(true);
                return;
            }
            dispatch(
                openNotification({
                    success: true,
                    title: 'Intervention Plan created successfully',
                    description: '',
                })
            );
            const initialData = {
                heading: '',
                roleId: userPermission?.userRoles?.data?.roleId,
                type: getGridData?.tab,
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
        } catch (error) {
            // Handle any unexpected errors here

            // Optionally set an error state or display a generic error message
            setShowError(true);
        }
    };
    const handleSubmitForm = async (
        values: InterventionPlanValues,
        { setSubmitting }: FormikHelpers<InterventionPlanValues>
    ): Promise<any> => {
        try {
            setSubmitting(true);
            CreateIntervention(values);
        } catch (error) {
        } finally {
            setSubmitting(false);
        }
    };
    const validationSchema = Yup.object().shape({
        clientName: Yup.number().required('Client Name is required'),
        interventionPlanName: Yup.string().matches(
            /^[\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]{1,150}$/,
            nameValidation
        ),
        type: Yup.number().required('Type is required'),
        assignedTo: Yup.number().required('Assigned To is required'),
    });
    const updateOptions = (services: any, key: any): void => {
        if (key === 'servicesData') {
            const optionsData = services?.map((item: any) => ({
                value: item?.id,
                label: item?.name,
            }));
            setOptions((prev: any) => ({
                ...prev,
                [key]: optionsData,
            }));
        } else if (key === 'clientName') {
            const optionsData = getAllUsers?.map((item: any) => ({
                value: item?.id,
                label: `${item?.firstName}  ${item?.lastName}`,
            }));
            setOptions((prev: any) => ({
                ...prev,
                [key]: optionsData,
            }));
        } else if (key === 'assignTo') {
            const optionsData = assignNames?.map((item: any) => ({
                value: item?.id,
                label: `${item?.firstName}  ${item?.lastName}`,
            }));
            setOptions((prev: any) => ({
                ...prev,
                [key]: optionsData,
            }));
        }
    };
    useEffect(() => {
        updateOptions(servicesData, 'servicesData');
    }, [servicesData]);
    useEffect(() => {
        updateOptions(getAllUsers, 'clientName');
    }, [getAllUsers]);
    useEffect(() => {
        updateOptions(assignNames, 'assignTo');
    }, [assignNames]);
    const formikRef: any = useRef<any>(null);
    const profileData = useSelector(
        ({ userProfileData }: any) => userProfileData?.value?.data
    );
    const groupIdOptions = (): any => {
        const data = {
            label: `${profileData?.userId?.firstName} ${profileData?.userId?.lastName}`,
            value: profileData?.userId?.id,
        };
        formikRef?.current?.setFieldValue('assignedTo', data?.value);
    };
    return (
        <Modal open={open} id={'add-Client-Doc-modal'} expandModal={false}>
            <ModalHeader
                title={'Create Intervention Plan'}
                icon={false}
                onExpand={undefined}
            />
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmitForm}
                validationSchema={validationSchema}
                validateOnChange
                innerRef={formikRef}
                enableReinitialize={true}
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
                                    <div className="ClientsName mb-5 w-[40rem] z-50">
                                        <Field
                                            data-testid="clientNameIntervention"
                                            autoComplete="off"
                                            isRequired={true}
                                            name="clientName"
                                            label="Clients's Name"
                                        >
                                            {({ field, form }: FieldProps) => (
                                                <Select
                                                    placeholder="Select"
                                                    value={field.value}
                                                    showSearch={true}
                                                    isRequired={true}
                                                    label={"Clients's Name"}
                                                    options={
                                                        options?.clientName
                                                    }
                                                    onChange={(value: any) => {
                                                        form.setFieldValue(
                                                            field.name,
                                                            value?.[0]
                                                        );
                                                        setShowError(false);
                                                        setTimeout(() => {
                                                            form.setFieldError(
                                                                field.name,
                                                                ''
                                                            );
                                                        }, 0);
                                                    }}
                                                />
                                            )}
                                        </Field>
                                    </div>
                                    <div className="InterventionName mb-5 w-[40rem]">
                                        <Field
                                            data-testId="interventionPlanNameInp"
                                            className="py-3 px-4  block w-full border-gray-200 rounded-lg outline-none text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                            label="Intervention Plan Name"
                                            isRequired={true}
                                            id="interventionPlanName"
                                            name="interventionPlanName"
                                            component={Input}
                                            value={values?.description}
                                            onChange={(e: any) => {
                                                handleChange(e);
                                                setShowErrorInterventionName(
                                                    false
                                                );
                                                setFieldTouched(
                                                    'interventionPlanName',
                                                    true,
                                                    false
                                                );
                                            }}
                                            placeholder="Enter intervention plan name"
                                        />
                                        {showErrorInterventionName && (
                                            <span className="text-red-500 text-xs -mt-1">
                                                Intervention Name already exist
                                                for this client
                                            </span>
                                        )}
                                    </div>
                                    <div className="Type mb-5 w-[40rem]">
                                        <Field
                                            data-testId="interventionTypeInp"
                                            autoComplete="off"
                                            isRequired={true}
                                            name="type"
                                            label="Type"
                                        >
                                            {({ field, form }: FieldProps) => (
                                                <Select
                                                    placeholder="Select"
                                                    value={field.value}
                                                    showSearch={true}
                                                    isRequired={true}
                                                    // handleBlur={setFieldTouched}
                                                    label={'Type'}
                                                    options={
                                                        options?.servicesData
                                                    }
                                                    onChange={(value: any) => {
                                                        form.setFieldValue(
                                                            field.name,
                                                            value?.[0]
                                                        );
                                                        setShowError(false);
                                                        setTimeout(() => {
                                                            form.setFieldError(
                                                                field.name,
                                                                ''
                                                            );
                                                            dispatch(
                                                                getAllAssignToCall(
                                                                    {
                                                                        type: value?.value,
                                                                    }
                                                                )
                                                            );
                                                        }, 0);
                                                    }}
                                                    // form={{
                                                    //     touched,
                                                    //     errors,
                                                    // }}
                                                />
                                            )}
                                        </Field>
                                        {showError && (
                                            <span className="text-red-500 text-xs -mt-1">
                                                Intervention Plan of type
                                                already exist for this client
                                            </span>
                                        )}
                                    </div>
                                    <div className="nameProgramBookLibrary  w-[40rem] z-50">
                                        <Field
                                            data-testId="assignedToInp"
                                            autoComplete="off"
                                            isRequired={true}
                                            name="assignedTo"
                                            label="AssignedTo"
                                        >
                                            {({ field, form }: FieldProps) => (
                                                <Select
                                                    placeholder="Select"
                                                    value={field.value}
                                                    showSearch={true}
                                                    isRequired={true}
                                                    // handleBlur={setFieldTouched}
                                                    label={'Assigned To'}
                                                    options={options?.assignTo}
                                                    onChange={(value: any) => {
                                                        form.setFieldValue(
                                                            field.name,
                                                            value?.[0]
                                                        );
                                                        setTimeout(() => {
                                                            form.setFieldError(
                                                                field.name,
                                                                ''
                                                            );
                                                        }, 0);
                                                    }}
                                                />
                                            )}
                                        </Field>
                                    </div>
                                    <div
                                        className={`flex items-center mt-1 h-8 focus:outline-none`}
                                    >
                                        <Field
                                            className="w-[1.2rem] h-[1.2rem] border-none focus:border-none rounded-sm border-None shadow-[0_2px_7px_rgb(0,0,0,0.2)] mx-4 mt-4"
                                            type="checkbox"
                                            autoComplete="off"
                                            id={'assignToMe'}
                                            name={'assignToMe'}
                                            checked={values?.assignToMe}
                                            onChange={(e: any) => {
                                                handleChange(e);
                                                groupIdOptions();
                                            }}
                                        />
                                        <label className="text-sm mt-4">
                                            {'Assign to me'}
                                        </label>
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
}
