import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import TargetPage from './TargetPage';
import { useProviderMock } from '../__mocks__/providerMock';
describe('TargetPage', () => {
    const ComponentWithProvider = useProviderMock(<TargetPage />);
    test('should show TargetPage page', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('target-page');
        expect(pageEl).toBeInTheDocument();
    });
    test('should click on edit icon on rename program', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const editClick = await findByTestId('icon-click-edit');
        fireEvent.click(editClick);
    });
    test('should click on edit button on rename target', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const editClickBtn = await findByTestId('button-click-edit');
        fireEvent.click(editClickBtn);
    });
    // test('should click on add button on rename program', async () => {
    //     const { findByTestId } = render(ComponentWithProvider);
    //     const addClick = await findByTestId('button-click-add');
    //     fireEvent.click(addClick);
    // });
    // test('should click on edit graph button on rename target', async () => {
    //     const { findByTestId } = render(ComponentWithProvider);
    //     const editGraph = await findByTestId('button-click-edit-graph');
    //     fireEvent.click(editGraph);
    // });
    test('should click on target details button on rename target', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const targetDetails = await findByTestId('button-click-target-details');
        fireEvent.click(targetDetails);
    });
});
