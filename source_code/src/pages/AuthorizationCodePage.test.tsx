import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import AuthorizationCodePage from './AuthorizationCodePage';
import { useProviderMock } from '../__mocks__/providerMock';
import {
    editAuthorizationCode,
    saveAuthorizationCode,
} from '../api/services/saveAuthorizationCode.service';
import SaveAuthorizationCode from '../__mocks__/BillingCode/SaveAuthorizationCode.json';
import EditAuthorizationCode from '../__mocks__/BillingCode/EditAuthorizationCode.json';

describe('AuthorizationCodePage', () => {
    beforeEach(() => {
        const mock = jest.spyOn(
            saveAuthorizationCode,
            'saveAuthorizationCodeApi'
        );
        mock.mockImplementation(() =>
            Promise.resolve<any>(SaveAuthorizationCode)
        );
        const edit = jest.spyOn(
            editAuthorizationCode,
            'editAuthorizationCodeApi'
        );
        edit.mockImplementation(() =>
            Promise.resolve<any>(EditAuthorizationCode)
        );
    });
    const ComponentWithProvider = useProviderMock(<AuthorizationCodePage />);
    test('should show AuthorizationCodePage', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('authorization-code-page');
        expect(pageEl).toBeInTheDocument();
    });
    test('should click on cancel button', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const cancel = await findByTestId('cancel-button');
        fireEvent.click(cancel);
    });
    test('should click on save button', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const save = await findByTestId('save-button');
        fireEvent.click(save);
    });
    test('should enter code', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const codeInput = await findByTestId('code-input');
        fireEvent.change(codeInput, { target: { value: 'abc' } });
    });
    test('should enter description', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const descriptionInput = await findByTestId('description-input');
        fireEvent.change(descriptionInput, { target: { value: 'abc' } });
    });
});
