import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { useProviderMock } from '../../../__mocks__/providerMock';
import ToggleSwitch from './Index';
describe('Switch Toggle', () => {
    const onToggle = jest.fn();
    const ComponentWithProvider = useProviderMock(
        <ToggleSwitch
            enabled={true}
            onToggle={onToggle}
            enabledColor="bg-gray-600"
            disabledColor="bg-gray-400"
            circleColor="bg-gray-200"
            checkIconColor="text-green-600"
            crossIconColor="text-red-600"
        />
    );
    test('should show toggle', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('toggle-index');
        expect(pageEl).toBeInTheDocument();
    });
    test('should show switch toggle', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('input-on-change');
        fireEvent.change(pageEl);
        expect(pageEl).toBeInTheDocument();
    });
});
