import React, { useState, useEffect } from 'react';
import TrialCardHeader from './TrialCardHeader';
import TrialCardFooter from './TrialCardFooter';
import PinnedTargetHeader from './PinnedTargetHeader';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSelector } from 'react-redux';
import TaskAnalysisModal from './TaskAnalysisModal';
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
            onClick={() => (!disabled ? handleBadgeClick(prompt) : null)}
            data-testid="task-analysis-badge"
            className={`${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${selected ? 'bg-primary-700 text-white hover:bg-primary-500' : 'bg-white text-gray-800 '} m-1 inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-md text-xs font-medium border border-gray-200 shadow-sm ${className}`}
        >
            {prompt}
        </span>
    );
};
export default function TaskAnalysisTrialCard({
    target,
    recordTrialResponse,
    currentTrial,
    trialResponse,
    setCurrentTrial,
    isPinned,
    handleOpenViewDetail,
    savingTrial,
    hasTrialId,
    phase,
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
    phase: string;
}): React.JSX.Element {
    const runSession = useSelector((state: any) => state.runSession);
    const { started } = runSession?.value?.session || {};
    const disabledAction =
        !started ||
        savingTrial ||
        (target?.maxTrials && currentTrial >= target?.maxTrials && hasTrialId);
    const getPrompts = (data: any): any => {
        return data?.prompts ? JSON.parse(data?.prompts) : [];
    };
    const [response, setResponse] = useState<any>({});
    const [currentStep, setCurrentStep] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [invalidStep, setInvalidStep] = useState('');
    const [disableAllSteps, setDisableAllSteps] = useState(false);
    useEffect(() => {
        const trialResponseObj: any = {};
        if (trialResponse.length) {
            trialResponse.forEach((resp: any) => {
                trialResponseObj[resp.step] = {
                    ...resp,
                };
            });
        }
        setResponse(trialResponseObj);
    }, [trialResponse, currentTrial]);
    const handleBadgeClick = (promptItem: string, step: number): void => {
        if (target.taskAnalysisType === 'Forward' && phase === 'Baseline') {
            if (promptItem !== 'IND') {
                setDisableAllSteps(true);
                if (!invalidStep) {
                    setInvalidStep(step.toString());
                }
            }
            if (promptItem === 'IND' && step.toString() === invalidStep) {
                setDisableAllSteps(false);
                setInvalidStep('');
            }
        }
        setResponse((prev: any) => {
            return {
                ...prev,
                [step]: {
                    step,
                    prompts: promptItem,
                },
            };
        });
    };
    const handleSave = (): void => {
        recordTrialResponse(
            currentTrial,
            {
                response: Object.values(response),
            },
            true
        );
        setCurrentTrial(
            currentTrial !== target?.maxTrials
                ? currentTrial + 1
                : target?.maxTrials
        );
    };
    const handleGoBack = (): void => {
        if (currentTrial === 1) {
            setCurrentTrial(1);
        } else {
            setCurrentTrial(currentTrial - 1);
        }
    };
    const steps = target?.steps || [];
    return (
        <div
            className={`${!isPinned ? 'w-[32%] mr-3 min-h-96 justify-between border border-gray-200' : 'border-r border-gray-200'} bg-white mt-3 flex flex-col`}
        >
            {!isPinned ? (
                <TrialCardHeader
                    disabled={disabledAction}
                    currentTrial={currentTrial}
                    target={target}
                    type={'task analysis'}
                    setCurrentTrial={setCurrentTrial}
                    recordTrialResponse={() => undefined}
                />
            ) : (
                <PinnedTargetHeader
                    currentTrial={currentTrial}
                    target={target}
                    type={'task analysis'}
                    handleOpenViewDetail={handleOpenViewDetail}
                />
            )}
            <div
                className="flex flex-wrap items-center justify-between"
                onClick={() =>
                    currentStep > 0 && false
                        ? setCurrentStep(currentStep - 1)
                        : undefined
                }
            >
                <div
                    className={`bg-gray-100 rounded-r-full flex items-center cursor-pointer hover:bg-gray-200 ${isPinned ? 'h-10' : 'h-24'}`}
                >
                    <ChevronLeft />
                </div>
                {steps?.[currentStep] ? (
                    <div className="w-[85%]">
                        <div className="w-full">
                            <div className="w-full font-semibold">
                                Step {currentStep + 1}:
                            </div>
                            <div className="w-full font-thin border-b mb-3">
                                {steps[currentStep].data.description}
                            </div>
                        </div>
                        {getPrompts(steps[currentStep].data).map(
                            (prompt: string, key: number) => {
                                return (
                                    <PromptBadge
                                        selected={
                                            response?.[currentStep - 1]
                                                ? prompt ===
                                                  response?.[currentStep - 1]
                                                      ?.prompts
                                                : false
                                        }
                                        key={key}
                                        prompt={prompt}
                                        disabled={disabledAction}
                                        handleBadgeClick={() =>
                                            setShowModal(true)
                                        }
                                    />
                                );
                            }
                        )}
                    </div>
                ) : null}
                <div
                    className={`bg-gray-100 rounded-l-full flex items-center cursor-pointer hover:bg-gray-200 ${isPinned ? 'h-10' : 'h-24'}`}
                    onClick={() =>
                        currentStep < steps.length && false
                            ? setCurrentStep(currentStep + 1)
                            : undefined
                    }
                >
                    <ChevronRight />
                </div>
            </div>
            {!isPinned ? (
                <TrialCardFooter
                    target={target}
                    handleOpenViewDetail={handleOpenViewDetail}
                    openModal={() => setShowModal(true)}
                    disableAllSteps={disabledAction}
                    type="task analysis"
                />
            ) : null}
            {showModal ? (
                <TaskAnalysisModal
                    target={target}
                    onClose={() => setShowModal(false)}
                    handleBadgeClick={handleBadgeClick}
                    disabledAction={disabledAction}
                    response={response}
                    savingTrial={savingTrial}
                    handleSave={handleSave}
                    currentTrial={currentTrial}
                    handleGoBack={handleGoBack}
                    disableAllSteps={disableAllSteps}
                    handleGoNext={() =>
                        currentTrial !== target?.maxTrials
                            ? setCurrentTrial(currentTrial + 1)
                            : setCurrentTrial(target?.maxTrials)
                    }
                />
            ) : null}
        </div>
    );
}
