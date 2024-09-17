import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ForgotPasswordPage from './ForgotPasswordPage';
import { useProviderMock } from '../__mocks__/providerMock';
describe('ForgotPasswordPage', () => {
    const ComponentWithProvider = useProviderMock(<ForgotPasswordPage />);
    test('should show ForgotPasswordPage', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('forgot-password-page');
        expect(pageEl).toBeInTheDocument();
    });
    test('should enter current password', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('username');
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
        const username = await findByTestId('username');
        fireEvent.change(username, { target: { value: 'test' } });
        const newPassword = await findByTestId('new-password');
        fireEvent.change(newPassword, { target: { value: 'test' } });
        const currentPassword = await findByTestId('confirm-password');
        fireEvent.change(currentPassword, { target: { value: 'test' } });
        const pageEl = await findByTestId('forgot-password-button');
        fireEvent.click(pageEl);
        expect(pageEl).toBeInTheDocument();
    });
});
