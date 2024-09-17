import React from 'react';
import { render } from '@testing-library/react';
import PayorPage from './PayorPage';
import { useProviderMock } from '../__mocks__/providerMock';

describe('PayorPage', () => {
    const ComponentWithProvider = useProviderMock(<PayorPage />);
    test('should show PayorPage', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('payor-page');
        expect(pageEl).toBeInTheDocument();
    });
});
