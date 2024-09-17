import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import DictionaryGridPage from './DictionaryPage';
import { useProviderMock } from '../__mocks__/providerMock';
import dictionaryGrid from '../api/services/Dictionary/dictionaryGrid.service';
import saveOrganizationDictionaryAPI from '../api/services/Dictionary/saveOrganizationDictionary.service';
import DictionaryGridResponse from '../__mocks__/Dictionary/DictionaryGridResponse.json';
import SaveOrganizationDictionary from '../__mocks__/Dictionary/SaveOrganizationDictionary.json';
import ConfirmationModal from '../components/Generics/ConfirmationModal';
import EditData from '../components/AddNewNote/EditData';
import DeleteDictionaryResponse from '../__mocks__/Dictionary/DeleteDictionary.json';
import { CreateClientModalActions } from '../components/Generics/Modal';
import deleteDictionaryAPI from '../api/services/Dictionary/deleteDictionary.service';
import dictionaryOfSessionNote from '../api/services/DictionaryOfSessionNote';
import SaveAndEditWordJson from '../__mocks__/Dictionary/SaveAndEditWord.json';
describe('DictionaryGridPage', () => {
    beforeEach(() => {
        const mock = jest.spyOn(dictionaryGrid, 'getDictionaryGrid');
        mock.mockImplementation(() =>
            Promise.resolve<any>(DictionaryGridResponse)
        );
        const saveDictionaryMock = jest.spyOn(
            saveOrganizationDictionaryAPI,
            'saveOrganizationDictionary'
        );
        saveDictionaryMock.mockImplementation(() =>
            Promise.resolve<any>(SaveOrganizationDictionary)
        );
        const saveAndEditWord = jest.spyOn(
            dictionaryOfSessionNote,
            'saveAndEditWords'
        );
        saveAndEditWord.mockImplementation(() =>
            Promise.resolve<any>(SaveAndEditWordJson)
        );
        const delDictionaryMock = jest.spyOn(
            deleteDictionaryAPI,
            'deleteDictionary'
        );
        delDictionaryMock.mockImplementation(() =>
            Promise.resolve<any>(DeleteDictionaryResponse)
        );
    });
    const ComponentWithProvider = useProviderMock(<DictionaryGridPage />);
    test('should show DictionaryGridPage', async () => {
        const { findAllByText } = render(ComponentWithProvider);
        const pageEl = await findAllByText('Organization Dictionary');
        expect(pageEl[0]).toBeInTheDocument();
    });
    // test('should enter word and meaning and submit', async () => {
    //     const { findByTestId } = render(ComponentWithProvider);
    //     const wordInput = await findByTestId('add-word-onChange');
    //     fireEvent.change(wordInput, { target: { value: 'Test Word' } });
    //     const meaningInput = await findByTestId('add-meaning-onChange');
    //     fireEvent.change(meaningInput, { target: { value: 'Test Meaning' } });
    //     const submitButton = await findByTestId('add-word-submit');
    //     fireEvent.click(submitButton);
    //     expect(submitButton).toBeInTheDocument();
    // });
    const ComponentWithProvider2 = useProviderMock(
        <EditData
            setUnableToUpdate={() => {}}
            setShowSavedNotification={() => {}}
            type="Dictionary-grid"
        />
    );
    test('should show  EditData modal', async () => {
        const { findByTestId } = render(ComponentWithProvider2);
        const meaning = await findByTestId('editData-modal');
        fireEvent.click(meaning);
        expect(meaning).toBeInTheDocument();
    });
    test('should enter word', async () => {
        const { findByTestId } = render(ComponentWithProvider2);
        const word = await findByTestId('word-onChange');
        fireEvent.change(word, { target: { value: 'Test Criteria' } });
        expect(word).toBeInTheDocument();
    });
    test('should enter meaning', async () => {
        const { findByTestId } = render(ComponentWithProvider2);
        const meaning = await findByTestId('meaning-onChange');
        fireEvent.change(meaning, { target: { value: 'Test Criteria' } });
        expect(meaning).toBeInTheDocument();
    });
    const ComponentWithProvider3 = useProviderMock(
        <CreateClientModalActions isDisabled={false} />
    );
    test('should click submit btn', async () => {
        const { findByTestId } = render(ComponentWithProvider3);
        const meaning = await findByTestId('submit-btn');
        fireEvent.click(meaning);
        expect(meaning).toBeInTheDocument();
    });
    const ComponentWithProvider1 = useProviderMock(
        <ConfirmationModal showCancelIcon={true} />
    );
    test('should show  confirmation modal', async () => {
        const { findByTestId } = render(ComponentWithProvider1);
        const meaning = await findByTestId('confirmation-modal');
        fireEvent.click(meaning);
        expect(meaning).toBeInTheDocument();
    });
});
