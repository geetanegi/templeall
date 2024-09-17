import * as React from 'react';
import Input from '../Generics/Inputs/Input';
import { Field, Form, Formik } from 'formik';
import saveOrganizationDictionaryAPI from '../../api/services/Dictionary/saveOrganizationDictionary.service';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { openNotification } from '../../redux/slice/Notification/notifications';
import { getActiveAsync } from '../../redux/slice/MineSlice/getMine';
import Modal, { ModalBody, ModalHeader } from '../Generics/Modal';
interface Values {
    word: string;
    meaning: string;
}
export default function AddWord({
    open,
    onClose,
}: {
    open: any;
    onClose: any;
}): React.JSX.Element {
    const dispatch = useDispatch<AppDispatch>();
    const formikRef: any = React.useRef<HTMLFormElement>(null);
    const [error, setError] = React.useState({ state: false, value: '' });
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission?.value?.data
    );
    const getAllValues = (): Values => {
        return {
            word: '',
            meaning: '',
        };
    };
    const handleDisabled = (values: Values): boolean => {
        return !values?.word || !values?.meaning;
    };
    const handleSubmitSave = async (values: Values): Promise<any> => {
        const data = {
            dictionaryId: '',
            word: values?.word,
            meaning: values?.meaning,
        };
        const res =
            await saveOrganizationDictionaryAPI.saveOrganizationDictionary(
                data
            );
        if (!res?.data?.error) {
            if (res?.data?.data?.isDuplicate) {
                setError({
                    state: true,
                    value: 'Long form of this phrase already exist in the dictionary.',
                });
            } else {
                setError({
                    state: false,
                    value: '',
                });
                formikRef?.current?.setFieldValue('word', '');
                formikRef?.current?.setFieldValue('meaning', '');
                const payload = {
                    heading: '',
                    roleId: userPermission?.userRoles?.data?.roleId,
                    type: 'Dictionary',
                    assignedTo: userPermission?.userId,
                    pagination: { startIndex: 0, noOfRecords: 19 },
                    order: 'DESC',
                    name: 'createdDate',
                    filterValue: '',
                    appointmentWith: '1',
                    publishStatus: 'Published',
                };
                dispatch(getActiveAsync(payload));
                onClose();
                dispatch(
                    openNotification({
                        success: true,
                        title: 'A new phrase added to organization dictionary successfully.',
                        description: '',
                    })
                );
            }
        } else {
            return 'error';
        }
    };
    return (
        <Modal open={open} id={'add-Client-Doc-modal'} expandModal={false}>
            <ModalHeader
                title={'Add Phrase'}
                icon={false}
                onExpand={undefined}
            />
            <ModalBody expandModal={false}>
                <Formik
                    initialValues={getAllValues()}
                    onSubmit={handleSubmitSave}
                    enableReinitialize={true}
                    innerRef={formikRef}
                >
                    {({ values, handleChange }) => (
                        <Form className="w-[50rem]">
                            {/* <div className="flex  space-x-8"> */}
                            <div className="w-1/3 mb-4">
                                <Field
                                    className=" border-neutral-300 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent"
                                    component={Input}
                                    label={'Phrase'}
                                    name={'word'}
                                    id={'word'}
                                    isRequired={false}
                                    placeholder={'Enter here'}
                                    value={values?.word}
                                    data-testid="add-word-onChange"
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        handleChange(e);
                                        setError({
                                            state: false,
                                            value: '',
                                        });
                                    }}
                                    // disabled={modeView}
                                />
                                {error?.state && (
                                    <label className="text-sm text-red-700">
                                        {error?.value}
                                    </label>
                                )}
                            </div>
                            <div className="w-1/3">
                                <Field
                                    className=" border-neutral-300 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent"
                                    component={Input}
                                    label={'Long form'}
                                    name={'meaning'}
                                    id={'meaning'}
                                    isRequired={false}
                                    placeholder={'Enter here'}
                                    data-testid="add-meaning-onChange"
                                    value={values?.meaning}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        handleChange(e);
                                        setError({
                                            state: false,
                                            value: '',
                                        });
                                    }}
                                    // disabled={modeView}
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="reset"
                                    className="mr-5"
                                    onClick={() => onClose()}
                                >
                                    Cancel
                                </button>
                                <button
                                    data-testid="add-word-submit"
                                    disabled={handleDisabled(values)}
                                    className="bg-primary-600 cursor-pointer rounded-md text-base text-white px-20 py-3 disabled:pointer-events-none disabled:bg-secondary-100"
                                >
                                    Save
                                </button>
                            </div>
                            {/* </div> */}
                        </Form>
                    )}
                </Formik>
            </ModalBody>
        </Modal>
    );
}
