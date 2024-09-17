/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import React, { useEffect, useRef, useState } from 'react';
import Modal, {
    AssigneeModalFooter,
    ModalBody,
    ModalHeader,
} from '../Generics/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { Field, FieldProps, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { openNotification } from '../../redux/slice/Notification/notifications';
import SelectComponent from '../Generics/Inputs/Select';
import AssigneeProgramBookApi from '../../api/services/ProgramBook/AssigneeProgramBook.service';
import { getActiveAsync } from '../../redux/slice/MineSlice/getMine';
import AssigneeInterventionApi from '../../api/services/Intervention/AssigneeIntervention.service';
interface AddInterventionModalProps {
    moduleName: string;
    open: boolean;
    onClose: () => void;
    dataProgramBook: any;
}
interface InterventionPlanValues {
    assignedTo: string;
}
export default function AssigneeModal({
    moduleName,
    dataProgramBook,
    open,
    onClose,
}: AddInterventionModalProps): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const formikRef: any = useRef<any>(null);
    const [options, setOptions] = useState({
        assignTo: [],
    });
    const initialValues: InterventionPlanValues = {
        assignedTo: '',
    };
    const assignNames = useSelector(
        ({ getServices }: any) => getServices?.getClinicianAndTechNames
    );
    const getMineData = useSelector(({ getMine }: any) => getMine);
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const getAllUsers = useSelector(({ users }: any) => users?.value);
    const ChangeAssignName = async (values: any): Promise<void> => {
        if (moduleName === 'programbook') {
            const data = {
                programBookUUID: dataProgramBook?.programBookUUID, // Ensure this is the correct field
                assignedTo: values?.assignedTo?.value,
            };
            const dataGrid = {
                heading: '',
                roleId: userPermission?.userRoles?.data?.roleId,
                type: getMineData?.tab,
                assignedTo: userPermission?.value?.data?.userId,
                pagination: { startIndex: 0, noOfRecords: 19 },
                order: '',
                name: '',
                filterValue: '',
                appointmentWith: '1',
                publishStatus: 'Published',
            };
            const response =
                await AssigneeProgramBookApi.AssigneeProgramBook(data);
            response?.data?.error
                ? dispatch(
                      openNotification({
                          success: false,
                          title: response.data.description || 'Error',
                          description: '',
                      })
                  )
                : dispatch(
                      openNotification({
                          success: true,
                          title: 'Assignee of program book changed successfully.',
                          description: '',
                      })
                  );
            dispatch(getActiveAsync(dataGrid));
        } else {
            const data = {
                interventionPlanId: dataProgramBook?.id, // Ensure this is the correct field
                assignedTo: values?.assignedTo?.value,
            };
            const dataGrid = {
                heading: '',
                roleId: userPermission?.userRoles?.data?.roleId,
                type: getMineData?.tab,
                assignedTo: userPermission?.value?.data?.userId,
                pagination: { startIndex: 0, noOfRecords: 19 },
                order: '',
                name: '',
                filterValue: '',
                appointmentWith: '1',
                publishStatus: 'Published',
            };
            const response =
                await AssigneeInterventionApi.AssigneeIntervention(data);
            response?.data?.error
                ? dispatch(
                      openNotification({
                          success: false,
                          title: response.data.description || 'Error',
                          description: '',
                      })
                  )
                : dispatch(
                      openNotification({
                          success: true,
                          title: 'Assignee of intervention plan changed successfully.',
                          description: '',
                      })
                  );
            dispatch(getActiveAsync(dataGrid));
        }
    };
    const handleSubmitForm = async (
        values: InterventionPlanValues,
        { setSubmitting }: FormikHelpers<InterventionPlanValues>
    ): Promise<void> => {
        try {
            setSubmitting(true);
            await ChangeAssignName(values);
        } catch (error) {
        } finally {
            setSubmitting(false);
            onClose(); // Close the modal after submission
        }
    };
    const validationSchema = Yup.object().shape({
        assignedTo: Yup.object().required('Assigned To is required'),
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
        updateOptions(getAllUsers, 'clientName');
    }, [getAllUsers]);
    useEffect(() => {
        updateOptions(assignNames, 'assignTo');
    }, [assignNames]);
    return (
        <Modal open={open} id={'add-Client-Doc-modal'} expandModal={false}>
            <ModalHeader
                title={'Assignee Management'}
                icon={false}
                onExpand={undefined}
            />
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmitForm}
                validationSchema={validationSchema}
                validateOnChange
                innerRef={formikRef}
            >
                {(props: any) => {
                    const { handleSubmit, setFieldTouched, touched, errors } =
                        props;
                    return (
                        <form
                            onSubmit={handleSubmit}
                            className="px-4 w-auto h-auto"
                        >
                            <ModalBody expandModal={false}>
                                <div className="px-7 py-7 w-[55rem] h-[20rem]">
                                    <div className="ClientsName mb-5 w-[40rem] z-50">
                                        <div className="space-y-1 w-[40rem] border-b-2 border-gray-200">
                                            <span className="text-sm font-bold text-zinc-700 font-[lato] flex">
                                                {moduleName !== 'programbook'
                                                    ? 'Intervention Plan'
                                                    : 'Program Book'}
                                            </span>
                                            <div className="relative">
                                                <span className=" rounded-md text-sm focus:border-primary-600 focus:ring-primary-600 disabled:opacity-30 disabled:pointer-events-none">
                                                    {dataProgramBook?.name}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="InterventionName mb-5 w-[40rem] border-b-2 border-gray-200">
                                        <div className="space-y-1 w-[40rem]">
                                            <span className="text-sm font-bold text-zinc-700 font-[lato] flex">
                                                Assigned To
                                            </span>
                                            <div className="relative">
                                                <span className="rounded-md text-sm focus:border-primary-600 focus:ring-primary-600 disabled:opacity-30 disabled:pointer-events-none">
                                                    {dataProgramBook?.assignedTo
                                                        ?.firstName +
                                                        ' ' +
                                                        dataProgramBook
                                                            ?.assignedTo
                                                            ?.lastName}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="Type mb-5 w-[40rem]"></div>
                                    <div className="nameProgramBookLibrary  w-[40rem] z-50">
                                        <Field
                                            autoComplete="off"
                                            isRequired={true}
                                            name="assignedTo"
                                            label="Change Assignee"
                                        >
                                            {({ field, form }: FieldProps) => (
                                                <SelectComponent
                                                    isSearchable={true}
                                                    isRequired={true}
                                                    handleBlur={setFieldTouched}
                                                    label={'Change Assignee'}
                                                    options={options?.assignTo}
                                                    form={{
                                                        touched,
                                                        errors,
                                                    }}
                                                    field={{
                                                        value: field.value,
                                                        name: field.name,
                                                        onChange: (value) => {
                                                            form.setFieldValue(
                                                                field.name,
                                                                value
                                                            );
                                                            setTimeout(() => {
                                                                form.setFieldError(
                                                                    field.name,
                                                                    ''
                                                                );
                                                            }, 0);
                                                        },
                                                    }}
                                                />
                                            )}
                                        </Field>
                                    </div>
                                </div>
                            </ModalBody>
                            <AssigneeModalFooter
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
