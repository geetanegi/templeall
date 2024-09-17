import React from 'react';
import { render } from '@testing-library/react';
import Error404Page from './Error404Page';
import { useProviderMock } from '../__mocks__/providerMock';

describe('Error404Page', () => {
    const ComponentWithProvider = useProviderMock(<Error404Page />);
    test('should show Error404Page', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('error-404-page');
        expect(pageEl).toBeInTheDocument();
    });
});
