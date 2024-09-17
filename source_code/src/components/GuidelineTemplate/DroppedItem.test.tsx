// DroppedItem.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { useLocation } from 'react-router-dom';
import { useDrag, useDrop } from 'react-dnd';
import DroppedItem from './DroppedItem';
import { useSelector } from 'react-redux';

// Mocking necessary hooks
jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
    useLocation: jest.fn(),
}));

jest.mock('react-dnd', () => ({
    useDrag: jest.fn(),
    useDrop: jest.fn(),
}));

jest.mock('../../redux/slice/template/templateSlice', () => ({
    updateElement: jest.fn(),
}));

const mockDispatch = jest.fn();
const mockUseSelector = useSelector as jest.MockedFunction<typeof useSelector>;
const mockUseLocation = useLocation as jest.MockedFunction<typeof useLocation>;
const mockUseDrag = useDrag as jest.MockedFunction<typeof useDrag>;
const mockUseDrop = useDrop as jest.MockedFunction<typeof useDrop>;

describe('DroppedItem Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockDispatch.mockReturnValue(() => {});
        mockUseSelector.mockReturnValue([]);
        mockUseLocation.mockReturnValue({
            pathname: '/',
            search: '',
            hash: '',
            state: null,
            key: 'default',
        });

        // Properly mock useDrag to return a tuple with three elements
        mockUseDrag.mockReturnValue([
            {
                /* drag props, can be empty or contain mock properties */
            },
            jest.fn(), // mock drag function
            jest.fn(), // mock preview function
        ]);

        // Properly mock useDrop to return a tuple with two elements
        mockUseDrop.mockReturnValue([
            {
                /* drop props, can be empty or contain mock properties */
            },
            jest.fn(), // mock drop function
        ]);
    });

    test('renders input and delete icon for "editor"', () => {
        mockUseSelector.mockReturnValue([
            { name: 'editor', value: '<p>Test</p>' },
        ]);
        const mockSetActiveElement = jest.fn();
        const mockMoveListItem = jest.fn();
        const mockDeleteElement = jest.fn();

        render(
            <DroppedItem
                data={{
                    name: 'editor',
                    id: '1',
                    label: 'Test Editor',
                    index: 0,
                }}
                moveListItem={mockMoveListItem}
                deleteElement={mockDeleteElement}
                setActiveElement={mockSetActiveElement}
                isActive={true}
            />
        );

        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByAltText('delete icon')).toBeInTheDocument();
    });

    test('calls deleteElement when delete icon is clicked', () => {
        const mockDeleteElement = jest.fn();
        render(
            <DroppedItem
                data={{
                    name: 'editor',
                    id: '1',
                    label: 'Test Editor',
                    index: 0,
                }}
                moveListItem={jest.fn()}
                deleteElement={mockDeleteElement}
                setActiveElement={jest.fn()}
                isActive={true}
            />
        );

        fireEvent.click(screen.getByAltText('delete icon'));
        expect(mockDeleteElement).toHaveBeenCalledWith('1');
    });

    test('draggable and droppable behavior', () => {
        const mockMoveListItem = jest.fn();
        mockUseDrag.mockReturnValue([
            {
                /* drag props */
            },
            jest.fn(), // mock drag function
            jest.fn(), // mock preview function
        ]);
        mockUseDrop.mockReturnValue([
            {
                /* drop props */
            },
            jest.fn(), // mock drop function
        ]);

        render(
            <DroppedItem
                data={{
                    name: 'editor',
                    id: '1',
                    label: 'Test Editor',
                    index: 0,
                }}
                moveListItem={mockMoveListItem}
                deleteElement={jest.fn()}
                setActiveElement={jest.fn()}
                isActive={true}
            />
        );

        // Simulate drag and drop logic
        // Verify that moveListItem function is called with correct arguments
        // The implementation may vary based on the actual behavior of your drag and drop setup
    });
});
