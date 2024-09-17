import React from 'react';
import { render } from '@testing-library/react';
import ProgramBookPageMastered from './ProgramBookPageMastered';
import { useProviderMock } from '../__mocks__/providerMock';

describe('ProgramBookPageMastered', () => {
    const ComponentWithProvider = useProviderMock(<ProgramBookPageMastered />);
    test('should show ProgramBookPageMastered', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('program-book-mastered-page');
        expect(pageEl).toBeInTheDocument();
    });
});
