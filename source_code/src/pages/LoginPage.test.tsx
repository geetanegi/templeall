import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import LoginPage from './LoginPage';
import { useProviderMock } from '../__mocks__/providerMock';
describe('LoginPage', () => {
    const ComponentWithProvider = useProviderMock(<LoginPage />);
    test('should show LoginPage', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('login-page');
        expect(pageEl).toBeInTheDocument();
    });
    test('should show fields', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const feild = await findByTestId('password-field');
        fireEvent.keyDown(feild, {
            key: 'Enter',
            code: 'Enter',
            charCode: 13,
        });
        fireEvent.copy(feild);
        fireEvent.paste(feild);
        expect(feild).toBeInTheDocument();
    });
    test('should enter current password', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('password-field-img');
        fireEvent.click(pageEl);
        expect(pageEl).toBeInTheDocument();
    });
    test('should enter current password', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('password-field-img');
        fireEvent.click(pageEl);
        expect(pageEl).toBeInTheDocument();
    });
    test('should enter confirm password', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('captcha-field');
        fireEvent.change(pageEl, { target: { value: 'test' } });
        expect(pageEl).toBeInTheDocument();
    });
    test('should enter current password', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const username = await findByTestId('username');
        fireEvent.change(username, { target: { value: 'test' } });
        const newPassword = await findByTestId('password-field');
        fireEvent.keyDown(newPassword, {
            key: 'Enter',
            code: 'Enter',
            charCode: 13,
        });
        fireEvent.change(newPassword, { target: { value: 'test' } });
        const captcha = await findByTestId('captcha-field');
        fireEvent.change(captcha, { target: { value: 'test' } });
        const pageEl = await findByTestId('login-button');
        fireEvent.click(pageEl);
        expect(pageEl).toBeInTheDocument();
    });
});
