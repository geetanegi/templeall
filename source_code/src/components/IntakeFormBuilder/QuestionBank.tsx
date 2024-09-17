import React, { useEffect, useState } from 'react';
import DragIcon from '../../assets/img/drag.svg';
import QuestionModal from './QuestionModal';
import deleteIcon from '../../assets/img/GridIcons/delete.svg';
import Input from '../Generics/Inputs/Input';

type CardData = {
    title: string;
    description: string;
};
interface QuestionsPanelProps {
    cards: Record<string, any>;
    updatedQuestion?: any;
    setUpdatedQuestion?: any;
    selectedQuestions?: any;
    setSelectedQuestions?: any;
    showQuestion?: any;
}

const parseApiResponse = (apiResponse: any): any => {
    let trimmedResponse = apiResponse.trim();
    if (trimmedResponse.startsWith('[') && trimmedResponse.endsWith(']')) {
        try {
            return JSON.parse(trimmedResponse);
        } catch (error) {}
    }

    trimmedResponse = trimmedResponse.slice(1, -1);
    let array = trimmedResponse.split(',').map((item: any) => item.trim());

    array = array.map((item: any) => item.replace(/^["']|["']$/g, ''));

    return array;
};

const QuestionInput = ({
    item,
    title,
    deleteQuestion,
}: {
    item: any;
    title: any;
    deleteQuestion: any;
}): JSX.Element => {
    const updatedAnswerType =
        item?.answerType === 'Dropdown' ||
        item?.answerType === 'Multiselect' ||
        item?.answerType === 'Radio Button';
    let optionsArray;
    if (updatedAnswerType) {
        try {
            optionsArray = parseApiResponse(item.answer);
        } catch (error) {
            optionsArray = [];
        }
    } else {
        optionsArray = item.answer;
    }
    return (
        <div className="border-2 border-gray-300 rounded-md p-4 relative mb-4 pt-8">
            {/* Non-editable Question Display */}
            <div className="w-full border border-gray-300 rounded-md p-2 mb-4 text-gray-700">
                {item?.question?.length && item?.question}
            </div>

            {/* Delete Icon */}
            <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500 focus:outline-none ml-4">
                <img
                    src={deleteIcon}
                    onClick={() => {
                        deleteQuestion({ title: title, id: item.id });
                    }}
                />
            </button>
            <div className="mb-4 text-gray-700 border-b">
                {'Answer Type : '}
                {item?.answerType}
            </div>

            {updatedAnswerType ? (
                <div className="grid grid-cols-2 gap-4">
                    {optionsArray?.map((data: any, index: any) => (
                        <div className="flex flex-col" key={index}>
                            <label className="text-gray-700 font-medium">
                                Option {index + 1}
                            </label>
                            <input
                                type="text"
                                placeholder="options"
                                value={data}
                                className="border-b text-gray-700 border-gray-300 rounded-md focus:outline-none "
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <Input
                    field={{}}
                    label={''}
                    name={''}
                    id={''}
                    value={''}
                    hideLabel={true}
                    placeholder={''}
                    isRequired={true}
                    type="text"
                    form={{
                        touched: {},
                        errors: {},
                    }}
                    props={{}}
                    className={''}
                />
            )}
        </div>
    );
};

const Card: React.FC<{
    data: CardData;
    setAddQuestion: any;
    updatedQuestion: any;
    setOpenModalTitle: any;
    deleteQuestion: any;
}> = ({
    data,
    setAddQuestion,
    updatedQuestion,
    deleteQuestion,
    setOpenModalTitle,
}) => {
    return (
        <div className="flex">
            <img src={DragIcon} alt="drag icon" className="mr-4" />
            <div className="bg-white border border-gray-300 rounded-lg mb-4 p-4 shadow-md flex justify-between items-start w-full">
                <div className="flex flex-col  w-full space-y-3">
                    <div className="flex justify-between border-secondary-200 border-b-2">
                        <span className=" font-normal text-gray-800 text-base">
                            {data.title}
                        </span>
                        <div className="flex space-x-2 ml-4 pb-2">
                            <button
                                className="bg-[#48ABCA] hover:bg-[#48ABCA] text-white py-1 px-8 rounded-md text-sm"
                                onClick={() => {
                                    setOpenModalTitle(data.title);
                                    setAddQuestion(true);
                                }}
                            >
                                Add Questions
                            </button>
                        </div>
                    </div>

                    <div className="w-full">
                        {updatedQuestion?.[data?.title]?.length ? (
                            updatedQuestion?.[data?.title].map((item: any) => {
                                return (
                                    <QuestionInput
                                        key={item.id}
                                        item={item}
                                        title={data?.title}
                                        deleteQuestion={deleteQuestion}
                                    />
                                );
                            })
                        ) : (
                            <div className="w-full border border-gray-300 rounded-md p-2 mb-4 text-gray-700">
                                {`Click on "Add Questions" to start adding questions here.`}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const QuestionsPanel: React.FC<QuestionsPanelProps> = ({
    cards,
    updatedQuestion,
    setUpdatedQuestion,
    selectedQuestions,
    setSelectedQuestions,
    showQuestion,
}) => {
    const [addQuestion, setAddQuestion] = useState(false);
    const [openModalTitle, setOpenModalTitle] = useState('');

    const updateSelectedQuestion = (data: any): void =>
        setSelectedQuestions(data);

    const updateQuestion = (): void => {
        setUpdatedQuestion(selectedQuestions);
        updateSelectedQuestion(selectedQuestions);
    };
    const handleCancel = (): void => {
        setAddQuestion(false);
    };

    useEffect(() => {
        if (updatedQuestion?.length) updateSelectedQuestion(updatedQuestion);
    }, [addQuestion]);
    const deleteQuestion = ({
        title,
        id,
    }: {
        title: any;
        id: string;
    }): void => {
        const deleteQues = updatedQuestion[title].filter(
            (ques: any) => ques.id != id
        );
        setUpdatedQuestion((prev: any) => {
            return { ...prev, [title]: deleteQues };
        });
        setSelectedQuestions({ ...updatedQuestion, [title]: deleteQues });
    };

    return (
        <>
            <div
                className="border-2 border-gray-300 p-6 rounded-lg w-full mt-8"
                data-testid="question-panel"
            >
                {Object.entries(cards).map(([title, value], index) => (
                    <Card
                        key={index}
                        data={{ title, ...value }}
                        setAddQuestion={setAddQuestion}
                        setOpenModalTitle={setOpenModalTitle}
                        updatedQuestion={updatedQuestion}
                        deleteQuestion={deleteQuestion}
                    />
                ))}
            </div>
            {addQuestion && (
                <QuestionModal
                    onClose={handleCancel} // Use a callback to set state
                    isOpen={addQuestion}
                    cards={showQuestion}
                    openModalTitle={openModalTitle}
                    selectedQuestions={selectedQuestions}
                    setSelectedQuestions={setSelectedQuestions}
                    updateQuestion={updateQuestion}
                />
            )}
        </>
    );
};

export default QuestionsPanel;
