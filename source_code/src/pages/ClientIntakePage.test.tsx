import React from 'react';
import { render } from '@testing-library/react';
import ClientIntakePage from './ClientIntakePage';
import { useProviderMock } from '../__mocks__/providerMock';

describe('ClientIntakePage', () => {
    const ComponentWithProvider = useProviderMock(<ClientIntakePage />);
    test('should show ClientIntakePage', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('client-intake-page');
        expect(pageEl).toBeInTheDocument();
    });
});
