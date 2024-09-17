import React from 'react';
import { render } from '@testing-library/react';
import ClientIntakeDetailsPage from './ClientIntakeDetailsPage';
import { useProviderMock } from '../__mocks__/providerMock';

describe('ClientIntakeDetailsPage', () => {
    const ComponentWithProvider = useProviderMock(<ClientIntakeDetailsPage />);
    test('should show ClientIntakeDetailsPage', async () => {
        const { findByText } = render(ComponentWithProvider);
        const pageEl = await findByText('Client Intake Details');
        expect(pageEl).toBeInTheDocument();
    });
});
