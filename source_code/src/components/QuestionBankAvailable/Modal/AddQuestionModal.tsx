/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState } from 'react';
import Modal, { ModalBody, ModalHeader } from '../../Generics/Modal';
import { Field, Form, Formik } from 'formik';
import { InputField } from '../InputField';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import QuestionBankManagementApi from '../../../api/services/QuestionBankManagement/QuestionBankManagementApi.service';
import { getActiveAsync } from '../../../redux/slice/MineSlice/getMine';

import Select from '../../Generics/Select';
import Button from '../../Generics/Button';
import add from '../../../assets/img/addLocation.svg';
import CrossIcon from '../../../assets/img/CrossIcon.svg';
import { openNotification } from '../../../redux/slice/Notification/notifications';
interface AddInterventionModalProps {
    open?: boolean;
    onClose: () => void;
}

export default function AddQuestionModal({
    open,
    onClose,
}: AddInterventionModalProps): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const [optionInputs, setOptionInputs] = useState<string[]>(['']);
    const [options, setOptions] = useState<string[]>([]);
    const [selectedItem, setSelectedItem] = useState<any>(null);

    const questionBank = useSelector(
        ({ questionBankManementSlice }: any) => questionBankManementSlice
    );
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );

    const questionTypeOptions = (questionBank?.questionType?.data ?? []) // Default to empty array if undefined
        .map((data: { questionType: any }) => ({
            label: data.questionType,
            value: data.questionType,
        }));
    const answerTypeOptions = (questionBank?.answerType?.data ?? []) // Default to empty array if undefined
        .map((data: { name: any; id: any }) => ({
            label: data.name,
            value: data.id, // Use 'id' as the value to ensure uniqueness
        }));
    const handleOptionInputChange = (index: number, value: string) => {
        const updatedOptions = [...optionInputs];
        updatedOptions[index] = value;
        setOptionInputs(updatedOptions);
    };

    const addOptionInput = () => {
        setOptionInputs([...optionInputs, '']);
    };

    const removeOptionInput = (index: number) => {
        setOptionInputs(optionInputs.filter((_, i) => i !== index));
    };

    const handleSubmitOptions = () => {
        setOptions(optionInputs.filter((option) => option.trim() !== ''));
    };

    const validationSchema = Yup.object({
        questionType: Yup.string().required('Question Type is required'),
        answerType: Yup.number().required('Answer Type is required'),
        questionStatement: Yup.string().required(
            'Question Statement is required'
        ),
    });
    const initialData = {
        heading: '',
        roleId: userPermission?.userRoles?.data?.roleId,
        type: 'Question Bank Management',
        assignedTo: userPermission?.value?.data?.userId,
        pagination: { startIndex: 0, noOfRecords: 19 },
        order: '',
        name: '',
        filterValue: '',
        appointmentWith: '1',
        publishStatus: 'Published',
    };
    const handleSubmit = async (
        values: any,
        { resetForm, setSubmitting }: any
    ) => {
        handleSubmitOptions();
        try {
            await QuestionBankManagementApi.saveQuestionBankManagement({
                data: {
                    questionBankManagementId: '',
                    questionType: values?.questionType,
                    questionStatement: values?.questionStatement,
                    answerType: values?.answerType,
                    answerStatement: optionInputs || options || [], // Assuming options is empty or you can replace it with the actual variable
                },
            });

            dispatch(
                openNotification({
                    success: true,
                    title: 'Question Added Successfully',
                    description: '',
                })
            );
            await dispatch(getActiveAsync(initialData));

            resetForm(); // Reset the form fields after successful submission
            onClose();
        } catch (error) {
            dispatch(
                openNotification({
                    success: false,
                    title: 'Failed to Add Question',
                    description:
                        'An error occurred while adding the question. Please try again.',
                })
            );

            console.error('Error adding question:', error);
        } finally {
            setSubmitting(false); // Always ensure that submitting state is reset
        }
    };

    return (
        <Modal open={open} id={'add-Client-Doc-modal'} expandModal={false}>
            <ModalHeader
                title={'Add New Question'}
                icon={false}
                onExpand={undefined}
            />
            <ModalBody expandModal={false}>
                <Formik
                    initialValues={{
                        questionType: null,
                        questionStatement: null,
                        answerType: null,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({
                        values,
                        isSubmitting,
                        handleChange,
                        setFieldValue,
                        isValid,
                        dirty,
                        touched,
                        setFieldTouched,
                        errors,
                    }) => (
                        <Form className="w-[70rem]">
                            <div
                                className="w-full mb-4"
                                data-testid="add-question-modal"
                            >
                                <Field
                                    inputClassName={
                                        'border-0 border-b border-gray-400 focus:border-blue-500 rounded-none focus:ring-0 px-0 ps-0 w-1/2'
                                    }
                                    placeholder="Select"
                                    onChange={(selectedOption: any) => {
                                        if (
                                            Array.isArray(selectedOption) &&
                                            selectedOption.length
                                        ) {
                                            setFieldValue(
                                                'questionType',
                                                selectedOption[0]
                                            );
                                            setFieldTouched(
                                                'questionType',
                                                true,
                                                false
                                            );
                                        }
                                    }}
                                    options={questionTypeOptions}
                                    label="Question Type"
                                    component={Select}
                                    autoComplete="off"
                                    isRequired={true}
                                    showSearch={true}
                                    id="questionType"
                                    name="questionType"
                                    value={values.questionType}
                                    data-testid={'questionTypeSelecte'}
                                />
                                {touched?.questionType &&
                                    errors?.questionType?.length && (
                                        <span className="text-red-500 text-sm mb-2">
                                            {errors?.questionType}
                                        </span>
                                    )}
                            </div>
                            <div>
                                <InputField
                                    isRequired={true}
                                    name="questionStatement"
                                    label="Question Statement"
                                    placeholder="Type your question here"
                                    onChange={handleChange}
                                    value={values.questionStatement}
                                    data-testid={'questionStatement12'}
                                />
                            </div>
                            <div className="w-full">
                                <Field
                                    data-testid={'answerTypeSelecte'}
                                    inputClassName={
                                        'border-0 border-b border-gray-400 focus:border-blue-500 rounded-none focus:ring-0 px-0 ps-0  w-1/2'
                                    }
                                    placeholder="Select"
                                    onChange={(selectedOption: any) => {
                                        if (
                                            Array.isArray(selectedOption) &&
                                            selectedOption.length
                                        ) {
                                            setFieldValue(
                                                'answerType',
                                                selectedOption[0]
                                            );
                                            setFieldTouched(
                                                'answerType',
                                                true,
                                                false
                                            );
                                            setOptionInputs(['']);
                                            const particularItem =
                                                answerTypeOptions.find(
                                                    (item: any) =>
                                                        item?.value ===
                                                        selectedOption[0]
                                                );
                                            setSelectedItem(particularItem);
                                        }
                                    }}
                                    options={answerTypeOptions}
                                    label="Answer Type"
                                    component={Select}
                                    autoComplete="off"
                                    isRequired={true}
                                    showSearch={true}
                                    id="answerType"
                                    name="answerType"
                                    value={values.answerType}
                                    dropdownClass={'max-h-20'}
                                />

                                {touched?.answerType &&
                                    errors?.answerType?.length && (
                                        <span className="text-red-500 text-sm mb-2">
                                            {errors?.answerType}
                                        </span>
                                    )}
                            </div>

                            {/* Dynamic Options for Dropdown, Multiselect, Radio Button */}
                            {(selectedItem?.label === 'Dropdown' ||
                                selectedItem?.label === 'Multiselect' ||
                                selectedItem?.label === 'Radio Button ') && (
                                <div className="mt-4 flex flex-wrap">
                                    {optionInputs.map((option, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-col mr-5 w-1/12 text-sm"
                                        >
                                            <label className="mr-2  w-full flex justify-between ">
                                                <span>Option {index + 1}</span>
                                                <img
                                                    onClick={() =>
                                                        removeOptionInput(index)
                                                    }
                                                    src={CrossIcon}
                                                    alt="CrossIcon"
                                                />
                                            </label>
                                            <InputField
                                                type="text"
                                                value={option}
                                                onChange={(e: {
                                                    target: {
                                                        value: string;
                                                    };
                                                }) =>
                                                    handleOptionInputChange(
                                                        index,
                                                        e.target.value
                                                    )
                                                }
                                                placeholder={`Enter`}
                                                className="border border-gray-300 rounded py-1"
                                            />
                                        </div>
                                    ))}
                                    <div className="mt-2 flex">
                                        <Button
                                            className={'ml-5 text-[#08627E]'}
                                            type={''}
                                            onClick={addOptionInput}
                                        >
                                            <img
                                                src={add}
                                                alt="add"
                                                className="mr-1"
                                            />{' '}
                                            Add More Option
                                        </Button>
                                    </div>
                                </div>
                            )}

                            <div className="flex  mt-10 justify-end">
                                <Button
                                    type="reset"
                                    className="mr-5"
                                    onClick={() => onClose()}
                                >
                                    Cancel
                                </Button>

                                <button
                                    data-testid="addQuestion"
                                    type="submit"
                                    disabled={
                                        isSubmitting || !isValid || !dirty
                                    }
                                    className={`py-3 px-4 inline-flex items-center gap-x-2 text-sm rounded-md border border-transparent text-white bg-primary-700 ${isSubmitting || !isValid || !dirty ? 'opacity-50 pointer-events-none' : '  hover:bg-primary-800'}`}
                                >
                                    Add question
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </ModalBody>
        </Modal>
    );
}
