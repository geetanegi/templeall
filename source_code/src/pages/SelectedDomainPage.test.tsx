import React from 'react';
import { render } from '@testing-library/react';
import SelectedDomainPage from './SelectedDomainPage';
import { useProviderMock } from '../__mocks__/providerMock';

describe('SelectedDomainPage', () => {
    const ComponentWithProvider = useProviderMock(<SelectedDomainPage />);
    test('should show SelectedDomainPage page', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('selected-domain-page');
        expect(pageEl).toBeInTheDocument();
    });
});
