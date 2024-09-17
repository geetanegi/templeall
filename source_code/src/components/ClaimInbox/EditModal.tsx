import * as React from 'react';
import { Field, Formik, FormikErrors, FormikHelpers } from 'formik';
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
interface Values {
    secondaryQualifier: string;
    idCode: string;
    type: string;
    assignToMe: false;
}
interface Validity {
    idCode: string;
}
export default function EditModal({
    open,
    onClose,
}: {
    open: boolean;
    onClose: any;
}): React.JSX.Element {
    const [errorForVerify, setErrorForVerify] = React.useState(false);
    const [showError, setShowError] = React.useState(false);
    const dispatch = useDispatch<any>();

    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );

    const getMineData = useSelector(({ getMine }: any) => getMine);

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

    const initialValues: any = {
        secondaryQualifier: '',
        idCode: '',
    };

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
            <Modal
                open={open}
                id={'add-new-secondary-qualifier'}
                expandModal={false}
            >
                <ModalHeader
                    title={'Add New Secondary Qualifier'}
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
                                                    name="secondaryQualifier"
                                                    label="Secondary ID Qualifier"
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
                                                                'Secondary ID Qualifier'
                                                            }
                                                            options={['a']}
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
                                                <div className="border-b-1 w-10/12 ">
                                                    <Field
                                                        label="ID Code"
                                                        isRequired={true}
                                                        id="idCode"
                                                        name="idCode"
                                                        component={Input}
                                                        value={
                                                            values?.programBookName
                                                        }
                                                        onChange={(e: any) => {
                                                            handleChange(e);
                                                        }}
                                                        placeholder="ID Code"
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
