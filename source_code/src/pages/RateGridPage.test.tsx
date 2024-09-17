import React from 'react';
import { render } from '@testing-library/react';
import RateGridPage from './RateGridPage';
import { useProviderMock } from '../__mocks__/providerMock';
import CustomRateGridApi from '../api/services/Rate/CustomRateGrid.service';
import CustomRateGridResponse from '../__mocks__/BillingCode/CustomRateGridResponse.json';
import DefaultRateGrid from '../__mocks__/BillingCode/DefaultRateGrid.json';
import DefaultRateGridApi from '../api/services/Rate/DefualtRateGrid.service';

describe('RateGridPage', () => {
    beforeEach(() => {
        const mock = jest.spyOn(CustomRateGridApi, 'getCustomGridApi');
        mock.mockImplementation(() =>
            Promise.resolve<any>(CustomRateGridResponse)
        );
    });
    beforeEach(() => {
        const mock = jest.spyOn(DefaultRateGridApi, 'getDefaultGridApi');
        mock.mockImplementation(() => Promise.resolve<any>(DefaultRateGrid));
    });
    const ComponentWithProvider = useProviderMock(<RateGridPage />);
    test('should show RateGridPage', async () => {
        const { findAllByText } = render(ComponentWithProvider);
        const pageEl = await findAllByText('Custom Rate');
        expect(pageEl[0]).toBeInTheDocument();
    });
});
