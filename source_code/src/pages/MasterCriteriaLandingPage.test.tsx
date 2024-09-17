import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import MasterCriteriaLandingPage from './MasterCriteriaLandingPage';
import { useProviderMock } from '../__mocks__/providerMock';
import saveCriteria from '../__mocks__/MasteryCriteriaTemplate/saveCriteria.json';
import saveCriteriaTemplateAPI from '../api/services/MasterCriteriaTemplate/saveCriteriaTemplate.service';
import GeneralCriteriaModal from '../components/MasterCriteriaForm/GeneralCriteriaForm/GeneralCriteriaModal';
describe('MasterCriteriaLandingPage', () => {
    const ComponentWithProvider = useProviderMock(
        <MasterCriteriaLandingPage />
    );
    const ComponentWithProvider2 = useProviderMock(<GeneralCriteriaModal />);
    beforeEach(() => {
        const mock = jest.spyOn(
            saveCriteriaTemplateAPI,
            'saveCriteriaTemplate'
        );
        mock.mockImplementation(() => Promise.resolve<any>(saveCriteria));
    });
    test('should show MasterCriteriaLandingPage', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('master-criteria');
        expect(pageEl).toBeInTheDocument();
    });
    test('should click buttons', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const phaseButton = await findByTestId('phase-button-0');
        // expect(phaseButton).toBeEnabled();
        fireEvent.click(phaseButton);
        expect(phaseButton).toBeInTheDocument();
    });
    test('should render Breadcrumb Component', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const breadcrumb = await findByTestId('bread-crumb');
        expect(breadcrumb).toBeInTheDocument();
    });
    test('should render saveCriteria Component', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const saveCriteria1 = await findByTestId('save-criteria');
        expect(saveCriteria1).toBeInTheDocument();
    });
    test('should render masterCriteria landing page index', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const MasterCriteria = await findByTestId('master-criteria');
        expect(MasterCriteria).toBeInTheDocument();
    });
    test('should click baseline card', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const baseline = await findByTestId('baseline-card');
        fireEvent.click(baseline);
        expect(baseline).toBeInTheDocument();
    });
    test('should click intervention card', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const intervention = await findByTestId('intervention-card');
        fireEvent.click(intervention);
        expect(intervention).toBeInTheDocument();
    });
    test('should click maintenence card', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const maintenenceCard = await findByTestId('maintenence-card');
        fireEvent.click(maintenenceCard);
        expect(maintenenceCard).toBeInTheDocument();
    });
    test('should open general criteria modal', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const openGeneralModal = await findByTestId('open-general-modal');
        fireEvent.click(openGeneralModal);
        expect(openGeneralModal).toBeInTheDocument();
    });
    test('should enter name and description', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const criteriaName = await findByTestId('criteria-name');
        fireEvent.change(criteriaName, { target: { value: 'Test Criteria' } });
        fireEvent.keyDown(criteriaName, {
            key: 'Enter',
            code: 'Enter',
            charCode: 13,
        });
        expect(criteriaName).toBeInTheDocument();
        const criteriaDescription = await findByTestId('criteria-description');
        fireEvent.change(criteriaDescription, {
            target: { value: 'Test Criteria' },
        });
        fireEvent.keyDown(criteriaDescription, {
            key: 'Enter',
            code: 'Enter',
            charCode: 13,
        });
        expect(criteriaDescription).toBeInTheDocument();
    });
    test('should show general criteria modal', async () => {
        const { findByTestId } = render(ComponentWithProvider2);
        const openGeneralModal = await findByTestId(
            'general-master-criteria-modal'
        );
        fireEvent.click(openGeneralModal);
        expect(openGeneralModal).toBeInTheDocument();
    });
});
