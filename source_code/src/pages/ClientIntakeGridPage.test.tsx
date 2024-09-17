import React from 'react';
import { render } from '@testing-library/react';
import ClientIntakeGridPage from './ClientIntakeGridPage';
import { useProviderMock } from '../__mocks__/providerMock';

describe('ClientIntakeGridPage', () => {
    const ComponentWithProvider = useProviderMock(<ClientIntakeGridPage />);
    test('should show ClientIntakeGridPage', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('client-intake-grid-page');
        expect(pageEl).toBeInTheDocument();
    });
});
