import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { useProviderMock } from '../../__mocks__/providerMock';
import InterventionGridPage from './InterventionGridPage';
import InterventionGrids from '../../api/services/Intervention/InterventionGrid.service';
import interventionGridResponse from '../../__mocks__/Intervention/intervention.json';
import interventionHistory from '../../__mocks__/Intervention/interventionHistory.json';
import InterventionDataById from '../../api/services/Intervention/Service/InterventionDataById.service';
import InterventionById from '../../__mocks__/Intervention/InterventionById.json';
import saveIntervention1 from '../../__mocks__/Intervention/saveIntervention.json';
import activeUser1 from '../../__mocks__/Intervention/activeUser.json';
import Client1 from '../../__mocks__/Intervention/Client.json';
import Service1 from '../../__mocks__/Intervention/Service.json';
import getUsers from '../../api/services/getUsers.service';
import organizationApis from '../../api/services/organization.service';
import AddInterventionApi from '../../api/services/Intervention/AddIntervention.service';

describe('InterventionGridPage', () => {
    beforeEach(() => {
        const mock = jest.spyOn(InterventionGrids, 'getInterventionGrid');
        mock.mockImplementation(() =>
            Promise.resolve<any>(interventionGridResponse)
        );
        const history = jest.spyOn(
            InterventionDataById,
            'getInterventionPlanDataHistoryGrid'
        );
        history.mockImplementation(() =>
            Promise.resolve<any>(interventionHistory)
        );
        const byId = jest.spyOn(
            InterventionDataById,
            'getInterventionPlanDataById'
        );
        byId.mockImplementation(() => Promise.resolve<any>(InterventionById));
        const Client = jest.spyOn(organizationApis, 'getAllUsers');
        Client.mockImplementation(() => Promise.resolve<any>(Client1));
        const service = jest.spyOn(organizationApis, 'getAllUsers');
        service.mockImplementation(() => Promise.resolve<any>(Service1));
        const activeUser = jest.spyOn(getUsers, 'getUsersDetail');
        activeUser.mockImplementation(() => Promise.resolve<any>(activeUser1));
        const saveIntervention = jest.spyOn(
            AddInterventionApi,
            'SaveIntervention'
        );
        saveIntervention.mockImplementation(() =>
            Promise.resolve<any>(saveIntervention1)
        );
    });
    const ComponentWithProvider = useProviderMock(<InterventionGridPage />);
    test('should show InterventionGridPage', async () => {
        const { findAllByText } = render(ComponentWithProvider);
        const pageEl = await findAllByText('Intervention Plan');
        expect(pageEl[0]).toBeInTheDocument();
    });
    test('should show program book grid', async () => {
        const { findAllByText } = render(ComponentWithProvider);
        const tabButton = await findAllByText('Add New');
        fireEvent.click(tabButton[0]);
    });

    test('should show program book grid', async () => {
        const { findAllByText } = render(ComponentWithProvider);
        const tabButton = await findAllByText('Add New');
        fireEvent.click(tabButton[0]);
        const submitBtn = await screen.findByTestId('onClose-btn');
        fireEvent.click(submitBtn);
    });
    test('should show program book grid', async () => {
        const { findAllByText } = render(ComponentWithProvider);
        const tabButton = await findAllByText('All');
        fireEvent.click(tabButton[0]);
    });
    test('should show program book grid', async () => {
        const { findAllByText } = render(ComponentWithProvider);
        const tabButton = await findAllByText('Discharged');
        fireEvent.click(tabButton[0]);
    });
    test('should click view goal mode button', async () => {
        jest.useFakeTimers();
        const { findByTestId } = render(ComponentWithProvider);
        const viewBtn = await findByTestId('history-element');
        fireEvent.click(viewBtn);
        jest.advanceTimersByTime(1000);
        jest.useRealTimers();
    });
    test('should click view goal mode button', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const viewBtn = await findByTestId('openInterventionView-element');
        fireEvent.click(viewBtn);
    });
    test('should click view goal mode button', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const viewBtn = await findByTestId('openGoalModal-element');
        fireEvent.click(viewBtn);
    });
    test('should click view goal mode button', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const viewBtn = await findByTestId('editIntervention-element');
        fireEvent.click(viewBtn);
    });
    test('should click view goal mode button', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const viewBtn = await findByTestId('openAssigneeModal-element');
        fireEvent.click(viewBtn);
    });
    test('should click view goal mode button', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const viewBtn = await findByTestId('openDischargeModal-element');
        fireEvent.click(viewBtn);
    });
});
