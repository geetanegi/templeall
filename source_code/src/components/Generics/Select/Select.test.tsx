import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Select from './index';

describe('Select component', () => {
    const mockOnChange = jest.fn();

    const defaultProps = {
        label: 'Select Option',
        options: [
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
            { value: '3', label: 'Option 3' },
        ],
        value: [],
        onChange: mockOnChange,
        showSearch: false,
        multi: false,
        placeholder: 'Select an option',
    };

    test('renders with default props', () => {
        render(<Select {...defaultProps} />);
        expect(screen.getByText('Select Option')).toBeInTheDocument();
        // Check if the input is present but read-only when showSearch is false
        const input = screen.getByRole('textbox');
        expect(input).toHaveAttribute('readOnly');
    });

    test('toggles menu visibility on button click', () => {
        render(<Select {...defaultProps} />);
        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(screen.getByText('Option 1')).toBeInTheDocument();
        fireEvent.click(button);
        expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
    });

    test('displays search input when showSearch is true', () => {
        render(<Select {...defaultProps} showSearch={true} />);
        expect(
            screen.getByPlaceholderText('Select an option')
        ).toBeInTheDocument();
    });

    test('selects an option and triggers onChange callback', () => {
        render(<Select {...defaultProps} />);
        fireEvent.click(screen.getByRole('button'));
        fireEvent.click(screen.getByText('Option 1'));
        expect(mockOnChange).toHaveBeenCalledWith(['1']);
    });

    test('handles multi-select and clear all', () => {
        const multiSelectProps = { ...defaultProps, multi: true, value: ['1'] };
        render(<Select {...multiSelectProps} />);
        fireEvent.click(screen.getByRole('button'));
        fireEvent.click(screen.getByText('Clear All'));
        expect(mockOnChange).toHaveBeenCalledWith([]);
    });
});
