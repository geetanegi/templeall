import * as React from 'react';
import { Field, Formik, FormikHelpers } from 'formik';
import JoditReact from 'jodit-react-ts';
import 'jodit/build/jodit.min.css';
import Datepicker from 'react-tailwindcss-datepicker';
import { saveClientDocumentCall } from '../../redux/slice/SaveClientDocument/saveClientDcument';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllDocumentByIdCall } from '../../redux/slice/GetDocumentById/getAllDocument';
import { openNotification } from '../../redux/slice/Notification/notifications';
import Input from '../Generics/Inputs/Input';
import Modal, {
    CreateClientModalActions,
    ModalBodyForDocument,
    ModalHeader,
} from '../Generics/Modal';
import {
    getInterventionByInterventionId,
    saveClientInterventionDoc,
    // getInterventionDocumentCall,
} from '../../redux/slice/InterventionAll/InterventionSlice';

interface Values {
    name: string;
}

export default function AddMenuClientDocumentModal({
    open,
    onClose,
    titleData,
    titleValue,
    id,
    editDocumentData,
    addNewType,
    isIntervention,
}: {
    open: boolean;
    onClose: any;
    titleData: string;
    titleValue: string;
    id?: any;
    editDocumentData?: any;
    addNewType?: any;
    isIntervention?: any;
}): React.JSX.Element {
    const params = useParams();
    const programBookUUID = params?.id;
    const InterventionUUID = params?.interventionId;
    const programBookData = useSelector(
        ({ getProgramBookDataById }: any) => getProgramBookDataById?.value?.data
    );

    const dispatch = useDispatch<any>();
    const [description, setDescription] = React.useState('');
    const [dateValue, setDateValue] = React.useState({
        startDate: null,
        endDate: null,
    });
    const handleDateChange = (newValue: any): void => {
        setDateValue(newValue);
    };
    const url = window?.location?.href?.includes('session');
    const saveSubmit = (values: any): void => {
        const data = {
            id: id,
            programBookUUID: programBookUUID,
            name: values?.name,
            description: JSON.stringify({
                description: description || editDocumentData?.description,
                name: values?.name,
                dateValue: dateValue || editDocumentData?.dateValue,
            }),
            createdBy: programBookData?.createdBy?.id || '1',
            modifiedBy: programBookData?.modifiedBy?.id || '1',
            intakeLocation: 'Bhopal',
            isUserCreated: true,
            type: titleValue,
        };
        const dataVal = {
            id: id,
            interventionPlanId: InterventionUUID,
            name: values?.name,
            description: JSON.stringify({
                description: description || editDocumentData?.description,
                name: values?.name,
                dateValue: dateValue || editDocumentData?.dateValue,
            }),
            createdBy: '1',
            modifiedBy: '1',
            intakeLocation: 'Bhopal',
            isUserCreated: true,
            documentDate: dateValue || editDocumentData?.dateValue,
            type: 'ClientFaceSheet',
        };
        const data1 = {
            programBookUUID: params?.id,
        };
        {
            isIntervention
                ? dispatch(saveClientInterventionDoc(dataVal))
                : dispatch(saveClientDocumentCall(data));
        }
        onClose();
        dispatch(
            openNotification({
                success: true,
                title: 'Data saved successfully.',
                description: '',
            })
        );
        setTimeout(() => {
            const payload1 = { interventionPlanId: params?.interventionId };

            isIntervention
                ? dispatch(getInterventionByInterventionId(payload1))
                : dispatch(getAllDocumentByIdCall(data1));
        }, 1000);
        const dataNew = {
            id: id,
            name: values?.name || editDocumentData?.name,
            type: titleValue,
        };
        addNewType(dataNew);
    };

    const handleSubmitForm = async (
        values: Values,
        { setSubmitting }: FormikHelpers<Values>
    ): Promise<any> => {
        setSubmitting(true);
        saveSubmit(values);
    };
    const handleDescription = (newValue: any): void => {
        setDescription(newValue);
    };

    const initialValuesEdit: any = {
        name: editDocumentData?.name,
    };
    const initialValues: any = {
        name: '',
    };
    const disableSaveButton = (values: any): any => {
        return values?.name;
    };

    React.useEffect(() => {
        setDateValue(editDocumentData?.dateValue);
    }, [editDocumentData?.dateValue]);
    return (
        <>
            <Modal open={open} id={'add-Client-Doc-modal'} expandModal={false}>
                <ModalHeader
                    title={titleData}
                    onExpand={undefined}
                    icon={false}
                />
                <ModalBodyForDocument expandModal={false}>
                    <div>
                        <Formik
                            initialValues={
                                editDocumentData
                                    ? initialValuesEdit
                                    : initialValues
                            }
                            onSubmit={handleSubmitForm}
                            validateOnChange
                        >
                            {(props: any) => {
                                const { values, handleChange, handleSubmit } =
                                    props;
                                return (
                                    <>
                                        <form onSubmit={handleSubmit}>
                                            <div className="flex justify-between px-7 py-2">
                                                <div className="border-b-1 w-96 border-black-100">
                                                    <Field
                                                        label="Name"
                                                        isRequired={true}
                                                        autoFocus={true}
                                                        id="name"
                                                        name="name"
                                                        component={Input}
                                                        value={values?.name}
                                                        onChange={(e: any) => {
                                                            handleChange(e);
                                                        }}
                                                        disabled={
                                                            url ? true : false
                                                        }
                                                        placeholder="Name"
                                                    />
                                                </div>
                                                <div className=" px-7 py-4">
                                                    <Datepicker
                                                        toggleClassName="absolute bg-theme-lightBlue1 rounded-r-lg text-white
                    right-0 h-full px-3 text-gray-400 focus:outline-none
                     disabled:opacity-40 disabled:cursor-not-allowed"
                                                        placeholder="Select Date"
                                                        value={dateValue}
                                                        onChange={
                                                            handleDateChange
                                                        }
                                                        disabled={
                                                            url ? true : false
                                                        }
                                                        popoverDirection="down"
                                                        useRange={false}
                                                        asSingle={true}
                                                        inputClassName="py-[0.5rem] px-3 w-96 border-2 border-[#E5E5E5]-800 rounded-md text-sm disabled:opacity-30"
                                                    />
                                                </div>
                                            </div>
                                            <div className=" px-3 py-3 ml-4">
                                                <JoditReact
                                                    onChange={handleDescription}
                                                    defaultValue={
                                                        editDocumentData?.description
                                                    }
                                                    config={{
                                                        readonly: url
                                                            ? true
                                                            : false,
                                                    }}
                                                />
                                            </div>
                                            <CreateClientModalActions
                                                onClose={onClose}
                                                isDisabled={
                                                    url
                                                        ? true
                                                        : disableSaveButton
                                                }
                                                handleSubmit={handleSubmit}
                                            />
                                        </form>
                                    </>
                                );
                            }}
                        </Formik>
                    </div>
                </ModalBodyForDocument>
            </Modal>
        </>
    );
}
