import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, Formik, FormikErrors } from 'formik';
import Modal, {
    ModalBody,
    ModalHeader,
    CreateClientModalActions,
} from '../../../Generics/Modal';
import Input from '../../../Generics/Inputs/Input';
import { openNotification } from '../../../../redux/slice/Notification/notifications';
import {
    getActiveAsync,
    savingTabData,
} from '../../../../redux/slice/MineSlice/getMine';
import SaveDiagnosisCodeApi from '../../../../api/services/MetaDataManagement/saveDiagnosisCode.service';
import { clearDiagnosisData } from '../../../../redux/slice/MetaDataManagement/metaData';
import * as Yup from 'yup';
import {
    descriptionValidation,
    nameValidation,
} from '../../../../constants/ValidationMessages';

interface AddModalProps {
    readonly insuranceData?: any;
    readonly open: boolean;
    readonly onClose: () => void;
}

interface Values {
    code: string;
    name: string;
    description: string;
}

const AddDiagnosisCodeModal: React.FC<AddModalProps> = ({ open, onClose }) => {
    const dispatch = useDispatch<any>();
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const diagnosisData = useSelector(
        ({ metaData }: any) => metaData?.diagnosisCode
    );
    const initialValues: Values = {
        code: diagnosisData?.code || '',
        name: diagnosisData?.name || '',
        description: diagnosisData?.description || '',
    };

    const handleSubmitForm = async (values: Values): Promise<any> => {
        const payload = {
            ...values,
            diagnosisCodeId: diagnosisData?.id || '',
            status: diagnosisData?.status || true,
        };

        const res = await SaveDiagnosisCodeApi.saveDiagnosisCode(payload);
        if (!res?.data?.error) {
            onClose();
            dispatch(clearDiagnosisData());
            if (diagnosisData?.id) {
                dispatch(
                    openNotification({
                        success: true,
                        title: `Diagnosis Code edited successfully.`,
                        description: '',
                    })
                );
            } else {
                dispatch(
                    openNotification({
                        success: true,
                        title: `New Diagnosis Code added successfully.`,
                        description: '',
                    })
                );
            }

            dispatch(savingTabData({ tab: 'Diagnosis Codes' }));
            const initialData = {
                heading: '',
                roleId: userPermission?.userRoles?.data?.roleId,
                type: 'Diagnosis Codes',
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
            return null;
        }
    };

    const isDisabled = (values: Values): boolean =>
        !values?.code || !values?.name;

    const validationSchema = Yup.object().shape({
        name: Yup.string().matches(
            /^[\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{1,150}$/,
            nameValidation
        ),
        description: Yup.string().matches(
            /^[\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{1,400}$/,
            descriptionValidation
        ),
    });

    return (
        <Modal open={open} id="add-Diagnosis-Code" expandModal={false}>
            <ModalHeader
                title={`${diagnosisData?.id ? 'Edit -' : 'Add New'} Diagnosis Code `}
                onExpand={undefined}
                icon={false}
            />
            <ModalBody expandModal={false}>
                <div className="w-[50rem] my-1">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmitForm}
                        validateOnChange={true}
                        validationSchema={validationSchema}
                        validateOnBlur={true}
                        enableReinitialize
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
                                    <div className="mx-6 mb-8 w-[40rem] space-y-6">
                                        <Field
                                            className="domainName border-neutral-300 border-x-0 border-t-0 border-b-1 outline-0 rounded-none font-['Lato'] text-sm h-6 px-0 focus:ring-transparent "
                                            label="Code"
                                            isRequired
                                            id="code"
                                            name="code"
                                            component={Input}
                                            value={values.code}
                                            onChange={(e: any) => {
                                                handleChange(e);
                                            }}
                                            placeholder="Enter code"
                                            autoFocus
                                        />

                                        <Field
                                            className={`domainName border-neutral-300 border-x-0 border-t-0 border-b-1 outline-0 rounded-none font-['Lato'] text-sm h-6 px-0 focus:ring-transparent `}
                                            label="Name"
                                            isRequired
                                            id="name"
                                            name="name"
                                            component={Input}
                                            value={values.name}
                                            onChange={(e: any) => {
                                                handleChange(e);
                                                setFieldTouched(
                                                    'name',
                                                    true,
                                                    false
                                                );
                                            }}
                                            placeholder="Enter name"
                                        />
                                        <Field
                                            className="domainName border-neutral-300 border-x-0 border-t-0 border-b-1 outline-0 rounded-none font-['Lato'] text-sm h-6 px-0 focus:ring-transparent "
                                            label="Description"
                                            id="description"
                                            name="description"
                                            component={Input}
                                            value={values.description}
                                            onChange={(e: any) => {
                                                handleChange(e);
                                                setFieldTouched(
                                                    'description',
                                                    true,
                                                    false
                                                );
                                            }}
                                            placeholder="Enter description"
                                        />
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

export default AddDiagnosisCodeModal;
