import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import ChangePasswordPage from './ChangePasswordPage';
import { useProviderMock } from '../__mocks__/providerMock';
import ChangePasswordResponse from '../__mocks__/Login/ChangePassword.json';
import changePasswordApi from '../api/services/changePassword.service';
describe('ChangePasswordPage', () => {
    beforeEach(() => {
        const mock = jest.spyOn(changePasswordApi, 'changePassword');
        mock.mockImplementation(() =>
            Promise.resolve<any>(ChangePasswordResponse)
        );
    });
    const ComponentWithProvider = useProviderMock(<ChangePasswordPage />);
    test('should show ChangePasswordPage', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('change-password-page');
        expect(pageEl).toBeInTheDocument();
    });
    test('should enter current password', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('current-password');
        fireEvent.change(pageEl, { target: { value: 'test' } });
        expect(pageEl).toBeInTheDocument();
    });
    test('should enter new password', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('new-password');
        fireEvent.change(pageEl, { target: { value: 'test' } });
        fireEvent.copy(pageEl);
        fireEvent.paste(pageEl);
        expect(pageEl).toBeInTheDocument();
    });
    test('should enter confirm password', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('confirm-password');
        fireEvent.change(pageEl, { target: { value: 'test' } });
        fireEvent.copy(pageEl);
        fireEvent.paste(pageEl);
        expect(pageEl).toBeInTheDocument();
    });
    test('should enter current password', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('show-password-img');
        fireEvent.click(pageEl);
        expect(pageEl).toBeInTheDocument();
    });
    test('should enter current password', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('new-password-img');
        fireEvent.click(pageEl);
        expect(pageEl).toBeInTheDocument();
    });
    test('should enter current password', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('confirm-password-img');
        fireEvent.click(pageEl);
        expect(pageEl).toBeInTheDocument();
    });
    test('should enter all fields', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const currentPassword = await findByTestId('current-password');
        fireEvent.change(currentPassword, { target: { value: 'test' } });
        const newPassword = await findByTestId('new-password');
        fireEvent.change(newPassword, { target: { value: 'test' } });
        const confirmPassword = await findByTestId('new-password');
        fireEvent.change(confirmPassword, { target: { value: 'test' } });
        const pageEl = await findByTestId('change-password-button');
        fireEvent.click(pageEl);
        expect(pageEl).toBeInTheDocument();
    });
});
