import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import AddNewGroupPage from './AddNewGroupPage';
import { useProviderMock } from '../__mocks__/providerMock';
import allEmployeeApi from '../api/services/Groups/getAllEmployee.service';
import getAllEmployee from '../__mocks__/groups/getAllEmployee.json';
import saveGroup from '../__mocks__/groups/saveGroup.json';
import groupApi from '../api/services/Groups/saveGroup.service';

describe('AddNewGroupPage', () => {
    beforeEach(() => {
        const mock = jest.spyOn(allEmployeeApi, 'getAllEmployee');
        mock.mockImplementation(() => Promise.resolve<any>(getAllEmployee));
        const saveGroupMock = jest.spyOn(groupApi, 'saveGroup');
        saveGroupMock.mockImplementation(() => Promise.resolve<any>(saveGroup));
    });
    const ComponentWithProvider = useProviderMock(<AddNewGroupPage />);
    test('should show AddNewGroupPage', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('add-new-group-page');
        expect(pageEl).toBeInTheDocument();
    });
    test('should click save button', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const saveButton = await findByTestId('modal-save-button');
        fireEvent.click(saveButton);
    });
    test('should click cancel button', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const cancelButton = await findByTestId('modal-cancel-button');
        fireEvent.click(cancelButton);
    });
    test('should click option dropdown ', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const searchInput = await findByTestId('member-search-input');
        fireEvent.change(searchInput, { target: { value: 'abc' } });
    });
    test('should click option dropdown ', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const nameInput = await findByTestId('group-name-input');
        fireEvent.change(nameInput, { target: { value: 'abc' } });
    });
    test('should click option dropdown ', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const descriptionInput = await findByTestId('group-description-input');
        fireEvent.change(descriptionInput, { target: { value: 'abc' } });
    });
    // test('should click option dropdown ', async () => {
    //     const { findByTestId } = render(ComponentWithProvider);
    //     const nameInput = await findByTestId('member-search-input');
    //     const deleteMember = await findByTestId('delete-member');
    //     fireEvent.change(nameInput, { target: { value: 'abc' } });
    //     fireEvent.click(deleteMember);
    // });
    // test('should click option dropdown ', async () => {
    //     const { findByTestId } = render(ComponentWithProvider);
    //     const clearButoon = await findByTestId('clear-search-data');
    //     fireEvent.click(clearButoon);
    // });
});
