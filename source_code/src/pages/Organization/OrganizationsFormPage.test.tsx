import React from 'react';
import { render } from '@testing-library/react';
import OrganizationsFormPage from './OrganizationsFormPage';
import { useProviderMock } from '../../__mocks__/providerMock';

describe('OrganizationsFormPage', () => {
    const ComponentWithProvider = useProviderMock(<OrganizationsFormPage />);
    test('should show OrganizationsFormPage', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('organization-form-page');
        expect(pageEl).toBeInTheDocument();
    });
});
