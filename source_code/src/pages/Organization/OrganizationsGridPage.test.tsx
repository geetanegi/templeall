import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { useProviderMock } from '../../__mocks__/providerMock';
import OrganizationGrid from '../../__mocks__/Organization/OrganizationGrid.json';
import OrganizationsGridPage from './OrganizationsGridPage';
import OrganizationsGridApi from '../../api/services/OrganizationsApi/OrganizationsGridApi.service';

describe('InterventionGridPage', () => {
    beforeEach(() => {
        const mock = jest.spyOn(
            OrganizationsGridApi,
            'getOrganizationsGridApi'
        );
        mock.mockImplementation(() => Promise.resolve<any>(OrganizationGrid));
    });
    const ComponentWithProvider = useProviderMock(<OrganizationsGridPage />);
    test('should show InterventionGridPage', async () => {
        const { findAllByText } = render(ComponentWithProvider);
        const pageEl = await findAllByText('Organizations');
        expect(pageEl[0]).toBeInTheDocument();
    });
    test('should click view goal mode button', async () => {
        jest.useFakeTimers();
        const { findByTestId } = render(ComponentWithProvider);
        const viewBtn = await findByTestId('View-element');
        fireEvent.click(viewBtn);
        jest.advanceTimersByTime(1000); // Advance timers by 1000ms

        // Add your assertions here

        jest.useRealTimers(); // Restore real timers
    });
    test('should click view goal mode button', async () => {
        jest.useFakeTimers(); // Enable fake timers

        const { findByTestId } = render(ComponentWithProvider);
        const viewBtn = await findByTestId('Edit-element');
        fireEvent.click(viewBtn);

        jest.advanceTimersByTime(1000); // Advance timers by 1000ms

        // Add your assertions here

        jest.useRealTimers(); // Restore real timers
    });
});
