import * as React from 'react';
import Modal, {
    ModalBody,
    ModalHeader,
    CreateClientModalActions,
} from '../../Generics/Modal';
import Input from '../../Generics/Inputs/Input';
import { Field, Formik, FormikErrors } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import AddDomainIntervention from '../../../api/services/Intervention/AddDomainForIntervention.service';
import { openNotification } from '../../../redux/slice/Notification/notifications';
import { savingProgramBookTree } from '../../../redux/slice/GetDomainById/getDomainById';
import { getAllInterventionPlanDomainByInterventionId } from '../../../redux/slice/InterventionAll/InterventionSlice';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { nameValidation } from '../../../constants/ValidationMessages';

interface AddInterventionModalProps {
    open: boolean;
    onClose: () => void;
    interventionData?: any;
}

export default function AddDomainInterventionModal({
    open,
    onClose,
    interventionData,
}: AddInterventionModalProps): React.JSX.Element {
    const params = useParams();
    const dispatch = useDispatch<any>();
    const [showError, setShowError] = React.useState('');
    const interventionDomainsData = useSelector(
        (state: any) => state.interventionDomains?.DataByInterventionplanId
    );
    const phaseType = useSelector(
        ({ interventionSlice }: any) => interventionSlice?.phaseType
    );

    interface Values {
        name: string;
    }

    const initialValues: Values = {
        name: '',
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()

            .matches(
                /^[a-zA-Z0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{1,150}$/,
                nameValidation
            ),
    });

    const handleSubmitForm = async (values: Values): Promise<void> => {
        const payload = {
            ...values,
            interventionPlanId:
                interventionData?.interventionPlanById?.id ||
                interventionDomainsData?.id,
        };
        try {
            const res = await AddDomainIntervention.saveDomainApi(payload);
            if (!res?.data?.error) {
                dispatch(savingProgramBookTree(res?.data?.data?.id));
                setShowError('');
                onClose();
                dispatch(
                    openNotification({
                        success: true,
                        title: 'Domain added successfully.',
                        description: '',
                    })
                );
                dispatch(
                    getAllInterventionPlanDomainByInterventionId({
                        id:
                            interventionData?.interventionPlanById?.id ||
                            params?.id,
                        type: phaseType,
                    })
                );
            } else {
                setShowError(res?.data?.description || 'An error occurred');
            }
        } catch (error) {
            setShowError('An unexpected error occurred');
        }
    };

    const isDisabled = (values: Values): boolean => !values?.name;

    return (
        <Modal
            open={open}
            id={'add-domain-for-intervention'}
            expandModal={false}
        >
            <ModalHeader
                title={'Add Domain'}
                onExpand={undefined}
                icon={false}
            />
            <ModalBody expandModal={false}>
                <div className="w-[50rem] my-1">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmitForm}
                        validationSchema={validationSchema}
                        validateOnChange={true} // Validate on every change
                        validateOnBlur={true} // Validate on blur
                    >
                        {({
                            values,
                            handleChange,
                            handleSubmit,
                            errors,
                            setFieldTouched,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <div className="mx-6 mb-8 w-[40rem]">
                                    <Field
                                        data-testid="domainNameInput"
                                        className="domainName border-neutral-300 border-x-0 border-t-0 border-b-1 outline-0
                                            rounded-none font-['Lato'] text-sm h-6 px-0 focus:ring-transparent"
                                        label="Name"
                                        isRequired={true}
                                        autoFocus={true}
                                        id="name"
                                        name="name"
                                        component={Input}
                                        value={values.name}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => {
                                            handleChange(e); // Update the field's value
                                            setFieldTouched(
                                                'name',
                                                true,
                                                false
                                            ); // Mark the field as touched
                                            setShowError(''); // Clear custom errors
                                        }}
                                        placeholder="Please enter the name of domain"
                                    />

                                    {showError && !errors.name && (
                                        <div className="errorMsg text-red-700 text-xs my-1 font-[lato]">
                                            {showError}
                                        </div>
                                    )}
                                </div>
                                <CreateClientModalActions
                                    onClose={onClose}
                                    isDisabled={
                                        isDisabled(values) ||
                                        function hasErrors(
                                            errorVal: FormikErrors<Values>
                                        ): boolean {
                                            return Object.values(errorVal).some(
                                                (error) =>
                                                    typeof error === 'string' &&
                                                    error.length > 0
                                            );
                                        }
                                    }
                                    handleSubmit={handleSubmit}
                                />
                            </form>
                        )}
                    </Formik>
                </div>
            </ModalBody>
        </Modal>
    );
}
