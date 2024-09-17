import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import SchedullingPage from './SchedullingPage';
import { useProviderMock } from '../__mocks__/providerMock';
import TimeZoneModal from '../components/AddNewEvent/TimeZone';
describe('SchedullingPage', () => {
    const mockSetTimeZone = jest.fn();
    const ComponentWithProvider = useProviderMock(<SchedullingPage />);
    const ComponentWithProvider2 = useProviderMock(
        <TimeZoneModal setTimeZone={mockSetTimeZone} />
    );
    test('should show SchedullingPage page', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('add-new-event-page');
        expect(pageEl).toBeInTheDocument();
    });
    test('should show fields', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const title = await findByTestId('field-title');
        fireEvent.change(title, {
            target: { value: 'Test Criteria' },
        });
        expect(title).toBeInTheDocument();
    });
    test('should open timezone modal', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const openModal = await findByTestId('timezone-modal');
        fireEvent.click(openModal);
        expect(openModal).toBeInTheDocument();
    });
    test('should select timezone', async () => {
        const { findByTestId } = render(ComponentWithProvider2);
        const title = await findByTestId('select-timezone-0');
        fireEvent.click(title);
        expect(title).toBeInTheDocument();
    });
    test('should show fields', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const feild = await findByTestId('additional-participant-feild');
        fireEvent.keyDown(feild, {
            key: 'Enter',
            code: 'Enter',
            charCode: 13,
        });
        fireEvent.click(feild);
        expect(feild).toBeInTheDocument();
    });
});
