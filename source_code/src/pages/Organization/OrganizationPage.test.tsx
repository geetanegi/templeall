import React from 'react';
import { render } from '@testing-library/react';
import OrganizationPage from './OrganizationPage';
import { useProviderMock } from '../../__mocks__/providerMock';
describe('OrganizationPage', () => {
    const ComponentWithProvider = useProviderMock(<OrganizationPage />);
    test('should show OrganizationPage', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('organization-page');
        expect(pageEl).toBeInTheDocument();
    });
});
