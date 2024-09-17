import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Badge from '../Badge';
import targetsAdded from '../../assets/img/targetsAdded.svg';
import percentIcon from '../../assets/img/percentIcon.svg';
import duration from '../../assets/img/duration.svg';
import frequencyIcon from '../../assets/img/sessionScreen/Frequency.svg';
import latencyIcon from '../../assets/img/latency.svg';
import ratingScaleIcon from '../../assets/img/ratingScale.svg';
import scoreIcon from '../../assets/img/score.svg';
import { removeTargetById } from '../../redux/slice/session/sessionSlice';
import rateIcon from '../../assets/img/sessionScreen/rate.svg';
import firstProbeIcon from '../../assets/img/sessionScreen/firstprobe.svg';
import timeSamplingIcon from '../../assets/img/sessionScreen/timesampling.svg';
import taskAnalysisIcon from '../../assets/img/taskAnalysis.svg';

export default function TargetList(): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const session = useSelector((state: any) => state.session);
    const categories = [
        'percent',
        'duration',
        'frequency',
        'score',
        'latency',
        'ratingScale',
        'timeSampling',
        'rate',
        'firstProbe',
        'taskAnalysis',
        'other',
    ];
    const categoriesArr: any = {
        percent: [],
        duration: [],
        frequency: [],
        score: [],
        latency: [],
        ratingScale: [],
        timeSampling: [],
        rate: [],
        firstProbe: [],
        taskAnalysis: [],
        other: [],
    };
    session.value.targets.forEach((item: any) => {
        if (
            item.targetId
                ? item.targetId.targetType?.toLowerCase() === 'percent'
                : item.targetType?.toLowerCase() === 'percent'
        ) {
            categoriesArr.percent.push(item);
        } else if (
            item.targetId
                ? item.targetId.targetType?.toLowerCase() === 'duration'
                : item.targetType?.toLowerCase() === 'duration'
        ) {
            categoriesArr.duration.push(item);
        } else if (
            item.targetId
                ? item.targetId.targetType?.toLowerCase() === 'frequency'
                : item.targetType?.toLowerCase() === 'frequency'
        ) {
            categoriesArr.frequency.push(item);
        } else if (
            item.targetId
                ? item.targetId.targetType?.toLowerCase() === 'score'
                : item.targetType?.toLowerCase() === 'score'
        ) {
            categoriesArr.score.push(item);
        } else if (
            item.targetId
                ? item.targetId.targetType?.toLowerCase() === 'latency'
                : item.targetType?.toLowerCase() === 'latency'
        ) {
            categoriesArr.latency.push(item);
        } else if (
            item.targetId
                ? item.targetId.targetType?.toLowerCase() === 'rating scale'
                : item.targetType?.toLowerCase() === 'rating scale'
        ) {
            categoriesArr.ratingScale.push(item);
        } else if (
            item.targetId
                ? item.targetId.targetType?.toLowerCase() === 'time sampling'
                : item.targetType?.toLowerCase() === 'time sampling'
        ) {
            categoriesArr.timeSampling.push(item);
        } else if (
            item.targetId
                ? item.targetId.targetType?.toLowerCase() === 'rate'
                : item.targetType?.toLowerCase() === 'rate'
        ) {
            categoriesArr.rate.push(item);
        } else if (
            item.targetId
                ? item.targetId.targetType?.toLowerCase() === 'first probe'
                : item.targetType?.toLowerCase() === 'first probe'
        ) {
            categoriesArr.firstProbe.push(item);
        } else if (
            item.targetId
                ? item.targetId.targetType?.toLowerCase() === 'task analysis'
                : item.targetType?.toLowerCase() === 'task analysis'
        ) {
            categoriesArr.taskAnalysis.push(item);
        } else {
            categoriesArr.other.push(item);
        }
    });
    const removeTargetFromList = (id: any): void => {
        dispatch(removeTargetById(id));
    };
    return (
        <div className="w-full ml-10 h-full overflow-y-scroll">
            {session.value.targets.length ? (
                <>
                    <div className="flex justify-between mt-7">
                        <label className="text-md  flex">
                            <img
                                src={targetsAdded}
                                alt="targetsAdded"
                                className="mr-2"
                            />
                            Targets Added
                        </label>
                    </div>
                    <div
                        className="w-1/2 bg-gradient-to-r mt-1 from-[#48ABCA]
                from-0% to-transparent h-[0.1rem]"
                    >
                        {categories.map((category) => {
                            return categoriesArr[category]?.length ? (
                                <div key={category} className="p-4">
                                    <span className="capitalize flex">
                                        {category?.toLowerCase() ===
                                        'percent' ? (
                                            <img
                                                src={percentIcon}
                                                className="w-4 mr-2"
                                                alt="percentIcon"
                                            />
                                        ) : category?.toLowerCase() ===
                                          'duration' ? (
                                            <img
                                                src={duration}
                                                className="w-4 mr-2"
                                                alt="percentIcon"
                                            />
                                        ) : category?.toLowerCase() ===
                                          'frequency' ? (
                                            <img
                                                src={frequencyIcon}
                                                className="w-4 mr-2"
                                                alt="frequencyIcon"
                                            />
                                        ) : category?.toLowerCase() ===
                                          'latency' ? (
                                            <img
                                                src={latencyIcon}
                                                className="w-4 mr-2"
                                                alt="latencyIcon"
                                            />
                                        ) : category?.toLowerCase() ===
                                          'ratingscale' ? (
                                            <img
                                                src={ratingScaleIcon}
                                                className="w-4 mr-2"
                                                alt="ratingScaleIcon"
                                            />
                                        ) : category?.toLowerCase() ===
                                          'score' ? (
                                            <img
                                                src={scoreIcon}
                                                className="w-4 mr-2"
                                                alt="score"
                                            />
                                        ) : category?.toLowerCase() ===
                                          'timesampling' ? (
                                            <img
                                                src={timeSamplingIcon}
                                                className="w-4 mr-2"
                                                alt="time sampling"
                                            />
                                        ) : category?.toLowerCase() ===
                                          'rate' ? (
                                            <img
                                                src={rateIcon}
                                                className="w-4 mr-2"
                                                alt="rate"
                                            />
                                        ) : category?.toLowerCase() ===
                                          'firstprobe' ? (
                                            <img
                                                src={firstProbeIcon}
                                                className="w-4 mr-2"
                                                alt="firstProbe"
                                            />
                                        ) : category?.toLowerCase() ===
                                          'taskanalysis' ? (
                                            <img
                                                src={taskAnalysisIcon}
                                                className="w-4 mr-2"
                                                alt="taskAnalysis"
                                            />
                                        ) : null}
                                        {category}
                                    </span>
                                    <div className="flex flex-col items-start">
                                        {categoriesArr[category].map(
                                            (target: any) => {
                                                return (
                                                    <Badge
                                                        key={
                                                            target?.targetId
                                                                ?.id ||
                                                            target.id
                                                        }
                                                        title={
                                                            target?.targetId
                                                                ?.name ||
                                                            target.name
                                                        }
                                                        icon={
                                                            <img
                                                                className="w-3 mr-2"
                                                                src={
                                                                    targetsAdded
                                                                }
                                                                alt="targetsAdded"
                                                            />
                                                        }
                                                        handleCancel={() =>
                                                            removeTargetFromList(
                                                                target?.targetId
                                                                    ?.id ||
                                                                    target.id
                                                            )
                                                        }
                                                        targetData={target}
                                                    />
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                            ) : null;
                        })}
                    </div>
                </>
            ) : null}
        </div>
    );
}
