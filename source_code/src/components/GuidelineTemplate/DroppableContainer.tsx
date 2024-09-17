import * as React from 'react';
import TemplateForm from './TemplateForm';
import { useDrop } from 'react-dnd';
import { ITEM_TYPES } from '../../constants/DraggableItems';
import DroppedItem from './DroppedItem';
import SessionForm from './SessionForm';
import { useLocation } from 'react-router-dom';

export default function DroppableContainer({
    template,
    addNewElement,
    moveListItem,
    deleteElement,
    setActiveElement,
    activeEl,
    setSelectedTab,
    isError,
    isErrorName,
    setIsErrorName,
    setIsError,
    readOnly,
}: {
    template: any;
    addNewElement: any;
    moveListItem: any;
    deleteElement: any;
    setActiveElement: any;
    activeEl: string;
    setSelectedTab: any;
    isError: any;
    isErrorName: any;
    setIsErrorName: any;
    setIsError: any;
    readOnly: any;
}): React.JSX.Element {
    const location = useLocation();
    const isSessionNote = location.pathname.includes('session-note');

    const handleDrop = (item: any): void => {
        setSelectedTab(2);
        addNewElement(item.value);
    };
    const [, drop] = useDrop(() => ({
        accept: [ITEM_TYPES.DRAGGABLE_ITEM],
        drop: handleDrop,
    }));
    return (
        <div className="w-3/5 overflow-y-scroll mb-1 bg-white" ref={drop}>
            <div className={`${readOnly ? 'pointer-events-none' : ''}`}>
                {isSessionNote ? (
                    <SessionForm
                        isError={isError}
                        setIsError={setIsError}
                        isErrorName={isErrorName}
                        setIsErrorName={setIsErrorName}
                    />
                ) : (
                    <TemplateForm
                        isErrorName={isErrorName}
                        setIsErrorName={setIsErrorName}
                    />
                )}
            </div>
            <div
                className={`${isSessionNote ? 'mt-8 mr-10 mb-8 ps-3' : 'm-8'} ${readOnly ? 'pointer-events-none' : ''}`}
            >
                {template?.value?.map((item: any) => {
                    return (
                        <DroppedItem
                            data={item}
                            key={item.id}
                            moveListItem={moveListItem}
                            deleteElement={deleteElement}
                            setActiveElement={setActiveElement}
                            isActive={item.id === activeEl}
                        />
                    );
                })}
            </div>
        </div>
    );
}
