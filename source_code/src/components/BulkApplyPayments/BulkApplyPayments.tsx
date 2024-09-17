/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */
import React, {
    useEffect,
    useState,
    useCallback,
    useRef,
    forwardRef,
    useImperativeHandle,
} from 'react';
import useFullName from '../../hooks/useFullName';
import UserBillingGrid from './UserBillingGrid';
import paymentApis from '../../api/services/Billing/payment.service';
import Select from '../Generics/Select';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import bulkPaymentApis from '../../api/services/Billing/bulkPayment.service';
import { openNotification } from '../../redux/slice/Notification/notifications';
import { useDispatch } from 'react-redux';

type BulkApplyPaymentsProps = {
    record: any;
    paymentType: string;
    isSalesAdjustment: any;
    isParentValid: boolean;
    setClientIsValid: any;
    handleApplyBulkPayment: any;
};

const BulkApplyPayments = forwardRef(
    (
        {
            record,
            paymentType,
            isSalesAdjustment,
            isParentValid,
            setClientIsValid,
            handleApplyBulkPayment,
        }: BulkApplyPaymentsProps,
        ref: any
    ): React.JSX.Element => {
        const [payorAdded, setPayorAdded] = useState(false);
        const [payors, setPayors] = useState([]);
        const [owedTypes, setOwedTypes] = useState([]);
        const formikRef = useRef<any>({});
        const initializer = useRef(false);
        const dispatch = useDispatch<any>();
        const fetchPayors = useCallback(async (): Promise<void> => {
            try {
                const response = await paymentApis.getPayors(
                    record.clientId.id
                );
                if (response.data.data) {
                    setPayors(response.data.data);
                }
            } catch (error) {}
        }, [record.clientId]);
        useEffect(() => {
            if (payorAdded) {
                setClientIsValid(record.clientId.id);
            }
        }, [payorAdded]);

        const fetchOwedTypes = useCallback(async (): Promise<void> => {
            try {
                const response = await bulkPaymentApis.getAllOwedAmountType();
                if (response.data.data) {
                    setOwedTypes(response.data.data);
                }
            } catch (error) {}
        }, []);
        useEffect(() => {
            if (!initializer.current) {
                initializer.current = true;
                fetchPayors();
                fetchOwedTypes();
            }
        }, [fetchOwedTypes, fetchPayors]);

        const tableRecords = record.billingData.map((billingRecord: any) => {
            return {
                dateOfAppointment: billingRecord.dateOfAppointment,
                providerId:
                    billingRecord.providerId.firstName +
                    ' ' +
                    billingRecord.providerId.lastName,
                billingCode: `${billingRecord.billingCode.code} - ${billingRecord.billingCode.description}`,
                location: billingRecord.servicePlaceId.service,
                billedRate: billingRecord.billedRate,
                billedCharges: billingRecord.billedCharges,
                agreedCharges: billingRecord.agreedCharges,
                agreedRate: billingRecord.agreedRate,
                calculatedAdjustment: billingRecord.calculatedAdjustment,
                patientResponsibilityAmount:
                    billingRecord.patientResponsibilityAmount,
                adjustmentAmount: billingRecord.adjustmentAmount,
                paidAmount: billingRecord.paidAmount,
                owedAmount: billingRecord.owedAmount,
            };
        });

        useImperativeHandle(ref, () => ({
            getChildValues() {
                const data = record.billingData.map(
                    (billingRecord: any, index: number) => {
                        return {
                            billingId: billingRecord.id,
                            clientId: record.clientId.id,
                            payor: formikRef.current.values.payor[0],
                            owedAmountId: formikRef.current.values.owed[0],
                            amount: formikRef.current.values[`amount-${index}`],
                        };
                    }
                );
                return data;
            },
        }));

        useEffect(() => {
            if (formikRef.current && paymentType) {
                if (isSalesAdjustment()) {
                    tableRecords.forEach((item: any, index: number) => {
                        formikRef.current.setFieldValue(
                            `amount-${index}`,
                            item.agreedCharges -
                                item.patientResponsibilityAmount -
                                item.paidAmount -
                                item.adjustmentAmount
                        );
                    });
                } else {
                    tableRecords.forEach((item: any, index: number) => {
                        formikRef.current.setFieldValue(
                            `amount-${index}`,
                            item.agreedCharges - item.paidAmount
                        );
                    });
                }
            }
        }, [isSalesAdjustment, paymentType, tableRecords]);
        const tableData = [
            {
                header: 'Date',
                width: '4rem',
            },
            {
                header: 'Provider',
                width: '4rem',
            },
            {
                header: 'Billing Code',
                width: '4rem',
            },
            {
                header: 'Location',
                width: '4rem',
            },
            {
                header: 'Billed Charges',
                width: '2rem',
            },
            {
                header: 'Agreed Charges',
                width: '2rem',
            },
            {
                header: 'Calc. Adj.',
                width: '2rem',
            },
            {
                header: 'PR Amt.',
                width: '2rem',
            },
            {
                header: 'Adj.',
                width: '2rem',
            },
            {
                header: 'Paid',
                width: '2rem',
            },
            {
                header: 'Owed',
                width: '2rem',
            },
            {
                header: '',
                width: '6rem',
            },
        ];

        const getInitialValues = (): any => {
            const initialValues: any = {
                payor: '',
                owed: [1],
            };
            tableRecords.forEach((item: any, index: number) => {
                initialValues[`amount-${index}`] = 0;
            });
            return initialValues;
        };

        const handleApplyPayment = async (): Promise<any> => {
            const data = record.billingData.map(
                (billingRecord: any, index: number) => {
                    return {
                        billingId: billingRecord.id,
                        clientId: record.clientId.id,
                        payor: formikRef.current.values.payor[0],
                        owedAmountId: formikRef.current.values.owed[0],
                        amount: formikRef.current.values[`amount-${index}`],
                    };
                }
            );
            const response = await handleApplyBulkPayment(data);
            if (response) {
                formikRef.current.resetForm(getInitialValues());
                dispatch(
                    openNotification({
                        success: true,
                        title: 'Bulk payment added successfully.',
                        description: '',
                    })
                );
            }
        };
        const getValidationSchema = (): any => {
            const validationSchemaObj: any = {};
            tableRecords.forEach((item: any, index: number) => {
                validationSchemaObj[`amount-${index}`] =
                    Yup.string().required();
            });
            const validationSchema = Yup.object().shape({
                payor: Yup.array().required(),
                owed: Yup.array().required(),
                ...validationSchemaObj,
            });
            return validationSchema;
        };
        return (
            <Formik
                initialValues={getInitialValues()}
                validationSchema={getValidationSchema}
                onSubmit={handleApplyPayment}
                innerRef={formikRef}
            >
                {(props: any) => {
                    const { handleSubmit, setFieldValue, values } = props;
                    return (
                        <form onSubmit={handleSubmit}>
                            <div className="max-w-full mx-10 p-4 border-2 shadow-2xl rounded-md">
                                <h1 className="text-xl font-bold ">
                                    {useFullName({ clientId: record.clientId })}
                                </h1>
                                <div className="bg-gradient-to-r mb-4 from-[#48ABCA] from-0% to-transparent h-[0.2rem] rounded-md"></div>
                                <div className="flex space-x-4 mb-4">
                                    <div>
                                        <Field
                                            autoComplete="off"
                                            isRequired={true}
                                            name="payor"
                                            id="payor"
                                            label="Payor"
                                            component={Select}
                                            options={payors.map(
                                                (item: any) => ({
                                                    label: item.name,
                                                    value: item.id,
                                                })
                                            )}
                                            onChange={(selectedOption: any) => {
                                                setFieldValue(
                                                    'payor',
                                                    selectedOption
                                                );
                                                if (
                                                    selectedOption &&
                                                    selectedOption.length
                                                ) {
                                                    setPayorAdded(true);
                                                }
                                            }}
                                        ></Field>
                                    </div>
                                    <div>
                                        <Field
                                            autoComplete="off"
                                            isRequired={true}
                                            name="owed"
                                            id="owed"
                                            label="Owed"
                                            className="w-80"
                                            value={values.owed}
                                            component={Select}
                                            options={owedTypes.map(
                                                (item: any) => ({
                                                    label: item.name,
                                                    value: item.id,
                                                })
                                            )}
                                            onChange={(selectedOption: any) => {
                                                setFieldValue(
                                                    'owed',
                                                    selectedOption
                                                );
                                            }}
                                        ></Field>
                                    </div>
                                </div>
                                <UserBillingGrid
                                    tableRecords={tableRecords}
                                    tableData={tableData}
                                    totalData={record.totalData}
                                    isParentValid={isParentValid}
                                />
                            </div>
                        </form>
                    );
                }}
            </Formik>
        );
    }
);

export default BulkApplyPayments;
