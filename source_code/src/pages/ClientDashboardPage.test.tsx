import React from 'react';
import { render } from '@testing-library/react';
import ClientDashboardPage from './ClientDashboardPage';
import { useProviderMock } from '../__mocks__/providerMock';

describe('ClientDashboardPage', () => {
    const ComponentWithProvider = useProviderMock(<ClientDashboardPage />);
    test('should show ClientDashboardPage', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('client-dashboard-page');
        expect(pageEl).toBeInTheDocument();
    });
});
