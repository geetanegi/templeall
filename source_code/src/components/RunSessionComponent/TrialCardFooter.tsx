import React from 'react';

export default function TrialCardFooter({
    target,
    handleOpenViewDetail,
    type,
    openModal,
    disableAllSteps,
}: {
    target: any;
    handleOpenViewDetail?: any;
    type?: string;
    openModal?: any;
    disableAllSteps?: boolean;
}): React.JSX.Element {
    return (
        <>
            <div
                className={`flex justify-between items-center ${type === 'task analysis' ? 'p-4' : ''}`}
            >
                <div className="w-1/2 text-sm">
                    {target.sdInstructions || ''}
                </div>
                {type === 'task analysis' ? (
                    <div
                        className={`font-semibold text-[#0E4B5D] hover:text-primary-700 text-sm ${disableAllSteps ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                        onClick={() =>
                            disableAllSteps ? undefined : openModal()
                        }
                    >
                        All Steps
                    </div>
                ) : null}
                <div
                    className={
                        type === 'task analysis'
                            ? 'border-l border-gray-400'
                            : ''
                    }
                >
                    <button
                        data-testid="view-details-button"
                        onClick={handleOpenViewDetail}
                        type="button"
                        className="font-semibold py-3 px-4 inline-flex items-center gap-x-2 text-sm rounded-lg border border-transparent text-[#0E4B5D] hover:text-primary-700 disabled:opacity-50 disabled:pointer-events-none"
                    >
                        View Details
                    </button>
                </div>
            </div>
        </>
    );
}
