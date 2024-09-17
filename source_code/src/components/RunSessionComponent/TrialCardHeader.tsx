import React from 'react';
import durationIcon from '../../assets/img/sessionScreen/durationIcon.svg';
import percentageIcon from '../../assets/img/sessionScreen/percentageIcon.svg';
import frequencyIcon from '../../assets/img/sessionScreen/Frequency.svg';
import latencyIcon from '../../assets/img/latency.svg';
import ratingScaleIcon from '../../assets/img/ratingScale.svg';
import scoreIcon from '../../assets/img/score.svg';
import rateIcon from '../../assets/img/sessionScreen/rate.svg';
import firstProbeIcon from '../../assets/img/sessionScreen/firstprobe.svg';
import timeSamplingIcon from '../../assets/img/sessionScreen/timesampling.svg';
import taskAnalysisIcon from '../../assets/img/taskAnalysis.svg';
import { ChevronLeft, ChevronRight } from 'lucide-react';
export default function TrialCardHeader({
    target,
    type,
    currentTrial,
    setCurrentTrial,
    noTrials,
    recordTrialResponse,
    disabled,
    hideNavigation,
}: {
    target: any;
    type: string;
    currentTrial: any;
    setCurrentTrial: any;
    noTrials?: boolean;
    recordTrialResponse: any;
    disabled: boolean;
    hideNavigation?: boolean;
}): React.JSX.Element {
    const handleGoBack = (): void => {
        if (currentTrial === 1) {
            setCurrentTrial(1);
        } else {
            setCurrentTrial(currentTrial - 1);
            recordTrialResponse(currentTrial - 1, {
                prompts: '',
            });
        }
    };
    const maxTrials = target?.timeSamplingIntervals
        ? target?.timeSamplingIntervals
        : target?.maxTrials;
    const iconMap: any = {
        Percent: { src: percentageIcon, alt: 'Percentage' },
        Duration: { src: durationIcon, alt: 'Duration' },
        'Rating Scale': {
            src: ratingScaleIcon,
            alt: 'Rating Scale Icon',
            className: 'w-4 h-4',
        },
        Latency: {
            src: latencyIcon,
            alt: 'Latency Icon',
            className: 'w-4 h-4',
        },
        Score: { src: scoreIcon, alt: 'Score Icon', className: 'w-4 h-4' },
        Frequency: { src: frequencyIcon, alt: 'Frequency' },
        rate: { src: rateIcon, alt: 'Rate', className: 'w-4 h-4' },
        'First Probe': {
            src: firstProbeIcon,
            alt: 'First Probe',
            className: 'w-4 h-4',
        },
        'Time Sampling': {
            src: timeSamplingIcon,
            alt: 'Time Sampling',
            className: 'w-4 h-4',
        },
        'Task Analysis': {
            src: taskAnalysisIcon,
            alt: 'Task Analysis Icon',
            className: 'w-4 h-4',
        },
    };
    const iconProps = iconMap[target?.targetType] || {};
    return (
        <div
            className={`flex flex-col ${type.toLowerCase() === 'task analysis' ? 'p-4' : ''}`}
        >
            <div className="flex justify-between items-center">
                <div className="text-gray-600">
                    <span className="text-[18px] capitalize flex items-center">
                        {iconProps.src && <img {...iconProps} />}
                        Target Name: {target.name}
                    </span>
                </div>
                <div className="text-[13px] text-gray-600 capitalize flex"></div>
            </div>
            <div className="flex justify-between mt-2 mb-2 items-start">
                <div className="text-[14px] font-light max-w-[300px] ml-5">
                    <div>
                        <span>Program Name:</span>
                        <span className="text-wrap">
                            &nbsp;{target?.programName || ''}
                        </span>
                    </div>
                    <div className="flex text-[12px] items-center">
                        <div className="mr-1 text-[14px]">
                            Trial:{' '}
                            <span className="text-gray-600">
                                {currentTrial}
                            </span>
                        </div>
                        {!noTrials ? (
                            <>
                                <div className="text-primary-600">
                                    Max Trial:
                                    <span className="text-gray-600">
                                        {maxTrials || <span>&infin;</span>}
                                    </span>
                                </div>
                            </>
                        ) : null}
                    </div>
                </div>
                {noTrials || hideNavigation ? null : (
                    <div>
                        <button
                            data-testid="percentage-back-button"
                            onClick={handleGoBack}
                            disabled={disabled}
                            type="button"
                            className="disabled:cursor-not-allowed bg-gray-100 mr-1 py-1 px-2 inline-flex items-center gap-x-2 text-xs font-semibold border border-gray-100 text-gray-400 hover:border-gray-500 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none"
                        >
                            <ChevronLeft />
                        </button>
                        <button
                            disabled={disabled}
                            onClick={() =>
                                currentTrial !== maxTrials
                                    ? setCurrentTrial(currentTrial + 1)
                                    : undefined
                            }
                            type="button"
                            className="disabled:cursor-not-allowed bg-gray-100 mr-1 py-1 px-2 inline-flex items-center gap-x-2 text-xs font-semibold border border-gray-100 text-gray-400 hover:border-gray-500 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none"
                        >
                            <ChevronRight />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
