import React, { useEffect, useState } from 'react';
import { INTAKE_DRAGGABLE_ITEMS } from '../../constants/IntakeDraggableItemsData';
import DraggableItem from './IntakeDraggableItem';

export default function IntakeDraggablePanel({
    isSessionNote,
    readOnly,
}: {
    isSessionNote?: any;
    readOnly?: any;
}): React.JSX.Element {
    const [isSessionDiv, setIsSessionDiv] = useState<any>([]);
    useEffect(() => {
        if (!isSessionNote) {
            setIsSessionDiv(INTAKE_DRAGGABLE_ITEMS);
        } else {
            setIsSessionDiv(INTAKE_DRAGGABLE_ITEMS);
        }
    }, []);
    return (
        <div
            className={`${readOnly ? 'pointer-events-none' : ''} w-1/5 flex items-center flex-col mt-8 overflow-auto`}
            data-testid="intake-draggable-panel"
        >
            {isSessionDiv.map((item: any, index: number) => {
                return (
                    <DraggableItem
                        key={index}
                        item={item}
                        isSessionNote={isSessionNote}
                    />
                );
            })}
        </div>
    );
}
