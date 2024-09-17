/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-lines */
/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import Modal, {
    ModalBody,
    ModalHeader,
    ProgramBookModalFooter,
} from '../Generics/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, FormikHelpers } from 'formik';
import downloadImg from '../../assets/img/downloadSessionNote.svg';
import {
    clearNote,
    clearSummary,
    getNameOfNote,
} from '../../redux/slice/template/templateSlice';
import { openNotification } from '../../redux/slice/Notification/notifications';
import { clearRowData } from '../../redux/slice/session/sessionSlice';
import saveScoreAndComment from '../../api/services/Scheduling/saveScoreAndComment.service';
import schedulingApis from '../../api/services/scheduling.service';
import { ToastContext } from '../../contexts/ToastContext';
import downloadNote from '../../api/services/downloadNote.service';
import { saveNoteId } from '../../redux/slice/SchedulingRedux/Scheduling';
import DictionaryManager from './DictionaryManager';
import NewNote from './NewNote';
interface Values {
    name: string;
    description: string;
}
interface ShortTermData {
    [key: string]: {
        type: string;
        score?: number;
        min?: number;
        sec?: number;
        comment?: string;
    };
}
export default function AddNewNote({
    onClose,
    isOpen,
    setNewNote,
    setName,
    isEdit,
    mode,
    isClosable,
    setIsClosable,
    code,
}: {
    onClose?: any;
    isOpen?: any;
    setNewNote?: any;
    setName?: any;
    isEdit?: any;
    mode?: any;
    isClosable?: any;
    setIsClosable?: any;
    code?: any;
}): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const url = window.location.href.includes('billing');
    const { addToast } = useContext(ToastContext);
    const [saveLogo, setSaveLogo] = useState('');
    const [showSessionNote, setShowSessionNote] = useState(true);
    const appointment = useSelector((state: any) => state.appointment.value);
    const isEditingGrid = useSelector(
        (state: any) => state.template.isGridEdit
    );
    const codeAfterEdit = useSelector(
        (state: any) => state?.scheduling?.codeAfterEdit
    );
    const allCode = useSelector((state: any) => state?.scheduling?.setCodes);
    const template = useSelector((state: any) => state.template.newNote);
    const noteValue = useSelector((state: any) => state.template);
    const saveNoteByCodeData = useSelector(
        (state: any) => state.template.saveNoteByCodeData
    );
    const shortTermData = useSelector(
        (state: any) => state.interventionSlice?.shortTermScoreData
    );
    const formData = useSelector(({ scheduling }: any) => scheduling);

    const noteName = useSelector((state: any) => state?.template?.name?.data);
    const fullDataOfTemplate = useSelector(
        (state: any) => state.template.fullData
    );
    const targetBody = useSelector(
        (state: any) => state.session.selectedSummary
    );
    const pullSessionNote = useSelector(
        (state: any) => state.template.pullSessionNotefullData
    );
    const fullData = allCode?.length
        ? allCode?.filter(
              (item: any) =>
                  item?.codeType === 'Billable' ||
                  item?.codeType?.name === 'Billable'
          )
        : [];
    const EventName =
        fullDataOfTemplate?.templateId?.name ||
        noteName?.name ||
        fullDataOfTemplate?.sessionNoteDataName ||
        '';
    const updateValues = (array: any, updatedValues: any): any => {
        // Create a copy of the array to avoid modifying the original array
        const valueArr = array.map((item: any) => {
            // Check if the item's name is one of the names we want to update
            if (updatedValues.hasOwnProperty([`${item.name}-${item.index}`])) {
                if (item.name === 'editor') {
                    // If the item is the 'editor', append the new value to the existing value
                    return {
                        ...item,
                        value: updatedValues[`${item.name}-${item.index}`],
                    };
                } else if (item.name === 'selectSummary') {
                    return {
                        ...item,
                        value: JSON.stringify(targetBody),
                    };
                } else {
                    // For other items, update the value with the new value
                    return {
                        ...item,
                        value: updatedValues[`${item.name}-${item.index}`],
                    };
                }
            }
            // Return the item unchanged if it doesn't need to be updated
            return item;
        });
        // Return the updated array
        return valueArr;
    };
    const saveShortTerm = async (): Promise<any> => {
        const payLoadData = Object.entries(shortTermData as ShortTermData).map(
            ([id, itemData]) => {
                let score;
                if (itemData.type === 'Duration') {
                    const score1: any = itemData.min ? itemData?.min * 60 : 0;
                    const score2: any = itemData.sec ? itemData?.sec : 0;
                    score = parseInt(score1) + parseInt(score2);
                } else {
                    score = itemData.score;
                }
                return {
                    shortTermGoalId: id,
                    score: score,
                    shortTermGoalType: itemData.type,
                    comment: itemData.comment,
                };
            }
        );
        payLoadData?.length &&
            (await saveScoreAndComment.saveScore({ data: payLoadData }));
    };
    const save = async (values: any): Promise<any> => {
        const updatedArray = updateValues(template, values);
        const codes: any = [];
        for (let i = 0; i < formData?.setCodes?.length; i++) {
            codes.push({
                authorizationCodes: formData?.setCodes?.[i],
                id: formData?.setCodes[i]?.id,
                hours: formData?.setCodes[i]?.hours || 0,
                minutes: formData?.setCodes[i]?.minutes || 0,
            });
        }
        const data = {
            appointmentId: appointment?.id,
            authorizationCode:
                fullData?.[0]?.id ||
                codeAfterEdit?.id ||
                appointment?.authorizationCodes?.[0]?.authorizationCode?.id,
            sessionTemplateId:
                fullDataOfTemplate?.sessionTemplateId?.id ||
                fullDataOfTemplate?.id,
            sessionNoteData: JSON.stringify(updatedArray),
            createdBy:
                fullDataOfTemplate?.createdBy?.id || appointment?.createdBy?.id,
            modifiedBy:
                fullDataOfTemplate?.createdBy?.id || appointment?.createdBy?.id,
            sessionNotesDataId: isEdit ? fullDataOfTemplate?.id : '',
            appointmentWith: appointment?.appointmentWith?.id,
            organizationLogo: fullDataOfTemplate?.templateId?.organizationLogo,

            authorizationCodes: codes,
        };
        const res = await schedulingApis.saveNoteByCode(data);
        if (!res?.data?.error) {
            if (res?.data?.data?.insuranceArchived) {
                addToast({
                    type: 'error',
                    message: `Cannot submit session note. Insurance used in the authorization has been archived.`,
                });
                onClose();
            } else {
                dispatch(saveNoteId(res?.data?.data?.id));
                onClose();
                saveShortTerm();
                setIsClosable(true);
                setTimeout(() => {
                    dispatch(
                        getNameOfNote({
                            authorizationCode:
                                fullData?.[0]?.id ||
                                codeAfterEdit?.id ||
                                appointment?.authorizationCodes?.[0]
                                    ?.authorizationCode?.id,
                            appointmentId: appointment.id,
                            sessionNotesDataId:
                                res?.data?.data?.id ||
                                appointment?.sessionNotesDataId ||
                                '',
                        })
                    );
                }, 900);
                if (!isEditingGrid) {
                    dispatch(clearSummary());
                    dispatch(clearRowData());
                }
                const title = isEdit
                    ? 'Session note edited successfully'
                    : 'Session note added successfully';
                dispatch(
                    openNotification({
                        success: true,
                        title: title,
                        description: '',
                    })
                );
            }
        } else {
            addToast({
                type: 'error',
                message: `Cannot submit session note. Billing code used in this appointment has been deleted for this child.`,
            });
        }
    };
    useEffect(() => {
        if (saveNoteByCodeData) {
            setNewNote(false);
            setName(false);
            if (!isEditingGrid) {
                dispatch(clearNote());
            }
            if (isClosable) {
                onClose();
            }
        }
    }, [saveNoteByCodeData]);
    const name = template?.map((item: { name: any }) => item?.name);
    const selectSummaryFullData = template?.find(
        (item: any) => item.name === 'selectSummary'
    )?.value;
    useEffect(() => {
        if (mode === 'view') {
            setSaveLogo(fullDataOfTemplate?.organizationLogo);
        } else {
            setSaveLogo(fullDataOfTemplate?.templateId?.organizationLogo);
        }
    }, [
        fullDataOfTemplate?.templateId?.organizationLogo,
        fullDataOfTemplate?.organizationLogo,
    ]);
    const setInitialValues = (): any => {
        if (isEdit) {
            const values: any = {};
            template?.forEach((item: any, index: any) => {
                values[`${item?.name}-${index}`] = item.value;
            });
            return values;
        } else {
            const value: { [key: string]: string } = {};
            name?.forEach((key: any, index: any) => {
                value[`${key}-${index}`] = '';
            });
            return { ...value };
        }
    };
    const handleSubmitForm = async (
        values: Values,
        { setSubmitting }: FormikHelpers<Values>
    ): Promise<any> => {
        setSubmitting(true);
        save(values);
    };
    function extractInnerTextWithFormatting(): string | undefined {
        const data = document.querySelector('.jodit-wysiwyg');
        if (data) {
            const dataClone = data.cloneNode(true) as HTMLElement;
            const spans = dataClone.querySelectorAll('span.replace');
            spans.forEach((span) => {
                const parent = span.parentNode;
                while (span.firstChild && parent) {
                    parent.insertBefore(span.firstChild, span);
                }
                if (parent) {
                    parent.removeChild(span);
                }
            });
            const str = dataClone.innerHTML;
            return str;
        }
        return undefined;
    }
    function sessionSummary(selecteSummaryVal: string): any {
        try {
            const jsonObject = JSON.parse(selecteSummaryVal);
            const resultArray = [];
            for (const key in jsonObject) {
                if (jsonObject.hasOwnProperty(key)) {
                    const innerObject = jsonObject[key];
                    const finalObj: any = {};
                    for (const innerKey in innerObject) {
                        finalObj[innerKey] = innerObject[innerKey];
                    }
                    resultArray.push(finalObj);
                }
            }
            return resultArray;
        } catch (error) {
            return null;
        }
    }
    return (
        <Modal open={isOpen} id={'add-Client-Doc-modal'} expandModal={false}>
            <ModalHeader
                title={
                    showSessionNote
                        ? `${code ? `${code?.code} - ${EventName?.length ? EventName : ''}` : codeAfterEdit?.code || fullData?.[0]?.code || appointment?.authorizationCodes?.[0]?.authorizationCode?.code}${code ? '' : EventName?.length ? '-' : ''}${code ? '' : EventName}`
                        : 'Add Quick Phrases'
                }
                icon={false}
                closeIcon={mode === 'view' || !showSessionNote ? true : false}
                onExpand={undefined}
                onClose={
                    !showSessionNote
                        ? () => {
                              setShowSessionNote(true);
                          }
                        : onClose
                }
                downloadIcon={url ? true : false}
                downloadIconImg={url ? downloadImg : ''}
                downloadNote={
                    url
                        ? () => {
                              downloadNote.DownloadNotes({
                                  sessionNotesDataId:
                                      pullSessionNote?.sessionNotesDataId,
                                  clientId: pullSessionNote?.clientId?.childId,
                                  providerId: pullSessionNote?.providerId?.id,
                                  richText: extractInnerTextWithFormatting(),
                                  sessionSummary: sessionSummary(
                                      selectSummaryFullData
                                  ),
                                  name: pullSessionNote?.billingCode
                                      ?.description,
                                  sessionNoteData: noteValue?.newNote,
                              });
                          }
                        : ''
                }
                showDictionary={url ? false : showSessionNote ? true : false}
                showLogo={saveLogo?.length && showSessionNote ? true : false}
                showLogoImage={
                    saveLogo?.length && showSessionNote ? saveLogo : ''
                }
                redirectionTodictionary={
                    url ? () => {} : () => setShowSessionNote(false)
                }
            />
            <Formik
                initialValues={setInitialValues()}
                onSubmit={handleSubmitForm}
                enableReinitialize={true}
                validateOnChange
            >
                {(props: any) => {
                    const { handleSubmit } = props;
                    return (
                        <form
                            onSubmit={handleSubmit}
                            className="w-auto h-auto"
                            data-testid="add-new-note"
                        >
                            <ModalBody expandModal={false}>
                                <div
                                    className={`w-[70rem] h-[70vh] ${showSessionNote ? '' : 'hidden'} ${mode === 'view' ? 'pointer-events-none' : ''} ${
                                        !template?.length
                                            ? 'flex items-center justify-center'
                                            : ''
                                    }`}
                                >
                                    <NewNote template={template} mode={mode} />
                                </div>
                                <div
                                    className={`w-[70rem] h-[80vh] ${showSessionNote ? 'hidden' : ''} ${mode === 'view' ? 'pointer-events-none' : ''}`}
                                >
                                    <DictionaryManager />
                                </div>
                            </ModalBody>
                            {mode !== 'view' && showSessionNote && (
                                <ProgramBookModalFooter
                                    onClose={onClose}
                                    handleSubmit={handleSubmit}
                                />
                            )}
                        </form>
                    );
                }}
            </Formik>
        </Modal>
    );
}
