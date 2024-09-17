import React, { useCallback, useEffect, useRef, useState } from 'react';
import withLayout from '../containers/MasterLayoutContainer';
import { useLocation, useNavigate } from 'react-router-dom';
import bulkPaymentApis from '../api/services/Billing/bulkPayment.service';
import Breadcrumb from '../components/Breadcrumb';
import { ROUTES } from '../constants';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import Datepicker from 'react-tailwindcss-datepicker';
import paymentApis from '../api/services/Billing/payment.service';
import Select from '../components/Generics/Select';
import Input from '../components/Generics/Inputs/Input';
import BulkApplyPayments from '../components/BulkApplyPayments/BulkApplyPayments';
import LoaderComponent from '../components/LoaderComponent';
import Button from '../components/Generics/Button';
import { openNotification } from '../redux/slice/Notification/notifications';
import { useDispatch } from 'react-redux';
import FileUploadComponent from '../components/Generics/FileUpload';
import { DollarSign } from 'lucide-react';

function BulkPayment(): React.JSX.Element {
    const location = useLocation();
    const childRefs = useRef<any>([]);
    const [loading, setLoading] = useState(false);
    const [totalLoading, setTotalLoading] = useState(false);
    const [validClients, setValidClients] = useState<string[]>([]);
    const [total, setTotal] = useState<any>({});
    const [paymentType, setPaymentType] = useState('');
    const [billingRecords, setBillingRecords] = useState<any>([]);
    const [paymentTypes, setPaymentTypes] = useState([]);
    const initializer = useRef(false);
    const formikRef = useRef<any>({});
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const userLoginData = JSON.parse(
        localStorage.getItem('access_token') || '{}'
    );
    const getBillingIds = useCallback((): string[] => {
        return location?.state?.selectedRecords.map(
            (record: any) => record.billingId
        );
    }, [location?.state?.selectedRecords]);
    const getBillingRecordsByClientId = useCallback((): any => {
        const result: any = {};
        location?.state?.selectedRecords?.forEach((item: any) => {
            if (result[item.clientId]) {
                result[item.clientId] = {
                    ...result[item.clientId],
                    billingIds: [
                        ...result[item.clientId].billingIds,
                        item.billingId,
                    ],
                };
            } else {
                result[item.clientId] = {
                    clientId: item.clientId,
                    billingIds: [item.billingId],
                };
            }
        });
        return result;
    }, [location?.state?.selectedRecords]);
    const fetchTotal = useCallback(async (): Promise<void> => {
        try {
            setTotalLoading(true);
            const response =
                await bulkPaymentApis.getGrandTotal(getBillingIds());
            if (response.data.data) {
                setTotal(response.data.data);
                setTotalLoading(false);
            }
        } catch (error) {
            console.error(error);
        }
    }, [getBillingIds]);
    const fetchBillingRecords = useCallback(async (): Promise<void> => {
        try {
            setLoading(true);
            const billingRecordsData = getBillingRecordsByClientId();
            const promiseArr: any = [];
            Object.values(billingRecordsData).map((billingRecord: any) => {
                promiseArr.push(
                    bulkPaymentApis.getBillingDataByClientIds({
                        ...billingRecord,
                    })
                );
            });
            const response = await Promise.all(promiseArr);
            if (response.length) {
                const responseData = response.map(
                    (itemResponse) => itemResponse.data.data
                );
                setBillingRecords(responseData);
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
        }
    }, [getBillingRecordsByClientId]);
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
    useEffect(() => {
        if (!initializer.current) {
            initializer.current = true;
            (async () => {
                fetchBillingRecords();
                fetchTotal();
                fetchPaymentTypes();
            })();
        }
    }, [fetchBillingRecords, fetchTotal]);
    const validationSchema = Yup.object().shape({
        paymentDate: Yup.object().required(),
        paymentType: Yup.array().required(),
        appliedBy: Yup.string(),
        eraNumber: Yup.string().required(),
        notes: Yup.string(),
        amount: Yup.string().required(),
    });
    const initialValues: any = {
        file: '',
        displayName: '',
        paymentDate: {
            startDate: moment().format('YYYY-MM-DD'),
            endDate: moment().format('YYYY-MM-DD'),
        },
        paymentType: '',
        eraNumber: '',
        notes: '',
        clientId: '',
        billingId: '',
        payor: '',
        amount: total.owedAmount,
    };
    const handleApplyBulkPayment = async (records: any): Promise<boolean> => {
        try {
            const values = formikRef.current.values;
            const requestData = {
                ...formikRef.current.values,
                paymentDate: moment(values.paymentDate).format('YYYY-MM-DD'),
                paymentType: values?.paymentType[0],
                userId: userLoginData.userId,
                organizationId: userLoginData.orgId,
                records: JSON.stringify(records),
            };
            const formData = new FormData();
            Object.keys(requestData).forEach((key: string) => {
                formData.append(key, requestData[key]);
            });
            const response = await bulkPaymentApis.applyBulkPayment(formData);
            if (response.data.data) {
                return true;
            }
            return true;
        } catch (error) {
            return false;
        }
    };
    const handleSubmitForm = async (): Promise<void> => {
        try {
            let records: any = [];
            childRefs.current.forEach((child: any) => {
                if (child) {
                    records = [...records, ...child.getChildValues()];
                }
            });
            const response = await handleApplyBulkPayment(records);
            if (response) {
                dispatch(
                    openNotification({
                        success: true,
                        title: 'Bulk payment added successfully.',
                        description: '',
                    })
                );
                navigate(ROUTES.BillingGrid);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const isSalesAdjustment = (): boolean => {
        const selectedOption: any =
            paymentTypes.find((item: any) => item.id === paymentType) || {};
        if (selectedOption.name) {
            if (selectedOption?.name === 'Sales Adjustment') {
                return true;
            }
            return false;
        }
        return false;
    };
    const handleClientValidation = (id: string): void => {
        setValidClients((prev: string[]) => [...prev, id]);
    };
    const allClientsEnabled = (): boolean => {
        return validClients.length === billingRecords.length;
    };
    return (
        <div data-testid="bulkPayment-page">
            {totalLoading ? (
                <LoaderComponent />
            ) : (
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
                            handleSubmit,
                            isValid,
                            dirty,
                            isSubmitting,
                        } = props;
                        return (
                            <div className="mb-10">
                                <div className="mx-8 my-4">
                                    <Breadcrumb
                                        name={'Bulk Payment'}
                                        pageName={'Billing'}
                                        routeName={ROUTES.BillingGrid}
                                    />
                                </div>
                                <div>
                                    <div className="flex p-4">
                                        <form
                                            onSubmit={handleSubmit}
                                            className="w-full flex justify-evenly"
                                        >
                                            <div>
                                                <p className="text-sm font-medium">
                                                    Date
                                                    <label className="text-red-700 text-lg font-normal font-['Lato'] ml-[0.25rem]">
                                                        *
                                                    </label>
                                                </p>
                                                <Field
                                                    name="paymentDate"
                                                    autoComplete="off"
                                                    isRequired={true}
                                                    value={{
                                                        startDate:
                                                            values?.paymentDate,
                                                    }}
                                                    onChange={(e: any) => {
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
                                                            useRange={false}
                                                            asSingle={true}
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
                                            </div>
                                            <div>
                                                <Field
                                                    autoComplete="off"
                                                    isRequired={true}
                                                    name="paymentType"
                                                    id="paymentType"
                                                    label="Payment Type"
                                                    component={Select}
                                                    options={paymentTypes.map(
                                                        (item: any) => ({
                                                            label: item.name,
                                                            value: item.id,
                                                        })
                                                    )}
                                                    onChange={(
                                                        selectedOption: any
                                                    ) => {
                                                        if (
                                                            selectedOption &&
                                                            selectedOption.length
                                                        ) {
                                                            setFieldValue(
                                                                'paymentType',
                                                                selectedOption
                                                            );
                                                            setPaymentType(
                                                                selectedOption[0]
                                                            );
                                                        }
                                                    }}
                                                ></Field>
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
                                                        console.log(name, file);
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
                                                    prefixIcon={
                                                        <DollarSign className="w-4 h-4 text-primary-400" />
                                                    }
                                                    label="Running Total"
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
                                        </form>
                                    </div>
                                </div>
                                {loading ? (
                                    <LoaderComponent />
                                ) : (
                                    <>
                                        {billingRecords.map(
                                            (record: any, index: number) => {
                                                return (
                                                    <BulkApplyPayments
                                                        key={record.clientId.id}
                                                        record={record}
                                                        paymentType={
                                                            paymentType
                                                        }
                                                        isSalesAdjustment={
                                                            isSalesAdjustment
                                                        }
                                                        isParentValid={
                                                            isValid &&
                                                            dirty &&
                                                            !isSubmitting
                                                        }
                                                        setClientIsValid={
                                                            handleClientValidation
                                                        }
                                                        ref={(el) =>
                                                            (childRefs.current[
                                                                index
                                                            ] = el)
                                                        }
                                                        handleApplyBulkPayment={
                                                            handleApplyBulkPayment
                                                        }
                                                    />
                                                );
                                            }
                                        )}
                                        <div className="mx-10 my-10 flex justify-end">
                                            <table className="min-w-[50%] bg-transparent">
                                                <tbody className="text-gray-600 text-sm font-light">
                                                    <tr className="font-bold bg-transparent">
                                                        <td className="bg-none py-3 px-3 text-center"></td>
                                                        <td className="bg-none py-3 px-3 text-center">
                                                            Calc. Adj.
                                                        </td>
                                                        <td className="bg-none py-3 px-3 text-center">
                                                            PR Amt.
                                                        </td>
                                                        <td className="bg-none py-3 px-3 text-center">
                                                            Adjustments
                                                        </td>
                                                        <td className="bg-none py-3 px-3 text-center">
                                                            Paid
                                                        </td>
                                                        <td className="bg-none py-3 px-3 text-center rounded-r-full">
                                                            Owed
                                                        </td>
                                                    </tr>
                                                    <tr className="font-bold bg-white">
                                                        <td className="bg-primary-300 py-3 px-3 text-center rounded-l-full">
                                                            Total
                                                        </td>
                                                        <td className="bg-white py-3 px-3 text-center border border-gray-200">
                                                            {
                                                                total.calculatedAdjustment
                                                            }
                                                        </td>
                                                        <td className="bg-white py-3 px-3 text-center border border-gray-200">
                                                            {
                                                                total.patientResponsibilityAmount
                                                            }
                                                        </td>
                                                        <td className="bg-white py-3 px-3 text-center border border-gray-200">
                                                            {
                                                                total.adjustmentAmount
                                                            }
                                                        </td>
                                                        <td className="bg-white py-3 px-3 text-center border border-gray-200">
                                                            {total.paidAmount}
                                                        </td>
                                                        <td className="bg-white py-3 px-3 text-center  border border-gray-200 rounded-r-full">
                                                            {total.owedAmount}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="flex justify-end mx-10 pb-10">
                                            <Button
                                                type="secondary"
                                                className={'w-36'}
                                                onClick={() =>
                                                    navigate(ROUTES.BillingGrid)
                                                }
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                disabled={
                                                    !isValid ||
                                                    isSubmitting ||
                                                    !dirty ||
                                                    !allClientsEnabled()
                                                }
                                                className={'w-36'}
                                                onClick={handleSubmit}
                                            >
                                                Apply Payment
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    }}
                </Formik>
            )}
        </div>
    );
}

export default withLayout(BulkPayment);
