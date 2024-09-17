import React, { useEffect, useState } from 'react';
import TrialCardHeader from './TrialCardHeader';
import TrialCardFooter from './TrialCardFooter';
import PinnedTargetHeader from './PinnedTargetHeader';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSelector } from 'react-redux';
import { PromptBadge } from './PercentageTrialCard';

export default function ScoreTrialCard({
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
    const [response, setResponse] = useState('0');
    const [promptResponse, setPromptResponse] = useState('');
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
    const handlePromptClick = (prompt: string): void => {
        setPromptResponse(prompt);
    };
    const handleChange = (e: any): void => {
        setResponse(e.target.value);
    };
    const handleDialKeyClick = (dialKey: string): void => {
        setResponse((prev: any) =>
            prev === '0' ? `${dialKey}` : `${prev}${dialKey}`
        );
    };
    const handleEnter = (e: any): void => {
        if (e.key === 'Enter') {
            recordTrialResponse(currentTrial, {
                frequency: response,
                prompts: promptResponse,
            });
            setCurrentTrial(
                currentTrial !== target?.maxTrials
                    ? currentTrial + 1
                    : target?.maxTrials
            );
            setResponse('0');
        }
    };
    useEffect(() => {
        if (response !== trialResponse) {
            setResponse(trialResponse);
        }
    }, [trialResponse]);
    const dialKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const prompts: string[] = target?.masteryDataPrompts
        ? JSON.parse(target?.masteryDataPrompts)
        : [];
    return (
        <div
            className={`${!isPinned ? 'w-[32%] mr-3 min-h-96 justify-between' : 'border-r border-gray-200'} bg-white px-4 py-1 flex flex-col mt-2`}
        >
            {!isPinned ? (
                <TrialCardHeader
                    disabled={disabledAction}
                    target={target}
                    type={'score'}
                    currentTrial={currentTrial}
                    setCurrentTrial={setCurrentTrial}
                    recordTrialResponse={() => undefined}
                />
            ) : (
                <PinnedTargetHeader
                    currentTrial={currentTrial}
                    target={target}
                    type={'score'}
                    handleOpenViewDetail={handleOpenViewDetail}
                />
            )}
            <div
                className={`${isPinned ? 'items-center justify-center' : 'flex-col'} flex`}
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
                <div
                    className={`${isPinned ? 'flex-row' : 'flex-col'} flex justify-center`}
                >
                    <div className="flex flex-col items-center">
                        <input
                            value={response}
                            disabled={disabledAction}
                            type="number"
                            className="w-32 pl-8 text-center px-4 block border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                            placeholder="Score"
                            onChange={handleChange}
                            onKeyDown={handleEnter}
                            data-testid="score-card-input"
                        />
                        <span className="text-xs font-thin mt-1">
                            Press enter to log trial
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex mt-0.5 flex-wrap justify-center">
                            {dialKeys.map((dialKey: string, index: number) => {
                                return (
                                    <PromptBadge
                                        key={index}
                                        prompt={dialKey}
                                        handleBadgeClick={() =>
                                            handleDialKeyClick(dialKey)
                                        }
                                        selected={false}
                                        disabled={disabledAction}
                                        className="w-10 flex justify-center"
                                    />
                                );
                            })}
                        </div>
                        <div className="flex mt-0.5 justify-center flex-wrap">
                            {prompts.map((prompt: string, key) => {
                                return (
                                    <PromptBadge
                                        selected={prompt === promptResponse}
                                        key={key}
                                        prompt={prompt}
                                        disabled={disabledAction}
                                        handleBadgeClick={() =>
                                            handlePromptClick(prompt)
                                        }
                                    />
                                );
                            })}
                        </div>
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
