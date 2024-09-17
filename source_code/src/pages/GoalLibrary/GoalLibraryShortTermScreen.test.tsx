import React from 'react';
import { render } from '@testing-library/react';
import GoalLibraryShortTermScreen from './GoalLibraryShortTermScreen';
import { useProviderMock } from '../../__mocks__/providerMock';

describe('GoalLibraryShortTermScreen', () => {
    const ComponentWithProvider = useProviderMock(
        <GoalLibraryShortTermScreen />
    );
    test('should show GoalLibraryShortTermScreen page', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('short-term-screen');
        expect(pageEl).toBeInTheDocument();
    });
});
