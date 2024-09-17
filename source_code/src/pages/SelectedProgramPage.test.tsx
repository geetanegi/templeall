import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import SelectedProgramPage from './SelectedProgramPage';
import { useProviderMock } from '../__mocks__/providerMock';
import AddProgramModal from '../components/AddProgramModal';
import AddTargetModal from '../components/AddTargetModal';
describe('SelectedProgramPage', () => {
    const ComponentWithProvider = useProviderMock(<SelectedProgramPage />);
    const ComponentWithProvider2 = useProviderMock(<AddProgramModal />);
    const ComponentWithProvider3 = useProviderMock(<AddTargetModal />);
    test('should show SelectedProgramPage page', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('selected-program-page');
        expect(pageEl).toBeInTheDocument();
    });
    test('should click on program graph menu tab', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const tabClick = await findByTestId('program-graph-menu-tab-1');
        fireEvent.click(tabClick);
        expect(tabClick).toBeInTheDocument();
    });
    test('should click on edit on rename program', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const editClick = await findByTestId('icon-click-edit');
        fireEvent.click(editClick);
    });
    test('should open target modal', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const openTargetModal = await findByTestId('open-target-modal');
        fireEvent.click(openTargetModal);
        expect(openTargetModal).toBeInTheDocument();
    });
    test('should open library modal', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const openLibModal = await findByTestId('open-lib-modal');
        fireEvent.click(openLibModal);
        expect(openLibModal).toBeInTheDocument();
    });
    test('should open program modal', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const openProgModal = await findByTestId('open-program-modal');
        fireEvent.click(openProgModal);
        expect(openProgModal).toBeInTheDocument();
    });
    test('should open program details modal', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const openProgDetailModal = await findByTestId(
            'open-program-details-modal'
        );
        fireEvent.click(openProgDetailModal);
        expect(openProgDetailModal).toBeInTheDocument();
    });
    test('should click on mastery tab on program modal', async () => {
        const { findByTestId } = render(ComponentWithProvider2);
        const clickMasteryTab = await findByTestId('tab-click-mastery');
        fireEvent.click(clickMasteryTab);
        expect(clickMasteryTab).toBeInTheDocument();
    });
    test('should click on guideline tab on program modal', async () => {
        const { findByTestId } = render(ComponentWithProvider2);
        const clickGuidelineTab = await findByTestId('tab-click-guideline');
        fireEvent.click(clickGuidelineTab);
        expect(clickGuidelineTab).toBeInTheDocument();
    });
    test('should click on mastery tab on target modal', async () => {
        const { findByTestId } = render(ComponentWithProvider3);
        const clickMasteryTab = await findByTestId('tab-click-mastery');
        fireEvent.click(clickMasteryTab);
        expect(clickMasteryTab).toBeInTheDocument();
    });
    test('should click on guideline tab on target modal', async () => {
        const { findByTestId } = render(ComponentWithProvider3);
        const clickGuidelineTab = await findByTestId('tab-click-guideline');
        fireEvent.click(clickGuidelineTab);
        expect(clickGuidelineTab).toBeInTheDocument();
    });
});
