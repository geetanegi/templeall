import React from 'react';
import { render } from '@testing-library/react';
import InterventionDomainScreen from './InterventionDomainScreen';
import { useProviderMock } from '../../__mocks__/providerMock';

describe('InterventionDomainScreen', () => {
    const ComponentWithProvider = useProviderMock(<InterventionDomainScreen />);
    test('should show InterventionDomainScreen page', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('intervention-domain-screen');
        expect(pageEl).toBeInTheDocument();
    });
});
