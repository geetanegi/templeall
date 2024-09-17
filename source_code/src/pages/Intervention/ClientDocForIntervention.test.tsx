import React from 'react';
import { render } from '@testing-library/react';
import ClientDocForIntervention from './ClientDocForIntervention';
import { useProviderMock } from '../../__mocks__/providerMock';

describe('ClientDocForIntervention', () => {
    const ComponentWithProvider = useProviderMock(<ClientDocForIntervention />);
    test('should show ClientDocForIntervention page', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('client-doc-intervention-page');
        expect(pageEl).toBeInTheDocument();
    });
});
