import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import ProgramsPage from './ProgramsPage';
import { useProviderMock } from '../__mocks__/providerMock';
describe('ProgramsPage', () => {
    const ComponentWithProvider = useProviderMock(<ProgramsPage />, {
        initialEntries: ['/domain/abc/program/abc'],
    });
    test('should show programs page', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('programs-page');
        expect(pageEl).toBeInTheDocument();
    });
    test('should click programBook tab', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const clickTab = await findByTestId('program-book-tab-0');
        fireEvent.click(clickTab);
        expect(clickTab).toBeInTheDocument();
    });
});
