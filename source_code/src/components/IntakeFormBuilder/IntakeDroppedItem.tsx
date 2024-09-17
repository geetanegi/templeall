/* eslint-disable max-len */
import * as React from 'react';
import Input from '../Generics/Inputs/Input';
import DeleteEditorIcon from '../../assets/img/close.svg';
import deleteIcon from '../../assets/img/GridIcons/delete.svg';
import SummaryIcon from '../../assets/img/selectSummary.svg';

import DragIcon from '../../assets/img/drag.svg';
import { useDrag, useDrop } from 'react-dnd';
import { ITEM_TYPES } from '../../constants/IntakeDraggableItemsData';
import { updateElement } from '../../redux/slice/IntakeEditor/intakeEditor';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import JoditReact from 'jodit-react-ts';
import 'jodit/build/jodit.min.css';
import ClientProviderDropdown from '../GuidelineTemplate/ClientProviderDropdown';
import { parameterData } from '../../constants/AddDynamicIntakeVariable';
import TherapySelector from './QuestionFilterTheraphy';
import QuestionsPanel from './QuestionBank';
// import { Field } from 'formik';

export default function IntakeDroppedItem({
    data,
    moveListItem,
    deleteElement,
    setActiveElement,
    isActive,
    setFilterCard,
    cards,
    therapy,
    selectedQuestions,
    updatedQuestion,
    setUpdatedQuestion,
    setSelectedQuestions,
    setSelectedTab,
    showQuestion,
    editorCount,
    setEditorCount,
}: {
    data: any;
    moveListItem: any;
    deleteElement: any;
    setActiveElement: any;
    isActive: boolean;
    setFilterCard: any;
    cards?: any;
    therapy?: any;
    selectedQuestions?: any;
    updatedQuestion?: any;
    setUpdatedQuestion?: any;
    setSelectedQuestions?: any;
    setSelectedTab?: any;
    showQuestion?: any;
    editorCount?: any;
    setEditorCount?: any;
}): React.JSX.Element {
    const dispatch = useDispatch();
    const location = useLocation();

    const isSessionNote = location.pathname.includes('session-note');
    const ref: any = React.useRef<HTMLDivElement>(null);
    // const template = useSelector((state: any) => state?.intakeEditor?.value);

    const [richTextContent, setRichTextContent] = React.useState<any>(null);
    const numb = React.useRef<number>(editorCount || 0);

    const [, drag] = useDrag(() => ({
        type: ITEM_TYPES.DROPPED_ITEM,
        item: { ...data, action: 'move' },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    React.useEffect(() => {
        if (data.name === 'editor') {
            numb.current = editorCount || 0;
            const textarea = document.getElementsByClassName('jodit-wysiwyg')[
                numb.current
            ] as HTMLElement;
            setEditorCount((prev: any) => ++prev);
            setTimeout(() => {
                if (textarea) {
                    textarea.focus();
                }
            }, 0);
        }
    }, [data.name]);

    React.useEffect(() => {
        if (data?.name === 'signature') {
            setSelectedTab(1);

            dispatch(
                updateElement({
                    id: data.id,
                    data: {
                        validations: { required: true },
                    },
                })
            );
        }
    }, [data?.name, data.id, dispatch]);

    const handleLabelChange = (e: any): void => {
        dispatch(
            updateElement({ id: data.id, data: { label: e.target.value } })
        );
    };
    const handleRichTextChange = (e: any): void => {
        dispatch(updateElement({ id: data.id, data: { value: e } }));
    };

    function removeLastBrElement(textarea: any): any {
        let currentElement = textarea;

        // Traverse to the last element according to the specified structure
        while (currentElement.children.length > 0) {
            currentElement = currentElement.children[0];
        }
        // Check if the last element is a <br> element and remove it
        if (currentElement.tagName === 'BR') {
            currentElement.parentNode.removeChild(currentElement);
        }
    }

    const addDynamicValue = (
        clientName: string,
        name: string,
        value: string
    ): void => {
        const textarea =
            document.getElementsByClassName('jodit-wysiwyg')[numb.current];

        if (textarea) {
            // Create a span element for the dynamic value
            const dynamicSpan = document.createElement('span');
            dynamicSpan.setAttribute('value', value);
            dynamicSpan.setAttribute('class', 'replace');
            if (clientName.includes('Parent') || clientName.includes('Child')) {
                dynamicSpan.textContent = clientName.replace(
                    /<br\s*\/?>/gi,
                    ''
                );
            } else if (name === 'Diagnosis') {
                dynamicSpan.textContent = clientName.replace(
                    /<br\s*\/?>/gi,
                    ''
                );
            } else {
                dynamicSpan.textContent = (name + ' ' + clientName).replace(
                    /<br\s*\/?>/gi,
                    ''
                );
            }
            dynamicSpan.style.display = 'inline-block';
            dynamicSpan.style.padding = '5px';
            dynamicSpan.style.backgroundColor = '#f0f0f0';
            dynamicSpan.style.border = '1px solid #ccc';
            dynamicSpan.style.userSelect = 'none';
            dynamicSpan.contentEditable = 'false';

            // Function to insert the dynamic span or text at the current cursor position
            const insertAtCursor = (
                element: any,
                toInsert: HTMLElement | Text
            ): any => {
                const selection = window.getSelection();
                if (selection && selection.rangeCount > 0) {
                    const range = selection.getRangeAt(0);
                    range.deleteContents();
                    range.insertNode(toInsert);

                    // Move the cursor to the end of the inserted node
                    range.setStartAfter(toInsert);
                    range.setEndAfter(toInsert);
                    selection.removeAllRanges();
                    selection.addRange(range);
                }
            };

            // Insert the dynamic span at the cursor position
            insertAtCursor(textarea, dynamicSpan);

            // Add a space after the inserted element for easier typing
            const space = document.createTextNode('\u00A0');
            insertAtCursor(textarea, space);

            // Add event listener for backspace key
            textarea.addEventListener('keydown', (event) => {
                const keyboardEvent = event as KeyboardEvent;

                if (keyboardEvent.key === 'Backspace') {
                    const selection = window.getSelection();
                    if (!selection) return;

                    // Check if there is a selection and if the cursor is within the dynamicSpan
                    const range = selection.getRangeAt(0);
                    const currentNode = range.startContainer;

                    if (
                        textarea.contains(dynamicSpan) &&
                        dynamicSpan.contains(currentNode)
                    ) {
                        // Only remove the span if the cursor is inside it
                        dynamicSpan.remove();

                        // Trigger an input event and update the content
                        textarea.dispatchEvent(
                            new Event('input', { bubbles: true })
                        );
                        setRichTextContent(textarea.innerHTML);
                    }
                }
            });

            // Dispatch input event to trigger state update
            textarea.dispatchEvent(new Event('input', { bubbles: true }));
            const elementsToRemove =
                textarea.querySelectorAll('[data-jodit-temp]');
            elementsToRemove.forEach((element) => {
                if (element.parentNode) element.parentNode.removeChild(element);
            });

            removeLastBrElement(textarea);

            // Update the state with the new content
            setRichTextContent(textarea.innerHTML);

            // Set timeout to ensure the div is added to the DOM before focusing
        }
    };

    const [, dropRef] = useDrop({
        accept: [ITEM_TYPES.DROPPED_ITEM],
        hover: (item: any, monitor: any) => {
            const dragIndex = item.index;
            const hoverIndex = data.index;
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const hoverActualY =
                monitor.getClientOffset().y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) {
                return;
            }

            moveListItem(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });
    drag(dropRef(ref));
    const renderHeading = (): any => {
        if (data?.name === 'editor') {
            return (
                <div className="flex justify-between">
                    <div>
                        {data?.validations?.required && (
                            <label className="text-sm flex justify-center items-center ">
                                <span className="text-red-500 mr-1">*</span>
                            </label>
                        )}
                    </div>
                    <div className="flex mb-2">
                        <img
                            src={DeleteEditorIcon}
                            alt="delete icon"
                            onClick={() => deleteElement(data.id)}
                        />
                    </div>
                </div>
            );
        } else if (data?.name === 'selectSummary') {
            return (
                <div className="flex justify-between">
                    <div className="flex">
                        {data?.validations?.required && (
                            <label className="text-sm flex justify-center items-center ">
                                <span className="text-red-500 mr-1">*</span>
                            </label>
                        )}
                        <input
                            className="peer py-3 pe-0 block w-[22rem] mr-6 border-b-gray-200 text-sm border-t-0 border-l-0 border-r-0 border-b-1 focus:border-b-gray-200 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none"
                            placeholder="Label"
                            title=""
                            value={data.label}
                            onChange={handleLabelChange}
                        />

                        <span className="flex py-2 w-[15rem] bg-white shadow-[0_2px_8px_rgb(0,0,0,0.2)] rounded-md mr-6 justify-around">
                            <button className="text-[#394148] font-normal">
                                Select Session Summary
                            </button>
                            <img
                                src={SummaryIcon}
                                alt="summary"
                                className="w-[1rem]"
                            />
                        </span>
                    </div>
                    <div className="flex mb-2">
                        <img
                            src={deleteIcon}
                            alt="delete icon"
                            onClick={() => deleteElement(data.id)}
                        />
                    </div>
                </div>
            );
        } else if (data?.name === 'questionBank') {
            return (
                <>
                    <div className="flex justify-between">
                        {data?.validations?.required && (
                            <label className="text-sm flex  ">
                                <span className="text-red-500 mr-1">*</span>
                            </label>
                        )}
                        <img
                            src={DeleteEditorIcon}
                            alt="delete icon"
                            className="ml-auto mb-2"
                            onClick={() => {
                                deleteElement(data.id);
                                setSelectedQuestions({});
                                setUpdatedQuestion({});
                            }}
                        />
                    </div>
                    <TherapySelector
                        setFilterCard={setFilterCard}
                        therapyOptions={therapy}
                    />
                    <QuestionsPanel
                        cards={cards}
                        updatedQuestion={updatedQuestion}
                        setUpdatedQuestion={setUpdatedQuestion}
                        selectedQuestions={selectedQuestions}
                        setSelectedQuestions={setSelectedQuestions}
                        showQuestion={showQuestion}
                    />
                </>
            );
        } else {
            return (
                <div className="flex justify-between mb-3 bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 ">
                    <div className="relative flex items-center">
                        {data?.validations?.required && (
                            <label className="text-sm  ml-2 flex justify-center items-center ">
                                <span className="text-red-500 mr-1">*</span>
                            </label>
                        )}

                        <input
                            className="peer py-3 pe-0 block w-[40rem]  outline-none text-sm border-t-0 border-l-0 border-r-0 border-b-0 focus:border-b-secondary-700 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none"
                            placeholder="Label"
                            title=""
                            value={data.label}
                            onChange={handleLabelChange}
                        />
                    </div>
                    <img
                        src={deleteIcon}
                        alt="delete icon"
                        onClick={() => deleteElement(data.id)}
                    />
                </div>
            );
        }
    };
    const renderData = (): any => {
        if (data?.name === 'editor') {
            return (
                <div className="w-full">
                    <JoditReact
                        onChange={handleRichTextChange}
                        config={{
                            readonly: false, // Set other configuration options as needed
                            defaultMode: '1', // Set the initial content
                            inline: true,
                            enter: 'br',
                        }}
                        defaultValue={richTextContent}
                    />
                </div>
            );
        } else if (data?.name === 'selectSummary') {
            // return <button>Select Summary</button>;
        } else if (data?.name === 'questionBank') {
        } else {
            return (
                <Input
                    field={{}}
                    label={data.label}
                    name={data.name}
                    id={data.id}
                    value={data.value}
                    hideLabel={true}
                    className={''}
                    placeholder={data.placeholder}
                    isRequired={true}
                    type="text"
                    form={{
                        touched: {},
                        errors: {},
                    }}
                    props={{}}
                />
            );
        }
    };

    return (
        <div
            className="flex cursor-pointer mb-8"
            ref={ref}
            onClick={() =>
                setActiveElement(data.id, data?.validations?.required)
            }
        >
            <img src={DragIcon} alt="drag icon" className="mr-4" />
            <div
                className={`flex-col ${data?.name === 'editor' ? 'w-full' : 'justify-baseline'}`}
            >
                <div className="flex  mb-2">
                    {data?.name === 'editor' ? (
                        <>
                            {parameterData?.map((item: any, key) => {
                                return (
                                    <ClientProviderDropdown
                                        key={key}
                                        item={item}
                                        addDynamicValue={addDynamicValue}
                                    />
                                );
                            })}
                        </>
                    ) : null}
                </div>
                <div
                    className={`${isActive ? 'border' : 'border'} 
                    ${isSessionNote ? ' border-[#ABABAB] p-4 rounded-md' : 'border-[#ABABAB] p-4  rounded-md'} 
                    w-full`}
                >
                    {renderHeading()}

                    {renderData()}
                </div>
            </div>
        </div>
    );
}
