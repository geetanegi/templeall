import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { useProviderMock } from '../__mocks__/providerMock';
import IntakeFormBuilder from './IntakeFormBuilder';
import IntakeDraggablePanel from '../components/IntakeFormBuilder/IntakeDraggablePanel';
import DraggableItem from '../components/IntakeFormBuilder/IntakeDraggableItem';
// import IntakeDroppableContainer from '../components/IntakeFormBuilder/IntakeDroppableContainer';

import QuestionModal from '../components/IntakeFormBuilder/QuestionModal';
// import { ProgramBookModalFooter } from '../components/Generics/Modal';
import TherapySelector from '../components/IntakeFormBuilder/QuestionFilterTheraphy';
import QuestionsPanel from '../components/IntakeFormBuilder/QuestionBank';

describe('IntakeFormBuilder', () => {
    const ComponentWithProvider = useProviderMock(<IntakeFormBuilder />);
    const ComponentWithProvider1 = useProviderMock(<IntakeDraggablePanel />);
    const ComponentWithProvider2 = useProviderMock(<DraggableItem />);
    // const ComponentWithProvider3 = useProviderMock(
    //     <IntakeDroppableContainer />
    // );
    // const ComponentWithProvider4 = useProviderMock(
    //     <QuestionModal
    //         cards={{
    //             General: {
    //                 description: 'General category description',
    //                 questions: [
    //                     {
    //                         id: 48,
    //                         question: 'Ankita11',
    //                         answerType: 'Dropdown',
    //                         answer: '[123, 456]',
    //                     },
    //                 ],
    //             },
    //         }}
    //         onClose={() => {}}
    //     />
    // );
    // const ComponentWithProvider5 = useProviderMock(
    //     <ProgramBookModalFooter handleSubmit={() => {}} />
    // );

    test('should show IntakeFormBuilder', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('intake-template-page');
        expect(pageEl).toBeInTheDocument();
    });
    test('should show IntakeDraggablePanel', async () => {
        const { findByTestId } = render(ComponentWithProvider1);
        const pageEl = await findByTestId('intake-draggable-panel');
        expect(pageEl).toBeInTheDocument();
    });
    test('should show intake-draggable-item', async () => {
        const { findByTestId } = render(ComponentWithProvider2);
        const pageEl = await findByTestId('intake-draggable-item');
        expect(pageEl).toBeInTheDocument();
    });
    test('should show IntakeDroppableContainer', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('intake-droppable-container');
        expect(pageEl).toBeInTheDocument();
    });
    // test('should show intake-therapy', async () => {
    //     const { findByTestId } = render(ComponentWithProvider3);
    //     const pageEl = await findByTestId('intake-therapy');
    //     expect(pageEl).toBeInTheDocument();
    // });
    // test('should show QuestionsPanel', async () => {
    //     const { findByTestId } = render(ComponentWithProvider3);
    //     const pageEl = await findByTestId('question-panel');
    //     expect(pageEl).toBeInTheDocument();
    // });
    // test('should show QuestionsModal', async () => {
    //     const { findByTestId } = render(ComponentWithProvider4);
    //     const pageEl = await findByTestId('question-modal');
    //     expect(pageEl).toBeInTheDocument();
    // });
    // test('should show QuestionsModal', async () => {
    //     const { findByTestId } = render(ComponentWithProvider5);
    //     const pageEl = await findByTestId('question-modal-save');
    //     expect(pageEl).toBeInTheDocument();
    // });
    test('should show FormOptionContainer', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('FormOption-conatiner');
        expect(pageEl).toBeInTheDocument();
    });
});
describe('TherapySelector Component', () => {
    const therapyOptions = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
    ];

    const mockSetFilterCard = jest.fn();

    it('should render therapy options checkboxes', () => {
        render(
            <TherapySelector
                therapyOptions={therapyOptions}
                setFilterCard={mockSetFilterCard}
            />
        );

        const checkboxes = screen.getAllByRole('checkbox');
        expect(checkboxes).toHaveLength(therapyOptions.length);

        therapyOptions.forEach((option) => {
            expect(screen.getByText(option.label)).toBeInTheDocument();
        });
    });

    // it('should toggle checkbox selection', () => {
    //     render(
    //         <TherapySelector
    //             therapyOptions={therapyOptions}
    //             setFilterCard={mockSetFilterCard}
    //         />
    //     );

    //     const checkbox = screen.getByLabelText('Option 1');

    //     expect(checkbox).not.toBeChecked();

    //     fireEvent.click(checkbox);

    //     expect(checkbox).toBeChecked();

    //     fireEvent.click(checkbox);

    //     expect(checkbox).not.toBeChecked();
    // });

    // it('should call setFilterCard with the correct selected options', () => {
    //     render(
    //         <TherapySelector
    //             therapyOptions={therapyOptions}
    //             setFilterCard={mockSetFilterCard}
    //         />
    //     );

    //     const checkbox1 = screen.getByLabelText('Option 1');
    //     const checkbox2 = screen.getByLabelText('Option 2');

    //     fireEvent.click(checkbox1);

    //     expect(mockSetFilterCard).toHaveBeenCalledWith(['option1']);

    //     fireEvent.click(checkbox2);

    //     expect(mockSetFilterCard).toHaveBeenCalledWith(['option1', 'option2']);
    // });
});
describe('QuestionsPanel', () => {
    const cardsMock = {
        Card1: { title: 'Card 1', description: 'Description 1' },
        Card2: { title: 'Card 2', description: 'Description 2' },
    };
    // const updatedQuestionMock = {
    //     Card1: [{ id: '1', question: 'Question 1', answer: 'Answer 1' }],
    // };

    const mockUpdatedQuestion = {
        'Card 1': [
            {
                id: 'q1',
                question: 'What is your name?',
                answerType: 'Text',
                answer: 'John',
            },
            {
                id: 'q2',
                question: 'What is your age?',
                answerType: 'Dropdown',
                answer: '[18,25,30]',
            },
        ],
        'Card 2': [],
    };
    // let setUpdatedQuestionMock = jest.fn();
    // let setSelectedQuestionsMock = jest.fn();

    // beforeEach(() => {
    //     setUpdatedQuestionMock = jest.fn();
    //     setSelectedQuestionsMock = jest.fn();
    // });

    // it('should set `addQuestion` to false when `handleCancel` is called', () => {
    //     render(
    //         <QuestionsPanel
    //             cards={cardsMock}
    //             updatedQuestion={updatedQuestionMock}
    //             setUpdatedQuestion={setUpdatedQuestionMock}
    //             selectedQuestions={null}
    //             setSelectedQuestions={setSelectedQuestionsMock}
    //         />
    //     );

    //     const addButtons = screen.getAllByText('Add Questions');
    //     fireEvent.click(addButtons[0]);

    //     fireEvent.click(screen.getByText('Cancel'));

    //     expect(screen.queryByTestId('question-modal')).not.toBeInTheDocument();
    // });

    it('renders QuestionInput when updatedQuestion has items', () => {
        render(
            <QuestionsPanel
                cards={cardsMock}
                updatedQuestion={mockUpdatedQuestion}
                setUpdatedQuestion={jest.fn()}
                selectedQuestions={jest.fn()}
                setSelectedQuestions={jest.fn()}
            />
        );

        expect(screen.getByText('What is your name?')).toBeInTheDocument();
        expect(screen.getByText('What is your age?')).toBeInTheDocument();

        expect(
            screen.getByText(
                'Click on "Add Questions" to start adding questions here.'
            )
        ).toBeInTheDocument();
    });
});
describe('QuestionModal', () => {
    const mockSetSelectedQuestions = jest.fn();

    const defaultProps = {
        onClose: jest.fn(),
        isOpen: true,
        cards: {
            Category1: {
                description: 'Category Description',
                questions: [
                    {
                        id: 1,
                        question: 'Question 1',
                        answerType: 'Text',
                        answer: 'Answer 1',
                    },
                    {
                        id: 2,
                        question: 'Question 2',
                        answerType: 'Dropdown',
                        answer: '[10,20,30]',
                    },
                ],
            },
        },
        selectedQuestions: {},
        setSelectedQuestions: mockSetSelectedQuestions,
        openModalTitle: 'Category1',
        updateQuestion: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should add question to selectedQuestions when checkbox is checked', () => {
        render(<QuestionModal {...defaultProps} />);

        const checkbox = screen.getByRole('checkbox', { name: /Question 1/i });
        fireEvent.click(checkbox);

        expect(mockSetSelectedQuestions).toHaveBeenCalledWith(
            expect.any(Function)
        );
        const updater = mockSetSelectedQuestions.mock.calls[0][0];
        const newState = updater({});
        expect(newState).toEqual({
            Category1: [
                {
                    id: 1,
                    question: 'Question 1',
                    answerType: 'Text',
                    answer: 'Answer 1',
                },
            ],
        });
    });

    it('should remove question from selectedQuestions when checkbox is unchecked', () => {
        const updatedProps = {
            ...defaultProps,
            selectedQuestions: {
                Category1: [
                    {
                        id: 1,
                        question: 'Question 1',
                        answerType: 'Text',
                        answer: 'Answer 1',
                    },
                ],
            },
        };

        render(<QuestionModal {...updatedProps} />);

        const checkbox = screen.getByLabelText('Question 1');
        fireEvent.click(checkbox);

        expect(mockSetSelectedQuestions).toHaveBeenCalledWith(
            expect.any(Function)
        );
        const updater = mockSetSelectedQuestions.mock.calls[0][0];
        const newState = updater({
            Category1: [{ id: 1, question: 'Question 1' }],
        });
        expect(newState).toEqual({
            Category1: [],
        });
    });
});
