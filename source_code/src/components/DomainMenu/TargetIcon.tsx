import React from 'react';
import percentIcon from '../../assets/img/percentIcon.svg';
import frequencyIcon from '../../assets/img/sessionScreen/Frequency.svg';
import duration from '../../assets/img/duration.svg';
import latencyIcon from '../../assets/img/latency.svg';
import ratingScaleIcon from '../../assets/img/ratingScale.svg';
import scoreIcon from '../../assets/img/score.svg';
import rateIcon from '../../assets/img/sessionScreen/rate.svg';
import firstProbeIcon from '../../assets/img/sessionScreen/firstprobe.svg';
import timeSamplingIcon from '../../assets/img/sessionScreen/timesampling.svg';
import taskAnalysisIcon from '../../assets/img/taskAnalysis.svg';
export default function TargetIcon({
    targetType,
}: {
    targetType: string;
}): React.JSX.Element {
    const iconMap: { [key: string]: { src: string; alt: string } } = {
        percent: { src: percentIcon, alt: 'percentIcon' },
        duration: { src: duration, alt: 'durationIcon' },
        frequency: { src: frequencyIcon, alt: 'frequencyIcon' },
        latency: { src: latencyIcon, alt: 'latencyIcon' },
        score: { src: scoreIcon, alt: 'scoreIcon' },
        'rating scale': { src: ratingScaleIcon, alt: 'ratingScaleIcon' },
        'time sampling': { src: timeSamplingIcon, alt: 'timeSamplingIcon' },
        rate: { src: rateIcon, alt: 'rateIcon' },
        'first probe': { src: firstProbeIcon, alt: 'firstProbeIcon' },
        'task analysis': { src: taskAnalysisIcon, alt: 'taskAnalysisIcon' },
    };
    return (
        <>
            {targetType && iconMap[targetType.toLowerCase()] && (
                <img
                    src={iconMap[targetType.toLowerCase()].src}
                    className="w-3"
                    alt={iconMap[targetType.toLowerCase()].alt}
                />
            )}
        </>
    );
}
