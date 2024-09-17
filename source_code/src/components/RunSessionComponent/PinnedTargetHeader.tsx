import React from 'react';
import { Pin } from 'lucide-react';
import durationIcon from '../../assets/img/sessionScreen/durationIcon.svg';
import percentageIcon from '../../assets/img/sessionScreen/percentageIcon.svg';
import frequencyIcon from '../../assets/img/sessionScreen/Frequency.svg';
import latencyIcon from '../../assets/img/latency.svg';
import ratingScaleIcon from '../../assets/img/ratingScale.svg';
import scoreIcon from '../../assets/img/score.svg';
import rateIcon from '../../assets/img/sessionScreen/rate.svg';
import firstProbeIcon from '../../assets/img/sessionScreen/firstprobe.svg';
import timeSamplingIcon from '../../assets/img/sessionScreen/timesampling.svg';
export default function PinnedTargetHeader({
    currentTrial,
    target,
    type,
    noTrials,
    handleOpenViewDetail,
}: {
    currentTrial: number;
    target: any;
    type: string;
    noTrials?: boolean;
    handleOpenViewDetail?: any;
}): React.JSX.Element {
    const iconMap: { [key: string]: { src: string; alt: string } } = {
        percentage: { src: percentageIcon, alt: 'Percentage' },
        duration: { src: durationIcon, alt: 'Duration' },
        latency: { src: latencyIcon, alt: 'Latency' },
        'rating scale': { src: ratingScaleIcon, alt: 'Rating Scale Icon' },
        score: { src: scoreIcon, alt: 'Score Icon' },
        frequency: { src: frequencyIcon, alt: 'Frequency' },
        rate: { src: rateIcon, alt: 'Rate' },
        'first probe': { src: firstProbeIcon, alt: 'First Probe' },
        'time sampling': { src: timeSamplingIcon, alt: 'Time Sampling' },
    };
    const iconType = type?.toLocaleLowerCase();
    const iconData = iconMap[iconType] || iconMap[type];
    return (
        <div className="flex justify-between items-center mt-2 mx-4 font-light text-[14px]">
            <div className="flex">
                <Pin />
                <span className="ml-2 capitalize">Target: {target.name}</span>
            </div>
            {!noTrials && (
                <div>
                    <span>Trial&nbsp;</span>
                    <span>
                        {currentTrial} /{' '}
                        {target.maxTrials || <span>&infin;</span>}
                    </span>
                </div>
            )}
            <div className="flex items-center">
                {iconData && (
                    <div className="text-sm capitalize">
                        <img
                            src={iconData.src}
                            alt={iconData.alt}
                            className="w-4 h-4"
                        />
                    </div>
                )}
                <div
                    onClick={handleOpenViewDetail}
                    className="text-primary-800 ml-4 font-semibold cursor-pointer hover:text-primary-700"
                >
                    View Details
                </div>
            </div>
        </div>
    );
}
