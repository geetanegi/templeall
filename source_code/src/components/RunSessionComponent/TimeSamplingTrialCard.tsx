import React, { useEffect, useState } from 'react';
import TrialCardHeader from './TrialCardHeader';
import TrialCardFooter from './TrialCardFooter';
import { useTimer } from '../../hooks/useTimer';
import PinnedTargetHeader from './PinnedTargetHeader';
import Play from '../../assets/img/sessionScreen/play.svg';
import Push from '../../assets/img/sessionScreen/pushBlack.svg';
import Reset from '../../assets/img/sessionScreen/stopBlack.svg';
import Tooltip from '../Generics/Tooltip';
import { ChevronLeft, ChevronRight, Check, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import moment, { duration } from 'moment';
export default function TimeSamplingTrialCard({
    target,
    recordTrialResponse,
    currentTrial,
    setCurrentTrial,
    trialResponse,
    isPinned,
    handleOpenViewDetail,
    savingTrial,
    frequencyTrialResponse,
    hasTrialId,
}: {
    target: any;
    recordTrialResponse: any;
    currentTrial: any;
    setCurrentTrial: any;
    trialResponse: any;
    frequencyTrialResponse: any;
    isPinned?: boolean;
    handleOpenViewDetail: any;
    savingTrial: boolean;
    hasTrialId?: string;
}): React.JSX.Element {
    const getTrialTime = (): number => {
        return duration(
            `00:${target?.timeSamplingMinutes || '00'}:${target?.timeSamplingSeconds || '00'}`
        ).asSeconds();
    };
    const runSession = useSelector((state: any) => state.runSession);
    const { started } = runSession?.value?.session || {};
    const { timer, startTimer, stopTimer, resetTimer } =
        useTimer(getTrialTime());
    const [response, setResponse] = useState(0);
    const [frequencyResponse, setFrequencyResponse] = useState('');
    const maxTrials = target?.timeSamplingIntervals
        ? target?.timeSamplingIntervals
        : target?.maxTrials;
    const disabledAction =
        !started ||
        savingTrial ||
        (maxTrials && currentTrial >= maxTrials && hasTrialId);
    const handleStopTimer = (): void => {
        stopTimer();
        setResponse(timer.totalTime);
    };
    const handleNo = (): void => {
        setFrequencyResponse('no');
    };
    const handleYes = (): void => {
        setFrequencyResponse('yes');
    };
    const handleResetTimer = (): void => {
        recordTrialResponse(currentTrial, {
            duration: `${timer.totalTime}`,
            positiveCount: frequencyResponse === 'yes' ? 1 : 0,
            negativeCount: frequencyResponse === 'no' ? 1 : 0,
        });
        setResponse(timer.totalTime);
        setCurrentTrial(
            currentTrial !== maxTrials ? currentTrial + 1 : maxTrials
        );
        resetTimer(0);
    };
    const handleGoBack = (): void => {
        if (currentTrial === 1) {
            setCurrentTrial(1);
        } else {
            setCurrentTrial(currentTrial - 1);
        }
    };
    const getTrialStartTime = (): string => {
        return moment(`00:00:00`, 'HH:mm:ss')
            .add(
                parseInt(target?.timeSamplingMinutes) * (currentTrial - 1),
                'minutes'
            )
            .add(
                parseInt(target?.timeSamplingSeconds) * (currentTrial - 1),
                'seconds'
            )
            .format('HH:mm:ss');
    };
    const getTrialEndTime = (): string => {
        return moment(`00:00:00`, 'HH:mm:ss')
            .add(
                parseInt(target?.timeSamplingMinutes) * currentTrial,
                'minutes'
            )
            .add(
                parseInt(target?.timeSamplingSeconds) * currentTrial,
                'seconds'
            )
            .format('HH:mm:ss');
    };
    useEffect(() => {
        setResponse(parseInt(trialResponse));
        setFrequencyResponse(frequencyTrialResponse);
    }, [currentTrial]);
    useEffect(() => {
        resetTimer(response);
    }, [response]);
    return (
        <div
            className={`${!isPinned ? 'w-[32%] mr-3 min-h-96 justify-between mt-3' : 'border-r border-gray-200 mt-0 py-0'} bg-white  p-4 flex flex-col`}
        >
            {!isPinned ? (
                <TrialCardHeader
                    disabled={disabledAction}
                    target={target}
                    type={target.targetType.toLowerCase()}
                    currentTrial={currentTrial}
                    setCurrentTrial={setCurrentTrial}
                    noTrials={false}
                    recordTrialResponse={() => undefined}
                />
            ) : (
                <PinnedTargetHeader
                    currentTrial={currentTrial}
                    target={target}
                    type={target.targetType.toLowerCase()}
                    noTrials={false}
                    handleOpenViewDetail={handleOpenViewDetail}
                />
            )}
            <div className={`${isPinned ? '' : 'flex-col'} p-2 flex`}>
                {isPinned ? (
                    <div className="flex">
                        <button
                            disabled={disabledAction}
                            onClick={handleGoBack}
                            type="button"
                            className="bg-gray-100 mr-1 py-1 px-2 inline-flex items-center gap-x-2 text-xs font-semibold border border-gray-100 text-gray-400 hover:border-gray-500 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none"
                        >
                            <ChevronLeft />
                        </button>
                        <button
                            disabled={disabledAction}
                            onClick={() =>
                                currentTrial !== maxTrials
                                    ? setCurrentTrial(currentTrial + 1)
                                    : setCurrentTrial(maxTrials)
                            }
                            type="button"
                            className="bg-gray-100 mr-1 py-1 px-2 inline-flex items-center gap-x-2 text-xs font-semibold border border-gray-100 text-gray-400 hover:border-gray-500 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none"
                        >
                            <ChevronRight />
                        </button>
                    </div>
                ) : null}
                <div className="flex flex-col w-full">
                    <div className="flex justify-center text-lg font-light mb-2">
                        {getTrialStartTime()} - {getTrialEndTime()}
                    </div>
                    <div
                        className={isPinned ? 'flex flex-row' : `flex flex-col`}
                    >
                        <div className="flex justify-center items-center">
                            <button
                                onClick={startTimer}
                                disabled={disabledAction || timer.started}
                                type="button"
                                className="mx-2 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary-700 text-white hover:bg-primary-500 disabled:opacity-50 disabled:pointer-events-none"
                            >
                                <Tooltip title="Play" placement="middle">
                                    <img
                                        className="h-3 w-5"
                                        src={Play}
                                        alt="Play"
                                    />
                                </Tooltip>
                            </button>
                            <button
                                disabled={disabledAction || !timer.started}
                                onClick={handleStopTimer}
                                type="button"
                                className="mx-2 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
                            >
                                <Tooltip title="Pause" placement="middle">
                                    {/* <img className="h-3 w-5" src={Push} alt="Push" /> */}
                                    <img
                                        className="h-3 w-5"
                                        src={Push}
                                        alt="Stop"
                                    />
                                </Tooltip>
                            </button>
                            <button
                                disabled={
                                    disabledAction ||
                                    timer.totalTime === 0 ||
                                    timer.totalTime < getTrialTime()
                                }
                                onClick={handleResetTimer}
                                type="button"
                                className="mx-2 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
                            >
                                <Tooltip title="Reset" placement="middle">
                                    <img
                                        className="h-3 w-5"
                                        src={Reset}
                                        alt="Stop"
                                    />
                                </Tooltip>
                            </button>
                        </div>
                        <div
                            className={`${isPinned ? 'ml-4' : 'mt-2'} flex justify-center items-center text-[20px] font-light `}
                        >
                            <div className="border-2 border-gray-100 px-4 py-2 rounded">
                                <span>{timer.displayHour}&nbsp;</span>
                                <span>:&nbsp;{timer.displayMinutes}&nbsp;</span>
                                <span>:&nbsp;{timer.displaySeconds}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center mt-2">
                        <button
                            onClick={handleYes}
                            disabled={disabledAction || !timer.started}
                            type="button"
                            className={`${frequencyResponse === 'yes' ? 'bg-primary-600 text-white hover:bg-primary-400' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'} mx-2 py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none`}
                        >
                            <Tooltip title="Yes" placement="middle">
                                {/* <img className="h-3 w-5" src={Play} alt="Play" /> */}
                                <Check />
                            </Tooltip>
                        </button>
                        <button
                            disabled={disabledAction || !timer.started}
                            onClick={handleNo}
                            type="button"
                            className={`${frequencyResponse === 'no' ? 'bg-primary-600 text-white hover:bg-primary-400' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'} mx-2 py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent  disabled:opacity-50 disabled:pointer-events-none`}
                        >
                            <Tooltip title="No" placement="middle">
                                <X />
                            </Tooltip>
                        </button>
                    </div>
                </div>
            </div>
            {!isPinned ? (
                <TrialCardFooter
                    target={target}
                    handleOpenViewDetail={handleOpenViewDetail}
                />
            ) : null}
        </div>
    );
}
