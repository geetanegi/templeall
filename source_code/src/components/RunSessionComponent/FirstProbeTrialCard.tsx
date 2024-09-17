import React, { useState } from 'react';
import TrialCardHeader from './TrialCardHeader';
import TrialCardFooter from './TrialCardFooter';
import PinnedTargetHeader from './PinnedTargetHeader';
import Tooltip from '../Generics/Tooltip';
import { ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useLazyEffect } from '../../hooks/useLazyEffect';

export default function FirstProbeTrialCard({
    target,
    recordTrialResponse,
    currentTrial,
    setCurrentTrial,
    isPinned,
    handleOpenViewDetail,
    savingTrial,
    hasTrialId,
}: {
    target: any;
    recordTrialResponse: any;
    currentTrial: any;
    setCurrentTrial: any;
    trialResponse?: any;
    isPinned?: boolean;
    handleOpenViewDetail: any;
    savingTrial: boolean;
    hasTrialId?: string;
}): React.JSX.Element {
    const runSession = useSelector((state: any) => state.runSession);
    const { started } = runSession?.value?.session || {};
    const [positiveCountResponse, setPositiveCountResponse] = useState(0);
    const [negativeCountResponse, setNegativeCountResponse] = useState(0);
    const disabledAction =
        !started ||
        savingTrial ||
        (currentTrial === target?.maxTrials && hasTrialId !== '');

    const handleGoBack = (): void => {
        if (currentTrial === 1) {
            setCurrentTrial(1);
        } else {
            setCurrentTrial(currentTrial - 1);
        }
    };
    const handleMinus = (): void => {
        setNegativeCountResponse((prev) => prev + 1);
    };
    const handlePlus = (): void => {
        setPositiveCountResponse((prev) => prev + 1);
    };
    useLazyEffect(() => {
        if (positiveCountResponse || negativeCountResponse) {
            recordTrialResponse(currentTrial, {
                positiveCount: positiveCountResponse,
                negativeCount: negativeCountResponse,
            });
            if (currentTrial !== target?.maxTrials) {
                setCurrentTrial(currentTrial + 1);
            }
        }
    }, [positiveCountResponse, negativeCountResponse]);

    return (
        <div
            className={`${!isPinned ? 'w-[32%] mr-3 min-h-96 justify-between mt-3 p-4 ' : 'border-r border-gray-200 px-4 py-1'} bg-white flex flex-col `}
        >
            {!isPinned ? (
                <TrialCardHeader
                    disabled={disabledAction}
                    target={target}
                    type={'first probe'}
                    currentTrial={currentTrial}
                    setCurrentTrial={setCurrentTrial}
                    recordTrialResponse={() => undefined}
                />
            ) : (
                <PinnedTargetHeader
                    currentTrial={currentTrial}
                    target={target}
                    type={'first probe'}
                    handleOpenViewDetail={handleOpenViewDetail}
                />
            )}
            <div
                className={`${isPinned ? 'items-center justify-center' : 'flex-col'} p-2 mt-2 flex`}
            >
                {isPinned && false ? (
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
                    <div className="flex flex-col">
                        <div className="p-2 px-4 mx-2 border border-gray-300 rounded text-center">
                            {positiveCountResponse}
                        </div>
                        <button
                            onClick={handlePlus}
                            disabled={disabledAction}
                            type="button"
                            data-testid="first-probe-plus"
                            className="mx-2 mt-2 py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
                        >
                            <Tooltip title="Play" placement="middle">
                                {/* <img className="h-3 w-5" src={Play} alt="Play" /> */}
                                <Plus />
                            </Tooltip>
                        </button>
                    </div>
                    <div>
                        <div className="p-2 px-4 mx-2 border border-gray-300 rounded text-center">
                            {negativeCountResponse}
                        </div>
                        <button
                            disabled={disabledAction}
                            onClick={handleMinus}
                            data-testid="first-probe-minus"
                            type="button"
                            className="mx-2 mt-2 py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
                        >
                            <Tooltip title="Stop" placement="middle">
                                <Minus />
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
