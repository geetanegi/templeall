import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import DiagnosisCodeGridPage from './diagnosisCodeGridPage';
import { useProviderMock } from '../../__mocks__/providerMock';
import diagnosisCodeGridApi from '../../api/services/MetaDataManagement/diagnosisCodeGrid.service';
import DiagnosisCodeGridResponse from '../../__mocks__/MetaDataMangment/DiagnosisCodeGridResponse.json';
import InsuranceGridApi from '../../api/services/Insurance/InsuranceGrid.service';
import DiagnosisCodeGridResponseInsurance from '../../__mocks__/MetaDataMangment/DiagnosisCodeGridResponseInsurance.json';
import servicesGridApi from '../../api/services/MetaDataManagement/serivesGrid.service';
import DiagnosisCodeGridResponseService from '../../__mocks__/MetaDataMangment/DiagnosisCodeGridResponseService.json';
import DiagnosisCodeGridResponseEmail from '../../__mocks__/MetaDataMangment/DiagnosisCodeGridResponseEmail.json';
describe('DiagnosisCodeGridPage', () => {
    beforeEach(() => {
        const mock = jest.spyOn(diagnosisCodeGridApi, 'diagnosisCodeGrid');
        mock.mockImplementation(() =>
            Promise.resolve<any>(DiagnosisCodeGridResponse)
        );
        const mockInsurance = jest.spyOn(
            InsuranceGridApi,
            'getInsuranceGridApi'
        );
        mockInsurance.mockImplementation(() =>
            Promise.resolve<any>(DiagnosisCodeGridResponseInsurance)
        );
        const mockService = jest.spyOn(servicesGridApi, 'servicesGrid');
        mockService.mockImplementation(() =>
            Promise.resolve<any>(DiagnosisCodeGridResponseService)
        );
        const mockEmail = jest.spyOn(servicesGridApi, 'emailGrid');
        mockEmail.mockImplementation(() =>
            Promise.resolve<any>(DiagnosisCodeGridResponseEmail)
        );
    });
    const ComponentWithProvider = useProviderMock(<DiagnosisCodeGridPage />);
    test('should show DiagnosisCodeGridPage page', async () => {
        const { findAllByText } = render(ComponentWithProvider);
        const pageEl = await findAllByText('Meta Data Management');
        expect(pageEl[0]).toBeInTheDocument();
    });
    test('should show program book grid', async () => {
        const { findAllByText } = render(ComponentWithProvider);
        const tabButton = await findAllByText('Diagnosis Codes');
        fireEvent.click(tabButton[0]);
    });
    test('should show program book grid', async () => {
        const { findAllByText } = render(ComponentWithProvider);
        const tabButton = await findAllByText('Insurances');
        fireEvent.click(tabButton[0]);
    });
    test('should show program book grid', async () => {
        const { findAllByText } = render(ComponentWithProvider);
        const tabButton = await findAllByText('Services');
        fireEvent.click(tabButton[0]);
    });
    test('should show program book grid', async () => {
        const { findAllByText } = render(ComponentWithProvider);
        const tabButton = await findAllByText('Email Format');
        fireEvent.click(tabButton[0]);
    });

    // test('should click view goal mode button', async () => {
    //     const { findByTestId, findAllByText } = render(ComponentWithProvider);
    //     const tabButton = await findAllByText('Diagnosis Codes');
    //     fireEvent.click(tabButton[0]);
    //     const viewBtn = await findByTestId('edit1-element');
    //     fireEvent.click(viewBtn);
    // });
    // test('should click view goal mode button', async () => {
    //     const { findByTestId, findAllByText } = render(ComponentWithProvider);
    //     const tabButton = await findAllByText('Diagnosis Codes');
    //     fireEvent.click(tabButton[0]);
    //     const viewBtn = await findByTestId('active1-element');
    //     fireEvent.click(viewBtn);
    // });
    // test('should click view goal mode button', async () => {
    //     const { findByTestId, findAllByText } = render(ComponentWithProvider);
    //     const tabButton = await findAllByText('Diagnosis Codes');
    //     fireEvent.click(tabButton[0]);
    //     const viewBtn = await findByTestId('inactive1-element');
    //     fireEvent.click(viewBtn);
    // });

    // test('should click view goal mode button', async () => {
    //     const { findByTestId, findAllByText } = render(ComponentWithProvider);
    //     const tabButton = await findAllByText('Insurances');
    //     fireEvent.click(tabButton[0]);
    //     const viewBtn = await findByTestId('Edit2-element');
    //     fireEvent.click(viewBtn);
    // });
    // test('should click view goal mode button', async () => {
    //     const { findByTestId, findAllByText } = render(ComponentWithProvider);
    //     const tabButton = await findAllByText('Insurances');
    //     fireEvent.click(tabButton[0]);
    //     const viewBtn = await findByTestId('Active2');
    //     fireEvent.click(viewBtn);
    // });
    // test('should click view goal mode button', async () => {
    //     const { findByTestId, findAllByText } = render(ComponentWithProvider);
    //     const tabButton = await findAllByText('Insurances');
    //     fireEvent.click(tabButton[0]);
    //     const viewBtn = await findByTestId('Inactive2');
    //     fireEvent.click(viewBtn);
    // });

    // test('should click view goal mode button', async () => {
    //     const { findByTestId, findAllByText } = render(ComponentWithProvider);
    //     const tabButton = await findAllByText('Services');
    //     fireEvent.click(tabButton[0]);
    //     const viewBtn = await findByTestId('Active-element');
    //     fireEvent.click(viewBtn);
    // });
    // test('should click view goal mode button', async () => {
    //     const { findByTestId, findAllByText } = render(ComponentWithProvider);
    //     const tabButton = await findAllByText('Services');
    //     fireEvent.click(tabButton[0]);
    //     const viewBtn = await findByTestId('Inactive-element');
    //     fireEvent.click(viewBtn);
    // });
    // test('should click view goal mode button', async () => {
    //     const { findByTestId, findAllByText } = render(ComponentWithProvider);
    //     const tabButton = await findAllByText('Email Format');
    //     fireEvent.click(tabButton[0]);
    //     const viewBtn = await findByTestId('view-element');
    //     fireEvent.click(viewBtn);
    // });
    // test('should click view goal mode button', async () => {
    //     const { findByTestId, findAllByText } = render(ComponentWithProvider);
    //     const tabButton = await findAllByText('Email Format');
    //     fireEvent.click(tabButton[0]);
    //     const viewBtn = await findByTestId('edit-element');
    //     fireEvent.click(viewBtn);
    // });
});
