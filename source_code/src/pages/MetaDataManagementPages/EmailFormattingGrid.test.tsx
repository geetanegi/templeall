import React from 'react';
import { render } from '@testing-library/react';
import EmailFormattingGrid from './EmailFormattingGrid';
import { useProviderMock } from '../../__mocks__/providerMock';

describe('EmailFormattingGrid', () => {
    const ComponentWithProvider = useProviderMock(<EmailFormattingGrid />);
    test('should show EmailFormattingGrid page', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('email-formatting-page');
        expect(pageEl).toBeInTheDocument();
    });
});
