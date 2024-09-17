import React from 'react';
import { render } from '@testing-library/react';
import EmployeeAuthorizationPage from './EmployeeAuthorizationPage';
import { useProviderMock } from '../__mocks__/providerMock';

describe('EmployeeAuthorizationPage', () => {
    const ComponentWithProvider = useProviderMock(
        <EmployeeAuthorizationPage />
    );
    test('should show EmployeeAuthorizationPage', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('user-authorization-page');
        expect(pageEl).toBeInTheDocument();
    });
});
