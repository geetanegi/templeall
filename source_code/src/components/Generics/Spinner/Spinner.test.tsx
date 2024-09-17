import React from 'react';
import { render } from '@testing-library/react';
import Spinner from '.';
import { useProviderMock } from '../../../__mocks__/providerMock';
describe('Spinner ', () => {
    const ComponentWithProvider = useProviderMock(<Spinner />);
    test('should show spinner', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('spinner');
        expect(pageEl).toBeInTheDocument();
    });
});
