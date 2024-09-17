import React from 'react';
import { render } from '@testing-library/react';
import RolesGridPage from './RolesGridPage';
import { useProviderMock } from '../__mocks__/providerMock';
import getAllRole from '../__mocks__/roleAndPermission/getAllRoles.json';
import getAllRolesApi from '../api/services/getAllRoles.service';

describe('RolesGridPage', () => {
    beforeEach(() => {
        const mock = jest.spyOn(getAllRolesApi, 'getAllRoles');
        mock.mockImplementation(() => Promise.resolve<any>(getAllRole));
    });
    const ComponentWithProvider = useProviderMock(<RolesGridPage />);
    test('should show RolesGridPage', async () => {
        const { findAllByText } = render(ComponentWithProvider);
        const pageEl = await findAllByText('Roles');
        expect(pageEl[0]).toBeInTheDocument();
    });
});
