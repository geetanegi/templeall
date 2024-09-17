import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import ProgramBookLibraryGridPage from './ProgramBookLibraryGridPage';
import { useProviderMock } from '../__mocks__/providerMock';
import ProgrambookLibraryGridResponse from '../__mocks__/ProgrambookLibrary/ProgrambookLibraryResponse.json';
import programBookLibraryApi from '../api/services/ProgramBookLibrary/programBookLibraryApi.service';

describe('ProgramBookLibraryGridPage', () => {
    beforeEach(() => {
        const mock = jest.spyOn(
            programBookLibraryApi,
            'getProgramBookLibraryGridSliceGridData'
        );
        mock.mockImplementation(() =>
            Promise.resolve<any>(ProgrambookLibraryGridResponse)
        );
    });
    const ComponentWithProvider = useProviderMock(
        <ProgramBookLibraryGridPage />
    );
    test('should show ProgramBookLibraryGridPage', async () => {
        const { findAllByText } = render(ComponentWithProvider);
        const pageEl = await findAllByText('Program Book Library');
        expect(pageEl[0]).toBeInTheDocument();
    });
    test('should click view goal mode button', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const viewBtn = await findByTestId('view-btn');
        fireEvent.click(viewBtn);
    });
    test('should click view goal mode button', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const viewBtn = await findByTestId('EditData-btn');
        fireEvent.click(viewBtn);
    });
    test('should click view goal mode button', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const viewBtn = await findByTestId('copy-btn');
        fireEvent.click(viewBtn);
    });
    test('should click view goal mode button', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const viewBtn = await findByTestId('deleteIcon-btn');
        fireEvent.click(viewBtn);
    });
});
