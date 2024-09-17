import React from 'react';
import { render } from '@testing-library/react';
import BulkPayment from './BulkPayment';
import { useProviderMock } from '../__mocks__/providerMock';

describe('BulkPayment', () => {
    const ComponentWithProvider = useProviderMock(<BulkPayment />);
    test('should show BulkPayment', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('bulkPayment-page');
        expect(pageEl).toBeInTheDocument();
    });
});
