import * as React from 'react';

import { useDrag } from 'react-dnd';
import { ITEM_TYPES } from '../../constants/IntakeDraggableItemsData';
import SmallTextIcon from '../../assets/img/smallText.svg';
import LargeTextIcon from '../../assets/img/largeText.svg';
import DropdownIcon from '../../assets/img/dropdown.svg';
import MultiSelectIcon from '../../assets/img/multiSelect.svg';
import CalendarIcon from '../../assets/img/calendarInput.svg';
import EditorIcon from '../../assets/img/editor.svg';
import SignatureIcon from '../../assets/img/sign.svg';
import QuestionIcon from '../../assets/img/questionBank.svg';
import DragIcon from '../../assets/img/drag.svg';

export default function DraggableItem({
    item,
    // isSessionNote,
}: {
    item?: any;
    isSessionNote?: any;
}): React.JSX.Element {
    const images: any = {
        'smallText.svg': SmallTextIcon,
        'largeText.svg': LargeTextIcon,
        'dropdown.svg': DropdownIcon,
        'multiSelect.svg': MultiSelectIcon,
        'calendar.svg': CalendarIcon,
        'editor.svg': EditorIcon,
        'sign.svg': SignatureIcon,
        'questionBank.svg': QuestionIcon,
    };
    const [, drag] = useDrag(() => ({
        type: ITEM_TYPES.INTAKE_DRAGGABLE_ITEMS,
        item: { ...item },
    }));
    return (
        <div
            className="flex m-2 w-4/5 cursor-pointer"
            ref={drag}
            data-testid="intake-draggable-item"
        >
            <img src={DragIcon} alt="drag icon" />
            <div className="bg-white w-full p-3 ml-2 border border-gray-200 flex items-center">
                <img
                    src={images[item?.icon]}
                    alt="icon"
                    className="mr-4 w-4 h-4"
                />
                {item?.name}
            </div>
        </div>
    );
}
