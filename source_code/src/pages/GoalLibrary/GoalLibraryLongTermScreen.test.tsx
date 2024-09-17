import React from 'react';
import { render } from '@testing-library/react';
import GoalLibraryLongTermScreen from './GoalLibraryLongTermScreen';
import { useProviderMock } from '../../__mocks__/providerMock';

describe('GoalLibraryLongTermScreen', () => {
    const ComponentWithProvider = useProviderMock(
        <GoalLibraryLongTermScreen />
    );
    test('should show GoalLibraryLongTermScreen page', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('long-term-screen');
        expect(pageEl).toBeInTheDocument();
    });
});
