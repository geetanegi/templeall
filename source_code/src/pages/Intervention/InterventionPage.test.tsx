import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import InterventionPage from './InterventionPage';
import { useProviderMock } from '../../__mocks__/providerMock';
import InterventionDataById from '../../api/services/Intervention/Service/InterventionDataById.service';
import InterventionById from '../../__mocks__/Intervention/InterventionById.json';
import InterventionDomain from '../../__mocks__/Intervention/InterventionDomain.json';
import saveDomain from '../../__mocks__/Intervention/saveDomain.json';
import saveDomainError from '../../__mocks__/Intervention/saveDomainError.json';
import ViewGoalInterventionModal from '../../components/InterventionFiles/ShortTermScreen/viewScoreShortTerm';
describe('InterventionPage', () => {
    const ComponentWithProvider = useProviderMock(<InterventionPage />);
    const ComponentWithProvider1 = useProviderMock(
        <ViewGoalInterventionModal />
    );

    beforeEach(() => {
        const mock = jest.spyOn(
            InterventionDataById,
            'getInterventionPlanDataById'
        );
        mock.mockImplementation(() => Promise.resolve<any>(InterventionById));
        const domain = jest.spyOn(
            InterventionDataById,
            'getInterventionDomains'
        );
        domain.mockImplementation(() =>
            Promise.resolve<any>(InterventionDomain)
        );
        const saveDomain1 = jest.spyOn(InterventionDataById, 'saveDomainApi');
        saveDomain1.mockImplementation(() => Promise.resolve<any>(saveDomain));
        const saveDomainerror = jest.spyOn(
            InterventionDataById,
            'saveDomainApi'
        );
        saveDomainerror.mockImplementation(() =>
            Promise.resolve<any>(saveDomainError)
        );
    });
    test('should show InterventionPage page', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('intervention-page');
        expect(pageEl).toBeInTheDocument();
    });
    test('should click view goal mode button', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const viewBtn = await findByTestId('RenameBtn');
        fireEvent.click(viewBtn);
        const saveBtn = await findByTestId('saveBtn');
        fireEvent.click(saveBtn);
    });
    test('should click view goal mode button', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const viewBtn = await findByTestId('RenameBtn');
        fireEvent.click(viewBtn);
        const saveBtn = await findByTestId('cancelBtn');
        fireEvent.click(saveBtn);
    });
    test('should click view goal mode button', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const viewBtn = await findByTestId('Add Domain');
        fireEvent.click(viewBtn);
    });
    test('should click view goal mode button', async () => {
        const {} = render(ComponentWithProvider);

        // Find and click the "Add Domain" button
        const addDomainBtn = await screen.findByTestId('Add Domain');
        fireEvent.click(addDomainBtn);

        // Find the domain name input and change its value
        const domainNameInput = await screen.findByTestId('domainNameInput');
        fireEvent.change(domainNameInput, { target: { value: 'name plz' } });

        // Find and click the submit button
        const submitBtn = await screen.findByTestId('submit-btn');
        fireEvent.click(submitBtn);
    });
    test('should click view goal mode button', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const viewBtn = await findByTestId('Add Domain');
        fireEvent.click(viewBtn);
        const onCloseBtn = await findByTestId('onCloseBtn');
        fireEvent.click(onCloseBtn);
    });
    test('should click view goal mode button', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const viewBtn = await findByTestId('Add Long Term Goal');
        fireEvent.click(viewBtn);
    });
    test('should click view goal mode button', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const viewBtn = await findByTestId('Add Long Term Goal');
        fireEvent.click(viewBtn);
        const onCloseBtn = await findByTestId('onCloseBtn');
        fireEvent.click(onCloseBtn);
    });
    test('should click view goal mode button', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const viewBtn = await findByTestId('Add Short Term Goal');
        fireEvent.click(viewBtn);
    });
    test('should click view goal mode button', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const viewBtn = await findByTestId('Add Short Term Goal');
        fireEvent.click(viewBtn);
        const onCloseBtn = await findByTestId('onCloseBtn');
        fireEvent.click(onCloseBtn);
    });
    test('should click view goal mode button', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const viewBtn = await findByTestId('Add From Library');
        fireEvent.click(viewBtn);
    });
    test('should click view goal mode button', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const viewBtn = await findByTestId('Add From Library');
        fireEvent.click(viewBtn);
        const onCloseBtn = await findByTestId('onCloseBtn');
        fireEvent.click(onCloseBtn);
    });
    test('should show view page', async () => {
        const { findByTestId } = render(ComponentWithProvider1);
        const pageEl = await findByTestId('view-page');
        expect(pageEl).toBeInTheDocument();
    });
});
