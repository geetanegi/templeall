import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import edit from '../../assets/img/editIcon.svg';
import cancel from '../../assets/img/close.svg';
import save from '../../assets/img/Tick.svg';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    renameProgramCall,
    setProgramName,
} from '../../redux/slice/RenameProgram/renameProgram';
import { getProgramsByDomainIdCall } from '../../redux/slice/GetProgramsByDomainId/getProgramsByDomainId';
import { openNotification } from '../../redux/slice/Notification/notifications';
import { renameProgramLibAPI } from '../../api/services/RenameEntityLib/renameEntityLib';
export default function RenameProgram(): React.JSX.Element {
    const [iconClick, setIconClick] = useState(false);
    const params = useParams();
    const [onRename, setOnRename] = useState({ name: '', onChange: false });
    const [error, setError] = useState(false);
    const dispatch = useDispatch<any>();
    const programName = useSelector(({ renameProgram }: any) => renameProgram);
    const renamedprogramName = useSelector(
        ({ renameProgram }: any) => renameProgram?.value?.data
    );
    const activeTab = useSelector(
        ({ getDomainById }: any) => getDomainById?.currentTab
    );
    const [renameData, setRenameData] = useState('');
    const domainName = useSelector(
        ({ getProgramsByDomainId }: any) => getProgramsByDomainId
    );
    const pinnedData = useSelector(({ quickLook }: any) => quickLook);
    const programNameVal = useSelector(
        ({ renameProgram }: any) => renameProgram?.programName
    );
    const handleRename = (name: any, onEdit: any): any => {
        setOnRename({ name: name, onChange: onEdit });
        if (name.length > 400) {
            setError(true);
        } else {
            setError(false);
        }
    };
    const handleOnIconClick = (name: any, value: any): any => {
        setIconClick(true);
        setOnRename({ name: name, onChange: value });
    };
    const programBookLibrary = useSelector(
        ({ saveProgramBookLibraryDataByID }: any) =>
            saveProgramBookLibraryDataByID?.value?.data
    );
    const handleKeyDown = async (): Promise<any> => {
        if (error) {
            return; // Prevent submission if there's an error
        }
        if (programBookLibrary) {
            const dataLib = {
                domainId: params?.domainId,
                programId: params?.programId || programName?.programData?.id,
                modifiedProgramName: onRename?.name,
            };
            const res = await renameProgramLibAPI?.renameProgram(dataLib);
            if (!res.data.error) {
                setIconClick(false);
                setOnRename({ name: '', onChange: false });
                setRenameData(onRename?.name);
                dispatch(setProgramName(onRename?.name));
                const data2 = {
                    domainId: params?.domainId,
                    phase: activeTab,
                    isTargetPinned: pinnedData?.addQuickLook,
                    quickLookId: pinnedData?.clickedQuickLook,
                };
                setTimeout(() => {
                    dispatch(getProgramsByDomainIdCall(data2));
                }, 1000);
                dispatch(
                    openNotification({
                        success: true,
                        title: 'Program renamed successfully.',
                        description: '',
                    })
                );
            } else {
                setOnRename({ name: onRename?.name, onChange: true });
            }
        } else {
            const data1 = {
                domainId: params?.domainId,
                programId: programName?.programData?.id,
                modifiedProgramName: onRename?.name,
            };
            setIconClick(false);
            setOnRename({ name: '', onChange: false });
            dispatch(renameProgramCall(data1));
            const data2 = {
                domainId: params?.domainId,
                phase: activeTab,
                isTargetPinned: pinnedData?.addQuickLook,
                quickLookId: pinnedData?.clickedQuickLook,
            };
            setTimeout(() => {
                dispatch(getProgramsByDomainIdCall(data2));
            }, 1000);
        }
    };
    React.useEffect(() => {
        setRenameData('');
    }, [programName?.programData?.id]);
    React.useEffect(() => {
        if (renamedprogramName?.name) {
            dispatch(
                openNotification({
                    success: true,
                    title: 'Program name renamed successfully.',
                    description: '',
                })
            );
        }
        if (programName?.onRename) {
            setIconClick(false);
        }
    }, [renamedprogramName?.name, programName?.programData?.id]);
    const viewMode = useSelector(
        ({ ViewOnly }: any) =>
            ViewOnly?.viewOnlyValue || ViewOnly?.viewOnlyValueLibrary
    );
    const disable = viewMode;
    const domainDisplayName =
        domainName?.name ||
        domainName?.domainData?.data?.name ||
        programName?.programData?.domainName;
    const programDisplayName = programBookLibrary
        ? renameData || programName?.name || programName?.programName
        : programName?.programData?.name || programNameVal;
    const finalDisplayName = disable ? programDisplayName : '';
    const fullDisplayName = `${domainDisplayName} / ${finalDisplayName}`;
    const libraryName =
        renameData || programName?.name || programName?.programName;
    const nonLibraryName =
        renamedprogramName?.name ||
        programName?.programData?.name ||
        programNameVal;
    const finalProgramName = programBookLibrary ? libraryName : nonLibraryName;
    const programDisplay = programBookLibrary ? libraryName : nonLibraryName;
    return (
        <div className="flex items-center">
            <label className="text-[#394148] text-lg font-semibold mr-2">
                {fullDisplayName}
            </label>
            {disable ? (
                ''
            ) : (
                <>
                    <div>
                        {iconClick ? (
                            <div className="flex flex-col">
                                <input
                                    onChange={(e) =>
                                        handleRename(e?.target?.value, false)
                                    }
                                    type="text"
                                    value={
                                        onRename?.name ||
                                        programName?.name ||
                                        programName?.programName
                                    }
                                    className="peer text-[#394148] text-lg font-semibold py-1 pe-0 ps-1 block w-full bg-transparent border-t-transparent border-b-[1px] border-x-transparent border-b-gray-700 disabled:opacity-50 disabled:pointer-events-none focus:border-0 focus-visible:border-0"
                                />
                                {error && (
                                    <p
                                        className="text-xs text-red-600 mt-1"
                                        id="hs-validation-name-error-helper"
                                    >
                                        Name should not be more than 400
                                        characters.
                                    </p>
                                )}
                            </div>
                        ) : (
                            <label className="text-[#394148] text-lg font-semibold">
                                {finalProgramName}
                            </label>
                        )}
                    </div>
                    <div className="ml-3 cursor-pointer">
                        {iconClick ? (
                            <div className="flex w-[3.5rem] justify-between ml-3">
                                <img
                                    onClick={() => handleKeyDown()}
                                    src={save}
                                ></img>
                                <img
                                    src={cancel}
                                    onClick={() => setIconClick(false)}
                                ></img>
                            </div>
                        ) : (
                            <img
                                src={edit}
                                onClick={() => {
                                    handleOnIconClick(programDisplay, false);
                                }}
                                data-testid="icon-click-edit"
                            ></img>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
