import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import edit from '../../assets/img/editIcon.svg';
import cancel from '../../assets/img/close.svg';
import save from '../../assets/img/Tick.svg';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import renameProgramBookApi from '../../api/services/renameProgramBook.service';
import { openNotification } from '../../redux/slice/Notification/notifications';
import renameLibraryNameApi from '../../api/services/ProgramBookLibrary/renameLibraryNameApi.service';
import { clearProgramBookTree } from '../../redux/slice/GetDomainById/getDomainById';
export default function RenameProgramBookComponent(): React.JSX.Element {
    const [iconClick, setIconClick] = useState(false);
    const params = useParams();
    const [onRename, setOnRename] = useState({ name: '', onChange: false });
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch<any>();
    const programBookData = useSelector(
        ({ getProgramBookDataById }: any) => getProgramBookDataById?.value?.data
    );
    const viewMode = useSelector(
        ({ ViewOnly }: any) =>
            ViewOnly?.viewOnlyValue || ViewOnly?.viewOnlyValueLibrary
    );
    const programBookLibrary = useSelector(
        ({ saveProgramBookLibraryDataByID }: any) =>
            saveProgramBookLibraryDataByID?.value?.data
    );
    const handleRename = (name: string, onEdit: boolean): void => {
        if (name.length > 150) {
            setShowError(true);
            setErrorMessage(
                'Name should be less than or equal to 150 characters.'
            );
        } else {
            setOnRename({ name, onChange: onEdit });
            setShowError(false);
            setErrorMessage('');
        }
    };
    const handleOnIconClick = (name: string, onEdit: boolean): void => {
        setIconClick(true);
        setOnRename({ name, onChange: onEdit });
    };
    const handleKeyDown = async (): Promise<void> => {
        if (onRename.name.length > 150) {
            setShowError(true);
            setErrorMessage(
                'Name should be less than or equal to 150 characters.'
            );
            return;
        }
        let res;
        if (programBookLibrary?.programBookLibraryUUID) {
            const data1 = {
                programBookLibraryUUID:
                    programBookLibrary?.programBookLibraryUUID,
                modifiedLibraryName: onRename?.name,
            };
            res = await renameLibraryNameApi?.renameLibraryNameData(data1);
        } else {
            const data1 = {
                programBookUUID: programBookData?.programBookUUID,
                programBookName: onRename?.name,
            };
            res = await renameProgramBookApi?.renameProgramBook(data1);
        }
        if (res?.data?.error) {
            setShowError(true);
            setErrorMessage('An error occurred while renaming.');
        } else {
            dispatch(
                openNotification({
                    success: true,
                    title: 'Program renamed successfully.',
                    description: '',
                })
            );
            setShowError(false);
            setIconClick(false);
        }
    };
    const handleCancel = (): void => {
        setOnRename({ name: '', onChange: false });
        setIconClick(false);
    };
    const name = onRename?.name
        ? onRename?.name
        : programBookData?.name?.charAt(0).toUpperCase() +
              programBookData?.name?.slice(1) ||
          programBookLibrary?.name?.charAt(0).toUpperCase() +
              programBookLibrary?.name?.slice(1);
    return (
        <>
            <div
                className="flex"
                data-testid="rename-program-book-landing-page"
            >
                {iconClick ? (
                    <div className="flex flex-col">
                        <input
                            onChange={(e) =>
                                handleRename(e?.target?.value, true)
                            }
                            type="text"
                            value={onRename?.name}
                            className="peer text-[#394148] text-lg font-semibold py-1 pe-0 ps-1 block w-full bg-transparent border-t-transparent border-b-[1px] border-x-transparent border-b-gray-700 disabled:opacity-50 disabled:pointer-events-none focus:border-0 focus-visible:border-0"
                        />
                        {showError && (
                            <p
                                className="text-xs text-red-600 mt-1"
                                id="hs-validation-name-error-helper"
                            >
                                {errorMessage}
                            </p>
                        )}
                    </div>
                ) : (
                    <>
                        <div className="flex items-center">
                            <div className="flex flex-col pr-3 ">
                                <div
                                    className={`pb-1 flex justify-between ${viewMode ? ' pointer-events-none' : ''}`}
                                >
                                    <Link to={`/program-book/${params?.id}`}>
                                        <label
                                            onClick={() => {
                                                dispatch(
                                                    clearProgramBookTree({})
                                                );
                                            }}
                                            data-testid="route-click"
                                            className="text-[#18868D] font-semibold text-md cursor-pointer hover:underline"
                                        >
                                            {name}
                                        </label>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {viewMode ? (
                    ''
                ) : (
                    <div className="mt-1 cursor-pointer">
                        {iconClick ? (
                            <div
                                className="flex w-[3.5rem] justify-between ml-3 "
                                data-testid="rename-program-book-landing-page"
                            >
                                <img
                                    onClick={() => handleKeyDown()}
                                    src={save}
                                    alt="Save"
                                />
                                <img
                                    src={cancel}
                                    onClick={() => handleCancel()}
                                    alt="Cancel"
                                />
                            </div>
                        ) : (
                            <img
                                src={edit}
                                onClick={() => {
                                    handleOnIconClick(name, true);
                                }}
                                data-testid="icon-click"
                                alt="Edit"
                            />
                        )}
                    </div>
                )}
            </div>
            <div className="w-1/2 bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem]"></div>
        </>
    );
}
