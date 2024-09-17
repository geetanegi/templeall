import * as React from 'react';
import Modal, {
    ModalBody,
    ModalHeader,
    CreateClientModalActions,
} from '../../Generics/Modal';
import Input from '../../Generics/Inputs/Input';
import { Field, Formik, FieldProps } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import customRateApi from '../../../api/services/Rate/addCustomRate.service';
import { openNotification } from '../../../redux/slice/Notification/notifications';
import { clearData } from '../../../redux/slice/Rate/customRateSlice';
import {
    getActiveAsync,
    savingTabData,
} from '../../../redux/slice/MineSlice/getMine';
import Select from '../../Generics/Select';

interface AddCustomRateProps {
    open?: boolean;
    onClose: () => void;
}
export default function AddCustomRate({
    open,
    onClose,
}: AddCustomRateProps): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const dropDownData = useSelector(
        ({ customRateSlice }: any) => customRateSlice
    );
    const authData = useSelector(
        ({ editAuthorizationCode }: any) => editAuthorizationCode?.value
    );
    interface Values {
        client: any;
        clientRate: string;
        employee: any;
        employeeRate: string;
    }
    const initialValues: any = {
        client: '',
        clientRate: '',
        employee: '',
        employeeRate: '',
    };

    const handleSubmitForm = async (values: Values): Promise<any> => {
        const payload = {
            ...values,
            id: '',
            client: values?.client,
            employee: values?.employee,
            authorizationCodeId: authData?.id?.toString(),
        };
        const data = {
            heading: '',
            roleId: userPermission?.userRoles?.data?.roleId,
            type: 'AUTHORIZED_CODE',
            assignedTo: userPermission?.value?.data?.userId,
            pagination: { startIndex: 0, noOfRecords: 19 },
            order: '',
            name: '',
            filterValue: '',
            appointmentWith: '1',
            publishStatus: 'Published',
        };
        const res = await customRateApi.saveCustomRate(payload);
        if (!res?.data?.error) {
            dispatch(
                openNotification({
                    success: true,
                    title: res?.data?.data,
                    description: '',
                })
            );
            dispatch(getActiveAsync(data));
            dispatch(savingTabData({ tab: 'AUTHORIZED_CODE' }));
            dispatch(clearData());
            onClose();
        } else {
            dispatch(
                openNotification({
                    success: false,
                    title: res?.data?.description,
                    description: '',
                })
            );
            onClose();
        }
    };
    const isDisabled = (values: any): boolean => {
        return (
            !values?.clientRate ||
            !values?.client ||
            !values?.employee ||
            !values?.employeeRate
        );
    };
    const handleRateChange = (e: any, handleChange: any): void => {
        const value = e.target.value;
        const regex = /^[0-9]*\.?[0-9]*$/;

        if (regex.test(value)) {
            handleChange(e);
        }
    };
    const onCancel = (): void => {
        dispatch(clearData());
        onClose();
    };

    return (
        <Modal
            open={open}
            id={'add-custom-rate'}
            expandModal={false}
            data-testid="custom-modal"
        >
            <ModalHeader
                title={`Custom Rate - ${authData?.code} ${authData?.description ? authData?.description : ''}`}
                onExpand={undefined}
                icon={false}
            />
            <ModalBody expandModal={false}>
                <div className="w-[39rem] h-[18rem] my-1">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmitForm}
                        validateOnChange
                        enableReinitialize={true}
                    >
                        {(props: any) => {
                            const { values, handleSubmit, handleChange } =
                                props;
                            return (
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-20">
                                        <div className="flex Client my-5">
                                            <div className="w-[14rem] mx-2">
                                                <Field
                                                    placeholder="Select..."
                                                    onChange={(e: any) => {
                                                        handleChange(e);
                                                    }}
                                                    label="Client"
                                                    autoComplete="off"
                                                    isRequired={false}
                                                    id="client"
                                                    name="client"
                                                    className="border-b-2 border-gray-200  bg-white  rounded-none border-x-0 border-t-0 pb-1 outline-none"
                                                    value={values}
                                                >
                                                    {({
                                                        field,
                                                        form,
                                                    }: FieldProps) => (
                                                        <Select
                                                            label={'Client'}
                                                            options={dropDownData?.client?.map(
                                                                (
                                                                    data: any
                                                                ) => ({
                                                                    label: `${data?.firstName} ${data?.lastName}`,
                                                                    value: data?.id,
                                                                })
                                                            )}
                                                            onChange={(
                                                                selectedOption: any
                                                            ) => {
                                                                form.setFieldValue(
                                                                    'client',
                                                                    selectedOption?.[0]
                                                                );
                                                                setTimeout(
                                                                    () => {
                                                                        form.setFieldError(
                                                                            'client',
                                                                            ''
                                                                        );
                                                                    },
                                                                    0
                                                                );
                                                            }}
                                                            value={field.value}
                                                            showSearch={true}
                                                            multi={false}
                                                            placeholder={
                                                                'Select'
                                                            }
                                                            inputClassName={
                                                                'border-0 border-b border-gray-400 focus:border-blue-500 focus:ring-0 px-0 ps-0'
                                                            }
                                                        />
                                                    )}
                                                </Field>
                                            </div>
                                            <div className="w-[10rem] ml-16">
                                                <Field
                                                    className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-[1.9rem] rounded-none focus:ring-transparent"
                                                    label="Rate $"
                                                    autoComplete="off"
                                                    isRequired={false}
                                                    id="clientRate"
                                                    name="clientRate"
                                                    component={Input}
                                                    value={values.clientRate}
                                                    onChange={(e: any) =>
                                                        handleRateChange(
                                                            e,
                                                            handleChange
                                                        )
                                                    }
                                                    placeholder="Enter rate"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex Employee mt-8">
                                            <div className="w-[14rem] mx-2">
                                                <Field
                                                    placeholder="Select..."
                                                    onChange={(e: any) => {
                                                        handleChange(e);
                                                    }}
                                                    label="Employee"
                                                    autoComplete="off"
                                                    isRequired={false}
                                                    id="employee"
                                                    name="employee"
                                                    className="border-b-2 border-gray-200  bg-white  rounded-none border-x-0 border-t-0 pb-1 outline-none"
                                                    value={values}
                                                >
                                                    {({
                                                        field,
                                                        form,
                                                    }: FieldProps) => (
                                                        <Select
                                                            label={'Employee'}
                                                            options={dropDownData?.client?.map(
                                                                (
                                                                    data: any
                                                                ) => ({
                                                                    label: `${data?.firstName} ${data?.lastName}`,
                                                                    value: data?.id,
                                                                })
                                                            )}
                                                            onChange={(
                                                                selectedOption: any
                                                            ) => {
                                                                form.setFieldValue(
                                                                    'employee',
                                                                    selectedOption?.[0]
                                                                );
                                                                setTimeout(
                                                                    () => {
                                                                        form.setFieldError(
                                                                            'employee',
                                                                            ''
                                                                        );
                                                                    },
                                                                    0
                                                                );
                                                            }}
                                                            value={field.value}
                                                            showSearch={true}
                                                            multi={false}
                                                            placeholder={
                                                                'Select'
                                                            }
                                                            inputClassName={
                                                                'border-0 border-b border-gray-400 focus:border-blue-500 focus:ring-0 px-0 ps-0'
                                                            }
                                                        />
                                                    )}
                                                </Field>
                                            </div>
                                            <div className="w-[10rem] ml-16">
                                                <Field
                                                    className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-[1.9rem] rounded-none focus:ring-transparent"
                                                    label="Rate $"
                                                    autoComplete="off"
                                                    isRequired={false}
                                                    id="employeeRate"
                                                    name="employeeRate"
                                                    component={Input}
                                                    value={values.employeeRate}
                                                    onChange={(e: any) =>
                                                        handleRateChange(
                                                            e,
                                                            handleChange
                                                        )
                                                    }
                                                    placeholder="Enter rate"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <CreateClientModalActions
                                        onClose={onCancel}
                                        isDisabled={isDisabled(values)}
                                        handleSubmit={handleSubmit}
                                    />
                                </form>
                            );
                        }}
                    </Formik>
                </div>
            </ModalBody>
        </Modal>
    );
}
