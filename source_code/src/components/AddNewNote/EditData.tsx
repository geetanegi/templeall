import React, { useState } from 'react';
import Modal, {
    CreateClientModalActions,
    ModalBody,
    ModalHeader,
} from '../Generics/Modal';
import Input from '../Generics/Inputs/Input';
import { Field, Formik } from 'formik';
import dictionaryOfSessionNote from '../../api/services/DictionaryOfSessionNote';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../redux/store';
import { getActiveAsync } from '../../redux/slice/MineSlice/getMine';
import saveOrganizationDictionaryAPI from '../../api/services/Dictionary/saveOrganizationDictionary.service';
import { openNotification } from '../../redux/slice/Notification/notifications';
interface Values {
    word: string;
    meaning: string;
}
interface EditDataProps {
    open?: boolean;
    onClose?: any;
    word?: string;
    meaning?: string;
    wordLabel?: string;
    meaningLabel?: string;
    dictionaryId?: string;
    setUnableToUpdate?: any;
    setShowSavedNotification?: any;
    type?: string;
}
export default function EditData({
    open,
    onClose,
    word,
    meaning,
    wordLabel,
    meaningLabel,
    dictionaryId,
    setUnableToUpdate,
    setShowSavedNotification,
    type,
}: EditDataProps): React.JSX.Element {
    const initialValues: Values = {
        word: word ?? '',
        meaning: meaning ?? '',
    };
    const dispatch = useDispatch<any>();
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [showError, setShowError] = useState<boolean>(false);
    const getMineData = useSelector((state: IRootState) => state.getMine);
    const userPermission = useSelector((state: any) => state.getUserPermission);
    const appointment = useSelector((state: any) => state?.appointment?.value);
    const provider = useSelector((state: any) => state.scheduling?.provider);
    const data = {
        heading: '',
        roleId: userPermission?.userRoles?.data?.roleId,
        type: getMineData?.tab,
        assignedTo: userPermission?.userId,
        pagination: { startIndex: 0, noOfRecords: 19 },
        order: '',
        name: '',
        filterValue: '',
        appointmentWith: '1',
        publishStatus: 'Published',
        sorting: {
            order: 'ASC',
            fieldName: 'word',
        },
        serviceProviderId: provider || appointment?.primaryProvider?.id || '',
    };
    const handleSubmitForm = async (values: Values): Promise<void> => {
        const payload: any = {
            dictionaryId: dictionaryId,
            word: values.word,
            meaning: values.meaning,
        };
        try {
            const apiToCall =
                type === 'Dictionary-grid'
                    ? await saveOrganizationDictionaryAPI.saveOrganizationDictionary(
                          payload
                      )
                    : await dictionaryOfSessionNote.saveAndEditWords(payload);
            const res = apiToCall;
            if (!res?.data?.error) {
                if (res?.data?.data?.isDuplicate) {
                    setErrorMessage(
                        'Long form of this phrase already exists in your dictionary.'
                    );
                    setShowError(true);
                } else {
                    dispatch(getActiveAsync(data));
                    onClose();
                    if (type === 'Dictionary-grid') {
                        setTimeout(() => {
                            dispatch(
                                openNotification({
                                    success: true,
                                    title: 'Phrase and its long form edited successfully',
                                    description: '',
                                })
                            );
                        }, 800);
                    }
                    setShowSavedNotification(true);
                }
            } else {
                setUnableToUpdate(false);
            }
        } catch (error) {
            setUnableToUpdate(false);
        }
    };
    return (
        <Modal open={open} id={'Edit Modal'} expandModal={false}>
            <ModalHeader
                title={'Edit Phrase'}
                onClose={onClose}
                closeIcon={false}
            />
            <ModalBody expandModal={false}>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmitForm}
                    validateOnChange
                    enableReinitialize
                >
                    {({ values, handleChange, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <div
                                className="md:px-2 w-[50rem]"
                                data-testid="editData-modal"
                            >
                                <label className="block text-sm font-semibold text-gray-600">
                                    {wordLabel}
                                </label>
                                <Field
                                    className="border-b-2 border-[#A0A0A0] rounded-none border-x-0 border-t-0  pb-1 outline-none"
                                    label=""
                                    isRequired={false}
                                    id="word"
                                    name="word"
                                    component={Input}
                                    value={values.word}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        handleChange(e);
                                    }}
                                    placeholder="Enter phrase here"
                                    data-testid="word-onChange"
                                />
                                {showError && (
                                    <span className="text-red-500 text-xs -mt-1">
                                        {errorMessage}
                                    </span>
                                )}
                                <label className="block text-sm font-semibold text-gray-600 mt-5">
                                    {meaningLabel}
                                </label>
                                <Field
                                    className="border-b-2 border-[#A0A0A0] rounded-none border-x-0 border-t-0  pb-1 outline-none"
                                    label=""
                                    isRequired={false}
                                    id="meaning"
                                    name="meaning"
                                    component={Input}
                                    value={values.meaning}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        handleChange(e);
                                    }}
                                    placeholder="Enter long form here"
                                    data-testid="meaning-onChange"
                                />
                            </div>
                            <CreateClientModalActions
                                onClose={onClose}
                                isDisabled={false}
                                handleSubmit={handleSubmit}
                            />
                        </form>
                    )}
                </Formik>
            </ModalBody>
        </Modal>
    );
}
