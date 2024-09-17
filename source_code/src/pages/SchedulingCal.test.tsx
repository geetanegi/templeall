import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import SchedulingCal from './SchedulingCal';
import { useProviderMock } from '../__mocks__/providerMock';
import getTechnicianAvailabilityAPI from '../api/services/Scheduling/getTechnicianAvailability.service';
import EventDragModal from '../components/SchedulingComponents/EventDragModal';
import PlannerViewWeek from '../components/SchedulingComponents/PlannerViewWeek';
import CustomEvents from '../components/SchedulingComponents/CustomEvents';
describe('SchedulingCal', () => {
    const ComponentWithProvider = useProviderMock(<SchedulingCal />);
    const ComponentWithProvider2 = useProviderMock(<EventDragModal />);
    const ComponentWithProvider3 = useProviderMock(<PlannerViewWeek />);
    const ComponentWithProvider4 = useProviderMock(<CustomEvents />);
    beforeEach(() => {
        const mock = jest.spyOn(
            getTechnicianAvailabilityAPI,
            'getTechnicianAvailability'
        );
        mock.mockImplementation(() =>
            Promise.resolve<any>({
                data: {
                    data: [],
                },
            })
        );
    });
    test('should show SchedulingCal page', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('scheduling-page');
        expect(pageEl).toBeInTheDocument();
    });
    test('should show header on scheduling page', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageE2 = await findByTestId('scheduling-header-page');
        expect(pageE2).toBeInTheDocument();
    });
    test('should show header on scheduling page', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageE3 = await findByTestId('scheduling-header-tab-2');
        fireEvent.click(pageE3);
        expect(pageE3).toBeInTheDocument();
    });
    test('should click on add new event button', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageE4 = await findByTestId('add-new-event-button');
        fireEvent.click(pageE4);
        expect(pageE4).toBeInTheDocument();
    });
    test.skip('should click on add new event button', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageE5 = await findByTestId('view-my-calendar-option-click-0');
        fireEvent.click(pageE5);
        expect(pageE5).toBeInTheDocument();
    });
    test('should handle search user', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const searchUser = await findByTestId('search-user');
        fireEvent.change(searchUser, {
            target: { value: 'Test Criteria' },
        });
        expect(searchUser).toBeInTheDocument();
        const checkUser = await findByTestId('check-uncheck-user');
        fireEvent.change(checkUser, {
            target: { value: 'Test Criteria' },
        });
        fireEvent.click(checkUser);
        expect(checkUser).toBeInTheDocument();
        const removeUser = await findByTestId('remove-user');
        fireEvent.click(removeUser);
        expect(removeUser).toBeInTheDocument();
    });
    test('should open drag event-modal', async () => {
        const { findByTestId } = render(ComponentWithProvider2);
        const dragEvent = await findByTestId('drag-event-modal');
        expect(dragEvent).toBeInTheDocument();
    });
    test('should enter reason in input', async () => {
        const { findByTestId } = render(ComponentWithProvider2);
        const inputReasonChange = await findByTestId('reason-change');
        fireEvent.change(inputReasonChange, {
            target: { value: 'Test Criteria' },
        });
        expect(inputReasonChange).toBeInTheDocument();
    });
    test('should open planner view', async () => {
        const { findByTestId } = render(ComponentWithProvider3);
        const plannerView = await findByTestId('planner-view');
        expect(plannerView).toBeInTheDocument();
    });
    test('should click on slot for event', async () => {
        const { findByTestId } = render(ComponentWithProvider3);
        const clickAdd = await findByTestId('click-add-event-0');
        fireEvent.click(clickAdd);
        expect(clickAdd).toBeInTheDocument();
    });
    test('should show custom events', async () => {
        const { findByTestId } = render(ComponentWithProvider4);
        const customEvent = await findByTestId('custom-events');
        expect(customEvent).toBeInTheDocument();
    });
});
