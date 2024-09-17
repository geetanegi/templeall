import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Field, Formik } from 'formik';
import Modal, {
    ModalBody,
    ModalHeader,
    CreateClientModalActions,
} from '../../Generics/Modal';
import Input from '../../Generics/Inputs/Input';
import AddDomainIntervention from '../../../api/services/GoalLibrary/GoalLibraryDataApi.service';
import { openNotification } from '../../../redux/slice/Notification/notifications';
import { savingProgramBookTree } from '../../../redux/slice/GetDomainById/getDomainById';
import { getAllGoalLibraryDomainByGoalLibraryId } from '../../../redux/slice/GoalLibrary/GoalLibraryData';
import * as Yup from 'yup';
import { nameValidation } from '../../../constants/ValidationMessages';

interface AddInterventionModalProps {
    readonly open: boolean;
    readonly onClose: () => void;
    readonly goalLibrarySlice?: any;
}

interface Values {
    name: string;
}

const AddDomain: React.FC<AddInterventionModalProps> = ({
    open,
    onClose,
    goalLibrarySlice,
}) => {
    const params = useParams();
    const dispatch = useDispatch<any>();
    const [showError, setShowError] = useState('');
    const interventionDomainsData = useSelector(
        (state: any) => state.interventionDomains?.DataByInterventionplanId
    );

    const initialValues: Values = { name: '' };

    const handleSubmitForm = async (values: Values): Promise<any> => {
        const payload = {
            ...values,
            interventionLibraryId:
                goalLibrarySlice?.goalLibraryById?.[
                    params?.id || params?.goalLibraryId || ''
                ]?.id || interventionDomainsData?.id,
        };

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
                getAllGoalLibraryDomainByGoalLibraryId({
                    id:
                        goalLibrarySlice?.goalLibraryById?.[
                            params?.id || params?.goalLibraryId || ''
                        ]?.id || params?.id,
                })
            );
        } else {
            setShowError('Please provide a unique Domain name.');
            return null;
        }
    };

    const isDisabled = (values: Values): boolean => !values?.name;
    const validationSchema = Yup.object().shape({
        name: Yup.string().matches(
            /^[\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{1,150}$/,
            nameValidation
        ),
    });

    return (
        <Modal open={open} id="add-domain-for-intervention" expandModal={false}>
            <ModalHeader title="Add Domain" onExpand={undefined} icon={false} />
            <ModalBody expandModal={false}>
                <div className="w-[50rem] my-1">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmitForm}
                        validateOnChange={true}
                        validateOnBlur={true}
                        validationSchema={validationSchema}
                        enableReinitialize
                    >
                        {({ values, handleChange, handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                <div className="mx-6 mb-8 w-[40rem]">
                                    <Field
                                        className="domainName border-neutral-300 border-x-0 border-t-0 border-b-1 outline-0 rounded-none font-['Lato'] text-sm h-6 px-0 focus:ring-transparent"
                                        label="Name"
                                        isRequired
                                        id="name"
                                        name="name"
                                        component={Input}
                                        value={values.name}
                                        onChange={(e: any) => {
                                            handleChange(e);
                                            setShowError('');
                                        }}
                                        placeholder="Please enter the name of domain"
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
                                    isDisabled={isDisabled(values)}
                                    handleSubmit={handleSubmit}
                                />
                            </form>
                        )}
                    </Formik>
                </div>
            </ModalBody>
        </Modal>
    );
};

export default AddDomain;
