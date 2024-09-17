import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import ProgramBook from './ProgramBook';
import { useProviderMock } from '../__mocks__/providerMock';
import AddTarget from '../components/PinnedLooks/AddTarget';
import QuickLook from '../components/PinnedLooks/QuickLook';
describe('ProgramBook', () => {
    const mockTargets = [
        { id: 1, name: 'Target 1' },
        { id: 2, name: 'Target 2' },
    ];
    const removeTargetMock = jest.fn();
    const updateConfigurationMock = jest.fn();
    const ComponentWithProvider = useProviderMock(<ProgramBook />);
    const ComponentWithProvider2 = useProviderMock(<AddTarget />);
    const ComponentWithProvider3 = useProviderMock(
        <QuickLook
            targets={mockTargets}
            removeTarget={removeTargetMock}
            updateConfiguration={updateConfigurationMock}
        />
    );
    test('should show ProgramBook page', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('program-book-landing-page');
        expect(pageEl).toBeInTheDocument();
    });
    test('should click on link to route', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const routeClick = await findByTestId('click-on-route');
        fireEvent.click(routeClick);
        expect(routeClick).toBeInTheDocument();
    });
    test('should click on edit icon', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const editIconClick = await findByTestId('icon-click');
        fireEvent.click(editIconClick);
    });
    test('should click on link to route', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const routeClick = await findByTestId('route-click');
        fireEvent.click(routeClick);
    });
    test('should show add target page', async () => {
        const { findByTestId } = render(ComponentWithProvider2);
        const addTarget = await findByTestId('add-target-page');
        fireEvent.click(addTarget);
    });
    test('should show quick look page', async () => {
        const { findByTestId } = render(ComponentWithProvider3);
        const editIconClick = await findByTestId('quick-look-page');
        fireEvent.click(editIconClick);
    });
    test('should show quick look page', async () => {
        const { findByTestId } = render(ComponentWithProvider3);
        const editIconClick = await findByTestId('handle-remove-target-1');
        fireEvent.click(editIconClick);
    });
});
