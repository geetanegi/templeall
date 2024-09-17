/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import * as React from 'react';
import folderEmpty from '../../../assets/img/folderEmpty.svg';
import deleteFile from '../../../assets/img/delete.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getFilesCall } from '../../../redux/slice/GetFiles/getFiles';
import UploadDocument from '../ClientDoc/UploadFile';
import download from '../../../assets/img/download.svg';
import { useParams } from 'react-router-dom';
import downloadFile from '../../../api/services/ClientDoc/downloadFile.service';
import deleteFileAPI from '../../../api/services/ClientDoc/deleteFile.service';
import Tooltip from '../../Generics/Tooltip';
import ConfirmationModal from '../../Generics/ConfirmationModal';
import { openNotification } from '../../../redux/slice/Notification/notifications';
import { CustomDate } from '../../Generics/Grid/CommonFunction';
export default function UploadDoc(): React.JSX.Element {
    const params = useParams();
    const dispatch = useDispatch<any>();
    const tableHeader: Array<string> = [
        'File Name',
        'Created By',
        'Created On',
        'Source',
        'Action',
    ];
    const fileData = useSelector(({ getFiles }: any) => getFiles?.value?.data);

    const [dataFile, setDataFile] = React.useState<any>();
    const [dataFileModal, setDataFileModal] = React.useState(false);
    const handleSetValue = (id: number, UUID: string | undefined): void => {
        setDataFile({ id, UUID });
        setDataFileModal(true);
    };
    const handleDeleteFunForFile = async (): Promise<any> => {
        const payloadData = {
            programBookUUID: params?.id,
        };
        const res = await deleteFileAPI.deleteFile(dataFile);
        if (!res?.data?.error) {
            setDataFileModal(false);
            dispatch(getFilesCall(payloadData));
            dispatch(
                openNotification({
                    success: true,
                    title: 'File deleted successfully.',
                    description: '',
                })
            );
        }
    };

    return (
        <>
            <div className="mt-5">
                <div className="flex justify-between items-center">
                    <div className="w-[55vw] rounded-t-md bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem]"></div>
                    {fileData?.length ? <UploadDocument /> : ''}
                </div>

                <div className="h-[24rem] rounded-b-md bg-white shadow-md pl-4 shadow-[0_1px_3px_-2px_gray]">
                    <div className="mt-4">
                        <label className="text-[#394148] text-xl pl-6 font-semibold">
                            Client Documents
                        </label>
                        {/* Section when no document is available */}
                        {fileData?.length ? (
                            <div className="mt-2">
                                <div className="flex flex-col">
                                    <div className="-m-1.5 w-full overflow-y-auto h-[38vh] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-primary-600">
                                        <div className="p-1.5 min-w-full inline-block align-middle">
                                            <div className="overflow-hidden">
                                                <table className="min-w-full">
                                                    <thead>
                                                        <tr>
                                                            {tableHeader?.map(
                                                                (
                                                                    name,
                                                                    index
                                                                ) => {
                                                                    return (
                                                                        <th
                                                                            key={
                                                                                index
                                                                            }
                                                                            scope="col"
                                                                            className="px-6 py-2 text-start text-sm font-medium"
                                                                        >
                                                                            {
                                                                                name
                                                                            }
                                                                        </th>
                                                                    );
                                                                }
                                                            )}
                                                        </tr>
                                                    </thead>
                                                    <tbody className="">
                                                        {fileData?.map(
                                                            (itemFile: {
                                                                displayName: string;
                                                                name: string;
                                                                createdBy: any;
                                                                source: any;
                                                                createdDate: any;
                                                                id: number;
                                                            }) => {
                                                                return (
                                                                    <tr
                                                                        key={
                                                                            itemFile.id
                                                                        }
                                                                        className="hover:bg-gray-100"
                                                                    >
                                                                        <td className="flex px-6 pr-12 py-3 whitespace-nowrap text-sm font-light">
                                                                            {
                                                                                itemFile?.displayName
                                                                            }
                                                                        </td>
                                                                        <td className="px-6 py-3 whitespace-nowrap text-sm font-light">
                                                                            {
                                                                                itemFile?.createdBy
                                                                            }
                                                                        </td>
                                                                        <td className="px-6 py-3 whitespace-nowrap text-sm font-light">
                                                                            {CustomDate(
                                                                                itemFile?.createdDate
                                                                            )}
                                                                        </td>
                                                                        <td className="px-6 py-3 whitespace-nowrap text-sm font-light">
                                                                            {
                                                                                itemFile?.source
                                                                            }
                                                                        </td>
                                                                        <td className="px-6 py-3 flex whitespace-nowrap text-sm items-center font-light">
                                                                            <Tooltip
                                                                                title={
                                                                                    'Download'
                                                                                }
                                                                            >
                                                                                <img
                                                                                    onClick={() => {
                                                                                        downloadFile.DownloadFile(
                                                                                            {
                                                                                                id: params?.id,
                                                                                                fileId: itemFile?.id,
                                                                                                name: itemFile?.name,
                                                                                            }
                                                                                        );
                                                                                    }}
                                                                                    className="cursor-pointer"
                                                                                    src={
                                                                                        download
                                                                                    }
                                                                                    alt="download"
                                                                                    srcSet=""
                                                                                />
                                                                            </Tooltip>
                                                                            <Tooltip
                                                                                title={
                                                                                    'Delete'
                                                                                }
                                                                            >
                                                                                <img
                                                                                    onClick={() => {
                                                                                        handleSetValue(
                                                                                            itemFile?.id,
                                                                                            params?.id
                                                                                        );
                                                                                    }}
                                                                                    className="pl-3 cursor-pointer"
                                                                                    src={
                                                                                        deleteFile
                                                                                    }
                                                                                    alt="Delete"
                                                                                    srcSet=""
                                                                                />
                                                                            </Tooltip>
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            }
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div
                                className="h-[19rem]"
                                style={{
                                    marginLeft: '25%',
                                    display: 'grid',
                                    alignContent: 'space-around',
                                    textAlign: 'center',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    justifyItems: 'center',
                                }}
                            >
                                <label className="text-[#2B2F33] text-sm font-medium">
                                    {'"This folder is empty."'}
                                </label>

                                <img src={folderEmpty}></img>

                                <label className="text-[#2B2F33] text-sm font-light">
                                    Upload or move files into this folder to
                                    organize your documents.
                                </label>

                                <UploadDocument />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {dataFileModal && (
                <ConfirmationModal
                    header={''}
                    name={''}
                    title={'Are you sure you want to delete this file ?'}
                    open={dataFileModal}
                    onClose={() => setDataFileModal(false)}
                    handleStop={handleDeleteFunForFile}
                />
            )}
        </>
    );
}
