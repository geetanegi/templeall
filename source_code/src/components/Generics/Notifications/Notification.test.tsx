import React from 'react';
import { render } from '@testing-library/react';
import Notification from '.';
import { useProviderMock } from '../../../__mocks__/providerMock';
describe('Notifications ', () => {
    const onClose = jest.fn();
    const ComponentWithProvider = useProviderMock(
        <Notification
            open={true}
            title={'Test Case'}
            success={true}
            onClose={onClose}
        />
    );
    const ComponentWithProvider2 = useProviderMock(
        <Notification
            open={true}
            title={'Test Case'}
            success={false}
            onClose={onClose}
        />
    );
    test('should show notifications', async () => {
        jest.useFakeTimers();
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('notifications');
        expect(pageEl).toBeInTheDocument();
        jest.advanceTimersByTime(3000);
        jest.useRealTimers();
    });
    test('should show notifications', async () => {
        const { findByTestId } = render(ComponentWithProvider2);
        const pageEl = await findByTestId('notifications');
        expect(pageEl).toBeInTheDocument();
    });
});
