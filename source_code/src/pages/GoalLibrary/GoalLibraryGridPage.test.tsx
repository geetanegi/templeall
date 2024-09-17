import React from 'react';
import { render } from '@testing-library/react';
import { useProviderMock } from '../../__mocks__/providerMock';
import GoalLibraryGridResponse from '../../__mocks__/GoalLibrary/GoalLibraryGrid.json';
import GoalLibraryGridPage from './GoalLibraryGridPage';
import GoalLibrary from '../../api/services/GoalLibrary/goalLibrary.service';

describe('GoalLibraryGridPage', () => {
    beforeEach(() => {
        const mock = jest.spyOn(GoalLibrary, 'getGoalLibraryGrid');
        mock.mockImplementation(() =>
            Promise.resolve<any>(GoalLibraryGridResponse)
        );
    });
    const ComponentWithProvider = useProviderMock(<GoalLibraryGridPage />);
    test('should show GoalLibraryGridPage', async () => {
        const { findAllByText } = render(ComponentWithProvider);
        const pageEl = await findAllByText('Goal Library');
        expect(pageEl[0]).toBeInTheDocument();
    });
});
