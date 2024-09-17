import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import edit from '../../assets/img/editIcon.svg';
import cancel from '../../assets/img/close.svg';
import save from '../../assets/img/Tick.svg';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { openNotification } from '../../redux/slice/Notification/notifications';
import {
    getTargetCall,
    savingSelectedTargetData,
} from '../../redux/slice/getTarget/getTargetByProgramId';
import renameTarget from '../../api/services/renameTarget.service';
import { renameTargetAPI } from '../../api/services/RenameEntityLib/renameEntityLib';
export default function RenameTarget(): React.JSX.Element {
    const [iconClick, setIconClick] = useState(false);
    const params = useParams();
    const [onRename, setOnRename] = useState({ name: '', onChange: false });
    const [error, setError] = useState(false);
    const [renameData, setRenameData] = useState('');
    const dispatch = useDispatch<any>();
    const targetName = useSelector(({ getTarget }: any) => getTarget);
    const handleRename = (name: any, onEdit: any): any => {
        setOnRename({ name: name, onChange: onEdit });
    };
    const pinnedData = useSelector(({ quickLook }: any) => quickLook);
    const programBookLibrary = useSelector(
        ({ saveProgramBookLibraryDataByID }: any) =>
            saveProgramBookLibraryDataByID?.value?.data
    );
    const programName = useSelector(({ renameProgram }: any) => renameProgram);
    const handleOnIconClick = (name: any, value: any): any => {
        setIconClick(true);
        setOnRename({ name: name, onChange: value });
    };
    const handleKeyDown = async (id: any): Promise<any> => {
        if (programBookLibrary) {
            const dataLib = {
                programId: params?.programId,
                domainId: params?.domainId,
                targetId: id,
                modifiedTargetName: onRename?.name,
            };
            const res = await renameTargetAPI?.renameTarget(dataLib);
            if (!res.data.error) {
                setError(false);
                setOnRename({ name: '', onChange: false });
                setIconClick(false);
                setRenameData(onRename?.name);
                const apiData = {
                    programId: params?.programId,
                    isTargetPinned: pinnedData?.addQuickLook,
                    quickLookId: pinnedData?.clickedQuickLook,
                };
                dispatch(getTargetCall(apiData));
                dispatch(
                    openNotification({
                        success: true,
                        title: 'Target renamed successfully.',
                        description: '',
                    })
                );
            } else {
                setError(true);
                setOnRename({ name: onRename?.name, onChange: true });
            }
        } else {
            const payloadData = {
                programId: params?.programId || programName?.programData?.id,
                targetId: id,
                modifiedTargetName: onRename?.name,
            };
            const res = await renameTarget?.renameTarget(payloadData);
            if (!res?.data?.error) {
                dispatch(savingSelectedTargetData(res?.data?.data));
                setIconClick(false);
                setError(false);
                dispatch(
                    openNotification({
                        success: true,
                        title: 'Target renamed successfully.',
                        description: '',
                    })
                );
                const apiData = {
                    programId: params?.programId,
                    isTargetPinned: pinnedData?.addQuickLook,
                    quickLookId: pinnedData?.clickedQuickLook,
                };
                dispatch(getTargetCall(apiData));
            } else {
                setError(true);
            }
        }
    };
    const handleCancel = (): void => {
        setIconClick(false);
        setError(false);
    };
    const viewMode = useSelector(
        ({ ViewOnly }: any) =>
            ViewOnly?.viewOnlyValue || ViewOnly?.viewOnlyValueLibrary
    );
    const disable = viewMode;
    React.useEffect(() => {
        setRenameData('');
    }, [targetName?.SelectedTarget?.id]);
    return (
        <div className="flex items-center">
            <label className="text-[#394148] text-lg font-semibold mr-2">
                {`${targetName?.clickedTarget?.data?.domainName} / ${targetName?.clickedTarget?.data?.programName} / `}
            </label>
            {disable ? (
                ' '
            ) : (
                <>
                    <div>
                        {iconClick ? (
                            <div className="flex flex-col">
                                <input
                                    onChange={(e) =>
                                        handleRename(e?.target?.value, true)
                                    }
                                    type="text"
                                    value={onRename?.name}
                                    className="peer text-[#394148] text-lg font-semibold pe-0 ps-1 block w-full bg-transparent border-t-transparent border-b-[1px] border-x-transparent border-b-gray-700 disabled:opacity-50 disabled:pointer-events-none focus:border-0 focus-visible:border-0"
                                />
                            </div>
                        ) : (
                            <label className="text-[#394148] text-lg font-semibold">
                                {programBookLibrary
                                    ? renameData
                                        ? renameData
                                        : targetName?.clickedTarget?.data?.name
                                    : targetName?.clickedTarget?.data?.name}
                            </label>
                        )}
                        {error && (
                            <p
                                className="text-xs text-red-600"
                                id="hs-validation-name-error-helper"
                            >
                                Please provide an unique Target name.
                            </p>
                        )}
                    </div>
                    <div className="ml-3 cursor-pointer">
                        {iconClick ? (
                            <div className="flex w-[3.5rem] justify-between ml-3">
                                <img
                                    onClick={() =>
                                        handleKeyDown(
                                            targetName?.clickedTarget?.data?.id
                                        )
                                    }
                                    src={save}
                                ></img>
                                <img
                                    src={cancel}
                                    onClick={() => handleCancel()}
                                ></img>
                            </div>
                        ) : (
                            <img
                                src={edit}
                                data-testid="icon-click-edit"
                                onClick={() => {
                                    handleOnIconClick(
                                        programBookLibrary
                                            ? renameData
                                                ? renameData
                                                : targetName?.clickedTarget
                                                      ?.data?.name
                                            : targetName?.clickedTarget?.data
                                                  ?.name,
                                        false
                                    );
                                }}
                            ></img>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
