import React, { useEffect, useState } from 'react';
import TrialCardHeader from './TrialCardHeader';
import TrialCardFooter from './TrialCardFooter';
import PinnedTargetHeader from './PinnedTargetHeader';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSelector } from 'react-redux';
export default function RatingScaleTrialCard({
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
    const [response, setResponse] = useState(0);
    const disabledAction =
        !started ||
        savingTrial ||
        (target?.maxTrials && currentTrial >= target?.maxTrials && hasTrialId);
    const handleGoBack = (): void => {
        if (currentTrial === 1) {
            setCurrentTrial(1);
        } else {
            setCurrentTrial(currentTrial - 1);
        }
    };
    const handleChange = (e: any): void => {
        setResponse(e.target.value);
    };
    const handleMouseUp = (): void => {
        recordTrialResponse(currentTrial, {
            frequency: response,
        });
        if (currentTrial !== target?.maxTrials) {
            setCurrentTrial(currentTrial + 1);
        }
    };
    useEffect(() => {
        if (response !== parseInt(trialResponse)) {
            setResponse(parseInt(trialResponse));
        }
    }, [trialResponse]);
    useEffect(() => {
        setResponse(trialResponse);
    }, [currentTrial]);
    return (
        <div
            className={`${!isPinned ? 'w-[32%] mr-3 min-h-96 justify-between' : 'border-r border-gray-200'} bg-white p-4 mt-3 flex flex-col `}
        >
            {!isPinned ? (
                <TrialCardHeader
                    disabled={disabledAction}
                    target={target}
                    type={'rating scale'}
                    currentTrial={currentTrial}
                    setCurrentTrial={setCurrentTrial}
                    recordTrialResponse={() => undefined}
                />
            ) : (
                <PinnedTargetHeader
                    currentTrial={currentTrial}
                    target={target}
                    type={'rating scale'}
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
                                    : undefined
                            }
                            type="button"
                            className="bg-gray-100 mr-1 py-1 px-2 inline-flex items-center gap-x-2 text-xs font-semibold border border-gray-100 text-gray-400 hover:border-gray-500 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none"
                        >
                            <ChevronRight />
                        </button>
                    </div>
                ) : null}
                <div className="w-full">
                    <div className="relative mb-6">
                        <label htmlFor="labels-range-input" className="sr-only">
                            Labels range
                        </label>
                        <input
                            id="labels-range-input"
                            type="range"
                            value={response}
                            disabled={disabledAction}
                            min="0"
                            max="10"
                            onChange={handleChange}
                            onMouseUp={handleMouseUp}
                            data-testid="rating-scale-input"
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600 disabled:cursor-not-allowed"
                        />
                        <span className="text-sm text-gray-500 absolute start-0 -bottom-6">
                            0
                        </span>
                        <span className="text-sm text-gray-500 absolute start-[10%] -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                            1
                        </span>
                        <span className="text-sm text-gray-500 absolute start-[20%] -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                            2
                        </span>
                        <span className="text-sm text-gray-500 absolute start-[30%] -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                            3
                        </span>
                        <span className="text-sm text-gray-500 absolute start-[40%] -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                            4
                        </span>
                        <span className="text-sm text-gray-500 absolute start-[50%] -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                            5
                        </span>
                        <span className="text-sm text-gray-500 absolute start-[60%] -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                            6
                        </span>
                        <span className="text-sm text-gray-500 absolute start-[70%] -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                            7
                        </span>
                        <span className="text-sm text-gray-500 absolute start-[80%] -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                            8
                        </span>
                        <span className="text-sm text-gray-500 absolute start-[90%] -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                            9
                        </span>
                        <span className="text-sm text-gray-500 absolute end-0 -bottom-6">
                            10
                        </span>
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
