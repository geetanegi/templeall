import React from 'react';
import { render } from '@testing-library/react';
import OrgViewPage from './OrgViewPage';
import { useProviderMock } from '../__mocks__/providerMock';

describe('OrgViewPage', () => {
    const ComponentWithProvider = useProviderMock(<OrgViewPage />);
    test('should show OrgViewPage', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('org-view-page');
        expect(pageEl).toBeInTheDocument();
    });
});
