import React, { useState, useEffect } from 'react';
import SessionTimer from './SessionTimer';
import ParameterCard from './ParameterCard';
import SessionTypeTabs from './SessionTypeTabs';
import { getSessionTargets } from '../../redux/slice/runSession/runSessionSlice';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TargetCard from './TargetCard';
import PinnedTargets from './PinnedTargets';
import LoaderComponent from '../LoaderComponent';
interface TargetType {
    id: string;
    targetLocation: string; // adjust the type accordingly
    // ... other properties
}
interface Target {
    id: string;
    targetLocation: string;
    targetType: string;
    // Other properties
}
export default function RunSessionComponent(): React.JSX.Element {
    const [activeTab, setActiveTab] = useState('Baseline');
    const runSession = useSelector((state: any) => state.runSession);
    const params = useParams();
    const dispatch = useDispatch<any>();
    useEffect(() => {
        dispatch(
            getSessionTargets({
                sessionId: params.id,
                type: activeTab,
            })
        );
    }, [activeTab]);

    return (
        <div className="mt-4 flex flex-col">
            <div className="flex mx-10">
                <SessionTimer />
                <ParameterCard />
            </div>
            <div className="relative">
                {runSession.loading ? (
                    <LoaderComponent />
                ) : (
                    <>
                        <div className="mx-10 ">
                            <SessionTypeTabs
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            />
                            <div className="flex flex-wrap items-center  mb-[200px]">
                                {Array.isArray(runSession?.value?.targets) ? (
                                    runSession.value.targets
                                        .filter(
                                            (targetItem: any) =>
                                                targetItem.targetLocation?.toLowerCase() !==
                                                'pinned'
                                        )
                                        .map((target: TargetType) => (
                                            <TargetCard
                                                target={target}
                                                key={target.id}
                                                sessionRunId={
                                                    runSession.value.session
                                                        ?.id || ''
                                                }
                                                sessionId={params.id || ''}
                                                phase={activeTab}
                                            />
                                        ))
                                ) : (
                                    <p>No targets available</p>
                                )}
                            </div>
                        </div>
                        <PinnedTargets
                            sessionId={params.id || ''}
                            phase={activeTab}
                            sessionRunId={runSession?.value?.session?.id || ''}
                            pinnedTargets={
                                Array.isArray(runSession?.value?.targets)
                                    ? runSession?.value?.targets.filter(
                                          (targetItem: Target) =>
                                              targetItem.targetLocation?.toLowerCase() ===
                                              'pinned'
                                      )
                                    : []
                            }
                        />
                    </>
                )}
            </div>
        </div>
    );
}
