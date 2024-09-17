import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RunSession from './RunSession';
import { useProviderMock } from '../__mocks__/providerMock';
import sessionApis from '../api/services/session.service';
import getAllSessionTargetsResponse from '../__mocks__/session/getAllSessionTargets.json';
import runSessionResponse from '../__mocks__/session/runSession.json';
import endSessionResponse from '../__mocks__/session/endSession.json';
import saveTrialResponse from '../__mocks__/session/saveTrial.json';
import abcDropdownDataResponse from '../__mocks__/session/getAllABCDropdownData.json';

describe('RunSession', () => {
    const ComponentWithProvider = useProviderMock(<RunSession />);
    beforeEach(() => {
        const mock = jest.spyOn(sessionApis, 'getSessionTargets');
        mock.mockImplementation(() =>
            Promise.resolve<any>(getAllSessionTargetsResponse)
        );
        const runSessionMock = jest.spyOn(sessionApis, 'runSession');
        runSessionMock.mockImplementation(() =>
            Promise.resolve<any>(runSessionResponse)
        );
        const endSessionMock = jest.spyOn(sessionApis, 'endSession');
        endSessionMock.mockImplementation(() =>
            Promise.resolve<any>(endSessionResponse)
        );
        const saveTrialMock = jest.spyOn(sessionApis, 'saveTrial');
        saveTrialMock.mockImplementation(() =>
            Promise.resolve<any>(saveTrialResponse)
        );
        const abcApiMock = jest.spyOn(sessionApis, 'getAllABCDropdownData');
        abcApiMock.mockImplementation(() =>
            Promise.resolve<any>(abcDropdownDataResponse)
        );
    });
    test('should show run session page', async () => {
        const { findByText } = render(ComponentWithProvider);
        const breadcrumbText = await findByText('Current BIP');
        expect(breadcrumbText).toBeInTheDocument();
    });
    test('should open abc modal', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const abcLink = await findByTestId('session-abc-link');
        fireEvent.click(abcLink);
    });
    test('should run, pause & stop session', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const startButton = await findByTestId('start-button');
        fireEvent.click(startButton);
        const pauseButton = await findByTestId('pause-button');
        fireEvent.click(pauseButton);
        const stopButton = await findByTestId('stop-button');
        fireEvent.click(stopButton);
        const yesConfirmButton = await findByTestId('yes-confirmation-button');
        fireEvent.click(yesConfirmButton);
    });
    test('should run, pause & stop session with no confirmation', async () => {
        const { findByTestId } = render(ComponentWithProvider);
        const startButton = await findByTestId('start-button');
        fireEvent.click(startButton);
        const pauseButton = await findByTestId('pause-button');
        fireEvent.click(pauseButton);
        const stopButton = await findByTestId('stop-button');
        fireEvent.click(stopButton);
        const noConfirmButton = await findByTestId('no-confirmation-button');
        fireEvent.click(noConfirmButton);
    });
    test('should run & interact with percentage trial card', async () => {
        const { findByTestId, findAllByTestId } = render(ComponentWithProvider);
        const startButton = await findByTestId('start-button');
        fireEvent.click(startButton);
        const badgeButton = await findAllByTestId('percentage-card-badge');
        fireEvent.click(badgeButton[0]);
        const backButton = await findAllByTestId('percentage-back-button');
        fireEvent.click(backButton[0]);
    });
    test('should run & interact with duration trial card', async () => {
        const { findByTestId, findAllByTestId } = render(ComponentWithProvider);
        const startButton = await findByTestId('start-button');
        fireEvent.click(startButton);
        const durationPlayBtn = await findAllByTestId('duration-card-play');
        fireEvent.click(durationPlayBtn[0]);
        const durationPauseBtn = await findAllByTestId('duration-card-pause');
        fireEvent.click(durationPauseBtn[0]);
        const durationStopBtn = await findAllByTestId('duration-card-stop');
        fireEvent.click(durationStopBtn[0]);
    });
    test('should run & interact with frequency trial card', async () => {
        const { findByTestId, findAllByTestId } = render(ComponentWithProvider);
        const startButton = await findByTestId('start-button');
        fireEvent.click(startButton);
        const plusButton = await findAllByTestId('frequency-plus-button');
        fireEvent.click(plusButton[0]);
        const minusButton = await findAllByTestId('frequency-minus-button');
        fireEvent.click(minusButton[0]);
    });
    test('should run & interact with task analysis trial card', async () => {
        const { findByTestId, findAllByTestId } = render(ComponentWithProvider);
        const startButton = await findByTestId('start-button');
        fireEvent.click(startButton);
        const badgeBtn = await findAllByTestId('task-analysis-badge');
        fireEvent.click(badgeBtn[0]);
        const modalBadgeBtn = await findAllByTestId('percentage-card-badge');
        fireEvent.click(modalBadgeBtn[0]);
        const saveBtn = await findAllByTestId('task-analysis-save');
        fireEvent.click(saveBtn[0]);
    });
    test('should run & interact with score trial card', async () => {
        const { findByTestId, findAllByTestId } = render(ComponentWithProvider);
        const startButton = await findByTestId('start-button');
        fireEvent.click(startButton);
        const inputEl = await findAllByTestId('score-card-input');
        fireEvent.change(inputEl[0], {
            key: 'Enter',
            target: {
                value: '20',
            },
        });
        fireEvent.keyDown(inputEl[0], {
            key: 'Enter',
            target: {
                value: '20',
            },
        });
        const badgeEl = await findAllByTestId('percentage-card-badge');
        fireEvent.click(badgeEl[0]);
    });
    test('should run & interact with rating scale trial card', async () => {
        const { findByTestId, findAllByTestId } = render(ComponentWithProvider);
        const startButton = await findByTestId('start-button');
        fireEvent.click(startButton);
        const inputEl = await findAllByTestId('rating-scale-input');
        fireEvent.change(inputEl[0], {
            key: 'Enter',
            target: {
                value: '8',
            },
        });
        fireEvent.mouseUp(inputEl[0]);
    });
    test('should run & interact with rate trial card', async () => {
        const { findByTestId, findAllByTestId } = render(ComponentWithProvider);
        const startButton = await findByTestId('start-button');
        fireEvent.click(startButton);
        const playEl = await findAllByTestId('rate-play');
        fireEvent.click(playEl[0]);
        const plusEl = await findAllByTestId('rate-plus');
        fireEvent.click(plusEl[0]);
        const minusEl = await findAllByTestId('rate-minus');
        fireEvent.click(minusEl[0]);
        const pauseEl = await findAllByTestId('rate-pause');
        fireEvent.click(pauseEl[0]);
        const stopEl = await findAllByTestId('rate-stop');
        fireEvent.click(stopEl[0]);
    });
    test('should run & interact with first probe trial card', async () => {
        const { findByTestId, findAllByTestId } = render(ComponentWithProvider);
        const startButton = await findByTestId('start-button');
        fireEvent.click(startButton);
        const plusEl = await findAllByTestId('first-probe-plus');
        fireEvent.click(plusEl[0]);
        const minusEl = await findAllByTestId('first-probe-minus');
        fireEvent.click(minusEl[0]);
    });
    test('should open details modal', async () => {
        const { findAllByTestId } = render(ComponentWithProvider);
        const viewDetailsButton = await findAllByTestId('view-details-button');
        fireEvent.click(viewDetailsButton[0]);
    });
});
