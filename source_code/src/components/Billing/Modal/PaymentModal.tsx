import React, { useEffect, useRef, useState } from 'react';
import Modal, { ModalBody } from '../../Generics/Modal';
import paymentApis, {
    AddPaymentRequestType,
} from '../../../api/services/Billing/payment.service';
import useFullName from '../../../hooks/useFullName';
import Spinner from '../../Generics/Spinner';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import Input from '../../Generics/Inputs/Input';
import Datepicker from 'react-tailwindcss-datepicker';
import Select from '../../Generics/Select';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import PaymentGrid from './PaymentGrid';
import { AppDispatch } from '../../../redux/store';
import { savingTabData } from '../../../redux/slice/MineSlice/getMine';
import { getActiveAsyncHistory } from '../../../redux/slice/MineSlice/getOtherGridData';
import FileUploadComponent from '../../Generics/FileUpload';
const ModalHeader = ({
    handleClose,
    currentRecord,
}: {
    handleClose: () => void;
    currentRecord: any;
}): React.JSX.Element => {
    const fullName = useFullName({ clientId: currentRecord.clientId });
    const provideName = useFullName({ clientId: currentRecord.providerId });
    const { billingCode } = currentRecord;
    return (
        <div className="bg-[#48ABCA] text-white rounded-t-lg p-4 relative">
            <div className="flex justify-between items-center">
                <div className="flex space-x-4">
                    <p className="text-lg font-semibold">Client: {fullName}</p>
                    <p className="text-lg font-semibold">
                        Provider: {provideName}
                    </p>
                </div>
                <button
                    className="absolute top-4 right-4 text-white"
                    onClick={handleClose}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
            <div className="border-b border-white mt-2"></div>
            <div className="text-sm mt-2">
                {billingCode.code} | {billingCode.description}
            </div>
        </div>
    );
};
const PaymentModal = ({
    handleClose,
    activeRecord,
}: {
    handleClose: () => void;
    activeRecord: any;
}): React.JSX.Element => {
    const formikRef = useRef<any>(null);
    const dispatch = useDispatch<AppDispatch>();
    const userProfileData = useSelector((state: any) => state.userProfileData);
    const [currentRecord, setCurrentRecord] = useState<any>(null);
    const [payors, setPayors] = useState([]);
    const [paymentTypes, setPaymentTypes] = useState([]);
    const [renderAgain, setRenderAgain] = useState(true);
    const [loading, setLoading] = useState(true);
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission?.value?.data
    );
    const userFullName = useFullName({
        clientId: userProfileData?.value?.data?.userId || {},
    });
    const userLoginData = JSON.parse(
        localStorage.getItem('access_token') || '{}'
    );
    const validationSchema = Yup.object().shape({
        paymentDate: Yup.object().required(),
        payor: Yup.array().required(),
        paymentType: Yup.array().required(),
        appliedBy: Yup.string(),
        eraNumber: Yup.string().required(),
        notes: Yup.string(),
        amount: Yup.string().required(),
    });
    const initialValues: AddPaymentRequestType = {
        file: '',
        clientId: '',
        billingId: '',
        payor: '',
        displayName: '',
        paymentDate: {
            startDate: moment().format('YYYY-MM-DD'),
            endDate: moment().format('YYYY-MM-DD'),
        },
        paymentType: '',
        appliedBy: userFullName,
        eraNumber: '',
        notes: '',
        amount: '',
    };
    const fetchPayors = async (clientId: any): Promise<void> => {
        try {
            const response = await paymentApis.getPayors(clientId.toString());
            if (response.data.data) {
                setPayors(response.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const fetchPaymentTypes = async (): Promise<void> => {
        try {
            const response = await paymentApis.getPaymentTypes();
            if (response.data.data) {
                setPaymentTypes(response.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const getModalData = (record: any): void => {
        setCurrentRecord(record);
        fetchPayors(record.clientId.childId || record.clientId.id);
        fetchPaymentTypes();
        setLoading(false);
    };
    const fetchRecord = async (billingId: string): Promise<void> => {
        try {
            const response = await paymentApis.getBillingRecord(billingId);
            if (response.data.data) {
                getModalData(response.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const resetForm = (): void => {
        if (formikRef) {
            dispatch(savingTabData({ tab: 'BILLING' }));
            formikRef.current.resetForm({
                ...initialValues,
            });
            setRenderAgain(false);
            setTimeout(() => {
                setRenderAgain(true);
            }, 0);
        }
    };
    const handleSubmitForm = async (values: any): Promise<void> => {
        try {
            const requestData = {
                ...values,
                paymentDate: moment(values.paymentDate).format('YYYY-MM-DD'),
                appliedBy: userProfileData?.value?.data?.userId?.id,
                payor: values?.payor[0],
                paymentType: values?.paymentType[0],
                billingId: currentRecord.id,
                clientId:
                    currentRecord.clientId.childId || currentRecord.clientId.id,
                userId: userLoginData.userId,
                organizationId: userLoginData.orgId,
            };
            const formData = new FormData();
            Object.keys(requestData).forEach((key: string) => {
                formData.append(key, requestData[key]);
            });
            const response = await paymentApis.addPayment(formData);
            if (response.data.data) {
                resetForm();
                const payloadGrid = {
                    billingId: currentRecord?.id,
                    heading: '',
                    roleId: userPermission?.userRoles?.data?.roleId,
                    type: 'Billing Amount',
                    assignedTo: userPermission?.userId,
                    pagination: { startIndex: 0, noOfRecords: 19 },
                    order: 'DESC',
                    name: 'createdDate',
                    filterValue: '',
                    appointmentWith: '1',
                    publishStatus: 'Published',
                };
                fetchRecord(currentRecord.id);
                dispatch(getActiveAsyncHistory(payloadGrid));
            }
        } catch (error) {}
    };
    useEffect(() => {
        if (activeRecord && activeRecord.billingCode) {
            getModalData(activeRecord);
        } else {
            fetchRecord(activeRecord.id);
        }
    }, [activeRecord]);
    const updateAmountValue = (paymentTypeSelection: any): void => {
        const selectedOption: any =
            paymentTypes.find(
                (item: any) => item.id === paymentTypeSelection
            ) || {};
        if (selectedOption.name) {
            if (selectedOption?.name === 'Sales Adjustment') {
                formikRef.current.setFieldValue(
                    'amount',
                    currentRecord.agreedCharges -
                        currentRecord.patientResponsibilityAmount -
                        currentRecord.paidAmount -
                        currentRecord.adjustmentAmount
                );
            } else {
                formikRef.current.setFieldValue(
                    'amount',
                    currentRecord.agreedCharges - currentRecord.paidAmount
                );
            }
        }
    };
    return (
        <Modal open={true} id={'target-modal'} expandModal={false}>
            {loading ? (
                <Spinner />
            ) : (
                <div className="container mx-auto" data-testid="payment-modal">
                    {/* Header Section */}
                    <ModalHeader
                        handleClose={handleClose}
                        currentRecord={currentRecord}
                    />
                    {/* Main Information Section */}
                    <ModalBody expandModal={false}>
                        <div
                            className="bg-white shadow-md p-6 rounded-b-lg mt-2"
                            data-testid="payment-modal"
                        >
                            <div className="grid grid-cols-6 gap-4 mb-16">
                                <div className="flex flex-col">
                                    <p className="text-gray-600 border-b-2 border-[#48ABCA] pb-1 w-[8rem]">
                                        Payor
                                    </p>
                                    <p className="font-bold mt-2">
                                        {currentRecord.payor.name}
                                    </p>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-gray-600 border-b-2 border-[#48ABCA] pb-1  w-[8rem]">
                                        Location
                                    </p>
                                    <p className="font-bold mt-2">
                                        {currentRecord.servicePlaceId.service}
                                    </p>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-gray-600 border-b-2 border-[#48ABCA] pb-1 w-[10rem]">
                                        Rate
                                    </p>
                                    <div className="flex mt-2 space-x-8">
                                        <div className="mr-[1rem]">
                                            <p className="text-gray-600">
                                                Billed
                                            </p>
                                            <p className="font-bold">
                                                {currentRecord.billedRate ||
                                                    '-'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">
                                                Agreed
                                            </p>
                                            <p className="font-bold">
                                                {currentRecord.agreedRate ||
                                                    '-'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-gray-600 border-b-2 border-[#48ABCA] pb-1 w-[24rem]">
                                        Amounts
                                    </p>
                                    <div className="flex mt-2 space-x-6 justify-around w-[23rem]">
                                        <div>
                                            <p className="text-gray-600">
                                                Calc Adj.
                                            </p>
                                            <p className="font-bold">
                                                {
                                                    currentRecord.calculatedAdjustment
                                                }
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">
                                                PR Amt.
                                            </p>
                                            <p className="font-bold underline">
                                                {
                                                    currentRecord.patientResponsibilityAmount
                                                }
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">
                                                Adj.
                                            </p>
                                            <p className="font-bold">
                                                {currentRecord.adjustmentAmount}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">
                                                Paid
                                            </p>
                                            <p className="font-bold">
                                                {currentRecord.paidAmount}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">
                                                Owed
                                            </p>
                                            <p className="font-bold">
                                                {currentRecord.owedAmount}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmitForm}
                                innerRef={formikRef}
                            >
                                {(props: any) => {
                                    const {
                                        values,
                                        handleChange,
                                        handleBlur,
                                        setFieldValue,
                                        dirty,
                                        isValid,
                                        isSubmitting,
                                        handleSubmit,
                                    } = props;
                                    return (
                                        <form onSubmit={handleSubmit}>
                                            <div className="grid grid-cols-4 gap-4 mb-6">
                                                <div>
                                                    <p className="text-sm font-medium">
                                                        Date
                                                        <label className="text-red-700 text-lg font-normal font-['Lato'] ml-[0.25rem]">
                                                            *
                                                        </label>
                                                    </p>
                                                    {renderAgain && (
                                                        <Field
                                                            name="paymentDate"
                                                            autoComplete="off"
                                                            isRequired={true}
                                                            value={{
                                                                startDate:
                                                                    values?.paymentDate,
                                                            }}
                                                            onChange={(
                                                                e: any
                                                            ) => {
                                                                handleChange(e);
                                                            }}
                                                            className=""
                                                        >
                                                            {({
                                                                field,
                                                                form,
                                                            }: {
                                                                field: any;
                                                                form: any;
                                                            }) => (
                                                                <Datepicker
                                                                    id="date"
                                                                    {...field}
                                                                    selected={
                                                                        field.value
                                                                    }
                                                                    useRange={
                                                                        false
                                                                    }
                                                                    asSingle={
                                                                        true
                                                                    }
                                                                    inputClassName="py-[0.5rem] px-3 w-full border-2 border-[#E5E5E5]-800 rounded-md text-sm "
                                                                    onChange={(
                                                                        date
                                                                    ) => {
                                                                        form.setFieldValue(
                                                                            field.name,
                                                                            date
                                                                        );
                                                                    }}
                                                                    popoverDirection="down"
                                                                />
                                                            )}
                                                        </Field>
                                                    )}
                                                </div>
                                                {renderAgain && (
                                                    <div>
                                                        <Field
                                                            autoComplete="off"
                                                            isRequired={true}
                                                            name="payor"
                                                            id="payor"
                                                            label="Payor"
                                                            component={Select}
                                                            options={payors.map(
                                                                (
                                                                    item: any
                                                                ) => ({
                                                                    label: item.name,
                                                                    value: item.id,
                                                                })
                                                            )}
                                                            onChange={(
                                                                selectedOption: any
                                                            ) => {
                                                                setFieldValue(
                                                                    'payor',
                                                                    selectedOption
                                                                );
                                                            }}
                                                        ></Field>
                                                    </div>
                                                )}
                                                {renderAgain && (
                                                    <div>
                                                        <Field
                                                            autoComplete="off"
                                                            isRequired={true}
                                                            name="paymentType"
                                                            id="paymentType"
                                                            label="Payment Type"
                                                            component={Select}
                                                            options={paymentTypes.map(
                                                                (
                                                                    item: any
                                                                ) => ({
                                                                    label: item.name,
                                                                    value: item.id,
                                                                })
                                                            )}
                                                            onChange={(
                                                                selectedOption: any
                                                            ) => {
                                                                setFieldValue(
                                                                    'paymentType',
                                                                    selectedOption
                                                                );
                                                                if (
                                                                    selectedOption
                                                                ) {
                                                                    updateAmountValue(
                                                                        selectedOption[0]
                                                                    );
                                                                }
                                                            }}
                                                        ></Field>
                                                    </div>
                                                )}
                                                <div>
                                                    <Field
                                                        label="Applied By"
                                                        id="appliedBy"
                                                        name="appliedBy"
                                                        component={Input}
                                                        value={values.appliedBy}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        disabled
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-gray-600 font-bold">
                                                        Resource
                                                    </label>
                                                    <FileUploadComponent
                                                        handleChange={(
                                                            name: string,
                                                            file: File | null
                                                        ) => {
                                                            console.log(
                                                                name,
                                                                file
                                                            );
                                                            setFieldValue(
                                                                'file',
                                                                file
                                                            );
                                                            setFieldValue(
                                                                'displayName',
                                                                name
                                                            );
                                                        }}
                                                        handleDelete={() => {
                                                            setFieldValue(
                                                                'file',
                                                                ''
                                                            );
                                                            setFieldValue(
                                                                'displayName',
                                                                ''
                                                            );
                                                        }}
                                                        files={values.file}
                                                        name={'file'}
                                                    />
                                                </div>
                                                <div>
                                                    <Field
                                                        label="ERA Number"
                                                        id="eraNumber"
                                                        name="eraNumber"
                                                        isRequired={true}
                                                        component={Input}
                                                        value={values.eraNumber}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                </div>
                                                <div>
                                                    <Field
                                                        label="Notes"
                                                        id="notes"
                                                        name="notes"
                                                        component={Input}
                                                        value={values.notes}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                </div>
                                                <div>
                                                    <Field
                                                        label="Amount"
                                                        id="amount"
                                                        name="amount"
                                                        isRequired={true}
                                                        component={Input}
                                                        type="number"
                                                        value={values.amount}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        onKeyDown={(e: any) =>
                                                            [
                                                                'e',
                                                                'E',
                                                                '+',
                                                                '-',
                                                            ].includes(e.key) &&
                                                            e.preventDefault()
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex justify-end">
                                                <button
                                                    className="bg-gray-300 text-gray-600 px-4 py-2 rounded mr-2"
                                                    onClick={resetForm}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={
                                                        !dirty ||
                                                        !isValid ||
                                                        isSubmitting
                                                    }
                                                    className="bg-[#48ABCA] text-white px-4 py-2 rounded disabled:opacity-50"
                                                >
                                                    Apply Payment
                                                </button>
                                            </div>
                                        </form>
                                    );
                                }}
                            </Formik>
                        </div>
                        {/* Previous Rates Section */}
                        <div className="bg-white shadow-md mt-4 rounded-lg h-[22rem] overflow-y-scroll">
                            <PaymentGrid
                                currentRecord={currentRecord}
                                fetchRecord={fetchRecord}
                            />
                        </div>
                    </ModalBody>
                </div>
            )}
        </Modal>
    );
};
export default PaymentModal;
