import React from 'react';
import {
    render,
    screen,
    fireEvent,
    waitFor,
    RenderResult,
} from '@testing-library/react';
import { Provider, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import LongTermGoal from './LongTermGoal';

import * as phaseActions from '../../redux/slice/Intervention/getAllPhasesForIntervention';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

const rootReducer = {
    appointment: () => ({
        value: {
            primaryProvider: { id: 1 },
            appointmentWith: { id: 2 },
        },
    }),
    interventionPhases: () => ({
        value: { data: [{ id: 1, name: 'Phase 1' }] },
    }),
    allInProgressGoals: () => ({
        inProgressLongTerm: [
            {
                id: 1,
                name: 'Goal 1',
                longTermGoalStatus: { id: 1 },
                createdDate: '2023-08-22',
            },
        ],
    }),
    getShortTermGoalById: () => ({
        longStatus: true,
        checkLongGoalStatus: true,
    }),
};

const mockStore = configureStore({ reducer: rootReducer });

type AppDispatch = ThunkDispatch<any, any, AnyAction>;

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
}));

jest.mock('../../redux/slice/Intervention/DomainsByUserType', () => ({
    getDomainByUserTypeCall: jest.fn(),
}));

jest.mock('../../redux/slice/Intervention/getAllPhasesForIntervention', () => ({
    getAllPhases: jest.fn(),
}));

describe('LongTermGoal Component', () => {
    const mockDispatch = jest.fn() as jest.MockedFunction<AppDispatch>;

    beforeEach(() => {
        (
            useDispatch as jest.MockedFunction<typeof useDispatch>
        ).mockReturnValue(mockDispatch);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const setup = (props = {}): RenderResult => {
        const defaultProps = { mode: 'edit' }; // Default mode is set to 'edit' to enable buttons
        return render(
            <Provider store={mockStore}>
                <LongTermGoal {...defaultProps} {...props} />
            </Provider>
        );
    };

    test('renders the component with initial data', () => {
        setup();

        expect(screen.getByText('Goal')).toBeInTheDocument();
        expect(screen.getByText('Created On')).toBeInTheDocument();
        expect(screen.getByText('Status')).toBeInTheDocument();
        expect(screen.getByText('Goal 1')).toBeInTheDocument();
    });

    test('dispatches actions to fetch phases and goals on mount', () => {
        setup();
        expect(mockDispatch).toHaveBeenCalledWith(
            phaseActions.getAllPhases({
                type: 'INTERVENTION_PLAN_OBJECT_STATUS',
            })
        );
    });

    test('changes the status when selecting a new status from the dropdown', async () => {
        setup();

        screen.debug();

        const select = screen.getByRole('combobox');

        expect(select).toBeInTheDocument();

        fireEvent.change(select, { target: { value: '1' } });

        await waitFor(() => expect(mockDispatch).toHaveBeenCalled());
    });

    test('displays notifications when a long term goal is created or added', () => {
        setup();

        expect(
            screen.getByText('Long Term Goal Created Successfully.')
        ).toBeInTheDocument();
        expect(
            screen.getByText('Long Term Goal Added Successfully.')
        ).toBeInTheDocument();
    });
});
//longtermgoal
