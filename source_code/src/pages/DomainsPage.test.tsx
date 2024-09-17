import React from 'react';
import { render } from '@testing-library/react';
import DomainsPage from './DomainsPage';
import { useProviderMock } from '../__mocks__/providerMock';

describe('DomainsPage', () => {
    const ComponentWithProvider = useProviderMock(<DomainsPage />);
    test('should show domains page', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('domains-page');
        expect(pageEl).toBeInTheDocument();
    });
});
