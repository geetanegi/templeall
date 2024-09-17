const SMALL_TEXT = {
    name: 'smallText',
    label: 'Small Text',
    description: '',
    instructions: '',
    htmlType: 'input',
    type: 'text', //string, number, decimal,
    validations: {
        required: false,
    },
    value: '',
    placeholder: '',
};
const LARGE_TEXT = {
    name: 'largeText',
    label: 'Large Text',
    description: '',
    instructions: '',
    htmlType: 'input',
    type: 'text', //string, number, decimal,
    validations: {
        required: false,
    },
    value: '',
    placeholder: '',
};
const DROPDOWN = {
    name: 'dropdown',
    label: 'Dropdown',
    description: '',
    htmlType: 'select',
    instructions: '',
    options: [],
    type: '', //string, number, decimal,
    validations: {
        required: false,
    },
    value: '',
    placeholder: '',
};
const NUMBER = {
    name: 'number',
    label: 'Number',
    description: '',
    instructions: '',
    htmlType: 'input',
    type: 'number', //string, number, decimal,
    validations: {
        required: false,
    },
    value: '',
    placeholder: '',
};
const DECIMAL = {
    name: 'decimal',
    label: 'Decimal',
    description: '',
    instructions: '',
    htmlType: 'input',
    type: 'decimal', //string, number, decimal,
    validations: {
        required: false,
    },
    value: '',
    placeholder: '',
};
const MULTI_SELECT = {
    name: 'multiselect',
    label: 'Multiselect',
    description: '',
    instructions: '',
    htmlType: 'select',
    options: [],
    type: '', //string, number, decimal,
    validations: {
        required: false,
    },
    value: '',
    placeholder: '',
};
const CALENDAR = {
    name: 'calender',
    label: 'Calender',
    description: '',
    instructions: '',
    htmlType: 'input',
    type: 'date', //string, number, decimal,
    validations: {
        required: false,
    },
    value: '',
    placeholder: '',
};
const EDITOR = {
    name: 'editor',
    label: 'editor',
    description: '',
    instructions: '',
    htmlType: 'input',
    type: 'editor', //string, number, decimal,
    validations: {
        required: false,
    },
    value: '',
    placeholder: '',
};
const SIGNATURE = {
    name: 'signature',
    label: 'signature',
    description: '',
    instructions: '',
    htmlType: 'input',
    type: 'signature', //string, number, decimal,
    validations: {
        required: false,
    },
    value: '',
    placeholder: '',
};
const ShortTermGoal = {
    name: 'shortTermGoal',
    label: 'Short Term Goal',
    description: '',
    instructions: '',
    htmlType: 'input',
    type: '', //string, number, decimal,
    validations: {
        required: false,
    },
    value: '',
    placeholder: '',
    attainmentScale: false,
};
const LongTermGoal = {
    name: 'longTermGoal',
    label: 'Long Term Goal',
    description: '',
    instructions: '',
    htmlType: 'input',
    type: '', //string, number, decimal,
    validations: {
        required: false,
    },
    value: '',
    placeholder: '',
};
const SELECT_SUMMARY = {
    name: 'selectSummary',
    label: 'Select Session Summary ',
    description: '',
    instructions: '',
    htmlType: 'input',
    type: 'button', //string, number, decimal,
    validations: {
        required: false,
    },
    value: '',
    placeholder: 'Select Session Summary ',
};
export const DRAGGABLE_ITEMS = [
    {
        name: 'Small Text',
        icon: 'smallText.svg',
        value: { ...SMALL_TEXT },
    },
    {
        name: 'Large Text',
        icon: 'largeText.svg',
        value: { ...LARGE_TEXT },
    },
    {
        name: 'Dropdown',
        icon: 'dropdown.svg',
        value: { ...DROPDOWN },
    },
    {
        name: 'Number',
        icon: 'smallText.svg',
        value: { ...NUMBER },
    },
    {
        name: 'Decimal',
        icon: 'smallText.svg',
        value: { ...DECIMAL },
    },
    {
        name: 'Multi-select',
        icon: 'multiSelect.svg',
        value: { ...MULTI_SELECT },
    },
    {
        name: 'Calendar',
        icon: 'calendar.svg',
        value: { ...CALENDAR },
    },
    {
        name: 'Editor',
        icon: 'editor.svg',
        value: { ...EDITOR },
    },
    {
        name: 'Signature',
        icon: 'sign.svg',
        value: { ...SIGNATURE },
    },
    {
        name: 'Long Term Goal',
        icon: 'goal.svg',
        value: { ...LongTermGoal },
    },
    {
        name: 'Short Term Goal',
        icon: 'goal.svg',
        value: { ...ShortTermGoal },
    },
    {
        name: 'Select Session Summary',
        icon: 'selectSummary.svg',
        value: { ...SELECT_SUMMARY },
    },
];
export const ITEM_TYPES = {
    DRAGGABLE_ITEM: 'DRAGGABLE_ITEM',
    DROPPED_ITEM: 'DROPPED_ITEM',
    TARGET_ITEM: 'TARGET_ITEM',
    QUICK_LOOK_ITEM: 'QUICK_LOOK_ITEM',
};
export const hint = {
    smallText: 'e.g. a to z',
    largeText: 'e.g. paragraph',
    dropdown: 'e.g. select option',
    number: 'e.g. 0-9',
    decimal: 'e.g. 0.5676',
    multiselect: 'e.g. select multiple option',
    calender: 'e.g. 02/01/2024',
};
