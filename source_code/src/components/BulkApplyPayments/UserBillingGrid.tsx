import React from 'react';
import Button from '../Generics/Button';
import Input from '../Generics/Inputs/Input';
import { Field, useFormikContext } from 'formik';
import { DollarSign } from 'lucide-react';

interface AppointmentData {
    dateOfAppointment: string;
    providerId: string;
    billingCode: string;
    location: string;
    billedCharges: number;
    agreedCharges: number;
    calculatedAdjustment: number;
    patientResponsibilityAmount: number;
    adjustmentAmount: number;
    paidAmount: number;
    owedAmount: number;
}

export default function UserBillingGrid({
    tableRecords,
    tableData,
    totalData,
    isParentValid,
}: {
    tableRecords: any;
    tableData: any;
    totalData: any;
    isParentValid: boolean;
}): React.JSX.Element {
    const {
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        isValid,
        isSubmitting,
        dirty,
    }: any = useFormikContext();
    return (
        <div>
            <table className="min-w-full bg-white">
                <thead>
                    <tr className="bg-primary-300 text-black uppercase text-sm leading-normal">
                        {tableData.map((tableHeader: any) => {
                            return (
                                <th
                                    className="py-3 px-6 text-left w-5"
                                    key={tableHeader.header}
                                >
                                    {tableHeader.header}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {tableRecords.map(
                        (data: AppointmentData, index: number) => {
                            return (
                                <tr className=" hover:bg-gray-100" key={index}>
                                    <td className="py-3 px-6 text-left">
                                        {data.dateOfAppointment}
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        {data.providerId}
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        {data.billingCode}
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        {data.location}
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        {data.billedCharges || '-'}
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        {data.agreedCharges || '-'}
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        {data.calculatedAdjustment}
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        {data.patientResponsibilityAmount}
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        {data.adjustmentAmount}
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        {data.paidAmount}
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        {data.owedAmount}
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <Field
                                            label="Amount"
                                            id={`amount-${index}`}
                                            name={`amount-${index}`}
                                            isRequired={true}
                                            component={Input}
                                            type="number"
                                            prefixIcon={
                                                <DollarSign className="w-4 h-4 text-primary-400" />
                                            }
                                            value={values[`amount-${index}`]}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            onKeyDown={(e: any) =>
                                                ['e', 'E', '+', '-'].includes(
                                                    e.key
                                                ) && e.preventDefault()
                                            }
                                        />
                                    </td>
                                </tr>
                            );
                        }
                    )}
                    <tr className="font-bold">
                        <td className="py-3 px-6 text-left"></td>
                        <td className="py-3 px-6 text-left"></td>
                        <td className="py-3 px-6 text-left"></td>
                        <td className="bg-primary-400 py-3 px-6 text-left rounded-l-full">
                            Total
                        </td>
                        <td className="bg-[#C4E4EE] py-3 px-6 text-left">
                            {totalData.billedCharges}
                        </td>
                        <td className="bg-[#C4E4EE] py-3 px-6 text-left">
                            {totalData.agreedCharges}
                        </td>
                        <td className="bg-[#C4E4EE] py-3 px-6 text-left">
                            {totalData.calculatedAdjustment}
                        </td>
                        <td className="bg-[#C4E4EE] py-3 px-6 text-left">
                            {totalData.patientResponsibilityAmount}
                        </td>
                        <td className="bg-[#C4E4EE] py-3 px-6 text-left">
                            {totalData.adjustmentAmount}
                        </td>
                        <td className="bg-[#C4E4EE] py-3 px-6 text-left">
                            {totalData.paidAmount}
                        </td>
                        <td className="bg-[#C4E4EE] py-3 px-6 text-left rounded-r-full">
                            {totalData.owedAmount}
                        </td>
                        <td className={'text-center'}>
                            <Button
                                disabled={
                                    !isValid ||
                                    isSubmitting ||
                                    !dirty ||
                                    !isParentValid
                                }
                                className={'w-36'}
                                onClick={handleSubmit}
                            >
                                Apply Payment
                            </Button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
