import React from 'react';
import { render } from '@testing-library/react';
import { useProviderMock } from '../__mocks__/providerMock';
import InboxGridPage from './InboxGridPage';
import ClaimInboxGridApi from '../api/services/ClaimInbox/inboxGrid.service';
import InboxGrid from '../__mocks__/ClaimsInbox/InboxGrid.json';

describe('RolesGridPage', () => {
    beforeEach(() => {
        const mock = jest.spyOn(ClaimInboxGridApi, 'inboxGrid');
        mock.mockImplementation(() => Promise.resolve<any>(InboxGrid));
    });
    const ComponentWithProvider = useProviderMock(<InboxGridPage />);
    test('should show inboxGridPage', async () => {
        const { findAllByText } = render(ComponentWithProvider);
        const pageEl = await findAllByText('Claims Inbox');
        expect(pageEl[0]).toBeInTheDocument();
    });
});
