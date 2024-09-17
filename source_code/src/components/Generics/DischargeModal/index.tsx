import React, { useState } from 'react';
import Modal, { DischargeModalFooter, ModalBody } from '../Modal';
import { Field, Formik } from 'formik';
import Input from '../Inputs/Input';
import dischargeReason from '../../../api/services/DischargeReason/dischargeReasonApi.service';
import { useDispatch, useSelector } from 'react-redux';
import { openNotification } from '../../../redux/slice/Notification/notifications';
import { disChargeReason } from '../../../constants/AddParameter';
import { getActiveAsync } from '../../../redux/slice/MineSlice/getMine';
import Select from '../Select';
interface Values {
    otherReason: string;
    dischargeReason: any;
}
interface ModalProps {
    open: any;
    data: any;
    onClose?: any;
    fromProgramBook?: boolean;
}
const DischargeModal: React.FC<ModalProps> = ({
    open,
    data,
    onClose,
    fromProgramBook,
}) => {
    const [formData, setFormData] = useState<any>();
    const dispatch = useDispatch<any>();
    const initialValues: Values = {
        otherReason: '',
        dischargeReason: '',
    };
    const getMineData = useSelector(({ getMine }: any) => getMine);
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const handleChangeData = (dataValues: any): void => {
        setFormData((prev: any) => ({
            ...prev,
            ...dataValues,
        }));
    };
    const handleSave = async (): Promise<any> => {
        const payload1 = {
            programBookUUID: data?.programBookUUID,
            dischargeReason:
                formData?.dischargeReason === 'Other'
                    ? formData?.otherReason
                    : formData?.dischargeReason,
        };
        const payload2 = {
            interventionPlanId: data?.id,
            dischargeReason:
                formData?.dischargeReason === 'Other'
                    ? formData?.otherReason
                    : formData?.dischargeReason,
        };
        if (fromProgramBook) {
            const res = await dischargeReason.dischargeProgramBook({
                data: payload1,
            });
            if (!res?.data?.error) {
                onClose();
                const title = 'Client Program Book discharged successfully.';
                dispatch(
                    openNotification({
                        success: true,
                        title: title,
                        description: '',
                    })
                );
            }
        } else {
            const res = await dischargeReason.dischargeIntervention({
                data: payload2,
            });
            if (!res?.data?.error) {
                onClose();
                const title = 'Intervention Plan discharged successfully.';
                dispatch(
                    openNotification({
                        success: true,
                        title: title,
                        description: '',
                    })
                );
            }
        }
        const initialData = {
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
        setTimeout(() => {
            dispatch(getActiveAsync(initialData));
        }, 500);
    };
    const handleDisable = (): boolean => {
        return formData?.dischargeReason?.length
            ? formData?.dischargeReason === 'Other'
                ? !formData?.otherReason
                : !formData?.dischargeReason
            : true;
    };
    return (
        <div>
            <Modal open={open} id={'discharge-modal'} expandModal={false}>
                <ModalBody expandModal={false}>
                    <div className=" w-[50rem] h-[25rem] text-stone-800 flex flex-col  items-center">
                        <div className="my-3 text-center">
                            <label className="text-lg font-semibold ">
                                {'Are you sure you want to discharge ' +
                                    data?.name +
                                    ' ?'}
                            </label>
                            <h2>{'Please provide a reason to discharge'}</h2>
                        </div>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={() => {}}
                        >
                            {(props: any) => {
                                const {
                                    values,
                                    handleChange,
                                    handleSubmit,
                                    setFieldValue,
                                } = props;
                                return (
                                    <>
                                        <form onSubmit={handleSubmit}>
                                            <div className="space-y-1 w-[40rem] mt-4">
                                                <label
                                                    htmlFor="hs-validation-name-error"
                                                    className="block text-sm font-medium mr-2 mb-1"
                                                >
                                                    Reason to discharge
                                                    <span className="text-red-500 ml-1">
                                                        *
                                                    </span>
                                                </label>
                                                <Field
                                                    label=""
                                                    className="border-none"
                                                    name="dischargeReason"
                                                    autoComplete="off"
                                                    id="dischargeReason"
                                                    value={
                                                        values?.dischargeReason
                                                    }
                                                    component={Select}
                                                    onChange={(
                                                        fieldValue: any
                                                    ) => {
                                                        setFieldValue(
                                                            'dischargeReason',
                                                            fieldValue[0]
                                                        );
                                                        handleChangeData({
                                                            dischargeReason:
                                                                fieldValue[0],
                                                        });
                                                    }}
                                                    options={disChargeReason}
                                                />
                                            </div>
                                            {values.dischargeReason ===
                                                'Other' && (
                                                <div className="flex justify-between">
                                                    <div className="border-b-1 border-black-100 w-[40rem] mt-2">
                                                        <Field
                                                            label=""
                                                            isRequired={false}
                                                            id="otherReason"
                                                            name="otherReason"
                                                            component={Input}
                                                            value={
                                                                values?.otherReason
                                                            }
                                                            onChange={(
                                                                e: any
                                                            ) => {
                                                                handleChange(e);
                                                                handleChangeData(
                                                                    {
                                                                        otherReason:
                                                                            e
                                                                                ?.target
                                                                                ?.value,
                                                                    }
                                                                );
                                                            }}
                                                            placeholder="Enter here"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </form>
                                    </>
                                );
                            }}
                        </Formik>
                    </div>
                </ModalBody>
                <DischargeModalFooter
                    onClose={onClose}
                    handleSubmit={handleSave}
                    saveDisabled={handleDisable()}
                />
            </Modal>
        </div>
    );
};
export default DischargeModal;
