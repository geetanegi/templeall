import React from 'react';
import { render } from '@testing-library/react';
import Home from './Home';
import { useProviderMock } from '../__mocks__/providerMock';

describe('Home', () => {
    const ComponentWithProvider = useProviderMock(<Home />);
    test('should show Home', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('login-page');
        expect(pageEl).toBeInTheDocument();
    });
});
