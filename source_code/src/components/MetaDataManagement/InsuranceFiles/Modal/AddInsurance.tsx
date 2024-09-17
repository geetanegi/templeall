import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, Formik, FormikErrors } from 'formik';
import Modal, {
    ModalBody,
    ModalHeader,
    CreateClientModalActions,
} from '../../../Generics/Modal';
import Input from '../../../Generics/Inputs/Input';
import { openNotification } from '../../../../redux/slice/Notification/notifications';
import { savingProgramBookTree } from '../../../../redux/slice/GetDomainById/getDomainById';
import InsuranceGridApi from '../../../../api/services/Insurance/InsuranceGrid.service';
import {
    getActiveAsync,
    savingTabData,
} from '../../../../redux/slice/MineSlice/getMine';
import * as Yup from 'yup';
import { nameValidation } from '../../../../constants/ValidationMessages';

interface AddModalProps {
    insuranceData?: any;
    open: boolean;
    onClose: () => void;
}

interface Values {
    name: string;
}

const AddInsurance: React.FC<AddModalProps> = ({
    insuranceData,
    open,
    onClose,
}) => {
    const dispatch = useDispatch<any>();
    const [showError, setShowError] = useState('');
    const initialValues: Values = { name: insuranceData?.name || '' };
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const validationSchema = Yup.object().shape({
        name: Yup.string()

            .matches(
                /^[\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{1,150}$/,
                nameValidation
            ),
    });
    const handleSubmitForm = async (values: Values): Promise<void> => {
        const payload = {
            id: insuranceData?.id || '',
            name: values.name,
        };

        try {
            const res = await InsuranceGridApi.addNewInsurance(payload);
            const successMessage = insuranceData?.id
                ? 'Insurance Provider details edited successfully'
                : 'New Insurance Provider added successfully.';

            if (!res?.data?.error) {
                dispatch(savingProgramBookTree(res.data.data.id));
                setShowError('');
                dispatch(
                    openNotification({
                        success: true,
                        title: successMessage,
                        description: '',
                    })
                );
                dispatch(savingTabData({ tab: 'Insurances' }));

                const initialData = {
                    heading: '',
                    roleId: userPermission?.userRoles?.data?.roleId,
                    type: 'Insurances',
                    assignedTo: userPermission?.value?.data?.userId,
                    pagination: { startIndex: 0, noOfRecords: 19 },
                    order: '',
                    name: '',
                    filterValue: '',
                    appointmentWith: '1',
                    publishStatus: 'Published',
                };

                setTimeout(() => {
                    onClose();
                    dispatch(getActiveAsync(initialData));
                }, 1000);
            } else {
                setShowError('Please provide a unique Insurance name.');
            }
        } catch (error) {
            setShowError(
                'An error occurred while saving the insurance provider.'
            );
        }
    };

    const isDisabled = (values: Values): boolean => !values.name;

    return (
        <Modal open={open} id="add-Insurance" expandModal={false}>
            <ModalHeader
                title={`${insuranceData?.id ? 'Edit' : 'Add'} Insurance`}
                onExpand={undefined}
                icon={false}
            />
            <ModalBody expandModal={false}>
                <div className="w-[50rem] my-1">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmitForm}
                        validateOnChange
                        validateOnBlur
                        enableReinitialize
                        validationSchema={validationSchema}
                    >
                        {({
                            values,
                            handleChange,
                            handleSubmit,
                            setFieldTouched,
                            errors,
                        }) => {
                            const hasErrors = (
                                errorVal: FormikErrors<Values>
                            ): boolean =>
                                Object.values(errorVal).some(
                                    (error) =>
                                        typeof error === 'string' &&
                                        error.length > 0
                                );

                            const shouldDisable = hasErrors(errors);
                            return (
                                <form onSubmit={handleSubmit}>
                                    <div className="mx-6 mb-8 w-[40rem]">
                                        <Field
                                            className="domainName border-neutral-300 border-x-0 border-t-0 border-b-1 outline-0 rounded-none font-['Lato'] text-sm h-6 px-0 focus:ring-transparent"
                                            label="Insurance Provider Name"
                                            isRequired
                                            id="name"
                                            name="name"
                                            component={Input}
                                            value={values.name}
                                            onChange={(e: any) => {
                                                handleChange(e);
                                                setShowError('');
                                                setFieldTouched(
                                                    'name',
                                                    true,
                                                    false
                                                );
                                            }}
                                            placeholder="Please enter the name of Insurance"
                                            autoFocus
                                        />
                                        {showError && (
                                            <div className="errorMsg text-red-700 text-xs my-1 font-[lato]">
                                                {showError}
                                            </div>
                                        )}
                                    </div>
                                    <CreateClientModalActions
                                        onClose={onClose}
                                        isDisabled={
                                            isDisabled(values) || shouldDisable
                                        }
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
};

export default AddInsurance;
