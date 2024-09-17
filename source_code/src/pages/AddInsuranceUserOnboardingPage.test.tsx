import React from 'react';
import { render } from '@testing-library/react';
import AddInsuranceUserOnboardingPage from './AddInsuranceUserOnboardingPage';
import { useProviderMock } from '../__mocks__/providerMock';

describe('AddInsuranceUserOnboardingPage', () => {
    const ComponentWithProvider = useProviderMock(
        <AddInsuranceUserOnboardingPage />
    );
    test('should show AddInsuranceUserOnboardingPage', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('add-insurance-page');
        expect(pageEl).toBeInTheDocument();
    });
});
