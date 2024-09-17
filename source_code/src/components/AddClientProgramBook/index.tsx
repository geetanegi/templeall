import * as React from 'react';
import { Field, FieldProps, Formik, FormikErrors, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Input from '../Generics/Inputs/Input';
import Modal, {
    CreateClientModalActions,
    ModalBody,
    ModalHeader,
} from '../Generics/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { openNotification } from '../../redux/slice/Notification/notifications';
import createClientProgramBookAPI from '../../api/services/createClientProgramBook.service';
import { getActiveAsync } from '../../redux/slice/MineSlice/getMine';
import VerifyProgramBookApi from '../../api/services/ProgramBook/VerifyProgramBookApi.service';
import Select from '../Generics/Select';
import { nameValidation } from '../../constants/ValidationMessages';
interface Values {
    clientName: string;
    programBookName: string;
    type: string;
    assignToMe: false;
}
interface Validity {
    programBookName: string;
}
export default function AddClientProgramBookModal({
    open,
    onClose,
}: {
    open: boolean;
    onClose: any;
}): React.JSX.Element {
    const [options, setOptions] = React.useState({
        servicesData: [],
        clientName: [],
        assignTo: [],
    });
    const [errorForVerify, setErrorForVerify] = React.useState(false);
    const [showError, setShowError] = React.useState(false);
    const dispatch = useDispatch<any>();
    const servicesData = useSelector(
        ({ getAllClientInquiryDetailsCall }: any) =>
            getAllClientInquiryDetailsCall?.services?.data
    );
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const assignNames = useSelector(({ getUser }: any) => getUser?.value?.data);
    const getAllUsers = useSelector(({ users }: any) => users?.value);
    const getMineData = useSelector(({ getMine }: any) => getMine);
    const profileData = useSelector(
        ({ userProfileData }: any) => userProfileData?.value?.data
    );
    const formikRef: any = React.useRef<any>(null);
    const saveSubmit = async (values: any): Promise<void> => {
        const data = {
            programName: values?.programBookName,
            isTemplate: 'true',
            createdBy: userPermission?.value?.data?.userId || '2',
            assignedTo: values?.assignedTo[0],
            domainCount: '10',
            domainCountAchieved: '2',
            programCountAchieved: '2',
            targetCount: '2',
            programCount: '8',
            targetGoalsCount: '5',
            status: '1',
            userChildId: values?.clientName[0],
            therapyType: values?.type?.value,
        };
        const response = await VerifyProgramBookApi.VerifyProgramBook({
            clientId: values?.clientName[0],
        });
        if (!response?.data?.error) {
            const res =
                await createClientProgramBookAPI.createClientProgramBook(data);
            if (!res?.data?.error) {
                onClose();
                const title = 'Client Program Book created successfully';
                dispatch(
                    openNotification({
                        success: true,
                        title: title,
                        description: '',
                    })
                );
                const apiPayload = {
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
                dispatch(getActiveAsync(apiPayload));
            } else {
                setShowError(true);
            }
        } else {
            setErrorForVerify(true);
        }
    };
    const handleSubmitForm = async (
        values: Values,
        { setSubmitting }: FormikHelpers<Values>
    ): Promise<any> => {
        setSubmitting(true);
        saveSubmit(values);
    };
    const groupIdOptions = (): any => {
        const data = {
            label: `${profileData?.userId?.firstName}  ${profileData?.userId?.lastName}`,
            value: profileData?.userId?.id,
        };
        formikRef?.current?.setFieldValue('assignedTo', data?.value);
    };
    const initialValues: any = {
        clientName: '',
        programBookName: '',
        type: '',
        assignedTo: '',
    };
    const validationSchema = Yup.object().shape({
        programBookName: Yup.string()

            .matches(
                /^[\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{1,150}$/,
                nameValidation
            ),
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
    React.useEffect(() => {
        updateOptions(servicesData, 'servicesData');
    }, [servicesData]);
    React.useEffect(() => {
        updateOptions(getAllUsers, 'clientName');
    }, [getAllUsers]);
    React.useEffect(() => {
        updateOptions(assignNames, 'assignTo');
    }, [assignNames]);
    const disableSaveButton = (values: any): any => {
        return !values?.programBookName;
    };
    function hasErrors(errors: FormikErrors<Validity>): boolean {
        return Object.values(errors).some(
            (error) => typeof error === 'string' && error.length > 0
        );
    }
    return (
        <>
            <Modal open={open} id={'add-Client-Doc-modal'} expandModal={false}>
                <ModalHeader
                    title={'Create Client Program Book'}
                    onExpand={undefined}
                    icon={false}
                />
                <ModalBody expandModal={false}>
                    <div className="w-[50rem] my-6">
                        <Formik
                            initialValues={initialValues}
                            onSubmit={handleSubmitForm}
                            innerRef={formikRef}
                            enableReinitialize={true}
                            validationSchema={validationSchema}
                            validateOnChange
                        >
                            {(props: any) => {
                                const {
                                    values,
                                    handleChange,
                                    handleSubmit,
                                    errors,
                                } = props;
                                const shouldDisable = hasErrors(errors);
                                return (
                                    <>
                                        <form onSubmit={handleSubmit}>
                                            <div className="w-10/12 space-y-1 px-7 py-2">
                                                <Field
                                                    autoComplete="off"
                                                    isRequired={true}
                                                    name="clientName"
                                                    label="Clients's Name"
                                                >
                                                    {({
                                                        field,
                                                        form,
                                                    }: {
                                                        field: any;
                                                        form: any;
                                                    }) => (
                                                        <Select
                                                            label={
                                                                "Clients's Name"
                                                            }
                                                            options={
                                                                options?.clientName
                                                            }
                                                            onChange={(
                                                                selectedOption: any
                                                            ) => {
                                                                form.setFieldValue(
                                                                    field.name,
                                                                    selectedOption
                                                                );
                                                            }}
                                                            value={field.value}
                                                            showSearch={true}
                                                            multi={false}
                                                            placeholder={
                                                                'Select'
                                                            }
                                                            inputClassName={
                                                                'border-0 border-b border-gray-400 focus:border-blue-500 focus:ring-0'
                                                            }
                                                        />
                                                    )}
                                                </Field>
                                                {errorForVerify && (
                                                    <span className="text-red-500 text-xs -mt-1">
                                                        Program Book already
                                                        exist for this client.
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex justify-between px-7 py-2">
                                                <div className="border-b-1 w-10/12 border-black-100">
                                                    <Field
                                                        label="Program Book Name"
                                                        isRequired={true}
                                                        id="programBookName"
                                                        name="programBookName"
                                                        component={Input}
                                                        value={
                                                            values?.programBookName
                                                        }
                                                        onChange={(e: any) => {
                                                            handleChange(e);
                                                        }}
                                                        placeholder="Program Book Name"
                                                    />
                                                </div>
                                            </div>
                                            {showError && (
                                                <p
                                                    className="text-xs text-red-600 ps-8"
                                                    id="hs-validation-name-error-helper"
                                                >
                                                    Please provide an unique
                                                    program book name.
                                                </p>
                                            )}
                                            <div className="w-10/12 space-y-1 px-7 py-2">
                                                <Field
                                                    autoComplete="off"
                                                    isRequired={false}
                                                    name="assignedTo"
                                                    label=" Assigned To "
                                                >
                                                    {({
                                                        field,
                                                        form,
                                                    }: FieldProps) => (
                                                        <Select
                                                            value={field.value}
                                                            showSearch={true}
                                                            multi={false}
                                                            label={
                                                                ' Assigned To '
                                                            }
                                                            options={
                                                                options?.assignTo
                                                            }
                                                            onChange={(
                                                                selectedOption: any
                                                            ) => {
                                                                form.setFieldValue(
                                                                    field.name,
                                                                    selectedOption
                                                                );
                                                            }}
                                                            placeholder={
                                                                'Select'
                                                            }
                                                            inputClassName={
                                                                'border-0 border-b border-gray-400 focus:border-blue-500 focus:ring-0'
                                                            }
                                                        />
                                                    )}
                                                </Field>
                                            </div>
                                            <div
                                                className={`flex items-center mt-1 h-8 focus:outline-none px-4 `}
                                            >
                                                <Field
                                                    className="w-[1.2rem] h-[1.2rem] border-none focus:border-none rounded-sm border-None shadow-[0_2px_7px_rgb(0,0,0,0.2)] mx-3 mt-4"
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
                                            <CreateClientModalActions
                                                onClose={onClose}
                                                isDisabled={
                                                    disableSaveButton(values) ||
                                                    shouldDisable
                                                }
                                                handleSubmit={handleSubmit}
                                            />
                                        </form>
                                    </>
                                );
                            }}
                        </Formik>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
}
