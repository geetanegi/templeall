import React from 'react';
import Modal, {
    ModalBody,
    ModalHeader,
    ProgramBookModalFooter,
} from '../Generics/Modal';

import { Formik, FormikHelpers } from 'formik';

interface Values {
    name: string;
    description: string;
}

interface Question {
    id?: number;
    question: string;
    checked?: boolean;
    answerType: string;
    answer: string;
}

interface CategoryData {
    description: string;
    questions: Question[];
}

interface Cards {
    [key: string]: CategoryData;
}

export default function QuestionModal({
    onClose,
    isOpen,
    cards,
    selectedQuestions,
    setSelectedQuestions,
    openModalTitle,
    updateQuestion,
}: {
    onClose: () => void;
    isOpen?: boolean;
    cards: Cards;
    selectedQuestions?: any;
    setSelectedQuestions?: any;
    openModalTitle?: any;
    updateQuestion?: any;
}): React.JSX.Element {
    // Update the state to hold both id and question text

    const save = async (values: any): Promise<void> => {
        console.log(values);
        updateQuestion();
        onClose();
    };

    const initialValues = {
        name: '',
        description: '',
    };

    const handleSubmitForm = async (
        values: Values,
        { setSubmitting }: FormikHelpers<Values>
    ): Promise<void> => {
        setSubmitting(true);
        await save(values);
        setSubmitting(false);
    };

    const handleCheckboxChange = (
        categoryName: string,
        question: Question,
        answerType: string,
        answer: string
    ): any => {
        setSelectedQuestions((prevState: any) => {
            const currentSelections = prevState[openModalTitle] || [];
            const isSelected = currentSelections.some(
                (selected: any) => selected.id === question.id
            );

            if (isSelected) {
                // Remove the question from the selections
                return {
                    ...prevState,
                    [openModalTitle]: currentSelections.filter(
                        (selected: any) => selected.id !== question.id
                    ),
                };
            } else {
                // Add the question to the selections
                return {
                    ...prevState,
                    [openModalTitle]: [
                        ...currentSelections,
                        {
                            id: question.id!,
                            question: question.question,
                            answerType: answerType,
                            answer: answer,
                        },
                    ],
                };
            }
        });
    };

    return (
        <Modal open={isOpen} id="add-Client-Doc-modal" expandModal={false}>
            <ModalHeader
                title="Question Bank"
                icon={false}
                closeIcon={false}
                onExpand={undefined}
                onClose={onClose}
            />

            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmitForm}
                enableReinitialize
                validateOnChange
            >
                {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit} className="w-[60rem] h-auto">
                        <ModalBody expandModal={false}>
                            <div
                                className="p-6 bg-white border border-gray-300 rounded-lg shadow-sm w-full max-w-[90vw] mx-auto mt-4"
                                data-testid="question-modal"
                            >
                                {Object.entries(cards).map(
                                    ([categoryName, categoryData]) => (
                                        <div
                                            key={categoryName}
                                            className="mb-6"
                                        >
                                            <h3 className="text-lg font-semibold text-gray-700 mb-2 pb-1">
                                                {categoryName}
                                                <div className="bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem] rounded-md"></div>
                                            </h3>

                                            <ul>
                                                {categoryData?.questions?.map(
                                                    (question) => (
                                                        <li
                                                            key={
                                                                question.id ||
                                                                question.question
                                                            }
                                                            className="flex items-center mb-2"
                                                        >
                                                            {question.question
                                                                ?.length ? (
                                                                <>
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={selectedQuestions?.[
                                                                            openModalTitle
                                                                        ]?.some(
                                                                            (
                                                                                selected: any
                                                                            ) =>
                                                                                selected.id ===
                                                                                question.id
                                                                        )}
                                                                        id={`checkbox-${question.id}`}
                                                                        onChange={() =>
                                                                            handleCheckboxChange(
                                                                                categoryName,
                                                                                question,
                                                                                question.answerType,
                                                                                question.answer
                                                                            )
                                                                        }
                                                                        // disabled={
                                                                        //     openModalTitle !=
                                                                        //     categoryName
                                                                        // }
                                                                        className="h-4 w-4 text-[#48ABCA] border-gray-300 rounded focus:ring-[#48ABCA] mr-3"
                                                                    />
                                                                    <label
                                                                        htmlFor={`checkbox-${question.id}`}
                                                                        className={`text-sm ${selectedQuestions?.[openModalTitle]?.some((selected: any) => selected.id === question.id) ? 'text-blue-500 bg-blue-100 p-2 rounded-md' : 'text-gray-700'}`}
                                                                    >
                                                                        {
                                                                            question.question
                                                                        }
                                                                    </label>
                                                                </>
                                                            ) : (
                                                                <span className="text-sm text-gray-400">
                                                                    No questions
                                                                    yet.
                                                                </span>
                                                            )}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    )
                                )}
                            </div>
                        </ModalBody>

                        <ProgramBookModalFooter
                            onClose={onClose}
                            handleSubmit={handleSubmit}
                        />
                    </form>
                )}
            </Formik>
        </Modal>
    );
}
