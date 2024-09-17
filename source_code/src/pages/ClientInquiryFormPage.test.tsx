import React from 'react';
import { render } from '@testing-library/react';
import ClientInquiryFormPage from './ClientInquiryFormPage';
import { useProviderMock } from '../__mocks__/providerMock';

describe('ClientInquiryFormPage', () => {
    const ComponentWithProvider = useProviderMock(<ClientInquiryFormPage />);
    test('should show ClientInquiryFormPage', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('client-inquiry-form-page');
        expect(pageEl).toBeInTheDocument();
    });
});
