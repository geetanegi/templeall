import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import MasterCriteriaForm from '.';
import PropmtModal from './PromptModal';
import Accuracy from './Accuracy';
import CriteriaForm from './TemplateForm/CriteriaForm';
import PromptsInput from './TemplateForm/PromptsInput';
import ShowBadges from './TemplateForm/ShowBadges';
import { Formik } from 'formik';
import TemplateHeader from './TemplateForm/TemplateHeader';

describe('masterCriteria form page', () => {
    test('should render masterCriteria form index', async () => {
        const { findByTestId } = render(
            <BrowserRouter>
                <Provider store={store}>
                    <MasterCriteriaForm />
                </Provider>
            </BrowserRouter>
        );
        const MasterCriteria = await findByTestId('master-criteria-form');
        expect(MasterCriteria).toBeInTheDocument();
    });
    test('should render masterCriteria prompt modal', async () => {
        const { findByTestId } = render(
            <BrowserRouter>
                <Provider store={store}>
                    <PropmtModal />
                </Provider>
            </BrowserRouter>
        );
        const promptModal = await findByTestId('master-criteria-prompt-modal');
        expect(promptModal).toBeInTheDocument();
    });
    test('should render masterCriteria accuracy', async () => {
        const { findByTestId } = render(
            <BrowserRouter>
                <Provider store={store}>
                    <Accuracy />
                </Provider>
            </BrowserRouter>
        );

        const accuracyDec = await findByTestId('master-criteria-accuracy-dec');
        fireEvent.click(accuracyDec);
        expect(accuracyDec).toBeInTheDocument();

        const accuracyInc = await findByTestId('master-criteria-accuracy-inc');
        fireEvent.click(accuracyInc);
        expect(accuracyInc).toBeInTheDocument();

        const accuracyHandleChange = await findByTestId(
            'master-criteria-accuracy-handleChange'
        );
        fireEvent.change(accuracyHandleChange);
        expect(accuracyHandleChange).toBeInTheDocument();
    });
    test('should render Criteria form page', async () => {
        const { findByTestId } = render(
            <BrowserRouter>
                <Provider store={store}>
                    <CriteriaForm />
                </Provider>
            </BrowserRouter>
        );
        const MasterCriteria = await findByTestId('criteria-form');
        expect(MasterCriteria).toBeInTheDocument();
    });
    test('should render promptsInput and handle input badge', async () => {
        const phase = 'Intervention';
        const setBadges = jest.fn();
        const badges: any = [];

        const { findByTestId, getByPlaceholderText } = render(
            <BrowserRouter>
                <Provider store={store}>
                    <Formik
                        initialValues={{ promptsName: '' }}
                        onSubmit={() => {}}
                    >
                        <PromptsInput
                            phase={phase}
                            criteriaData={{ onViewCriteria: false }}
                            badges={badges}
                            setBadges={setBadges}
                        />
                    </Formik>
                </Provider>
            </BrowserRouter>
        );

        const promptsInput = await findByTestId('input-change');
        expect(promptsInput).toBeInTheDocument();

        const inputElement = getByPlaceholderText('Type your prompt here');
        expect(inputElement).toBeInTheDocument();

        fireEvent.change(inputElement, { target: { value: 'NewBadge' } });
        fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

        await waitFor(() => {
            expect(setBadges).toHaveBeenCalledWith(['NewBadge']);
        });
    });

    test('should render showBadges', async () => {
        const badges = ['Badge 1', 'Badge 2'];
        const handleBadgeClickMock = jest.fn();

        const { findByTestId, queryAllByTestId } = render(
            <BrowserRouter>
                <Provider store={store}>
                    <ShowBadges
                        badges={badges}
                        handleBadgeClick={handleBadgeClickMock}
                    />
                </Provider>
            </BrowserRouter>
        );

        const showBadges = await findByTestId('show-badges');
        expect(showBadges).toBeInTheDocument();

        const badgeButtons = queryAllByTestId(/^show-badges-\d+$/);

        badgeButtons.forEach((badgeButton, index) => {
            fireEvent.click(badgeButton);
            expect(handleBadgeClickMock)?.toHaveBeenCalledWith(
                badges[index],
                badges,
                undefined
            );
        });
    });
    test('should render template header baseline', async () => {
        const { findByText } = render(
            <BrowserRouter>
                <Provider store={store}>
                    <TemplateHeader title={'Baseline'} />
                </Provider>
            </BrowserRouter>
        );

        const baselineTitle = await findByText('Baseline');
        expect(baselineTitle).toBeInTheDocument();
    });
    test('should render template header intervention', async () => {
        const { findByText } = render(
            <BrowserRouter>
                <Provider store={store}>
                    <TemplateHeader title={'Intervention'} />
                </Provider>
            </BrowserRouter>
        );

        const interventionTitle = await findByText('Intervention');
        expect(interventionTitle).toBeInTheDocument();
    });
});
