import React, { useState, useEffect } from 'react';
import TrialCardHeader from './TrialCardHeader';
import TrialCardFooter from './TrialCardFooter';
import PinnedTargetHeader from './PinnedTargetHeader';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSelector } from 'react-redux';

export const PromptBadge = ({
    prompt,
    handleBadgeClick,
    selected,
    disabled,
    className,
}: {
    prompt: string;
    handleBadgeClick: any;
    selected: boolean;
    disabled: boolean;
    className?: string;
}): React.JSX.Element => {
    return (
        <span
            data-testid="percentage-card-badge"
            onClick={() => (!disabled ? handleBadgeClick(prompt) : null)}
            className={`${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${selected ? 'bg-primary-700 text-white hover:bg-primary-500' : 'bg-white text-gray-800 '} m-1 inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-md text-xs font-medium border border-gray-200 shadow-sm ${className}`}
        >
            {prompt}
        </span>
    );
};

export default function PercentageTrialCard({
    target,
    recordTrialResponse,
    currentTrial,
    trialResponse,
    setCurrentTrial,
    isPinned,
    handleOpenViewDetail,
    savingTrial,
    hasTrialId,
}: {
    target: any;
    recordTrialResponse: any;
    currentTrial: any;
    trialResponse: any;
    setCurrentTrial: any;
    isPinned?: boolean;
    handleOpenViewDetail: any;
    savingTrial: boolean;
    hasTrialId?: string;
}): React.JSX.Element {
    const runSession = useSelector((state: any) => state.runSession);
    const { started } = runSession?.value?.session || {};
    const disabledAction =
        !started ||
        savingTrial ||
        (target?.maxTrials && currentTrial >= target?.maxTrials && hasTrialId);
    const prompts: string[] = target?.masteryDataPrompts
        ? JSON.parse(target?.masteryDataPrompts)
        : [];
    const [response, setResponse] = useState('');
    useEffect(() => {
        setResponse(trialResponse);
    }, [trialResponse, currentTrial]);

    const handleBadgeClick = (promptItem: string): void => {
        recordTrialResponse(currentTrial, {
            prompts: promptItem,
        });
        setResponse(promptItem);
        setCurrentTrial(
            currentTrial !== target?.maxTrials
                ? currentTrial + 1
                : target?.maxTrials
        );
    };
    const handleGoBack = (e: any): void => {
        e.preventDefault();
        if (currentTrial === 1) {
            setCurrentTrial(1);
        } else {
            setCurrentTrial(currentTrial - 1);
            recordTrialResponse(currentTrial, {
                prompts: '',
            });
        }
    };
    return (
        <div
            className={`${!isPinned ? 'w-[32%] mr-3 min-h-96 justify-between' : 'border-r border-gray-200'} bg-white p-4 mt-3 flex flex-col`}
        >
            {!isPinned ? (
                <TrialCardHeader
                    disabled={disabledAction}
                    currentTrial={currentTrial}
                    target={target}
                    type={'percentage'}
                    setCurrentTrial={setCurrentTrial}
                    recordTrialResponse={recordTrialResponse}
                />
            ) : (
                <PinnedTargetHeader
                    currentTrial={currentTrial}
                    target={target}
                    type={'percentage'}
                    handleOpenViewDetail={handleOpenViewDetail}
                />
            )}
            <div className="p-2  flex flex-wrap">
                {isPinned ? (
                    <div className="flex">
                        <button
                            disabled={disabledAction}
                            onClick={handleGoBack}
                            data-testid="percentage-back-button"
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
                {prompts.map((prompt: string, key) => {
                    return (
                        <PromptBadge
                            selected={prompt === response}
                            key={key}
                            prompt={prompt}
                            disabled={disabledAction}
                            handleBadgeClick={handleBadgeClick}
                        />
                    );
                })}
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
