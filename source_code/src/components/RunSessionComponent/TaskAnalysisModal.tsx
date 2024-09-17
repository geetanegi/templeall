import React from 'react';
import Modal, { ModalBody, TaskAnalysisModalFooter } from '../Generics/Modal';
import taskAnalysisIcon from '../../assets/img/taskAnalysis.svg';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { PromptBadge } from './PercentageTrialCard';

const StepCard = ({
    step,
    index,
    handleBadgeClick,
    disabledAction,
    response,
    disableAllSteps,
}: {
    step: any;
    index: number;
    handleBadgeClick: any;
    disabledAction: boolean;
    response: any;
    disableAllSteps: boolean;
}): React.JSX.Element => {
    const getPrompts = (data: any): any => {
        return data?.prompts ? JSON.parse(data?.prompts) : [];
    };
    const handleClick = (prompt: string): void => {
        handleBadgeClick(prompt, step.data.id);
    };
    const isStepDisabled =
        step.disabled || (disableAllSteps && !response?.prompts);
    return (
        <>
            <div className="border border-gray-300 my-4 rounded relative">
                {isStepDisabled ? (
                    <div className="absolute w-full h-full bg-gray-100 opacity-50"></div>
                ) : null}
                <div className="w-full  p-4">
                    <div className="w-full font-semibold">
                        Step {index + 1}:
                    </div>
                    <div className="w-full font-thin border-b mb-3">
                        {step.data.description}
                    </div>
                    {getPrompts(step.data).map(
                        (prompt: string, key: number) => {
                            return (
                                <PromptBadge
                                    selected={
                                        response?.prompts
                                            ? response?.prompts === prompt
                                            : false
                                    }
                                    key={key}
                                    prompt={prompt}
                                    handleBadgeClick={handleClick}
                                    disabled={disabledAction}
                                />
                            );
                        }
                    )}
                </div>
            </div>
        </>
    );
};

export default function TaskAnalysisModal({
    target,
    onClose,
    handleBadgeClick,
    disabledAction,
    response,
    handleSave,
    savingTrial,
    currentTrial,
    handleGoBack,
    handleGoNext,
    disableAllSteps,
}: {
    target: any;
    onClose: any;
    handleBadgeClick: any;
    disabledAction: any;
    response: any;
    handleSave: any;
    savingTrial: boolean;
    currentTrial: any;
    handleGoBack: any;
    handleGoNext: any;
    disableAllSteps: boolean;
}): React.JSX.Element {
    const maxTrials = target?.timeSamplingIntervals
        ? target?.timeSamplingIntervals
        : target?.maxTrials;
    const enabledSteps = target.steps.filter(
        (step: any) =>
            !(
                step.disabled ||
                (disableAllSteps && !response?.[step.data.id]?.prompts)
            )
    );
    const isSaveDisabled = (): boolean => {
        return response
            ? Object.keys(response).length < enabledSteps.length
            : true;
    };
    return (
        <Modal
            open={true}
            id={''}
            expandModal={false}
            className="mx-0 left-[82vw] my-16"
        >
            <ModalBody expandModal={false} className="w-[40vw]">
                <div className="flex flex-col">
                    <div className="flex justify-between items-center">
                        <div className="flex">
                            <div>
                                <img
                                    src={taskAnalysisIcon}
                                    alt="task analysis icon"
                                />
                            </div>
                            <div className="flex flex-col ml-3">
                                <span className="text-[16px] font-regular">
                                    Target Name: {target.name}
                                </span>
                                <span className="text-[14px] font-light">
                                    Program Name: {target?.programName || ''}
                                </span>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex flex-col">
                                <div className="font-thin">
                                    <span>Trial: {currentTrial}</span>
                                    <span className="ml-3">
                                        <span className="text-primary-600">
                                            Max Trial
                                        </span>
                                        : {maxTrials || <span>&infin;</span>}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <button
                                        disabled={disabledAction}
                                        onClick={handleGoBack}
                                        type="button"
                                        className="bg-gray-100 flex-grow mr-1 py-1 px-2 inline-flex justify-center items-center gap-x-2 text-xs font-semibold border border-gray-100 text-gray-400 hover:border-gray-500 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none"
                                    >
                                        <ChevronLeft />
                                    </button>
                                    <button
                                        disabled={disabledAction}
                                        onClick={handleGoNext}
                                        type="button"
                                        className="bg-gray-100 flex-grow mr-1 py-1 px-2 inline-flex  justify-center items-center gap-x-2 text-xs font-semibold border border-gray-100 text-gray-400 hover:border-gray-500 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none"
                                    >
                                        <ChevronRight />
                                    </button>
                                </div>
                            </div>
                            <div className="ml-5">
                                <X
                                    className="cursor-pointer"
                                    onClick={onClose}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-6">
                        {target.steps.map((step: any, index: number) => {
                            return (
                                <StepCard
                                    key={index}
                                    index={index}
                                    step={step}
                                    handleBadgeClick={handleBadgeClick}
                                    disabledAction={disabledAction}
                                    disableAllSteps={disableAllSteps}
                                    response={response?.[step.data.id] || {}}
                                />
                            );
                        })}
                    </div>
                </div>
            </ModalBody>
            <TaskAnalysisModalFooter
                onClose={onClose}
                handleSubmit={handleSave}
                saveLoading={savingTrial}
                saveDisabled={isSaveDisabled()}
            />
        </Modal>
    );
}
