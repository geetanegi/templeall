import React from 'react';
import { render } from '@testing-library/react';
import QuestionBankAvailablePage from './QuestionBankAvailablePage';
import { useProviderMock } from '../../__mocks__/providerMock';
import QuestionBankManagementApi from '../../api/services/QuestionBankManagement/QuestionBankManagementApi.service';
import QuestionBankGrid from '../../__mocks__/QuestionBank/QuestionBankGrid.json';
import QuestionType from '../../__mocks__/QuestionBank/QuestionType.json';
import AnswerType from '../../__mocks__/QuestionBank/AnswerType.json';
import QuestionById from '../../__mocks__/QuestionBank/QuestionById.json';
import DeleteQuestion from '../../__mocks__/QuestionBank/DeleteQuestion.json';
import SaveQuestion from '../../__mocks__/QuestionBank/SaveQuestion.json';
import AddQuestionModal from '../../components/QuestionBankAvailable/Modal/AddQuestionModal';
import EditQuestiona from '../../components/QuestionBankAvailable/Modal/EditQuestionModal';

describe('AuthorizationCodeGridPage', () => {
    const ComponentWithProvider = useProviderMock(
        <QuestionBankAvailablePage />
    );
    const ComponentWithProvider1 = useProviderMock(
        <AddQuestionModal onClose={() => {}} />
    );
    const ComponentWithProvider2 = useProviderMock(
        <EditQuestiona onClose={() => {}} />
    );
    beforeEach(() => {
        const mock = jest.spyOn(
            QuestionBankManagementApi,
            'QuestionBankManagementGrid'
        );
        mock.mockImplementation(() => Promise.resolve<any>(QuestionBankGrid));
        const questionType = jest.spyOn(
            QuestionBankManagementApi,
            'questionType'
        );
        questionType.mockImplementation(() =>
            Promise.resolve<any>(QuestionType)
        );
        const answerType = jest.spyOn(QuestionBankManagementApi, 'answerType');
        answerType.mockImplementation(() => Promise.resolve<any>(AnswerType));
        const Delete = jest.spyOn(
            QuestionBankManagementApi,
            'deleteQuestionBankManagement'
        );
        Delete.mockImplementation(() => Promise.resolve<any>(DeleteQuestion));
        const QuestionById1 = jest.spyOn(
            QuestionBankManagementApi,
            'questionBankManagementById'
        );
        QuestionById1.mockImplementation(() =>
            Promise.resolve<any>(QuestionById)
        );
        const QuestionSave = jest.spyOn(
            QuestionBankManagementApi,
            'questionBankManagementById'
        );
        QuestionSave.mockImplementation(() =>
            Promise.resolve<any>(SaveQuestion)
        );
    });
    test('should show AuthorizationCodeGridPage', async () => {
        const { findAllByText } = render(ComponentWithProvider);
        const pageEl = await findAllByText('Question Bank Management');
        expect(pageEl[0]).toBeInTheDocument();
    });
    // test('should click view goal mode button', async () => {
    //     const { findByTestId } = render(ComponentWithProvider);
    //     const viewBtn = await findByTestId('View-element');
    //     fireEvent.click(viewBtn);
    // });
    // test('should click view goal mode button', async () => {
    //     const { findByTestId } = render(ComponentWithProvider);
    //     const viewBtn = await findByTestId('Delet-element');
    //     fireEvent.click(viewBtn);
    //     const viewBtn1 = await findByTestId('yes-confirmation-button');
    //     fireEvent.click(viewBtn1);
    // });
    // test('should click view goal mode button', async () => {
    //     const { findByTestId } = render(ComponentWithProvider);
    //     const viewBtn = await findByTestId('Delet-element');
    //     fireEvent.click(viewBtn);
    //     const viewBtn1 = await findByTestId('no-confirmation-button');
    //     fireEvent.click(viewBtn1);
    // });
    // test('should click view goal mode button', async () => {
    //     const { findByTestId } = render(ComponentWithProvider);
    //     const questionTypeSelecte = await findByTestId('questionTypeSelecte');
    //     fireEvent.change(questionTypeSelecte, {
    //         target: { value: 'General' },
    //     });
    //     const questionStatement = await findByTestId('questionStatement12');
    //     fireEvent.change(questionStatement, {
    //         target: { value: 'name plz' },
    //     });
    //     const answerTypeSelecte = await findByTestId('answerTypeSelecte');
    //     fireEvent.change(answerTypeSelecte, {
    //         target: { value: 93 },
    //     });
    //     const viewBtn1 = await findByTestId('addQuestion');
    //     fireEvent.click(viewBtn1);
    // });
    test('should show AddQuestionModal', async () => {
        const { findByTestId } = render(ComponentWithProvider1);
        const pageEl = await findByTestId('add-question-modal');
        expect(pageEl).toBeInTheDocument();
    });
    test('should show AddQuestionModal', async () => {
        const { findByTestId } = render(ComponentWithProvider2);
        const pageEl = await findByTestId('edit-question-modal');
        expect(pageEl).toBeInTheDocument();
    });
});
