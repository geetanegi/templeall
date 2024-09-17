import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import AuthorizationCodeGridPage from './AuthorizationCodeGridPage';
import { useProviderMock } from '../__mocks__/providerMock';
import AuthorizedCodeGrid from '../api/services/AuthorizationCode/AuthorizationCodeGridApi.service';
import AuthorizedCode from '../__mocks__/BillingCode/AuthorizedCodeGrid.json';
import ChangeBillingCode from '../__mocks__/BillingCode/ChangeBillingCode.json';

describe('AuthorizationCodeGridPage', () => {
    beforeEach(() => {
        const mock = jest.spyOn(AuthorizedCodeGrid, 'getAuthorizedGridApi');
        mock.mockImplementation(() => Promise.resolve<any>(AuthorizedCode));
        const CodeMock = jest.spyOn(
            AuthorizedCodeGrid,
            'changeBillingCodeStatus'
        );
        CodeMock.mockImplementation(() =>
            Promise.resolve<any>(ChangeBillingCode)
        );
    });
    const ComponentWithProvider = useProviderMock(
        <AuthorizationCodeGridPage />
    );
    test('should show AuthorizationCodeGridPage', async () => {
        const { findAllByText } = render(ComponentWithProvider);
        const pageEl = await findAllByText('Billing Codes');
        expect(pageEl[0]).toBeInTheDocument();
    });
    test('should click on custom rate icon', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const openCustom = await findByTestId('View-element');
        fireEvent.click(openCustom);
    });
    test('should click on custom rate icon', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const openCustom = await findByTestId('edit-element');
        fireEvent.click(openCustom);
    });
    test('should click on custom rate icon', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const openCustom = await findByTestId('Default-element');
        fireEvent.click(openCustom);
    });
    test('should click on custom rate icon', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const openCustom = await findByTestId('customRate-modal-open');
        fireEvent.click(openCustom);
    });
    test('should click on custom rate icon', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const openCustom = await findByTestId('activateIcon');
        fireEvent.click(openCustom);
    });
    test('should click on custom rate icon', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const openCustom = await findByTestId('inactiveIcon');
        fireEvent.click(openCustom);
    });
});
