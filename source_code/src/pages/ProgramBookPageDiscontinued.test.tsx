import React from 'react';
import { render } from '@testing-library/react';
import ProgramBookPageDiscontinued from './ProgramBookPageDiscontinued';
import { useProviderMock } from '../__mocks__/providerMock';

describe('ProgramBookPageDiscontinued', () => {
    const ComponentWithProvider = useProviderMock(
        <ProgramBookPageDiscontinued />
    );
    test('should show ProgramBookPageDiscontinued', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('program-book-discontinued-page');
        expect(pageEl).toBeInTheDocument();
    });
});
