import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import SessionGridPage from './SessionGridPage';
import { useProviderMock } from '../__mocks__/providerMock';
import getSessionGridApi from '../api/services/Session/getSessionGridApi.service';
import getAllSessionsResponse from '../__mocks__/session/getAllSessions.json';

describe('SessionGridPage', () => {
    beforeEach(() => {
        const mock = jest.spyOn(
            getSessionGridApi,
            'getSessionGridSliceGridData'
        );
        mock.mockImplementation(() =>
            Promise.resolve<any>(getAllSessionsResponse)
        );
    });
    const ComponentWithProvider = useProviderMock(<SessionGridPage />);
    test('should show session grid page', async () => {
        const { findAllByText } = render(ComponentWithProvider);
        const pageEl = await findAllByText('Session');
        expect(pageEl[0]).toBeInTheDocument();
    });
    test('should show program book grid', async () => {
        const { findAllByText } = render(ComponentWithProvider);
        const tabButton = await findAllByText('Discontinued');
        fireEvent.click(tabButton[0]);
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
    //     const viewBtn = await findByTestId('run-goal-mode-button');
    //     fireEvent.click(viewBtn);
    // });
    // test('should click view goal mode button', async () => {
    //     const { findByTestId } = render(ComponentWithProvider);
    //     const viewBtn = await findByTestId('print-goal-mode-button');
    //     fireEvent.click(viewBtn);
    // });
    // test('should click view goal mode button', async () => {
    //     const { findByTestId } = render(ComponentWithProvider);
    //     const viewBtn = await findByTestId('history-goal-mode-button');
    //     fireEvent.click(viewBtn);
    // });
});
