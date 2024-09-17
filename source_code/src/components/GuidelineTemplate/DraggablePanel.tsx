import React, { useEffect, useState } from 'react';
import { DRAGGABLE_ITEMS } from '../../constants/DraggableItems';
import DraggableItem from './DraggableItem';

export default function DraggablePanel({
    isSessionNote,
    readOnly,
}: {
    isSessionNote: any;
    readOnly: any;
}): React.JSX.Element {
    const [isSessionDiv, setIsSessionDiv] = useState<any>([]);
    useEffect(() => {
        if (!isSessionNote) {
            setIsSessionDiv(DRAGGABLE_ITEMS.slice(0, -5));
        } else {
            setIsSessionDiv(DRAGGABLE_ITEMS);
        }
    }, []);
    return (
        <div
            className={`${readOnly ? 'pointer-events-none' : ''} w-1/5 flex items-center flex-col mt-8 overflow-auto`}
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
