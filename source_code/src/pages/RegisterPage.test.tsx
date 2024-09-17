import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { useProviderMock } from '../__mocks__/providerMock';
import RegisterResponse from '../__mocks__/Users/RegisterUser.json';
import RegisterPage from './RegisterPage';
import registerClientApi from '../api/services/Register/registerClient.service';
import getOrganizationViaIntakeApi from '../api/services/Register/getorganization.service';
import Register from '../components/Register';
import { useNavigate } from 'react-router-dom';
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));
describe('RegisterPage', () => {
    const mockNavigate = useNavigate as any;
    beforeEach(() => {
        mockNavigate.mockReset();
        jest.clearAllMocks();
        const mock = jest.spyOn(registerClientApi, 'saveRegisterClient');
        mock.mockImplementation(() => Promise.resolve<any>(RegisterResponse));
    });
    const ComponentWithProvider = useProviderMock(<RegisterPage />);
    const ComponentWithProvider2 = useProviderMock(<Register />);
    test('should show RegisterPage page', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('register-page');
        expect(pageEl).toBeInTheDocument();
    });
    test('should click password btn', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('password-btn');
        fireEvent.click(pageEl);
        expect(pageEl).toBeInTheDocument();
    });
    test('should click confirm password btn', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('password-btn2');
        fireEvent.click(pageEl);
        expect(pageEl).toBeInTheDocument();
    });
    test('should click register btn', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('submit-btn-click');
        fireEvent.click(pageEl);
        expect(pageEl).toBeInTheDocument();
    });
    test('should display error message when firstName is touched and has an error', async () => {
        const { findByTestId, findByText } = render(ComponentWithProvider);
        const firstNameInput = await findByTestId('first-name-input');
        fireEvent.blur(firstNameInput);
        const submitButton = await findByTestId('submit-btn-click');
        fireEvent.click(submitButton);
        const errorMessage = await findByText(
            'Parent’s First Name is required'
        );
        expect(errorMessage).toBeInTheDocument();
    });
    test('should apply correct class when passwordCriteria.length is greater than 0', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const passwordInput = await findByTestId('password-input');
        fireEvent.change(passwordInput, { target: { value: 'ValidPass123!' } });
        const criteriaSpan = await findByTestId('password-criteria-span');
        expect(criteriaSpan).toHaveClass('text-green-600 text-sm');
    });
    test('should apply correct class when password is present but criteria is not met', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const passwordInput = await findByTestId('password-input');
        fireEvent.change(passwordInput, { target: { value: 'short' } });
        const criteriaSpan = await findByTestId('password-criteria-span');
        expect(criteriaSpan).toHaveClass('text-red-600 text-sm');
    });
    test('should apply correct class when no password is entered', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const criteriaSpan = await findByTestId('password-criteria-span');
        expect(criteriaSpan).toHaveClass('text-black text-sm');
    });
    test('should handle API error and log error in catch block', async () => {
        const getOrganizationMock = jest.spyOn(
            getOrganizationViaIntakeApi,
            'getOrganizationViaIntake'
        );
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation();
        getOrganizationMock.mockRejectedValue(new Error('API Error'));
        render(ComponentWithProvider);
        render(ComponentWithProvider2);
        await waitFor(() => {
            expect(consoleErrorSpy).toHaveBeenCalledWith(
                'Error logging ID:',
                expect.any(Error)
            );
        });
        consoleErrorSpy.mockRestore();
    });
    test('should show register index file', async () => {
        const { findByTestId } = render(ComponentWithProvider2);
        const pageEl = await findByTestId('register-index');
        expect(pageEl).toBeInTheDocument();
    });
    test('should click on register', async () => {
        const { findByTestId } = render(ComponentWithProvider2);
        const pageEl = await findByTestId('btn-submit');
        fireEvent.click(pageEl);
        expect(pageEl).toBeInTheDocument();
    });
    test('should show register index file', async () => {
        const { findByTestId } = render(ComponentWithProvider2);
        const pageEl = await findByTestId('password-field-password');
        fireEvent.click(pageEl);
        expect(pageEl).toBeInTheDocument();
    });
});
