import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import ContactGridPage from './ContactGridPage';
import { useProviderMock } from '../__mocks__/providerMock';
import getContactGridApi from '../api/services/getContactGrid.service';
import UsersGridResponse from '../__mocks__/Users/UsersGridResponse.json';

describe('ContactGridPage', () => {
    beforeEach(() => {
        const mock = jest.spyOn(getContactGridApi, 'getContactDetails');
        mock.mockImplementation(() => Promise.resolve<any>(UsersGridResponse));
    });
    const ComponentWithProvider = useProviderMock(<ContactGridPage />);
    test('should show ContactGridPage', async () => {
        const { findAllByText } = render(ComponentWithProvider);
        const pageEl = await findAllByText('Users');
        expect(pageEl[0]).toBeInTheDocument();
    });
    test('should show program book grid', async () => {
        const { findAllByText } = render(ComponentWithProvider);
        const tabButton = await findAllByText('Client');
        fireEvent.click(tabButton[0]);
    });
    test('should show program book grid', async () => {
        const { findAllByText } = render(ComponentWithProvider);
        const tabButton = await findAllByText('Employee');
        fireEvent.click(tabButton[0]);
    });
    test('should click view goal mode button', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const viewBtn = await findByTestId('view-element');
        fireEvent.click(viewBtn);
    });
    test('should click view goal mode button', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const viewBtn = await findByTestId('edit-element');
        fireEvent.click(viewBtn);
    });
    test('should click view goal mode button', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const viewBtn = await findByTestId('history-element');
        fireEvent.click(viewBtn);
    });
});
