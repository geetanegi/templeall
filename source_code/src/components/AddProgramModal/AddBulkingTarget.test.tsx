import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddBulkingTarget from './AddBulkingTarget';
import { Formik } from 'formik';

describe('AddBulkingTarget Component', () => {
    const defaultProps = {
        formRefBulking: React.createRef(),
        targets: [],
        setTargets: jest.fn(),
        isFromTarget: true,
        errorMessage: '',
        setErrorMessage: jest.fn(),
        showAddTargetForm: true,
        setShowAddTargetForm: jest.fn(),
    };

    const setup = (props = {}): any => {
        render(
            <Formik initialValues={{ targetName: '' }} onSubmit={jest.fn()}>
                <AddBulkingTarget {...defaultProps} {...props} />
            </Formik>
        );
    };

    it('renders the component correctly', () => {
        setup();

        expect(screen.getByText('Add Target')).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText('Please enter Target Name')
        ).toBeInTheDocument();
    });

    it('adds a new target', async () => {
        setup();

        const input = screen.getByPlaceholderText('Please enter Target Name');
        userEvent.type(input, 'New Target');

        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);

        await waitFor(() => {
            expect(defaultProps.setTargets).toHaveBeenCalledWith([
                { id: 1, name: 'New Target' },
            ]);
        });
    });

    it('shows an error if the target name is duplicate', async () => {
        setup({ targets: [{ id: 1, name: 'Existing Target' }] });

        const input = screen.getByPlaceholderText('Please enter Target Name');
        userEvent.type(input, 'Existing Target');

        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);

        await waitFor(() => {
            expect(defaultProps.setErrorMessage).toHaveBeenCalledWith(
                'Please provide a unique target name'
            );
        });
    });

    it('clears the input field and error message', () => {
        setup();

        // Find the input element
        const input = screen.getByPlaceholderText(
            'Please enter Target Name'
        ) as HTMLInputElement;

        // Type into the input field
        userEvent.type(input, 'Some Target');

        // Find and click the Cancel button
        const cancelButton = screen.getByText('Cancel');
        fireEvent.click(cancelButton);

        // Assert that the input field is cleared and error message is reset
        expect(input.value).toBe(''); // Check if the input value is cleared
        expect(defaultProps.setErrorMessage).toHaveBeenCalledWith(''); // Check if the error message is cleared
    });

    it('edits an existing target', async () => {
        setup({ targets: [{ id: 1, name: 'Old Target' }] });

        // Start editing the target
        const editButton = screen.getByAltText('Edit');
        fireEvent.click(editButton);

        // Change the name
        const input = screen.getByDisplayValue('Old Target');
        userEvent.clear(input);
        userEvent.type(input, 'Updated Target');

        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);

        await waitFor(() => {
            expect(defaultProps.setTargets).toHaveBeenCalledWith([
                { id: 1, name: 'Updated Target' },
            ]);
        });
    });

    it('deletes a target', async () => {
        setup({ targets: [{ id: 1, name: 'Target to Delete' }] });

        const deleteButton = screen.getByAltText('Delete');
        fireEvent.click(deleteButton);

        await waitFor(() => {
            expect(defaultProps.setTargets).toHaveBeenCalledWith([]);
        });
    });

    it('handles Enter key press to add or update target', async () => {
        setup();

        const input = screen.getByPlaceholderText('Please enter Target Name');
        userEvent.type(input, 'New Target{enter}');

        await waitFor(() => {
            expect(defaultProps.setTargets).toHaveBeenCalledWith([
                { id: 1, name: 'New Target' },
            ]);
        });
    });
});
