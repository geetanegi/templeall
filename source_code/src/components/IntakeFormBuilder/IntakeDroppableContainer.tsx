import * as React from 'react';
import { useDrop } from 'react-dnd';
import { ITEM_TYPES } from '../../constants/IntakeDraggableItemsData';
// import QuestionsPanel from './QuestionBank';
// import TherapySelector from './QuestionFilterTheraphy';
import { useDispatch, useSelector } from 'react-redux';
import {
    getQuestionsAndTherapy,
    getSelectedQuestion,
} from '../../redux/slice/IntakeEditor/intakeEditor';
import IntakeDroppedItem from './IntakeDroppedItem';
import IntakeformHeader from './IntakeformHeader';
import { parameterData } from '../../constants/AddDynamicIntakeVariable';
import ClientProviderDropdown from '../GuidelineTemplate/ClientProviderDropdown';
import JoditReact from 'jodit-react-ts';
import 'jodit/build/jodit.min.css';
// import DragIcon from '../../assets/img/drag.svg';
type Question = {
    id: number;
    question: string;
    answerType: string;
    answer: string;
};

type QuestionsMap = Record<string, Question[]>;
export default function IntakeDroppableContainer({
    addNewElement,
    setSelectedTab,
    updatedQuestion,
    setUpdatedQuestion,
    selectedQuestions,
    setSelectedQuestions,
    template,
    moveListItem,
    deleteElement,
    setActiveElement,
    activeEl,
    logoPreview,
    setLogoPreview,
    richTextContent,
    setRichTextContent,
    setPreserveEvent,
}: {
    addNewElement?: any;
    setSelectedTab?: any;
    updatedQuestion?: any;
    setUpdatedQuestion?: any;
    selectedQuestions?: any;
    setSelectedQuestions?: any;
    template?: any;
    moveListItem?: any;
    deleteElement?: any;
    setActiveElement?: any;
    activeEl?: any;
    logoPreview?: string;
    setLogoPreview?: any;
    richTextContent?: any;
    setRichTextContent?: any;
    setPreserveEvent?: any;
}): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const [editorCount, setEditorCount] = React.useState<number>(1);
    const getData = useSelector(
        (state: any) => state?.intakeEditor?.questionAndTheraphy?.data
    );
    const getQuestions = useSelector(
        (state: any) => state?.intakeEditor?.questions?.data
    );

    React.useEffect(() => {
        dispatch(getQuestionsAndTherapy());
        dispatch(getSelectedQuestion({ clientIntakeFormId: '' }));
    }, []);

    interface TherapyOption {
        label: string;
        value: string;
    }

    const [cards, setCards] = React.useState<any>({});
    const [therapy, setTherapy] = React.useState<TherapyOption[]>([]);
    const [data, setData] = React.useState<any>({});
    const [showQuestion, setShowQuestion] = React.useState<any>({});

    const [editorInstanceInitial, setEditorInstanceInitial] =
        React.useState<any>(null);

    const handleDrop = (item: any): void => {
        setSelectedTab(2);
        addNewElement(item.value);
    };
    const [, drop] = useDrop(() => ({
        accept: [ITEM_TYPES.INTAKE_DRAGGABLE_ITEMS],
        drop: handleDrop,
    }));

    React.useEffect(() => {
        if (getData?.length) {
            const tempObj = getData.reduce(
                (acc: Record<string, any>, item: any) => {
                    return { ...acc, ...item };
                },
                {}
            );
            setCards(tempObj);
            setShowQuestion(tempObj);
            setData(tempObj);

            const therapyOptions: TherapyOption[] = Object.entries(tempObj).map(
                ([title]) => ({
                    label: title,
                    value: title,
                })
            );

            setTherapy(therapyOptions);
        }
    }, [getData]);
    React.useEffect(() => {
        if (getQuestions?.length) {
            const formattedData: QuestionsMap = getQuestions?.reduce(
                (acc: any, section: any) => {
                    const [key, questions] = Object.entries(section)[0] as [
                        string,
                        Question[],
                    ];

                    if (questions.length > 0) {
                        acc[key] = questions.map(
                            ({ id, question, answerType, answer }) => ({
                                id,
                                question,
                                answerType,
                                answer,
                            })
                        );
                    }

                    return acc;
                },
                {} as QuestionsMap
            );
            setUpdatedQuestion(formattedData);
            setSelectedQuestions(formattedData);
        }
    }, [getQuestions]);
    const setFilterCard = (keys: any): void => {
        if (!keys.length) {
            setCards(data);
            return;
        }
        const filterObjectKeys = (
            obj: Record<string, any>,
            keysToKeep: string[]
        ): Record<string, any> => {
            return Object.keys(obj)
                .filter((key) => keysToKeep.includes(key))
                .reduce(
                    (result, key) => {
                        result[key] = obj[key];
                        return result;
                    },
                    {} as Record<string, any>
                );
        };
        const filteredTherapyQuestions = filterObjectKeys(data, keys);
        setCards(filteredTherapyQuestions);
    };
    const handleRichTextChange = (e: any): void => {
        setPreserveEvent(e);
    };
    const moveCursorAfterElement = (editor: any, selector: string): any => {
        editor.selection.focus();
        const range = editor.selection.createRange();
        // Get the last inserted span element
        const element = editor.editor.querySelector(selector);
        if (element) {
            // Move the cursor right after the span element
            range.setStartAfter(element);
            range.collapse(true);
            editor.selection.selectRange(range);
        }
    };
    function removeLastBrElement(textarea: HTMLElement): void {
        let currentElement: HTMLElement | null = textarea;
        while (currentElement && currentElement.children.length > 0) {
            currentElement = currentElement.children[0] as HTMLElement;
        }
        if (currentElement && currentElement.tagName === 'BR') {
            currentElement.parentNode?.removeChild(currentElement);
        }
    }
    const addDynamicValue = (
        clientName: string,
        name: string,
        value: string
    ): void => {
        if (editorInstanceInitial) {
            const dynamicSpan = `<span value="\${${value}}"  class="replace" style="display: inline-block; padding: 5px;margin-top: 4px; background-color: #f0f0f0; border: 1px solid #ccc; user-select: none;" contenteditable="false">${clientName.replace(/<br\s*\/?>/gi, '')}</span>`;
            editorInstanceInitial.s.insertHTML(dynamicSpan + '\u00A0');
            removeLastBrElement(editorInstanceInitial.editor);
            setRichTextContent(editorInstanceInitial.value);
            moveCursorAfterElement(
                editorInstanceInitial,
                '.replace:last-child'
            );
        }
    };
    return (
        <div
            className="w-3/5 overflow-y-scroll mb-1 bg-white"
            ref={drop}
            data-testid="intake-droppable-container"
        >
            <div className={`  mt-6 mr-10 mb-8 ps-3 `}>
                <IntakeformHeader
                    logoPreview={logoPreview}
                    setLogoPreview={setLogoPreview}
                />

                <div className=" px-8 h-auto block mb-8">
                    <span className="font-medium ">
                        <span className="text-red-500 mr-1">*</span>
                        Legal Introduction
                    </span>
                    <div
                        className="border mt-4 p-4 border-[#ABABAB] rounded-md
                    w-full "
                    >
                        {parameterData?.map((item: any, key) => {
                            return (
                                <ClientProviderDropdown
                                    key={key}
                                    item={item}
                                    addDynamicValue={addDynamicValue}
                                />
                            );
                        })}
                        <div className="joditFinal ">
                            <JoditReact
                                defaultValue={richTextContent}
                                config={{
                                    readonly: false,
                                    defaultMode: '1',
                                    inline: true,
                                    enter: 'br',
                                    events: {
                                        afterInit: (editor: any) => {
                                            setEditorInstanceInitial(editor);
                                        },
                                    },
                                }}
                                onChange={handleRichTextChange}
                            />
                        </div>
                    </div>
                </div>

                <div className={'mr-10 mb-8 ps-3'}>
                    {template?.value?.map((item: any) => {
                        return (
                            <IntakeDroppedItem
                                data={item}
                                key={item.id}
                                moveListItem={moveListItem}
                                deleteElement={deleteElement}
                                setActiveElement={setActiveElement}
                                isActive={item.id === activeEl}
                                setFilterCard={setFilterCard}
                                cards={cards}
                                therapy={therapy}
                                updatedQuestion={updatedQuestion}
                                selectedQuestions={selectedQuestions}
                                setUpdatedQuestion={setUpdatedQuestion}
                                setSelectedQuestions={setSelectedQuestions}
                                setSelectedTab={setSelectedTab}
                                showQuestion={showQuestion}
                                editorCount={editorCount}
                                setEditorCount={setEditorCount}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
