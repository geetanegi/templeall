/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react';
import Modal, { ModalBody, ModalHeader } from '../../Generics/Modal';
import { Field, Form, Formik, FormikHelpers } from 'formik';
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
interface EditValues {
    questionType: string | null;
    questionStatement: string | null;
    answerType: number | null;
}
export default function EditQuestiona({
    open,
    onClose,
}: AddInterventionModalProps): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const [optionInputs, setOptionInputs] = useState<string[]>(['']);
    const [selectedItem, setSelectedItem] = useState<any>(null);

    const validationSchema = Yup.object({
        questionType: Yup.string().required('Question Type is required'),
        answerType: Yup.string().required('Answer Type is required'),
    });

    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const questionBank = useSelector(
        ({ questionBankManementSlice }: any) => questionBankManementSlice
    );
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

    const removeOptionInput = (index: number) => {
        setOptionInputs(optionInputs.filter((_, i) => i !== index));
    };
    const handleOptionInputChange = (index: number, value: string) => {
        const updatedOptions = [...optionInputs];
        updatedOptions[index] = value;
        setOptionInputs(updatedOptions);
    };
    const addOptionInput = () => {
        setOptionInputs([...optionInputs, '']);
    };
    const dataById = questionBank?.questionById?.data;

    const edit = async (
        values: EditValues,
        { setSubmitting, resetForm }: FormikHelpers<EditValues>
    ) => {
        try {
            // Call the API to save the question
            const response =
                await QuestionBankManagementApi.saveQuestionBankManagement({
                    data: {
                        questionBankManagementId: dataById?.id || '', // Ensure dataById.id is provided
                        questionType: values?.questionType,
                        questionStatement: values?.questionStatement,
                        answerType: values?.answerType,
                        answerStatement: optionInputs,
                    },
                });

            if (response) {
                // Check if the API response indicates success
                dispatch(
                    openNotification({
                        success: true,
                        title: 'Question Edited Successfully',
                        description:
                            'The question has been updated successfully.',
                    })
                );

                await dispatch(getActiveAsync(initialData)); // Refresh the grid data
                resetForm(); // Reset the form fields
                onClose(); // Close the modal or perform other actions after successful edit
            } else {
                // Handle the case where the API response does not indicate success
                dispatch(
                    openNotification({
                        success: false,
                        title: 'Failed to Edit Question',
                        description:
                            'An error occurred while editing the question. Please try again.',
                    })
                );
            }
        } catch (error) {
            // Handle any errors that occurred during the API call
            dispatch(
                openNotification({
                    success: false,
                    title: 'Failed to Edit Question',
                    description:
                        'An error occurred while editing the question. Please try again.',
                })
            );

            console.error('Error editing question:', error);
        } finally {
            setSubmitting(false); // Always ensure that submitting state is reset
        }
    };
    useEffect(() => {
        if (dataById?.answerStatement) {
            // Remove the square brackets and split the string by commas
            const parsedAnswerStatement = dataById.answerStatement
                .replace(/[\[\]]/g, '') // Remove square brackets
                .split(',') // Split by commas
                .map((item: string) => item.trim()); // Trim any extra spaces

            setOptionInputs(parsedAnswerStatement); // Set the parsed array to state
        } else {
            setOptionInputs([]); // Handle case where answerStatement is undefined or null
        }
    }, [dataById]);

    return (
        <Modal open={open} id={'add-Client-Doc-modal'} expandModal={false}>
            <ModalHeader
                title={'Edit Question'}
                icon={false}
                onExpand={undefined}
            />
            <ModalBody expandModal={false}>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        questionType: dataById?.questionType || '',
                        questionStatement: dataById?.questionStatement || '',
                        answerType: dataById?.answerType?.id || 0,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={edit}
                >
                    {({
                        values,
                        isSubmitting,
                        handleChange,
                        setFieldValue,
                        setFieldTouched,
                        resetForm,
                    }) => (
                        <Form className="w-[70rem]">
                            <div
                                className="w-1/3 mb-4"
                                data-testid="edit-question-modal"
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
                                />
                            </div>
                            <div>
                                <InputField
                                    name="questionStatement"
                                    label="Question Statement"
                                    placeholder="Type your question here"
                                    onChange={handleChange}
                                    value={values.questionStatement}
                                />
                            </div>
                            <div className="w-1/3">
                                <Field
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
                                />
                            </div>

                            {/* Dynamic Options for Dropdown, Multiselect, Radio Button */}
                            {(selectedItem?.label === 'Dropdown' ||
                                selectedItem?.label === 'Multiselect' ||
                                selectedItem?.label === 'Radio Button ') && (
                                <div className="mt-4 flex ">
                                    {optionInputs.map((option, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-col mr-5 w-1/12 text-sm"
                                        >
                                            <label className="mr-2 flex justify-between">
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

                            <div className="flex justify-end">
                                <button
                                    onClick={() => {
                                        onClose();
                                        resetForm(); // Reset form fields
                                        setOptionInputs(['']); // Reset option inputs
                                    }}
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-4 inline-flex items-center gap-x-2 text-sm rounded-md border border-transparent text-secondary-700 hover:text-secondary-400 disabled:opacity-50 disabled:pointer-events-none"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="py-3 px-4 inline-flex items-center gap-x-2 text-sm rounded-md border border-transparent bg-primary-700 text-white hover:bg-primary-800 disabled:opacity-50 disabled:pointer-events-none"
                                >
                                    Save
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </ModalBody>
        </Modal>
    );
}
