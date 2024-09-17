import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import ProgramBookGridPage from './ProgramBookGridPage';
import { useProviderMock } from '../__mocks__/providerMock';
import getMineAPI from '../api/services/ProgramBook/getMine.service';
import ProgrambookGridResponse from '../__mocks__/Programbook/ProgrambookGridResponse.json';
import ProgrambookByIdResponse from '../__mocks__/Programbook/ProgrambookByIdResponse.json';
import ProgrambookGridHistoryResponse from '../__mocks__/Programbook/ProgrambookGridHistoryResponse.json';
import ProgramBookHistoryAPI from '../api/services/ProgramBook/ProgramBookHistoryAPI.service';
import getProgramBookDataByIdAPI from '../api/services/ProgramBook/getProgramBookDataById.service';

describe('ProgramBookGridPage', () => {
    beforeEach(() => {
        const mock = jest.spyOn(getMineAPI, 'getMine');
        mock.mockImplementation(() =>
            Promise.resolve<any>(ProgrambookGridResponse)
        );
        const historyMock = jest.spyOn(
            ProgramBookHistoryAPI,
            'getProgramBookDataHistoryGrid'
        );
        historyMock.mockImplementation(() =>
            Promise.resolve<any>(ProgrambookGridHistoryResponse)
        );
        const mockById = jest.spyOn(
            getProgramBookDataByIdAPI,
            'getProgramBookDataById'
        );
        mockById.mockImplementation(() =>
            Promise.resolve<any>(ProgrambookByIdResponse)
        );
    });
    const ComponentWithProvider = useProviderMock(<ProgramBookGridPage />);
    test('should show program book grid page', async () => {
        const { findAllByText } = render(ComponentWithProvider);
        const pageEl = await findAllByText('Program Book');
        expect(pageEl[0]).toBeInTheDocument();
    });
    test('should show program book grid', async () => {
        const { findAllByText } = render(ComponentWithProvider);
        const tabButton = await findAllByText('All');
        fireEvent.click(tabButton[0]);
    });
    test('should show program book grid', async () => {
        const { findAllByText } = render(ComponentWithProvider);
        const tabButton = await findAllByText('Discharged');
        fireEvent.click(tabButton[0]);
    });
    test('should click view goal mode button', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const viewBtn = await findByTestId('view-goal-mode-button');
        fireEvent.click(viewBtn);
    });
    test('should click view goal mode button', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const viewBtn = await findByTestId('Assignee-mode-button');
        fireEvent.click(viewBtn);
    });
    test('should click view goal mode button', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const viewBtn = await findByTestId('discharge-link');
        fireEvent.click(viewBtn);
    });
    test('should click view goal mode button', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const viewBtn = await findByTestId('edit-program-book-button');
        fireEvent.click(viewBtn);
    });
    test('should click view goal mode button', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const viewBtn = await findByTestId('view-mode-button');
        fireEvent.click(viewBtn);
    });
    test('should click view goal mode button', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const viewBtn = await findByTestId('history-btn');
        fireEvent.click(viewBtn);
    });
});
