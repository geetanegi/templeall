import React from 'react';
import TargetCard from './TargetCard';
import { ArrowLeft, Pin } from 'lucide-react';

export default function PinnedTargets({
    pinnedTargets,
    sessionId,
    phase,
    sessionRunId,
}: {
    pinnedTargets: any;
    sessionId: string;
    phase: string;
    sessionRunId: string;
}): React.JSX.Element {
    return (
        <div className="fixed bottom-0 w-full left-0 flex bg-white items-center flex-wrap shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
            <div className="flex p-4 bg-primary-700 text-white rounded-r-full w-[10%] justify-between">
                <Pin />
                <span className="mx-4">ABC</span>
                <ArrowLeft />
            </div>
            <div className="flex flex-wrap justify-start w-[90%] max-h-[160px] overflow-y-scroll">
                {pinnedTargets?.map((target: any) => {
                    return (
                        <div key={target.id} className="w-1/3">
                            <TargetCard
                                isPinned={true}
                                target={target}
                                sessionId={sessionId}
                                phase={phase}
                                sessionRunId={sessionRunId}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
