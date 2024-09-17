import React, { useState } from 'react';
import DurationTrialCard from './DurationTrialCard';
import PercentageTrialCard from './PercentageTrialCard';
import sessionApis from '../../api/services/session.service';
import { useDispatch, useSelector } from 'react-redux';
import { setTrialsForTarget } from '../../redux/slice/runSession/runSessionSlice';
import ViewDetailPercent from './ViewDetails/ViewDetail';
import FrequencyTrialCard from './FrequencyTrialCard';
import RatingScaleTrialCard from './RatingScaleTrialCard';
import ScoreTrialCard from './ScoreTrialCard';
import RateTrialCard from './RateTrialCard';
import FirstProbeTrialCard from './FirstProbeTrialCard';
import TimeSamplingTrialCard from './TimeSamplingTrialCard';
import TaskAnalysisTrialCard from './TaskAnalysisTrialCard';
export default function TargetCard({
    target,
    sessionId,
    phase,
    isPinned,
    sessionRunId,
}: {
    target: any;
    sessionId: string;
    phase: string;
    isPinned?: boolean;
    sessionRunId: string;
}): React.JSX.Element {
    const [openViewModal, setOpenViewModal] = useState(false);
    const [savingTrial, setSavingTrial] = useState(false);
    const handleOpenViewDetail = (): void => {
        setOpenViewModal(true);
    };
    const handleCloseViewDetail = (): void => {
        setOpenViewModal(false);
    };
    const allTrials = useSelector(
        (state: any) => state.runSession.value.trials
    );
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const trials = allTrials[target.id]?.data || [];
    const currentTrial = allTrials[target.id]?.currentTrial || 1;
    const dispatch = useDispatch<any>();
    const setTrials = (data: any): void => {
        dispatch(
            setTrialsForTarget({
                targetId: target.id,
                data: {
                    data,
                },
            })
        );
    };
    const setCurrentTrial = (count: any): void => {
        dispatch(
            setTrialsForTarget({
                targetId: target.id,
                data: {
                    currentTrial: count,
                },
            })
        );
    };
    const saveTrial = (data: any, trialsArr: any): void => {
        (async () => {
            setSavingTrial(true);
            const response = await sessionApis.saveTrial({
                ...data,
            });
            const trialData = [...trialsArr];
            trialData[data.trailCount - 1] = {
                ...data,
                trialId: response.data.data.id,
            };
            setTrials(trialData);
            setSavingTrial(false);
        })();
    };
    const saveTrialForTaskAnalysis = (data: any, trialsArr: any): void => {
        (async () => {
            try {
                const response = await sessionApis.saveTrialForTaskAnalysis({
                    ...data,
                });
                const trialData = [...trialsArr];
                trialData[data.trailCount - 1] = {
                    ...data,
                    trialId: response?.data?.data?.id || '',
                };
                setTrials(trialData);
                setSavingTrial(false);
            } catch (error) {}
        })();
    };
    const recordTrialResponse = (
        trialCount: number,
        data: any,
        isTaskAnalysis: boolean = false
    ): void => {
        const responseTrial = trials?.length
            ? [...trials]
            : [
                  {
                      commentsId: '',
                      sessionId: sessionId,
                      targetId: target.id,
                      phaseCount: target.masteryCriteriaPhaseIndexCount,
                      comments: '',
                      prompts: '',
                      frequency: '',
                      phase: phase,
                      trailCount: `${trialCount}`,
                      duration: '',
                      positiveCount: '',
                      negativeCount: '',
                      createdBy: userPermission?.value?.data?.userId || 1,
                      modifiedBy: userPermission?.value?.data?.userId || 1,
                      sessionRunId: sessionRunId,
                      currentTrial: trialCount,
                  },
              ];
        responseTrial[currentTrial - 1] = {
            commentsId: '',
            comments: '',
            prompts: '',
            frequency: '',
            phase: phase,
            duration: '',
            ...responseTrial?.[currentTrial - 1],
            trialId: responseTrial?.[currentTrial - 1]?.trialId
                ? responseTrial?.[currentTrial - 1]?.trialId || ''
                : responseTrial?.[currentTrial - 1]?.id || '',
            trailCount: `${trialCount}`,
            sessionId: `${sessionId}`,
            targetId: `${target.id}`,
            phaseCount: target.masteryCriteriaPhaseIndexCount,
            sessionRunId: `${sessionRunId}`,
            currentTrial: trialCount,
            createdBy: userPermission?.value?.data?.userId || 1,
            modifiedBy: userPermission?.value?.data?.userId || 1,
            ...data,
        };
        if (isTaskAnalysis) {
            saveTrialForTaskAnalysis(
                responseTrial[currentTrial - 1],
                responseTrial
            );
        } else {
            saveTrial(responseTrial[currentTrial - 1], responseTrial);
        }
    };
    const handleTrialChange = (trialCount: number): void => {
        if (!trials[trialCount - 1]) {
            setTrials([
                ...trials,
                {
                    commentsId: '',
                    sessionId: sessionId,
                    targetId: target.id,
                    phaseCount: target.masteryCriteriaPhaseIndexCount,
                    sessionRunId: `${sessionRunId}`,
                    comments: '',
                    prompts: '',
                    frequency: '',
                    phase: phase,
                    trailCount: trialCount,
                    duration: '',
                    positiveCount: '',
                    negativeCount: '',
                    createdBy: userPermission?.value?.data?.userId || 1,
                    modifiedBy: userPermission?.value?.data?.userId || 1,
                    currentTrial: trialCount,
                },
            ]);
        }
        setCurrentTrial(trialCount);
    };
    return (
        <>
            {target?.targetType?.toLowerCase() === 'percent' ? (
                <PercentageTrialCard
                    target={target}
                    key={target.id}
                    isPinned={isPinned}
                    currentTrial={currentTrial}
                    setCurrentTrial={handleTrialChange}
                    trialResponse={trials?.[currentTrial - 1]?.prompts || ''}
                    recordTrialResponse={recordTrialResponse}
                    handleOpenViewDetail={handleOpenViewDetail}
                    savingTrial={savingTrial}
                    hasTrialId={trials?.[currentTrial - 1]?.trialId || ''}
                />
            ) : target?.targetType?.toLowerCase() === 'duration' ||
              target?.targetType?.toLowerCase() === 'latency' ? (
                <DurationTrialCard
                    target={target}
                    key={target.id}
                    isPinned={isPinned}
                    currentTrial={currentTrial}
                    setCurrentTrial={handleTrialChange}
                    trialResponse={trials?.[currentTrial - 1]?.duration || '0'}
                    recordTrialResponse={recordTrialResponse}
                    handleOpenViewDetail={handleOpenViewDetail}
                    savingTrial={savingTrial}
                    hasTrialId={trials?.[currentTrial - 1]?.trialId || ''}
                />
            ) : target?.targetType?.toLowerCase() === 'frequency' ? (
                <FrequencyTrialCard
                    target={target}
                    key={target.id}
                    isPinned={isPinned}
                    currentTrial={currentTrial}
                    setCurrentTrial={handleTrialChange}
                    trialResponse={trials?.[currentTrial - 1]?.frequency || '0'}
                    recordTrialResponse={recordTrialResponse}
                    handleOpenViewDetail={handleOpenViewDetail}
                    savingTrial={savingTrial}
                />
            ) : target?.targetType?.toLowerCase() === 'rating scale' ? (
                <RatingScaleTrialCard
                    target={target}
                    key={target.id}
                    isPinned={isPinned}
                    currentTrial={currentTrial}
                    setCurrentTrial={handleTrialChange}
                    trialResponse={trials?.[currentTrial - 1]?.frequency || '0'}
                    recordTrialResponse={recordTrialResponse}
                    handleOpenViewDetail={handleOpenViewDetail}
                    savingTrial={savingTrial}
                    hasTrialId={trials?.[currentTrial - 1]?.trialId || ''}
                />
            ) : target?.targetType?.toLowerCase() === 'score' ? (
                <ScoreTrialCard
                    target={target}
                    key={target.id}
                    isPinned={isPinned}
                    currentTrial={currentTrial}
                    setCurrentTrial={handleTrialChange}
                    trialResponse={trials?.[currentTrial - 1]?.frequency || '0'}
                    recordTrialResponse={recordTrialResponse}
                    handleOpenViewDetail={handleOpenViewDetail}
                    savingTrial={savingTrial}
                    hasTrialId={trials?.[currentTrial - 1]?.trialId || ''}
                />
            ) : target?.targetType?.toLowerCase() === 'rate' ? (
                <RateTrialCard
                    target={target}
                    key={target.id}
                    isPinned={isPinned}
                    currentTrial={currentTrial}
                    setCurrentTrial={handleTrialChange}
                    trialResponse={trials?.[currentTrial - 1]?.duration || '0'}
                    frequencyTrialResponse={
                        trials?.[currentTrial - 1]?.frequency || '0'
                    }
                    recordTrialResponse={recordTrialResponse}
                    handleOpenViewDetail={handleOpenViewDetail}
                    savingTrial={savingTrial}
                    hasTrialId={trials?.[currentTrial - 1]?.trialId || ''}
                />
            ) : target?.targetType?.toLowerCase() === 'first probe' ? (
                <FirstProbeTrialCard
                    target={target}
                    key={target.id}
                    isPinned={isPinned}
                    currentTrial={currentTrial}
                    setCurrentTrial={handleTrialChange}
                    recordTrialResponse={recordTrialResponse}
                    handleOpenViewDetail={handleOpenViewDetail}
                    savingTrial={savingTrial}
                    hasTrialId={trials?.[currentTrial - 1]?.trialId || ''}
                />
            ) : target?.targetType?.toLowerCase() === 'time sampling' ? (
                <TimeSamplingTrialCard
                    target={target}
                    key={target.id}
                    isPinned={isPinned}
                    currentTrial={currentTrial}
                    setCurrentTrial={handleTrialChange}
                    trialResponse={trials?.[currentTrial - 1]?.duration || '0'}
                    frequencyTrialResponse={
                        trials?.[currentTrial - 1]?.positiveCount === 1
                            ? 'yes'
                            : trials?.[currentTrial - 1]?.negativeCount === 1
                              ? 'no'
                              : ''
                    }
                    recordTrialResponse={recordTrialResponse}
                    handleOpenViewDetail={handleOpenViewDetail}
                    savingTrial={savingTrial}
                    hasTrialId={trials?.[currentTrial - 1]?.trialId || ''}
                />
            ) : target?.targetType?.toLowerCase() === 'task analysis' ? (
                <TaskAnalysisTrialCard
                    key={target.id}
                    target={target}
                    isPinned={isPinned}
                    currentTrial={currentTrial}
                    setCurrentTrial={handleTrialChange}
                    trialResponse={trials?.[currentTrial - 1]?.response || []}
                    recordTrialResponse={recordTrialResponse}
                    handleOpenViewDetail={handleOpenViewDetail}
                    savingTrial={savingTrial}
                    hasTrialId={trials?.[currentTrial - 1]?.trialId || ''}
                    phase={phase}
                />
            ) : null}
            {openViewModal && (
                <ViewDetailPercent
                    currentTrial={currentTrial}
                    target={target}
                    open={openViewModal}
                    onClose={handleCloseViewDetail}
                />
            )}
        </>
    );
}
