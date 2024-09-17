import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { useProviderMock } from '../../__mocks__/providerMock';
import Toast from './index';
describe('OrganizationPage', () => {
    const ComponentWithProvider2 = useProviderMock(
        <Toast
            type={'success'}
            removeToast={() => {}}
            message={'Hello Test'}
            index={0}
        />
    );
    const ComponentWithProvider3 = useProviderMock(
        <Toast
            type={'error'}
            removeToast={() => {}}
            message={'Hello Test'}
            index={0}
        />
    );
    test('should show OrganizationPage', async () => {
        const { findByTestId } = render(ComponentWithProvider2);
        const pageEl = await findByTestId('toast-com');
        expect(pageEl).toBeInTheDocument();
    });
    test('should show OrganizationPage', async () => {
        const { findByTestId } = render(ComponentWithProvider3);
        const pageEl = await findByTestId('toast-com');
        expect(pageEl).toBeInTheDocument();
    });
    test('should show OrganizationPage', async () => {
        jest.useFakeTimers();
        const { findByTestId } = render(ComponentWithProvider2);
        const pageEl = await findByTestId('on-click-0');
        fireEvent.click(pageEl);
        jest.advanceTimersByTime(6000);
        jest.useRealTimers();
        expect(pageEl).toBeInTheDocument();
    });
    test('should show OrganizationPage', async () => {
        jest.useFakeTimers();
        jest.advanceTimersByTime(6000);
        jest.useRealTimers();
    });
});
