import * as React from 'react';
import DragIcon from '../../assets/img/drag.svg';
import { useDrag } from 'react-dnd';
import { ITEM_TYPES } from '../../constants/DraggableItems';
import SmallTextIcon from '../../assets/img/smallText.svg';
import LargeTextIcon from '../../assets/img/largeText.svg';
import DropdownIcon from '../../assets/img/dropdown.svg';
import MultiSelectIcon from '../../assets/img/multiSelect.svg';
import CalendarIcon from '../../assets/img/calendarInput.svg';
import EditorIcon from '../../assets/img/editor.svg';
import SignatureIcon from '../../assets/img/sign.svg';
import GoalIcon from '../../assets/img/goal.svg';
import SummaryIcon from '../../assets/img/selectSummary.svg';

export default function DraggableItem({
    item,
    isSessionNote,
}: {
    item: any;
    isSessionNote: any;
}): React.JSX.Element {
    const images: any = {
        'smallText.svg': SmallTextIcon,
        'largeText.svg': LargeTextIcon,
        'dropdown.svg': DropdownIcon,
        'multiSelect.svg': MultiSelectIcon,
        'calendar.svg': CalendarIcon,
        ...(isSessionNote
            ? {
                  'editor.svg': EditorIcon,
                  'sign.svg': SignatureIcon,
                  'goal.svg': GoalIcon,
                  'selectSummary.svg': SummaryIcon,
              }
            : {}),
    };
    const [, drag] = useDrag(() => ({
        type: ITEM_TYPES.DRAGGABLE_ITEM,
        item: { ...item },
    }));
    return (
        <div className="flex m-2 w-4/5 cursor-pointer" ref={drag}>
            <img src={DragIcon} alt="drag icon" />
            <div className="bg-white w-full p-3 ml-2 border border-gray-200 flex items-center">
                <img
                    src={images[item.icon]}
                    alt="icon"
                    className="mr-4 w-4 h-4"
                />
                {item.name}
            </div>
        </div>
    );
}
