import React from 'react';
import { render } from '@testing-library/react';
import SessionHistory from './SessionHistory';
import { useProviderMock } from '../__mocks__/providerMock';

describe('SessionHistory', () => {
    const ComponentWithProvider = useProviderMock(<SessionHistory />);
    test('should show SessionHistory page', async () => {
        const { findByText } = render(ComponentWithProvider);
        const pageEl = await findByText('Session History');
        expect(pageEl).toBeInTheDocument();
    });
});
