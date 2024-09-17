/* eslint-disable max-lines */
import * as React from 'react';
import Modal, {
    AddOtherPayorActionFooter,
    ModalBody,
    ModalHeader,
} from '../../Generics/Modal';
import * as Yup from 'yup';
import { Field, Formik, FormikProps } from 'formik';
import Input from '../../Generics/Inputs/Input';
import Select from '../../Generics/Select';
import { State } from 'country-state-city';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import {
    clearData,
    fetchParentInfoCall,
    getChildCall,
} from '../../../redux/slice/ClientInsurance/ClientInsurance';
import addOtherPayorAPI from '../../../api/services/Users/addOtherPayor.service';
import { openNotification } from '../../../redux/slice/Notification/notifications';
import { getOtherPayorCall } from '../../../redux/slice/Insurance/insurance';
interface Values {
    name: string;
    childName: string;
    cellPhone: string;
    subscriberFirstName: string;
    subscriberLastName: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipCode: string;
    useParentDetails: boolean;
}
interface Client {
    clientInsurance: {
        child: {
            map(
                arg0: (item: {
                    firstName: string;
                    lastName: string;
                    id: string;
                }) => {
                    label: string;
                    value: string;
                }
            ): string;
            firstName: string;
            lastName: string;
            id: number;
            length: number;
            0: {
                id: number;
            };
        };
        parent: {
            cellPhone?: string;
            parentFirstName?: string;
            parentLastName?: string;
            primaryAddress1?: string;
            primaryAddress2?: string;
            city?: string;
            state?: string;
            postalCode?: string;
            firstName: string;
            lastName: string;
            id: string;
        };
    };
}
interface OtherPayorsEditData {
    insurance: {
        otherPayorsById: {
            subscriberZipCode: string | undefined;
            postalCode: string | undefined;
            id?: string;
            name?: string;
            userChild?: { id: string };
            cellPhone?: string;
            subscriberFirstName?: string;
            subscriberLastName?: string;
            subscriberAddressLine1?: string;
            subscriberAddressLine2?: string;
            subscriberCity?: string;
            subscriberState?: string;
            subscriberPostalCode?: string;
        };
    };
}
interface UserPermission {
    getUserPermission: {
        value?: { data?: { orgId?: string } };
        orgId?: string;
    };
}
interface User {
    getEmployeeById: {
        value: {
            userId: number;
        };
    };
}
interface Insurance {
    insurance: {
        clientId: number;
    };
}
export default function AddOtherPayors({
    open,
    onClose,
    modeView,
}: {
    open?: boolean;
    onClose?: any;
    modeView?: boolean;
}): React.JSX.Element {
    const dispatch = useDispatch<AppDispatch>();
    const formikRef: any = React.useRef<HTMLFormElement>(null);
    const userId = useSelector(
        ({ getEmployeeById }: User) => getEmployeeById?.value?.userId
    );
    const userPermission = useSelector(
        ({ getUserPermission }: UserPermission) => getUserPermission
    );
    const childInfo = useSelector(
        ({ clientInsurance }: Client) => clientInsurance?.child
    );
    const parentInfo = useSelector(
        ({ clientInsurance }: Client) => clientInsurance?.parent
    );
    const insuranceDetail = useSelector(
        ({ insurance }: Insurance) => insurance
    );
    const otherPayorsEditData = useSelector(
        ({ insurance }: OtherPayorsEditData) => insurance?.otherPayorsById
    );
    const [isCheck, setIsCheck] = React.useState(false);
    const [userChildId, setUserChildId] = React.useState<any>('');
    const [name, setName] = React.useState('');
    const getAllValues = (): Values => {
        return {
            name: otherPayorsEditData?.name || name,
            childName: otherPayorsEditData?.userChild?.id || userChildId,
            cellPhone:
                parentInfo?.cellPhone || otherPayorsEditData?.cellPhone || '+1',
            subscriberFirstName:
                parentInfo?.parentFirstName ||
                otherPayorsEditData?.subscriberFirstName ||
                '',
            subscriberLastName:
                parentInfo?.parentLastName ||
                otherPayorsEditData?.subscriberLastName ||
                '',
            address1:
                parentInfo?.primaryAddress1 ||
                otherPayorsEditData?.subscriberAddressLine1 ||
                '',
            address2:
                parentInfo?.primaryAddress2 ||
                otherPayorsEditData?.subscriberAddressLine2 ||
                '',
            city: parentInfo?.city || otherPayorsEditData?.subscriberCity || '',
            state:
                parentInfo?.state || otherPayorsEditData?.subscriberState || '',
            zipCode:
                parentInfo?.postalCode ||
                otherPayorsEditData?.subscriberZipCode ||
                '',
            useParentDetails: isCheck,
        };
    };
    const allState = State?.getStatesOfCountry('US');
    const getChildInfo = (): string => {
        return childInfo?.map((item: any) => ({
            label: `${item?.firstName} ${item?.lastName}`,
            value: item?.id,
        }));
    };
    const handleCheckboxChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        if (e.target.checked) {
            setIsCheck(true);
            dispatch(
                fetchParentInfoCall({
                    parentId: userId || insuranceDetail?.clientId,
                })
            );
        } else {
            setIsCheck(false);
            dispatch(clearData());
        }
    };
    const handleDisable = (values: Values): boolean => {
        return (
            !values?.childName ||
            !values?.name ||
            !values?.subscriberFirstName ||
            !values?.subscriberLastName ||
            !values?.address1 ||
            !values?.state[0] ||
            !values?.city ||
            !values?.cellPhone ||
            !values?.zipCode
        );
    };
    const handleSubmitSave = async (values: Values): Promise<any> => {
        const data = {
            id: otherPayorsEditData?.id ? otherPayorsEditData?.id : '',
            organizationId:
                userPermission?.value?.data?.orgId ||
                userPermission?.orgId ||
                '',
            userChildId: values?.childName,
            name: values?.name,
            useParentDetails: false,
            subscriberFirstName: values?.subscriberFirstName,
            subscriberLastName: values?.subscriberLastName,
            subscriberAddressLine1: values?.address1,
            subscriberAddressLine2: values?.address2,
            subscriberState: values?.state[0],
            subscriberCity: values?.city,
            subscriberPostalCode: values?.zipCode,
            cellPhone: values?.cellPhone,
        };
        const res = await addOtherPayorAPI.addOtherPayor(data);
        if (!res?.data?.error) {
            const payloadData = {
                clientId: userId || insuranceDetail?.clientId,
            };
            dispatch(getOtherPayorCall(payloadData));
            onClose();
            if (otherPayorsEditData?.id) {
                dispatch(
                    openNotification({
                        success: true,
                        title: 'Other payor details edited successfully.',
                        description: '',
                    })
                );
            } else {
                dispatch(
                    openNotification({
                        success: true,
                        title: 'Other payor details added successfully.',
                        description: '',
                    })
                );
            }
        } else {
            return 'error';
        }
    };
    const validationSchema = Yup.object({
        subscriberFirstName: Yup.string()
            .matches(/^[A-Za-z]+$/, 'Only alphabets are allowed')
            .max(
                50,
                'Input cannot exceed the maximum length of 50 characters.'
            ),
        subscriberLastName: Yup.string()
            .matches(/^[A-Za-z]+$/, 'Only alphabets are allowed')
            .max(
                50,
                'Input cannot exceed the maximum length of 50 characters.'
            ),
        address1: Yup.string().max(
            50,
            'Input cannot exceed the maximum length of 50 characters.'
        ),
        address2: Yup.string().max(
            50,
            'Input cannot exceed the maximum length of 50 characters.'
        ),
        cellPhone: Yup.string().matches(/^\+1[\d\-]{1,12}$/, {
            message:
                'Phone number must start with +1 and contain up to 13 characters including digits and -',
        }),
        city: Yup.string()
            .matches(/^[a-zA-Z\s]*$/, 'Only alphabets are allowed')
            .max(
                20,
                'Input cannot exceed the maximum length of 20 characters.'
            ),
        zipCode: Yup.string().matches(
            /^\d{1,10}$/,
            'Input must be a numeric value with a maximum length of 10 digits.'
        ),
    });
    React.useEffect(() => {
        dispatch(
            getChildCall({
                parentUserId: userId || insuranceDetail?.clientId,
            })
        );
    }, []);
    React.useEffect(() => {
        if (childInfo?.length === 1) {
            setUserChildId(childInfo?.[0]?.id);
        }
    }, [childInfo?.[0]?.id]);
    return (
        <Modal open={open} id={'add-other-payors-modal'} expandModal={false}>
            <ModalHeader
                title={`${otherPayorsEditData?.id ? 'Edit New Payor' : 'Add New Payor'}`}
                onClose={onClose}
                closeIcon={false}
                titleIcon={true}
            />
            <ModalBody expandModal={false}>
                <div className="w-[65rem] flex flex-col">
                    <Formik
                        innerRef={formikRef}
                        initialValues={getAllValues()}
                        onSubmit={handleSubmitSave}
                        enableReinitialize={true}
                        validationSchema={validationSchema}
                        validateOnChange={true}
                        validateOnBlur={true}
                    >
                        {(props: FormikProps<Values>) => {
                            const {
                                values,
                                setFieldValue,
                                handleChange,
                                handleSubmit,
                                setFieldTouched,
                            } = props;
                            return (
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <div className="flex mx-6 my-2 float-right ">
                                            <Field
                                                className="border-none focus:border-none rounded-sm border-None shadow-[0_2px_7px_rgb(0,0,0,0.2)] focus:ring-transparent"
                                                type="checkbox"
                                                name="useParentDetails"
                                                id="useParentDetails"
                                                checked={
                                                    values?.useParentDetails
                                                }
                                                onChange={(
                                                    e: React.ChangeEvent<HTMLInputElement>
                                                ) => {
                                                    handleChange(e);
                                                    handleCheckboxChange(e);
                                                }}
                                                disabled={modeView}
                                            />
                                            <label
                                                htmlFor="useParentDetails"
                                                className="text-sm ms-2 font-[lato]"
                                            >
                                                {`  Use Parent's Information`}
                                            </label>
                                        </div>
                                    </div>
                                    <div className="flex flex-col space-y-5 ml-2 mb-10 pb-10">
                                        <div className="w-2/3">
                                            <Field
                                                className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent"
                                                component={Input}
                                                label={'Name'}
                                                name={'name'}
                                                id={'name'}
                                                isRequired={false}
                                                placeholder={'Enter here'}
                                                value={values?.name}
                                                onChange={(
                                                    e: React.ChangeEvent<HTMLInputElement>
                                                ) => {
                                                    handleChange(e);
                                                    setName(e?.target?.value);
                                                }}
                                                disabled={modeView}
                                            />
                                        </div>
                                        <div className="w-2/3">
                                            <Field
                                                label={"Child's Name"}
                                                id="childName"
                                                name="childName"
                                                autoComplete="off"
                                                isRequired={true}
                                                isSearchable={true}
                                                value={values?.childName}
                                                component={Select}
                                                inputClassName={
                                                    'border-0 border-b border-gray-400 rounded-none focus:border-blue-500 focus:ring-0 px-0 ps-0'
                                                }
                                                isDisabled={
                                                    childInfo?.length === 1 ||
                                                    modeView
                                                }
                                                options={getChildInfo()}
                                                onChange={(
                                                    selectedOption: string
                                                ) => {
                                                    if (
                                                        childInfo?.length !== 1
                                                    ) {
                                                        setFieldValue(
                                                            'childName',
                                                            selectedOption?.[0]
                                                        );
                                                        setUserChildId(
                                                            selectedOption?.[0]
                                                        );
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div className="w-2/3">
                                            <Field
                                                className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent"
                                                component={Input}
                                                label={'Cell Phone'}
                                                name={'cellPhone'}
                                                id={'cellPhone'}
                                                isRequired={true}
                                                placeholder={
                                                    'e.g - +1(670)954-8263'
                                                }
                                                value={values?.cellPhone}
                                                onChange={(
                                                    e: React.ChangeEvent<HTMLInputElement>
                                                ) => {
                                                    handleChange(e);
                                                }}
                                                maxLength={13}
                                                disabled={modeView}
                                            />
                                        </div>
                                        <div className="flex space-x-4 w-2/3">
                                            <div className="w-2/3">
                                                <Field
                                                    className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent"
                                                    component={Input}
                                                    label={
                                                        'Subscriber First Name'
                                                    }
                                                    name={'subscriberFirstName'}
                                                    id={'subscriberFirstName'}
                                                    placeholder={'Enter here'}
                                                    isRequired={true}
                                                    value={
                                                        values?.subscriberFirstName
                                                    }
                                                    onChange={(
                                                        e: React.ChangeEvent<HTMLInputElement>
                                                    ) => {
                                                        handleChange(e);
                                                        setFieldTouched(
                                                            'subscriberFirstName',
                                                            true,
                                                            false
                                                        );
                                                    }}
                                                    disabled={modeView}
                                                />
                                            </div>
                                            <div className="w-2/3">
                                                <Field
                                                    className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent"
                                                    component={Input}
                                                    label={
                                                        'Subscriber Last Name'
                                                    }
                                                    name={'subscriberLastName'}
                                                    isRequired={true}
                                                    id={'subscriberLastName'}
                                                    placeholder={'Enter here'}
                                                    value={
                                                        values?.subscriberLastName
                                                    }
                                                    onChange={(
                                                        e: React.ChangeEvent<HTMLInputElement>
                                                    ) => {
                                                        handleChange(e);
                                                        setFieldTouched(
                                                            'subscriberLastName',
                                                            true,
                                                            false
                                                        );
                                                    }}
                                                    disabled={modeView}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-2/3">
                                            <Field
                                                className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent"
                                                component={Input}
                                                label={'Address Line 1'}
                                                name={'address1'}
                                                id={'address1'}
                                                placeholder={
                                                    'Please enter complete address here'
                                                }
                                                isRequired={true}
                                                value={values?.address1}
                                                onChange={(
                                                    e: React.ChangeEvent<HTMLInputElement>
                                                ) => {
                                                    handleChange(e);
                                                    setFieldTouched(
                                                        'address1',
                                                        true,
                                                        false
                                                    );
                                                }}
                                                disabled={modeView}
                                            />
                                        </div>
                                        <div className="w-2/3">
                                            <Field
                                                className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent"
                                                component={Input}
                                                label={'Address Line 2'}
                                                name={'address2'}
                                                id={'address2'}
                                                placeholder={
                                                    'Please enter complete address here'
                                                }
                                                value={values?.address2}
                                                onChange={(
                                                    e: React.ChangeEvent<HTMLInputElement>
                                                ) => {
                                                    handleChange(e);
                                                    setFieldTouched(
                                                        'address2',
                                                        true,
                                                        false
                                                    );
                                                }}
                                                disabled={modeView}
                                            />
                                        </div>
                                        <div className="w-2/3">
                                            <Field
                                                className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent"
                                                component={Input}
                                                label={'City'}
                                                name={'city'}
                                                id={'city'}
                                                placeholder={'Name of the City'}
                                                value={values?.city}
                                                onChange={(
                                                    e: React.ChangeEvent<HTMLInputElement>
                                                ) => {
                                                    handleChange(e);
                                                    setFieldTouched(
                                                        'city',
                                                        true,
                                                        false
                                                    );
                                                }}
                                                isRequired={true}
                                                disabled={modeView}
                                            />
                                        </div>
                                        <div className="flex flex-col space-y-1 w-2/3">
                                            <Field
                                                label={'State'}
                                                id="state"
                                                name="state"
                                                autoComplete="off"
                                                isRequired={true}
                                                isSearchable={true}
                                                value={values?.state}
                                                component={Select}
                                                inputClassName={
                                                    'border-0 border-b border-gray-400 rounded-none focus:border-blue-500 focus:ring-0 px-0 ps-0'
                                                }
                                                isDisabled={modeView}
                                                options={allState?.map(
                                                    (data) => ({
                                                        label: data?.name,
                                                        value: data?.name,
                                                    })
                                                )}
                                                onChange={(
                                                    selectedOption: string
                                                ) => {
                                                    setFieldValue(
                                                        'state',
                                                        selectedOption
                                                    );
                                                }}
                                            ></Field>
                                        </div>
                                        <div className="w-2/3">
                                            <Field
                                                className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent"
                                                component={Input}
                                                label={'Zip/Postal Code'}
                                                name={'zipCode'}
                                                id={'zipCode'}
                                                placeholder={'Enter here'}
                                                value={values?.zipCode}
                                                onChange={(
                                                    e: React.ChangeEvent<HTMLInputElement>
                                                ) => {
                                                    handleChange(e);
                                                    setFieldTouched(
                                                        'zipCode',
                                                        true,
                                                        false
                                                    );
                                                }}
                                                isRequired={true}
                                                disabled={modeView}
                                            />
                                        </div>
                                    </div>
                                    <div className="pt-4">
                                        <AddOtherPayorActionFooter
                                            onClose={() => {
                                                onClose();
                                            }}
                                            handleSubmit={handleSubmit}
                                            isDisabled={
                                                handleDisable(values) ||
                                                modeView
                                            }
                                        />
                                    </div>
                                </form>
                            );
                        }}
                    </Formik>
                </div>
            </ModalBody>
        </Modal>
    );
}
