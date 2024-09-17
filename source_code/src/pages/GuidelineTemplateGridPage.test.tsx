import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import GuidelineTemplateGridPage from './GuidelineTemplateGridPage';
import { useProviderMock } from '../__mocks__/providerMock';
import guidelineTemplateGridApi from '../api/services/GuidelineTemplateGrid/guidelineTemplateGridApi';
import GuidelineTemplateGridApiResponse from '../__mocks__/GuidelineTemplates/GuidelineTemplateGridApiResponse.json';

describe('GuidelineTemplateGridPage', () => {
    beforeEach(() => {
        const mock = jest.spyOn(
            guidelineTemplateGridApi,
            'getGuidelineTemplateGridData'
        );
        mock.mockImplementation(
            () => Promise.resolve<any>(GuidelineTemplateGridApiResponse) //
        );
    });
    const ComponentWithProvider = useProviderMock(
        <GuidelineTemplateGridPage />
    );
    test('should show GuidelineTemplateGridPage', async () => {
        const { findAllByText } = render(ComponentWithProvider);
        const pageEl = await findAllByText('Guideline Templates');
        expect(pageEl[0]).toBeInTheDocument();
    });
    test('should click view goal mode button', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const viewBtn = await findByTestId('view-btn');
        fireEvent.click(viewBtn);
    });
    test('should click view goal mode button', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const viewBtn = await findByTestId('Edit-btn');
        fireEvent.click(viewBtn);
    });
    test('should click view goal mode button', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const viewBtn = await findByTestId('copy-btn');
        fireEvent.click(viewBtn);
    });
    test('should click view goal mode button', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const viewBtn = await findByTestId('publish-btn');
        fireEvent.click(viewBtn);
    });
    test('should click view goal mode button', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const viewBtn = await findByTestId('unpublished-btn');
        fireEvent.click(viewBtn);
    });
    test('should click view goal mode button', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const viewBtn = await findByTestId('deleteIcon-btn');
        fireEvent.click(viewBtn);
    });
});
