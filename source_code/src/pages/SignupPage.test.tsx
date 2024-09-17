import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import SignupPage from './SignupPage';
import { useProviderMock } from '../__mocks__/providerMock';
describe('SignupPage', () => {
    const ComponentWithProvider = useProviderMock(<SignupPage />);
    test('should show SignupPage page', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('signup-page');
        expect(pageEl).toBeInTheDocument();
    });
    test('should enter current password', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('confirm-password-img');
        fireEvent.click(pageEl);
        expect(pageEl).toBeInTheDocument();
    });
});
