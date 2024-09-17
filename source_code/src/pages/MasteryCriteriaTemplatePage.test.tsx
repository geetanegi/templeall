import React from 'react';
import { render } from '@testing-library/react';
import MasteryCriteriaTemplatePage from './MasteryCriteriaTemplatePage';
import { useProviderMock } from '../__mocks__/providerMock';
import MasteryCriteriaTemplateGridResponse from '../__mocks__/MasteryCriteriaTemplate/MasteryCriteriaTemplateResponse.json';
import getMasteryCriteriaTemplateAPI from '../api/services/MasterCriteriaTemplate/getMasteryCriteriaTemplate.service';

describe('MasteryCriteriaTemplatePage', () => {
    beforeEach(() => {
        const mock = jest.spyOn(
            getMasteryCriteriaTemplateAPI,
            'getMasteryCriteriaTemplate'
        );
        mock.mockImplementation(() =>
            Promise.resolve<any>(MasteryCriteriaTemplateGridResponse)
        );
    });
    const ComponentWithProvider = useProviderMock(
        <MasteryCriteriaTemplatePage />
    );
    test('should show MasteryCriteriaTemplatePage', async () => {
        const { findByText } = render(ComponentWithProvider);
        const pageEl = await findByText('Mastery Criteria Templates');
        expect(pageEl).toBeInTheDocument();
    });
    // test('should click view goal mode button', async () => {
    //     const { findByTestId } = render(ComponentWithProvider);
    //     screen.debug();
    //     const viewBtn = await findByTestId('View-element');
    //     fireEvent.click(viewBtn);

    //     // Add assertions here as needed
    // });
    // test('should click view goal mode button', async () => {
    //     const { findByTestId } = render(ComponentWithProvider);
    //     const viewBtn = await findByTestId('edit-element');
    //     fireEvent.click(viewBtn);
    // });
    // test('should click view goal mode button', async () => {
    //     const { findByTestId } = render(ComponentWithProvider);
    //     const viewBtn = await findByTestId('onCopy-element');
    //     fireEvent.click(viewBtn);
    // });
    // test('should click view goal mode button', async () => {
    //     const { findByTestId } = render(ComponentWithProvider);
    //     const viewBtn = await findByTestId('publish-element');
    //     fireEvent.click(viewBtn);
    // });
    // test('should click view goal mode button', async () => {
    //     const { findByTestId } = render(ComponentWithProvider);
    //     const viewBtn = await findByTestId('unpublished-element');
    //     fireEvent.click(viewBtn);
    // });
    // test('should click view goal mode button', async () => {
    //     const { findByTestId } = render(ComponentWithProvider);
    //     const viewBtn = await findByTestId('activateIcon-element');
    //     fireEvent.click(viewBtn);
    // });
    // test('should click view goal mode button', async () => {
    //     const { findByTestId } = render(ComponentWithProvider);
    //     const viewBtn = await findByTestId('inactiveIcon-element');
    //     fireEvent.click(viewBtn);
    // });
});
