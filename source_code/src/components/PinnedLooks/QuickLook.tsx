import React from 'react';
import cross from '../../assets/img/crossBadge.svg';
import { ITEM_TYPES } from '../../constants/DraggableItems';
import { useDrop } from 'react-dnd';
export default function QuickLook({
    name,
    isLastItem,
    updateConfiguration,
    quickLookId,
    targets,
    removeTarget,
}: {
    name?: string;
    quickLookId?: string;
    updateConfiguration?: any;
    isLastItem?: boolean;
    targets?: any;
    removeTarget?: any;
}): React.JSX.Element {
    const handleDrop = (item: any): void => {
        updateConfiguration(item, quickLookId);
    };
    const [, drop] = useDrop({
        accept: [ITEM_TYPES.TARGET_ITEM],
        drop: handleDrop,
    });
    const handleRemove = (targetId: string): void => {
        removeTarget(targetId, quickLookId);
    };
    return (
        <>
            <div
                ref={drop}
                className={`w-1/2 flex flex-col`}
                data-testid="quick-look-page"
            >
                <div className="flex border-b-2 border-gray-300 w-full pl-3 pb-1">
                    <label className="text-medium font-medium">{name}</label>
                </div>
                <div
                    className={`h-[42rem] flex flex-col space-y-5 px-3 ${isLastItem ? '' : 'border-r-2 border-gray-300'} `}
                >
                    <div className="mt-3">
                        <label className="text-medium font-light">
                            Targets in {name}
                        </label>
                    </div>
                    {/* Target Names */}
                    <div className="flex flex-col space-y-3">
                        {targets?.map((target: any) => {
                            return (
                                <div
                                    key={target.id}
                                    className="flex space-x-3 bg-gray-100 rounded-full w-max px-5 py-2 cursor-pointer hover:bg-primary-600 hover:text-white"
                                >
                                    <label className="text-sm font-light">
                                        {target.name}
                                    </label>
                                    <img
                                        onClick={() => handleRemove(target.id)}
                                        data-testid={`handle-remove-target-${target?.id}`}
                                        className="cursor-pointer rounded-full px-1 hover:bg-white"
                                        src={cross}
                                        alt="clear search"
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
