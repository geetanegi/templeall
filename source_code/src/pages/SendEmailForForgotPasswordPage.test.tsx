import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { useProviderMock } from '../__mocks__/providerMock';
import SendEmailResponse from '../__mocks__/Login/SendEmail.json';
import SendEmailForForgotPasswordPage from './SendEmailForForgotPasswordPage';
import forgotPassWord from '../api/services/ForgotPassword/sendEmail.service';
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));
describe('RegisterPage', () => {
    beforeEach(() => {
        const mock = jest.spyOn(forgotPassWord, 'SendEmail');
        mock.mockImplementation(() => Promise.resolve<any>(SendEmailResponse));
    });
    const ComponentWithProvider = useProviderMock(
        <SendEmailForForgotPasswordPage />
    );
    test('should show RegisterPage page', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('send-email-forgot-password-page');
        expect(pageEl).toBeInTheDocument();
    });
    test('should enter username', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('username-input');
        fireEvent.change(pageEl, { target: { value: 'test' } });
        expect(pageEl).toBeInTheDocument();
    });
    test('should click RegisterPage page', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const meaningInput = await findByTestId('username-input');
        fireEvent.change(meaningInput, { target: { value: 'Test Meaning' } });
        const submitButton = await findByTestId('send-mail-password-button');
        fireEvent.click(submitButton);
        expect(submitButton).toBeInTheDocument();
    });
});
