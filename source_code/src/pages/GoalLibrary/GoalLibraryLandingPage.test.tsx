import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import GoalLibraryLandingPage from './GoalLibraryLandingPage';
import { useProviderMock } from '../../__mocks__/providerMock';
import RenameComponent from '../../components/GoalLibrary/Rename/RenameEntities';

describe('GoalLibraryLandingPage', () => {
    const onCancelMock = jest.fn();
    const ComponentWithProvider = useProviderMock(<GoalLibraryLandingPage />);
    const ComponentWithProvider1 = useProviderMock(
        <RenameComponent
            onCancel={onCancelMock}
            nameValue={'test'}
            type={'INTERVENTION'}
            id={undefined}
        />
    );
    test('should show GoalLibraryLandingPage page', async () => {
        const { findByTestId } = render(ComponentWithProvider1);
        const pageEl = await findByTestId('goal-library-rename-page');
        expect(pageEl).toBeInTheDocument();
    });
    test('should show GoalLibraryLandingPage page', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const pageEl = await findByTestId('goal-library-landing-page');
        expect(pageEl).toBeInTheDocument();
    });
    test('should enter name and description', async () => {
        const { findByTestId } = render(ComponentWithProvider1);
        const rename = await findByTestId('name-text');
        fireEvent.change(rename, {
            target: {
                value: 'Test Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto ipsum sint, maxime recusandae ipsa consequatur ab libero voluptatem, quo qui maiores, magnam odit dignissimos explicabo assumenda quisquam! Explicabo, cupiditate voluptates Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto ipsum sint, maxime recusandae ipsa consequatur ab libero voluptatem, quo qui maiores, magnam odit dignissimos explicabo assumenda quisquam! Explicabo, cupiditate voluptates Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto ipsum sint, maxime recusandae ipsa consequatur ab libero voluptatem, quo qui maiores, magnam odit dignissimos explicabo assumenda quisquam! Explicabo, cupiditate voluptates ',
            },
        });
        expect(rename).toBeInTheDocument();
    });
    test('should enter name and description', async () => {
        const { findByTestId } = render(ComponentWithProvider1);
        const rename = await findByTestId('name-text');
        fireEvent.change(rename, {
            target: {
                value: 'Test',
            },
        });
        expect(rename).toBeInTheDocument();
    });
});
