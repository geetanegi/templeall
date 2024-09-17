import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CreateSession from './CreateSession';
import { useProviderMock } from '../__mocks__/providerMock';
import sessionApis from '../api/services/session.service';
import checkDuplicateNameResponse from '../__mocks__/session/checkDuplicateName.json';
import getAllUsersResponse from '../__mocks__/session/getAllUsers.json';
import getSessionByIdResponse from '../__mocks__/session/getSessionById.json';
import organizationApis from '../api/services/organization.service';

describe('CreateSession', () => {
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
    });
    const ComponentWithProvider = useProviderMock(<CreateSession />, {
        initialEntries: ['/edit-session/abc'],
    });
    test('should show create session page', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const saveButton = await findByTestId('create-session-save-button');
        expect(saveButton).toBeInTheDocument();
    });
    test('should select fields', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const nameInput = await findByTestId('session-name-input');
        const selectInput = await findByTestId('created-for-input');
        fireEvent.change(nameInput, { target: { value: 'abc' } });
        fireEvent.click(selectInput);
    });
    test('should cancel', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const cancelButton = await findByTestId('cancel-button');
        fireEvent.click(cancelButton);
    });
});
