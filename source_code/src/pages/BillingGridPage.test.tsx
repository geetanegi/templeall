import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import BillingGridPage from './BillingGridPage';
import { useProviderMock } from '../__mocks__/providerMock';
import paymentGridAPI from '../api/services/PaymentGrid/paymentGrid.service';
import PaymentGridResponse from '../__mocks__/PaymentBilling/PaymentGrid.json';
import PaymentGrid from '../components/Billing/Modal/PaymentGrid';
import VoidPaymentModal from '../components/Billing/Modal/VoidPaymentModal';
import VoidPaymentResponse from '../__mocks__/PaymentBilling/VoidPayment.json';
import DictionaryManagerJson from '../__mocks__/Dictionary/DictionaryManager.json';
import DictionaryManager from '../components/AddNewNote/DictionaryManager';
import dictionaryOfSessionNote from '../api/services/DictionaryOfSessionNote';
describe('BillingGridPage', () => {
    const ComponentWithProvider = useProviderMock(<BillingGridPage />);
    const ComponentWithProvider2 = useProviderMock(
        <PaymentGrid currentRecord={{ id: 1 }} />
    );
    const ComponentWithProvider3 = useProviderMock(<VoidPaymentModal />);
    const ComponentWithProvider4 = useProviderMock(<DictionaryManager />);
    beforeEach(() => {
        const mock = jest.spyOn(paymentGridAPI, 'paymentGrid');
        mock.mockImplementation(() =>
            Promise.resolve<any>(PaymentGridResponse)
        );
        const dictionaryGrid = jest.spyOn(
            dictionaryOfSessionNote,
            'getAllWords'
        );
        dictionaryGrid.mockImplementation(() =>
            Promise.resolve<any>(DictionaryManagerJson)
        );
        const voidPayment = jest.spyOn(paymentGridAPI, 'voidPayment');
        voidPayment.mockImplementation(() =>
            Promise.resolve<any>(VoidPaymentResponse)
        );
    });
    test('should show BillingGridPage', async () => {
        const { findAllByText } = render(ComponentWithProvider);
        const pageEl = await findAllByText('Billing');
        expect(pageEl[0]).toBeInTheDocument();
    });
    test('should click on check payment', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const voidModal = await findByTestId('check-btn');
        fireEvent.click(voidModal);
        expect(voidModal).toBeInTheDocument();
    });
    test('should click on clear payment', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const voidModal = await findByTestId('clear-btn');
        fireEvent.click(voidModal);
        expect(voidModal).toBeInTheDocument();
    });
    test('should show PaymentGridPage', async () => {
        const { findAllByText } = render(ComponentWithProvider2);
        const pageEl = await findAllByText('Previous Rates');
        expect(pageEl[0]).toBeInTheDocument();
    });
    test('should show void payment modal', async () => {
        const { findByTestId } = render(ComponentWithProvider3);
        const voidModal = await findByTestId('void-modal');
        fireEvent.click(voidModal);
        expect(voidModal).toBeInTheDocument();
    });
    test('should enter reason', async () => {
        const { findByTestId } = render(ComponentWithProvider3);
        const meaning = await findByTestId('reason-on-change');
        fireEvent.change(meaning, { target: { value: 'Test Criteria' } });
        expect(meaning).toBeInTheDocument();
    });
    test('should show void payment modal', async () => {
        const { findByTestId } = render(ComponentWithProvider3);
        const voidModal = await findByTestId('submit-btn-void-payment');
        fireEvent.click(voidModal);
        expect(voidModal).toBeInTheDocument();
    });
    test.skip('should show add new note', async () => {
        const { findByTestId } = render(ComponentWithProvider4);
        const voidModal = await findByTestId('dictionary-manager-grid');
        // fireEvent.click(voidModal);
        expect(voidModal).toBeInTheDocument();
    });
});
