import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useProviderMock } from '../../__mocks__/providerMock';
import SentForInformationPage from './SentForInformationPage';
import getClientIntakeDetailsApi from '../../api/services/ClientDetails/getClientIntakeDetails.service';
import SentForMoreInfoById from '../../__mocks__/ClientIntake/SentForMoreInfoById.json';
describe('GoalLibraryDomainScreen', () => {
    const ComponentWithProvider = useProviderMock(<SentForInformationPage />);
    beforeEach(() => {
        const mock = jest.spyOn(
            getClientIntakeDetailsApi,
            'getClientIntakeDetailById'
        );
        mock.mockImplementation(() =>
            Promise.resolve<any>(SentForMoreInfoById)
        );
    });
    test('should show GoalLibraryDomainScreen page', async () => {
        const { findByText } = render(ComponentWithProvider);
        const pageEl = await findByText('Inatake Form');
        expect(pageEl).toBeInTheDocument();
    });
    test('should show GoalLibraryDomainScreen page', async () => {
        const { findAllByText } = render(ComponentWithProvider);
        const pageEls = await findAllByText('Inatake Form');
        expect(pageEls.length).toBeGreaterThan(0);
        pageEls.forEach((pageEl) => {
            expect(pageEl).toBeInTheDocument();
        });
    });
    test('renders the form and submit button', async () => {
        const {} = render(ComponentWithProvider);

        // Check if the form title is rendered
        expect(screen.getByText('Inatake Form')).toBeInTheDocument();

        // Check if the submit button is rendered
        const submitButton = screen.getByRole('button', { name: /submit/i });
        expect(submitButton).toBeInTheDocument();

        // Simulate form submission
        fireEvent.click(submitButton);

        // Wait for the form submission to complete
        await waitFor(() => {
            expect(submitButton).not.toBeDisabled();
        });
    });
});
