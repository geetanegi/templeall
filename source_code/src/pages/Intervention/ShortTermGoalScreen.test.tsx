import React from 'react';
import { render } from '@testing-library/react';
import ShortTermGoalScreen from './ShortTermGoalScreen';
import { useProviderMock } from '../../__mocks__/providerMock';

describe('ShortTermGoalScreen', () => {
    const ComponentWithProvider = useProviderMock(<ShortTermGoalScreen />);
    test('should show ShortTermGoalScreen page', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('short-term-page');
        expect(pageEl).toBeInTheDocument();
    });
});
