import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import InterventionPageDiscontinued from './InterventionPageDiscontinued';
import { useProviderMock } from '../../__mocks__/providerMock';
import InterventionDataById from '../../api/services/Intervention/Service/InterventionDataById.service';
import InterventionById from '../../__mocks__/Intervention/InterventionById.json';
import InterventionDomain from '../../__mocks__/Intervention/InterventionDomain.json';

describe('InterventionPageDiscontinued', () => {
    const ComponentWithProvider = useProviderMock(
        <InterventionPageDiscontinued />
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
    });
    test('should show InterventionPageDiscontinued page', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('intervention-discontinued-page');
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
});
