import React, { useEffect, useState } from 'react';
import TrialCardHeader from './TrialCardHeader';
import TrialCardFooter from './TrialCardFooter';
import PinnedTargetHeader from './PinnedTargetHeader';
import Tooltip from '../Generics/Tooltip';
import { ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useLazyEffect } from '../../hooks/useLazyEffect';

export default function FrequencyTrialCard({
    target,
    recordTrialResponse,
    currentTrial,
    setCurrentTrial,
    trialResponse,
    isPinned,
    handleOpenViewDetail,
    savingTrial,
}: {
    target: any;
    recordTrialResponse: any;
    currentTrial: any;
    setCurrentTrial: any;
    trialResponse: any;
    isPinned?: boolean;
    handleOpenViewDetail: any;
    savingTrial: boolean;
}): React.JSX.Element {
    const runSession = useSelector((state: any) => state.runSession);
    const { started } = runSession?.value?.session || {};
    const [response, setResponse] = useState(0);
    const disabledAction = !started || savingTrial;

    const handleGoBack = (): void => {
        if (currentTrial === 1) {
            setCurrentTrial(1);
        } else {
            setCurrentTrial(currentTrial - 1);
            recordTrialResponse(currentTrial, {
                prompts: '',
            });
        }
    };
    useEffect(() => {
        if (response !== parseInt(trialResponse)) {
            setResponse(parseInt(trialResponse));
        }
    }, [trialResponse]);
    const handleMinus = (): void => {
        setResponse((prev) => (prev !== 0 ? prev - 1 : 0));
    };
    const handlePlus = (): void => {
        setResponse((prev) => prev + 1);
    };
    useLazyEffect(() => {
        if (response !== parseInt(trialResponse)) {
            recordTrialResponse(currentTrial, {
                frequency: response,
            });
        }
    }, [response]);

    return (
        <div
            className={`${!isPinned ? 'w-[32%] mr-3 min-h-96 justify-between' : 'border-r border-gray-200'} bg-white p-4 mt-3 flex flex-col `}
        >
            {!isPinned ? (
                <TrialCardHeader
                    disabled={disabledAction}
                    target={target}
                    type={'frequency'}
                    currentTrial={currentTrial}
                    setCurrentTrial={setCurrentTrial}
                    noTrials={true}
                    recordTrialResponse={recordTrialResponse}
                />
            ) : (
                <PinnedTargetHeader
                    currentTrial={currentTrial}
                    target={target}
                    type={'frequency'}
                    noTrials={true}
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
                    <button
                        onClick={handlePlus}
                        disabled={disabledAction}
                        type="button"
                        data-testid="frequency-plus-button"
                        className="mx-2 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary-700 text-white hover:bg-primary-500 disabled:opacity-50 disabled:pointer-events-none"
                    >
                        <Tooltip title="Play" placement="middle">
                            {/* <img className="h-3 w-5" src={Play} alt="Play" /> */}
                            <Plus />
                        </Tooltip>
                    </button>
                    <div className="p-4 px-8 mx-2 border border-gray-300 rounded">
                        {response}
                    </div>
                    <button
                        disabled={disabledAction}
                        onClick={handleMinus}
                        type="button"
                        data-testid="frequency-minus-button"
                        className="mx-2 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
                    >
                        <Tooltip title="Stop" placement="middle">
                            <Minus />
                        </Tooltip>
                    </button>
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
