import React from 'react';
import { render } from '@testing-library/react';
import MasterCriteriaPhase from './MasterCriteriaPhase';
import { useProviderMock } from '../__mocks__/providerMock';

describe('MasterCriteriaPhase', () => {
    const ComponentWithProvider = useProviderMock(<MasterCriteriaPhase />);
    test('should show MasterCriteriaPhase', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('master-criteria-form');
        expect(pageEl).toBeInTheDocument();
    });
});
