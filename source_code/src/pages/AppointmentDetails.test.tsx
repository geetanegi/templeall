import React from 'react';
import { render } from '@testing-library/react';
import AppointmentDetails from './AppointmentDetails';
import { useProviderMock } from '../__mocks__/providerMock';
import NoteAndSignature from '../components/AddNewEvent/NoteAndSignature';
import AddNewNote from '../components/AddNewNote';
import EditData from '../components/AddNewNote/EditData';
import ListOfSessionNoteTemplate from '../components/AddNewNote/ListOfSessionNoteTemplate';
import RenderSelectedSession from '../components/AddNewNote/RenderSelectedSession';
import SessionSummaryGrid from '../components/AddNewNote/SessionSummary';
import ViewTargetInSummary from '../components/AddNewNote/ViewTargetInSummary';
import SelectExistingNoteGrid from '../components/SelectExistingNoteGrid/index';
import CustomRecurrence from '../components/CustomRecurrence';
import Codes from '../components/AddNewEvent/Codes/Codes';
// import SignatureModal from '../components/SignatureModal';

describe('AppointmentDetails', () => {
    const ComponentWithProvider = useProviderMock(<AppointmentDetails />);
    const ComponentWithProvider1 = useProviderMock(<NoteAndSignature />);
    const ComponentWithProvider2 = useProviderMock(<AddNewNote />);
    const ComponentWithProvider3 = useProviderMock(<EditData />);
    const ComponentWithProvider4 = useProviderMock(
        <ListOfSessionNoteTemplate />
    );
    const ComponentWithProvider5 = useProviderMock(
        <RenderSelectedSession indexVal={1} />
    );
    const ComponentWithProvider6 = useProviderMock(<SessionSummaryGrid />);
    const ComponentWithProvider7 = useProviderMock(<ViewTargetInSummary />);
    const ComponentWithProvider8 = useProviderMock(<SelectExistingNoteGrid />);
    const ComponentWithProvider9 = useProviderMock(<CustomRecurrence />);
    const ComponentWithProvider10 = useProviderMock(<Codes />);
    // const ComponentWithProvider11 = useProviderMock(
    //     <SignatureModal onClose={() => {}} />
    // );

    test('should show AppointmentDetails', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('appointment-details-page');
        expect(pageEl).toBeInTheDocument();
    });
    test('should show Note And Signature', async () => {
        const { findByTestId } = render(ComponentWithProvider1);
        const pageEl = await findByTestId('note-signature-page');
        expect(pageEl).toBeInTheDocument();
    });
    test('should show Add New Note', async () => {
        const { findByTestId } = render(ComponentWithProvider2);
        const pageEl = await findByTestId('add-new-note');
        expect(pageEl).toBeInTheDocument();
    });
    test('should show edit data modal', async () => {
        const { findByTestId } = render(ComponentWithProvider3);
        const pageEl = await findByTestId('editData-modal');
        expect(pageEl).toBeInTheDocument();
    });
    test('should show list session note', async () => {
        const { findByTestId } = render(ComponentWithProvider4);
        const pageEl = await findByTestId('list-session-note');
        expect(pageEl).toBeInTheDocument();
    });
    test('should show RenderSelectedSession', async () => {
        const { findByTestId } = render(ComponentWithProvider5);
        const pageEl = await findByTestId('render-selected');
        expect(pageEl).toBeInTheDocument();
    });
    test('should show SessionSummary', async () => {
        const { findByTestId } = render(ComponentWithProvider6);
        const pageEl = await findByTestId('session-summary');
        expect(pageEl).toBeInTheDocument();
    });
    test('should show view target summary', async () => {
        const { findByTestId } = render(ComponentWithProvider7);
        const pageEl = await findByTestId('view-target-summary');
        expect(pageEl).toBeInTheDocument();
    });
    test('should show view target summary', async () => {
        const { findByTestId } = render(ComponentWithProvider8);
        const pageEl = await findByTestId('select-existing-note');
        expect(pageEl).toBeInTheDocument();
    });
    test('should show CustomRecurrence', async () => {
        const { findByTestId } = render(ComponentWithProvider9);
        const pageEl = await findByTestId('custom-recurrence');
        expect(pageEl).toBeInTheDocument();
    });
    test('should show codes', async () => {
        const { findByTestId } = render(ComponentWithProvider10);
        const pageEl = await findByTestId('show-codes');
        expect(pageEl).toBeInTheDocument();
    });
    // test('should show signature', async () => {
    //     const { findByTestId } = render(ComponentWithProvider11);
    //     const pageEl = await findByTestId('signature-modal');
    //     expect(pageEl).toBeInTheDocument();
    // });
});
