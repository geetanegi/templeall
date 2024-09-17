import React, { useEffect, useRef, useState } from 'react';
import {
    getActiveAsync,
    savingTabData,
} from '../../../redux/slice/MineSlice/getMine';
import { useDispatch, useSelector } from 'react-redux';
import JoditReact from 'jodit-react-ts';
import 'jodit/build/jodit.min.css';
import ClientProviderDropdown from '../../GuidelineTemplate/ClientProviderDropdown';
import { addDynamicVariable } from '../../../constants/AddDynamicVariable';
import { Field, Formik, FormikHelpers } from 'formik';
import Input from '../../Generics/Inputs/Input';
import { ProgramBookModalFooter } from '../../Generics/Modal';
import { ROUTES } from '../../../constants';
import { useNavigate, useParams } from 'react-router-dom';
import { openNotification } from '../../../redux/slice/Notification/notifications';
import servicesGridApi from '../../../api/services/MetaDataManagement/serivesGrid.service';
import { getEmailByIdApiId } from '../../../redux/slice/MetaDataManagement/metaData';
export default function EmailFormattingGrid(): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const params = useParams();
    const ref = useRef<any>(null);
    const email = useSelector(({ metaData }: any) => metaData?.email);
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const [richTextContent, setRichTextContent] = useState<string>('');
    const [editorInstance, setEditorInstance] = useState<any>(null);
    const initialValues: any = {
        subject: '',
    };
    useEffect(() => {
        dispatch(savingTabData({ tab: 'Email Format' }));
        const payload = { id: params?.id as string };
        dispatch(getEmailByIdApiId(payload));
    }, []);
    const moveCursorToEnd = (editor: any): void => {
        editor.selection.focus();
        const range = editor.selection.createRange();
        // Get the last child of the editor
        const lastChild = editor.editor.lastChild;
        if (lastChild) {
            // Check if lastChild is a text node
            if (lastChild.nodeType === Node.TEXT_NODE) {
                range.setStart(lastChild, lastChild.length);
            } else {
                // If it's not a text node, assume it's an element and get its last child
                const lastElementChild = lastChild.lastChild;
                if (
                    lastElementChild &&
                    lastElementChild.nodeType === Node.TEXT_NODE
                ) {
                    range.setStart(lastElementChild, lastElementChild.length);
                } else if (lastElementChild) {
                    range.setStart(
                        lastElementChild,
                        lastElementChild.childNodes.length
                    );
                } else {
                    range.setStart(lastChild, lastChild.childNodes.length);
                }
            }
            range.collapse(true);
            editor.selection.selectRange(range);
        }
    };
    useEffect(() => {
        if (ref.current) {
            ref.current.setFieldValue('subject', email?.subject);
            setRichTextContent(email?.emailBody);
            const textarea = document.querySelector(
                '.jodit-wysiwyg'
            ) as HTMLElement;
            setTimeout(() => {
                if (textarea && editorInstance) {
                    editorInstance.focus();
                    moveCursorToEnd(editorInstance);
                }
            }, 0);
        }
    }, [email, editorInstance]);
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
        if (editorInstance) {
            const dynamicSpan = `<span value="\${${value}}"  class="replace" style="display: inline-block; padding: 5px; background-color: #f0f0f0; border: 1px solid #ccc; user-select: none;" contenteditable="false">${clientName.replace(/<br\s*\/?>/gi, '')}</span>`;
            editorInstance.s.insertHTML(dynamicSpan + '\u00A0');
            removeLastBrElement(editorInstance.editor);
            setRichTextContent(editorInstance.value);
            moveCursorAfterElement(editorInstance, '.replace:last-child');
        }
    };
    const extractAndReplaceValues = (html: string): string => {
        const div = document.createElement('div');
        div.innerHTML = html;
        const elements = div.querySelectorAll('.replace');
        elements.forEach((el) => {
            const value = el.getAttribute('value') || '';
            el.replaceWith(`{$${value}}`);
        });
        return div.innerHTML;
    };
    const save = async (values: any): Promise<any> => {
        const data = {
            subject: values?.subject,
            emailBody: richTextContent,
            emailBodyEditor: extractAndReplaceValues(richTextContent),
            event: email?.event,
            id: email?.id,
        };
        const res = await servicesGridApi.saveEmail(data);
        if (!res?.data?.error) {
            navigate(ROUTES.diagnosisCodeGrid);
            dispatch(
                openNotification({
                    success: true,
                    title: `Email Format of ${email?.event} edited successfully`,
                    description: '',
                })
            );
            dispatch(savingTabData({ tab: 'Email Format' }));
            const initialData = {
                id: '',
                heading: '',
                roleId: userPermission?.userRoles?.data?.roleId,
                type: 'Email Format',
                assignedTo: userPermission?.value?.data?.userId,
                pagination: { startIndex: 0, noOfRecords: 19 },
                order: '',
                name: '',
                filterValue: '',
                appointmentWith: '1',
                publishStatus: 'Published',
            };
            setTimeout(() => {
                dispatch(getActiveAsync(initialData));
            }, 1000);
        } else {
            dispatch(
                openNotification({
                    success: true,
                    title: 'Unable of Format this email',
                    description: '',
                })
            );
        }
    };
    const handleSubmitForm = (
        values: any,
        { setSubmitting }: FormikHelpers<any>
    ): any => {
        setSubmitting(false);
        save(values);
    };
    const renderDynamicKeys = (): any => {
        let filteredVariables: any = [];
        if (email?.event === 'New User Added') {
            filteredVariables = addDynamicVariable.filter((item: any) =>
                ['User ', 'Admin', 'Credentials', 'Organization'].includes(
                    item.name
                )
            );
        } else if (email?.event === 'Password Reset') {
            filteredVariables = addDynamicVariable.filter((item: any) =>
                ['User', 'Credential'].includes(item.name)
            );
        } else if (email?.event === 'Schedule Appointment') {
            filteredVariables = addDynamicVariable.filter((item: any) =>
                ['Participant', 'Scheduler', 'Appointment  '].includes(
                    item.name
                )
            );
        } else if (email?.event === 'Edit Appointment Time') {
            filteredVariables = addDynamicVariable.filter((item: any) =>
                ['Participant', 'Scheduler', 'Appointment'].includes(item.name)
            );
        } else if (email?.event === 'Cancel Appointment') {
            filteredVariables = addDynamicVariable.filter((item: any) =>
                ['Participant', 'Scheduler', 'Appointment'].includes(item.name)
            );
        } else if (email?.event === 'New User Code Verification') {
            filteredVariables = addDynamicVariable.filter((item: any) =>
                ['User', 'Admin', 'Credential  ', 'Organization'].includes(
                    item.name
                )
            );
        }
        return filteredVariables?.map((item: any, key: any) => (
            <ClientProviderDropdown
                key={key}
                item={item}
                addDynamicValue={addDynamicValue}
            />
        ));
    };
    return (
        <div className="" data-testid="email-formatting-page">
            <Formik
                onSubmit={handleSubmitForm}
                initialValues={initialValues}
                enableReinitialize={true}
                innerRef={ref}
            >
                {({ handleSubmit, values, handleChange }) => (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                    >
                        <div className="mt-4">
                            <div className="title flex flex-col justify-between">
                                <span className="text-xl font-bold ml-4 mb-1">
                                    {email?.event}
                                </span>
                                <div className="ml-4 mb-3 w-[93rem] bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem]"></div>
                            </div>
                        </div>
                        <div>
                            <div className="border border-gray-300 rounded-md px-4 py-2 w-3/4 mt-3 mb-5 ml-4">
                                <div className="flex items-center border-b-2 border-b-gray-200 w-full">
                                    <label className="text-sm font-light">
                                        Subject
                                    </label>
                                </div>
                                <div className=" flex flex-col justify-between mt-3 ">
                                    <Field
                                        className="mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        label=""
                                        autoComplete="off"
                                        isRequired={false}
                                        id="subject"
                                        name="subject"
                                        component={Input}
                                        value={values.subject}
                                        onChange={handleChange}
                                        placeholder="Please enter subject"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="border border-gray-300 rounded-md px-4 py-2 w-3/4 mb-5 ml-4">
                            <div className="flex-col justify-baseline">
                                <div className="flex justify-baseline mb-2">
                                    {renderDynamicKeys()}
                                </div>
                                <div
                                    className={`border bg-white border-[#ABABAB] p-4 w-full rounded-md'`}
                                >
                                    <JoditReact
                                        defaultValue={richTextContent}
                                        config={{
                                            readonly: false,
                                            defaultMode: '1',
                                            inline: true,
                                            enter: 'br',
                                            events: {
                                                afterInit: (editor: any) => {
                                                    setEditorInstance(editor);
                                                },
                                            },
                                        }}
                                        onChange={setRichTextContent}
                                    />
                                </div>
                            </div>
                        </div>
                        <ProgramBookModalFooter
                            onClose={() => {
                                navigate(ROUTES.diagnosisCodeGrid);
                                dispatch(
                                    savingTabData({ tab: 'Email Format' })
                                );
                            }}
                            handleSubmit={handleSubmit}
                        />
                    </form>
                )}
            </Formik>
        </div>
    );
}
