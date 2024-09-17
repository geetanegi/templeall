import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import EmployeeOnBoardingFormPage from './EmployeeOnBoardingFormPage';
import { useProviderMock } from '../__mocks__/providerMock';
import saveEmployeeApi from '../api/services/saveEmployee.service';
import SaveGroup from '../__mocks__/Users/SaveEmployee.json';
import EditGroup from '../__mocks__/Users/EditEmployee.json';

describe('EmployeeAuthorizationPage', () => {
    beforeEach(() => {
        const mock = jest.spyOn(saveEmployeeApi, 'saveEmployee');
        mock.mockImplementation(() => Promise.resolve<any>(SaveGroup));
        const deleteGroupMock = jest.spyOn(saveEmployeeApi, 'editEmployee');
        deleteGroupMock.mockImplementation(() =>
            Promise.resolve<any>(EditGroup)
        );
    });
    const ComponentWithProvider = useProviderMock(
        <EmployeeOnBoardingFormPage />
    );
    test('should show EmployeeOnBoardingFormPage', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('employee-onboarding-form');
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
        const roleSelect = await findByTestId('role-dropdown');
        fireEvent.change(roleSelect, { target: { value: 'abc' } });
    });
    test('should enter first name', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const nameInput1 = await findByTestId('firstName-input');
        fireEvent.change(nameInput1, { target: { value: 'abc' } });
        fireEvent.keyDown(nameInput1, { key: 'Enter', code: 'Enter' });
    });
    test('should enter last name', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const nameInput2 = await findByTestId('lastName-input');
        fireEvent.change(nameInput2, { target: { value: 'abc' } });
        fireEvent.keyDown(nameInput2, { key: 'Enter', code: 'Enter' });
    });
    test('should click option gender dropdown', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const genderDropdown = await findByTestId('gender-dropdown');
        fireEvent.change(genderDropdown, { target: { value: 'abc' } });
    });
    test('should enter user name', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const userInput = await findByTestId('username-input');
        fireEvent.change(userInput, { target: { value: 'abc' } });
    });
    test('should enter cellPhone', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const cellPhoneInput = await findByTestId('cellPhone-input');
        fireEvent.change(cellPhoneInput, { target: { value: 'abc' } });
        fireEvent.keyDown(cellPhoneInput, { key: 'Enter', code: 'Enter' });
    });
    test('should enter homePhone', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const homePhoneInput = await findByTestId('homePhone-input');
        fireEvent.change(homePhoneInput, { target: { value: 'abc' } });
        fireEvent.keyDown(homePhoneInput, { key: 'Enter', code: 'Enter' });
    });
    test('should enter workPhone', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const workPhoneInput = await findByTestId('workPhone-input');
        fireEvent.change(workPhoneInput, { target: { value: 'abc' } });
        fireEvent.keyDown(workPhoneInput, { key: 'Enter', code: 'Enter' });
    });
    test('should enter primaryAddress1 ', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const primaryAddress1Dropdown = await findByTestId(
            'primaryAddress1-input'
        );
        fireEvent.change(primaryAddress1Dropdown, { target: { value: 'abc' } });
        fireEvent.keyDown(primaryAddress1Dropdown, {
            key: 'Enter',
            code: 'Enter',
        });
    });
    test('should enter primaryAddress2 ', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const primaryAddress2Dropdown = await findByTestId(
            'primaryAddress2-input'
        );
        fireEvent.change(primaryAddress2Dropdown, { target: { value: 'abc' } });
        fireEvent.keyDown(primaryAddress2Dropdown, {
            key: 'Enter',
            code: 'Enter',
        });
    });
    test('should enter personalCity', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const personalCityInput = await findByTestId('personalCity-input');
        fireEvent.change(personalCityInput, { target: { value: 'abc' } });
        fireEvent.keyDown(personalCityInput, { key: 'Enter', code: 'Enter' });
    });
    test('should enter personalPostalCode', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const personalPostalCodeInput = await findByTestId(
            'personalPostalCode-input'
        );
        fireEvent.change(personalPostalCodeInput, { target: { value: 'abc' } });
        fireEvent.keyDown(personalPostalCodeInput, {
            key: 'Enter',
            code: 'Enter',
        });
    });
    test('should enter mailingAddress1', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const mailingAddress1Input = await findByTestId(
            'mailingAddress1-input'
        );
        fireEvent.change(mailingAddress1Input, { target: { value: 'abc' } });
        fireEvent.keyDown(mailingAddress1Input, {
            key: 'Enter',
            code: 'Enter',
        });
    });
    test('should enter mailingAddress2', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const mailingAddress2Input = await findByTestId(
            'mailingAddress2-input'
        );
        fireEvent.change(mailingAddress2Input, { target: { value: 'abc' } });
        fireEvent.keyDown(mailingAddress2Input, {
            key: 'Enter',
            code: 'Enter',
        });
    });
    test('should enter workCity', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const workCityInput = await findByTestId('workCity-input');
        fireEvent.change(workCityInput, { target: { value: 'abc' } });
        fireEvent.keyDown(workCityInput, { key: 'Enter', code: 'Enter' });
    });
    test('should enter workPostalCode', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const workPostalCodeInput = await findByTestId('workPostalCode-input');
        fireEvent.change(workPostalCodeInput, { target: { value: 'abc' } });
        fireEvent.keyDown(workPostalCodeInput, {
            key: 'Enter',
            code: 'Enter',
        });
    });
});
