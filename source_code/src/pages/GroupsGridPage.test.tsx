import React from 'react';
import { render } from '@testing-library/react';
import GroupsGridPage from './GroupsGridPage';
import { useProviderMock } from '../__mocks__/providerMock';
import getAllGroup from '../__mocks__/groups/getAllGroup.json';
import GroupsGridApi from '../api/services/Groups/GroupsGridApi.service';
import groupApi from '../api/services/Groups/saveGroup.service';
import deleteGroup from '../__mocks__/groups/deleteGroup.json';

describe('GroupsGridPage', () => {
    beforeEach(() => {
        const mock = jest.spyOn(GroupsGridApi, 'getGroupsGridApi');
        mock.mockImplementation(() => Promise.resolve<any>(getAllGroup));
        const deleteGroupMock = jest.spyOn(groupApi, 'deleteGroup');
        deleteGroupMock.mockImplementation(() =>
            Promise.resolve<any>(deleteGroup)
        );
    });
    const ComponentWithProvider = useProviderMock(<GroupsGridPage />);
    test('should show GroupsGridPage', async () => {
        const { findAllByText } = render(ComponentWithProvider);
        const pageEl = await findAllByText('Groups');
        expect(pageEl[0]).toBeInTheDocument();
    });
    // test('should delete the group', async () => {
    //     const { findByTestId } = render(ComponentWithProvider);
    //     // const DeleteIcon = await findByTestId('delete-group');
    //     // fireEvent.click(DeleteIcon);
    //     const yesConfirmButton = await findByTestId('yes-confirmation-button');
    //     fireEvent.click(yesConfirmButton);
    // });
});
