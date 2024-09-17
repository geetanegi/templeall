import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CreateSession from './CreateSession';
import { useProviderMock } from '../__mocks__/providerMock';
import sessionApis from '../api/services/session.service';
import checkDuplicateNameResponse from '../__mocks__/session/checkDuplicateName.json';
import getAllUsersResponse from '../__mocks__/session/getAllUsers.json';
import getSessionByIdResponse from '../__mocks__/session/getSessionById.json';
import getAllTargetsBySessionResponse from '../__mocks__/session/getAllTargetsBySessionId.json';
import organizationApis from '../api/services/organization.service';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({ id: '123' }),
}));
describe('EditSession', () => {
    beforeEach(() => {
        const mock = jest.spyOn(sessionApis, 'checkDuplicateName');
        mock.mockImplementation(() =>
            Promise.resolve<any>(checkDuplicateNameResponse)
        );
        const usersMock = jest.spyOn(organizationApis, 'getAllUsers');
        usersMock.mockImplementation(() =>
            Promise.resolve<any>(getAllUsersResponse)
        );
        const sessionMock = jest.spyOn(sessionApis, 'getSessionById');
        sessionMock.mockImplementation(() =>
            Promise.resolve<any>(getSessionByIdResponse)
        );
        const targetsMock = jest.spyOn(sessionApis, 'getAllTargetsBySession');
        targetsMock.mockImplementation(() =>
            Promise.resolve<any>(getAllTargetsBySessionResponse)
        );
    });
    const ComponentWithProvider = useProviderMock(<CreateSession />, {
        initialEntries: ['/edit-session/abc'],
    });
    test('should fire edit mode', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        jest.spyOn(require('react-router-dom'), 'useParams').mockReturnValue({
            id: '123',
        });
        const nameInput = await findByTestId('session-name-input');
        fireEvent.change(nameInput, { target: { value: 'abc' } });
        const saveButton = await findByTestId('create-session-save-button');
        fireEvent.click(saveButton);
    });
});
