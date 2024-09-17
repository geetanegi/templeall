import React from 'react';
import { render } from '@testing-library/react';
import ClientDocuments from './ClientDocuments';
import { useProviderMock } from '../__mocks__/providerMock';

describe('ClientDocuments', () => {
    const ComponentWithProvider = useProviderMock(<ClientDocuments />);
    test('should show ClientDocuments', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('client-documents-page');
        expect(pageEl).toBeInTheDocument();
    });
});
