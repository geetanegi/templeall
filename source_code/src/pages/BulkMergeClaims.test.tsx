import React from 'react';
import { render } from '@testing-library/react';
import BulkMergeClaims from './BulkMergeClaims';
import { useProviderMock } from '../__mocks__/providerMock';
describe('BulkMergeClaims', () => {
    const ComponentWithProvider = useProviderMock(<BulkMergeClaims />);
    test('should show BulkMergeClaims', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('show-BulkMergeClaims-page');
        expect(pageEl).toBeInTheDocument();
    });
});
