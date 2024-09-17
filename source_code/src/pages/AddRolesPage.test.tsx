import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import AddRolesPage from './AddRolesPage';
import { useProviderMock } from '../__mocks__/providerMock';
import editRoleAndPermission from '../__mocks__/roleAndPermission/editRoleAndPermission.json';
import EditRoleApi from '../api/services/RoleAndPermissions/editRoleAndPermission.service';

describe('AddRolesPage', () => {
    beforeEach(() => {
        const mock = jest.spyOn(EditRoleApi, 'EditRole');
        mock.mockImplementation(() =>
            Promise.resolve<any>(editRoleAndPermission)
        );
    });
    const ComponentWithProvider = useProviderMock(<AddRolesPage />);
    test('should show AddRolesPage', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('add-roles-page');
        expect(pageEl).toBeInTheDocument();
    });
    test('should click cancel button', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const cancelButton = await findByTestId('modal-cancel-button');
        fireEvent.click(cancelButton);
    });
    test('should click save button', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const saveButton = await findByTestId('modal-save-button');
        fireEvent.click(saveButton);
    });
    test('should click option dropdown ', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const nameInput = await findByTestId('role-name-input');
        fireEvent.change(nameInput, { target: { value: 'abc' } });
    });
    test('should click option dropdown ', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const descriptionInput = await findByTestId('role-description-input');
        fireEvent.change(descriptionInput, { target: { value: 'abc' } });
    });
});
