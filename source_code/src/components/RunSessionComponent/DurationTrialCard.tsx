import React, { useEffect, useState } from 'react';
import TrialCardHeader from './TrialCardHeader';
import TrialCardFooter from './TrialCardFooter';
import { useTimer } from '../../hooks/useTimer';
import PinnedTargetHeader from './PinnedTargetHeader';
import Play from '../../assets/img/sessionScreen/play.svg';
import Push from '../../assets/img/sessionScreen/pushBlack.svg';
import Tooltip from '../Generics/Tooltip';
import { ChevronLeft, ChevronRight, Pause } from 'lucide-react';
import { useSelector } from 'react-redux';
export default function DurationTrialCard({
    target,
    recordTrialResponse,
    currentTrial,
    setCurrentTrial,
    trialResponse,
    isPinned,
    handleOpenViewDetail,
    savingTrial,
    hasTrialId,
}: {
    target: any;
    recordTrialResponse: any;
    currentTrial: any;
    setCurrentTrial: any;
    trialResponse: any;
    isPinned?: boolean;
    handleOpenViewDetail: any;
    savingTrial: boolean;
    hasTrialId?: string;
}): React.JSX.Element {
    const runSession = useSelector((state: any) => state.runSession);
    const { started } = runSession?.value?.session || {};
    const { timer, startTimer, stopTimer, resetTimer } = useTimer();
    const [response, setResponse] = useState(0);
    const disabledAction =
        !started ||
        savingTrial ||
        (target?.maxTrials && currentTrial >= target?.maxTrials && hasTrialId);
    const handleStopTimer = (): void => {
        stopTimer();
        setResponse(timer.totalTime);
    };
    const handleResetTimer = (): void => {
        recordTrialResponse(currentTrial, {
            duration: `${timer.totalTime}`,
        });
        setResponse(timer.totalTime);
        setCurrentTrial(
            currentTrial !== target?.maxTrials
                ? currentTrial + 1
                : target?.maxTrials
        );
        resetTimer(0);
    };
    const handleGoBack = (): void => {
        if (currentTrial === 1) {
            setCurrentTrial(1);
        } else {
            setCurrentTrial(currentTrial - 1);
            recordTrialResponse(currentTrial - 1, {
                duration: '',
            });
        }
    };
    useEffect(() => {
        setResponse(parseInt(trialResponse));
    }, [trialResponse]);
    useEffect(() => {
        resetTimer(response);
    }, [response]);
    return (
        <div
            className={`${!isPinned ? 'w-[32%] mr-3 min-h-96 justify-between' : 'border-r border-gray-200'} bg-white  p-4 mt-3 flex flex-col`}
        >
            {!isPinned ? (
                <TrialCardHeader
                    disabled={disabledAction}
                    target={target}
                    type={target.targetType.toLowerCase()}
                    currentTrial={currentTrial}
                    setCurrentTrial={setCurrentTrial}
                    noTrials={false}
                    recordTrialResponse={recordTrialResponse}
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
            <div
                className={`${isPinned ? 'items-center justify-center' : 'flex-col'} p-2 mt-2 flex`}
            >
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
                                currentTrial !== target?.maxTrials
                                    ? setCurrentTrial(currentTrial + 1)
                                    : setCurrentTrial(target?.maxTrials)
                            }
                            type="button"
                            className="bg-gray-100 mr-1 py-1 px-2 inline-flex items-center gap-x-2 text-xs font-semibold border border-gray-100 text-gray-400 hover:border-gray-500 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none"
                        >
                            <ChevronRight />
                        </button>
                    </div>
                ) : null}
                <div className="flex justify-center items-center">
                    <button
                        onClick={startTimer}
                        disabled={disabledAction || timer.started}
                        data-testid="duration-card-play"
                        type="button"
                        className="mx-2 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary-700 text-white hover:bg-primary-500 disabled:opacity-50 disabled:pointer-events-none"
                    >
                        <Tooltip title="Play" placement="middle">
                            <img className="h-3 w-5" src={Play} alt="Play" />
                        </Tooltip>
                    </button>
                    <button
                        disabled={disabledAction || !timer.started}
                        onClick={handleStopTimer}
                        data-testid="duration-card-pause"
                        type="button"
                        className="mx-2 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
                    >
                        <Tooltip title="Pause" placement="middle">
                            {/* <img className="h-3 w-5" src={Push} alt="Push" /> */}
                            <Pause />
                        </Tooltip>
                    </button>
                    <button
                        disabled={
                            disabledAction ||
                            timer.started ||
                            timer.totalTime === 0
                        }
                        data-testid="duration-card-stop"
                        onClick={handleResetTimer}
                        type="button"
                        className="mx-2 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
                    >
                        <Tooltip title="Stop" placement="middle">
                            <img className="h-3 w-5" src={Push} alt="Stop" />
                        </Tooltip>
                    </button>
                </div>
                <div
                    className={`${isPinned ? 'ml-4' : 'mt-2'} flex justify-center items-center text-[20px] font-light `}
                >
                    <div className="border-2 border-gray-300 px-4 py-2 rounded">
                        <span>{timer.displayHour}&nbsp;</span>
                        <span>:&nbsp;{timer.displayMinutes}&nbsp;</span>
                        <span>:&nbsp;{timer.displaySeconds}</span>
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
