import React from 'react';
import { render } from '@testing-library/react';
import LongTermGoalScreen from './LongTermGoalScreen';
import { useProviderMock } from '../../__mocks__/providerMock';

describe('LongTermGoalScreen', () => {
    const ComponentWithProvider = useProviderMock(<LongTermGoalScreen />);
    test('should show LongTermGoalScreen page', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('long-term-page');
        expect(pageEl).toBeInTheDocument();
    });
});
