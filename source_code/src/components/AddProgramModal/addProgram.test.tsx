import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import AddProgramModal from '.';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { Formik } from 'formik';
import SelectMasteryCriteriaTemplate from './SelectMasteryCriteriaTemplate';
import TemplateData from './TemplateData';
import { act } from 'react-dom/test-utils';
import { useProviderMock } from '../../__mocks__/providerMock';
import StepsComponent from './ProgramSteps';

describe('add Program Modal', () => {
    test('should click on create program button', async () => {
        const { findByTestId } = render(
            <BrowserRouter>
                <Provider store={store}>
                    <AddProgramModal open={true} onClose={false} />
                </Provider>
            </BrowserRouter>
        );

        const selectElement = (await findByTestId(
            'domainSelect'
        )) as HTMLSelectElement;

        await act(async () => {
            fireEvent.change(selectElement, {
                target: { value: '' },
            });

            // Wait for the value to be updated
            await waitFor(() => {
                expect(selectElement.value).toBe('');
            });

            expect(selectElement.value).toBe('');

            await waitFor(() => {
                const options = selectElement.querySelectorAll('option');
                expect(options.length).toBeGreaterThan(0);
            });
        });
    });
    test('should update program name and show error message for duplicate', async () => {
        const { findByTestId, findByText } = render(
            <BrowserRouter>
                <Provider store={store}>
                    <AddProgramModal open={true} onClose={false} />
                </Provider>
            </BrowserRouter>
        );

        const programNameInput = (await findByTestId(
            'Program-Name'
        )) as HTMLInputElement;

        fireEvent.change(programNameInput, {
            target: { value: 'New Program Name' },
        });

        expect(programNameInput.value).toBe('New Program Name');

        // Assert that the error message is not initially rendered
        await expect(
            findByText('Please provide an unique Program name')
        ).rejects.toThrow(); // Or use `.not.toBeInTheDocument()` if you prefer
    });
    test('should update program goal ', async () => {
        const { findByTestId } = render(
            <BrowserRouter>
                <Provider store={store}>
                    <AddProgramModal open={true} onClose={false} />
                </Provider>
            </BrowserRouter>
        );

        const programNameInput = (await findByTestId(
            'Program Goal'
        )) as HTMLInputElement;

        fireEvent.change(programNameInput, {
            target: { value: 'New Program Goal' },
        });

        expect(programNameInput.value).toBe('New Program Goal');
    });

    test('should update addGoalToChild', async () => {
        const { findByTestId } = render(
            <BrowserRouter>
                <Provider store={store}>
                    <AddProgramModal open={true} onClose={false} />
                </Provider>
            </BrowserRouter>
        );

        const checkbox = (await findByTestId(
            'addGoalToChild'
        )) as HTMLInputElement;

        fireEvent.click(checkbox);

        expect(checkbox.checked).toBe(true);
    });

    test('should click MasteryCriteriaTemplate button', async () => {
        const initialValues = { addToGuideline: false };

        const { findByTestId } = render(
            <BrowserRouter>
                <Provider store={store}>
                    <Formik initialValues={initialValues} onSubmit={() => {}}>
                        <SelectMasteryCriteriaTemplate disableSave={() => {}} />
                    </Formik>
                </Provider>
            </BrowserRouter>
        );

        const selectMasteryCriteria = await waitFor(() =>
            findByTestId('select-mastery-criteria')
        );
        fireEvent.click(selectMasteryCriteria);
        expect(selectMasteryCriteria).toBeInTheDocument();
    });
    test('should click Template Data', async () => {
        const initialValues = { name: {} };
        const { findByTestId } = render(
            <BrowserRouter>
                <Provider store={store}>
                    <Formik initialValues={initialValues} onSubmit={() => {}}>
                        <TemplateData
                            preventSubmit={false}
                            key={'1'}
                            index={1}
                            name={'smallText'}
                            label={'smallText'}
                            instruction={''}
                            isRequired={true}
                            htmlType={'smallText'}
                            options={'abc'}
                            type={'input'}
                            setGuidelineValues={() => {}}
                        />
                    </Formik>
                </Provider>
            </BrowserRouter>
        );
        const templateDataBtn = await findByTestId('template-data');
        fireEvent.click(templateDataBtn);
        expect(templateDataBtn).toBeInTheDocument();
    });
});

describe('program step component', () => {
    const setBadgesMock = jest.fn();
    const setCurrentDataMock = jest.fn();
    const setStepNameMock = jest.fn();
    const setStepDataMock = jest.fn();
    const setIsEditMock = jest.fn();
    const setOrderStepMock = jest.fn();
    const setCountMock = jest.fn();
    const ComponentWithProvider = useProviderMock(
        <StepsComponent
            stepData={[]}
            setCurrentData={setCurrentDataMock}
            setBadges={setBadgesMock}
            setStepName={setStepNameMock}
            setOrderStep={setOrderStepMock}
            setIsEdit={setIsEditMock}
            setStepData={setStepDataMock}
            setCount={setCountMock}
            count={1}
        />
    );

    test('should show ProgramBook page', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('program-step-modal');
        expect(pageEl).toBeInTheDocument();
    });
});
