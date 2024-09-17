import React from 'react';
import { render } from '@testing-library/react';
import SessionNoteGridPage from './SessionNoteGridPage';
import { useProviderMock } from '../__mocks__/providerMock';
import getSessionNoteGrid from '../api/services/Session/getSessionNoteGrid.service';
import SessionNoteGridResponse from '../__mocks__/SessionNote/SessionNoteGridResponse.json';

describe('SessionNoteGridPage', () => {
    beforeEach(() => {
        const mock = jest.spyOn(getSessionNoteGrid, 'getSessionNoteGridApi');
        mock.mockImplementation(() =>
            Promise.resolve<any>(SessionNoteGridResponse)
        );
    });
    const ComponentWithProvider = useProviderMock(<SessionNoteGridPage />);
    test('should show SessionNoteGridPage page', async () => {
        const { findByText } = render(ComponentWithProvider);
        const pageEl = await findByText('Session Note');
        expect(pageEl).toBeInTheDocument();
    });
    // test('should click view goal mode button', async () => {
    //     const { findByTestId } = render(ComponentWithProvider);
    //     const viewBtn = await findByTestId('view-goal-mode-button');
    //     fireEvent.click(viewBtn);
    // });
    // test('should click view goal mode button', async () => {
    //     const { findByTestId } = render(ComponentWithProvider);
    //     const viewBtn = await findByTestId('edit-goal-mode-button');
    //     fireEvent.click(viewBtn);
    // });
    // test('should click view goal mode button', async () => {
    //     const { findByTestId } = render(ComponentWithProvider);
    //     const viewBtn = await findByTestId('copy-goal-mode-button');
    //     fireEvent.click(viewBtn);
    // });
    // test('should click view goal mode button', async () => {
    //     const { findByTestId } = render(ComponentWithProvider);
    //     const viewBtn = await findByTestId('publish-goal-mode-button');
    //     fireEvent.click(viewBtn);
    // });
    // test('should click view goal mode button', async () => {
    //     const { findByTestId } = render(ComponentWithProvider);
    //     const viewBtn = await findByTestId('unpublished-goal-mode-button');
    //     fireEvent.click(viewBtn);
    // });
    // test('should click view goal mode button', async () => {
    //     const { findByTestId } = render(ComponentWithProvider);
    //     const viewBtn = await findByTestId('Draft-goal-mode-button');
    //     fireEvent.click(viewBtn);
    // });
    // test('should click view goal mode button', async () => {
    //     const { findByTestId } = render(ComponentWithProvider);
    //     const viewBtn = await findByTestId('deleteIcon-goal-mode-button');
    //     fireEvent.click(viewBtn);
    // });
});
