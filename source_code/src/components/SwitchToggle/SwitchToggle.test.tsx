import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { useProviderMock } from '../../__mocks__/providerMock';
import SwitchToggle from '.';
describe('Switch Toggle', () => {
    const ComponentWithProvider = useProviderMock(
        <SwitchToggle isAttainment={true} />
    );
    test('should show switch toggle', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('switch-toggle');
        expect(pageEl).toBeInTheDocument();
    });
    test('should show switch toggle', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('switch-toggle-field');
        fireEvent.change(pageEl);
        fireEvent.focus(pageEl);
        expect(pageEl).toBeInTheDocument();
    });
});
