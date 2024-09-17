import React from 'react';
import { render } from '@testing-library/react';
import GoalLibraryDomainScreen from './GoalLibraryDomainScreen';
import { useProviderMock } from '../../__mocks__/providerMock';

describe('GoalLibraryDomainScreen', () => {
    const ComponentWithProvider = useProviderMock(<GoalLibraryDomainScreen />);
    test('should show GoalLibraryDomainScreen page', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('goal-library-domain-screen');
        expect(pageEl).toBeInTheDocument();
    });
});
