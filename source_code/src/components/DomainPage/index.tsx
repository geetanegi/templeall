import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import edit from '../../assets/img/editIcon.svg';
import { editDomainCall } from '../../redux/slice/EditDomain/editDomain';
import { useState } from 'react';
import cancel from '../../assets/img/close.svg';
import save from '../../assets/img/Tick.svg';
import { openNotification } from '../../redux/slice/Notification/notifications';
import { useParams } from 'react-router-dom';
import { renameDomainAPI } from '../../api/services/RenameEntityLib/renameEntityLib';
import { getProgramBookLibraryDomainFolderAsync } from '../../redux/slice/ProgramBookLibrarySlice/getProgramBookDomainFolderByUUID';
import { savingDomainName } from '../../redux/slice/GetProgramsByDomainId/getProgramsByDomainId';

export default function DomainPage(): React.JSX.Element {
    const [iconClick, setIconClick] = useState(false);
    const [onRename, setOnRename] = useState({ name: '', onChange: false });
    const [renameData, setRenameData] = useState('');
    const dispatch = useDispatch<any>();
    const params = useParams();
    const domainName = useSelector(
        ({ getProgramsByDomainId }: any) =>
            getProgramsByDomainId?.domainData?.data
    );
    const programBookLibrary = useSelector(
        ({ saveProgramBookLibraryDataByID }: any) =>
            saveProgramBookLibraryDataByID?.value?.data
    );
    const onClickDomainName = useSelector(
        ({ renameProgram }: any) => renameProgram?.onRename
    );
    const editedDomainData = useSelector(
        ({ editDomain }: any) => editDomain?.value?.data
    );
    const handleRename = (name: any, onEdit: any): any => {
        setOnRename({ name: name, onChange: onEdit });
    };
    const handleOnIconClick = (name: any, value: any): any => {
        setIconClick(true);
        setOnRename({ name: name, onChange: value });
    };
    const handleKeyDown = async (id: any): Promise<any> => {
        if (programBookLibrary) {
            const dataLib = {
                domainId: params?.domainId,
                modifiedDomainName: onRename?.name,
                programBookLibraryUUID:
                    programBookLibrary?.programBookLibraryUUID,
            };
            const res = await renameDomainAPI?.renameDomain(dataLib);
            if (!res.data.error) {
                dispatch(savingDomainName(res?.data?.data?.name));
                setIconClick(false);
                setOnRename({ name: '', onChange: false });
                setRenameData(onRename?.name);
                setTimeout(() => {
                    dispatch(
                        getProgramBookLibraryDomainFolderAsync({
                            ProgramBookUUID:
                                programBookLibrary?.programBookLibraryUUID,
                        })
                    );
                }, 1000);
                dispatch(
                    openNotification({
                        success: true,
                        title: 'Domain renamed successfully.',
                        description: '',
                    })
                );
            } else {
                setOnRename({ name: onRename?.name, onChange: true });
            }
        } else {
            const data1 = {
                domainId: id,
                programBookUUID: params?.id,
                modifiedDomainName: onRename?.name,
            };
            setIconClick(false);
            setOnRename({ name: '', onChange: false });
            dispatch(editDomainCall(data1));
        }
    };
    React.useEffect(() => {
        if (editedDomainData?.name) {
            dispatch(
                openNotification({
                    success: true,
                    title: 'Domain renamed successfully.',
                    description: '',
                })
            );
        }
        if (onClickDomainName) {
            setIconClick(false);
        }
    }, [editedDomainData?.name, domainName?.id]);
    React.useEffect(() => {
        setRenameData('');
    }, [domainName?.id]);

    const viewMode = useSelector(
        ({ ViewOnly }: any) =>
            ViewOnly?.viewOnlyValue || ViewOnly?.viewOnlyValueLibrary
    );
    const disable = viewMode;

    return (
        <>
            <div className="">
                <div className="flex items-center">
                    <div>
                        {iconClick ? (
                            <div className="flex flex-col">
                                <input
                                    onChange={(e) =>
                                        handleRename(e?.target?.value, false)
                                    }
                                    type="text"
                                    value={onRename?.name}
                                    className="peer text-[#394148] text-lg font-semibold py-1 pe-0 ps-1 block w-full bg-transparent border-t-transparent border-b-[1px] border-x-transparent border-b-gray-700 disabled:opacity-50 disabled:pointer-events-none"
                                />
                                {onRename?.onChange ? (
                                    <p
                                        className="text-xs text-red-600 mt-1"
                                        id="hs-validation-name-error-helper"
                                    >
                                        Please provide an unique Domain name.
                                    </p>
                                ) : (
                                    ''
                                )}
                            </div>
                        ) : (
                            <label className="text-[#394148] text-lg font-semibold">
                                {programBookLibrary
                                    ? renameData
                                        ? renameData
                                        : domainName?.name
                                    : editedDomainData?.name
                                      ? editedDomainData?.name
                                      : domainName?.name}
                            </label>
                        )}
                    </div>
                    {disable ? (
                        ''
                    ) : (
                        <div className="ml-3 cursor-pointer">
                            {iconClick ? (
                                <div className="flex w-[3.5rem] justify-between ml-3">
                                    <img
                                        onClick={() =>
                                            handleKeyDown(domainName?.id)
                                        }
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
                                        handleOnIconClick(
                                            programBookLibrary
                                                ? renameData
                                                    ? renameData
                                                    : domainName?.name
                                                : editedDomainData?.name
                                                  ? editedDomainData?.name
                                                  : domainName?.name,
                                            false
                                        );
                                    }}
                                ></img>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div className="w-1/2 bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem] rounded-t-md"></div>
        </>
    );
}
