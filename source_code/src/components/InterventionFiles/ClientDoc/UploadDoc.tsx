/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import * as React from 'react';
import folderEmpty from '../../../assets/img/folderEmpty.svg';
import deleteFile from '../../../assets/img/delete.svg';
import { useDispatch, useSelector } from 'react-redux';
import UploadDocument from '../ClientDoc/UploadFile';
import download from '../../../assets/img/download.svg';
import { useParams } from 'react-router-dom';
import Tooltip from '../../Generics/Tooltip';
import ConfirmationModal from '../../Generics/ConfirmationModal';
import { openNotification } from '../../../redux/slice/Notification/notifications';
import {
    deleteInterventionDoc,
    getInterventionPlanFileByInterventionId,
} from '../../../redux/slice/InterventionAll/InterventionSlice';
import InterventionDataById from '../../../api/services/Intervention/Service/InterventionDataById.service';
import downloadInterventionFile from '../../../api/services/Intervention/downloadInterventionFile';
import Button from '../../Generics/Button';
export default function UploadDoc(): React.JSX.Element {
    const params = useParams();
    const dispatch = useDispatch<any>();
    const tableHeader: Array<string> = [
        'File Name',
        'Created By',
        'Created On',
        'Source',
        'Actions',
    ];

    const interventionData = useSelector(
        (state: any) => state.interventionSlice
    );
    const isViewMode = window.location.href.includes('view');

    const CustomDate = (e: any): any => {
        const utcTimeString = e === null ? '' : e;
        if (!utcTimeString) return ' ';
        const utcDateTime = new Date(utcTimeString + 'Z');
        const options: Intl.DateTimeFormatOptions = {
            timeZone: 'Asia/Kolkata',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        };
        return (
            <span className="font-light">
                {utcDateTime.toLocaleString('en-US', options)}
            </span>
        );
    };
    const [dataFile, setDataFile] = React.useState<any>();
    const [dataFileModal, setDataFileModal] = React.useState(false);
    const handleSetValue = (id: number, UUID: string | undefined): void => {
        setDataFile({ id, UUID });
        setDataFileModal(true);
    };
    const handleDeleteFunForFile = async (): Promise<any> => {
        const payloadData = {
            id: dataFile?.id,
        };
        const res = await InterventionDataById.deleteInterventionFile(dataFile);
        if (!res?.data?.error) {
            setDataFileModal(false);
            dispatch(deleteInterventionDoc(payloadData));
            dispatch(
                openNotification({
                    success: true,
                    title: 'File deleted successfully.',
                    description: '',
                })
            );
            const data1 = {
                interventionPlanId: params?.interventionId,
            };
            dispatch(getInterventionPlanFileByInterventionId(data1));
        }
    };
    React.useEffect(() => {
        const data = {
            interventionPlanId: params?.interventionId,
        };
        dispatch(getInterventionPlanFileByInterventionId(data));
    }, [params?.interventionId]);

    return (
        <>
            <div className="mt-5 mr-5">
                <div className="flex justify-between items-center">
                    <div className="w-[55vw] rounded-t-md bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem]"></div>
                    <div className="upload flex flex-col justify-center items-center">
                        {interventionData?.fileData?.data?.length ? (
                            <UploadDocument />
                        ) : (
                            ''
                        )}
                    </div>
                </div>

                <div className="h-[24rem] rounded-b-md bg-white pl-4 shadow-[0_1px_3px_-2px_gray]">
                    <div className="">
                        <label className="text-[#394148] text-xl font-semibold">
                            Client Documents
                        </label>
                        {/* Section when no document is available */}
                        {interventionData?.fileData?.data?.length ? (
                            <div className="">
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
                                                    <tbody className="font-normal">
                                                        {interventionData?.fileData?.data?.map(
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
                                                                        <td
                                                                            className={`${isViewMode ? 'pointer-events-none' : ''}px-6 py-3 flex whitespace-nowrap text-sm items-center font-light`}
                                                                        >
                                                                            <Tooltip
                                                                                title={
                                                                                    'Download'
                                                                                }
                                                                            >
                                                                                <Button
                                                                                    disabled={
                                                                                        isViewMode
                                                                                    }
                                                                                    onClick={() => {
                                                                                        downloadInterventionFile.DownloadInterventionFile(
                                                                                            {
                                                                                                id: itemFile?.id,
                                                                                                name: itemFile?.name,
                                                                                            }
                                                                                        );
                                                                                    }}
                                                                                    className={
                                                                                        ''
                                                                                    }
                                                                                    type={
                                                                                        'secondary'
                                                                                    }
                                                                                >
                                                                                    <img
                                                                                        className={`${isViewMode ? 'pointer-events-none' : 'cursor-pointer'}`}
                                                                                        src={
                                                                                            download
                                                                                        }
                                                                                        alt="download"
                                                                                        srcSet=""
                                                                                    />
                                                                                </Button>
                                                                            </Tooltip>
                                                                            <Tooltip
                                                                                title={
                                                                                    'Delete'
                                                                                }
                                                                            >
                                                                                <Button
                                                                                    disabled={
                                                                                        isViewMode
                                                                                    }
                                                                                    onClick={() => {
                                                                                        handleSetValue(
                                                                                            itemFile?.id,
                                                                                            params?.id
                                                                                        );
                                                                                    }}
                                                                                    className={
                                                                                        ''
                                                                                    }
                                                                                    type={
                                                                                        'secondary'
                                                                                    }
                                                                                >
                                                                                    <img
                                                                                        className={`${isViewMode ? 'pointer-events-none' : 'cursor-pointer'}pl-3`}
                                                                                        src={
                                                                                            deleteFile
                                                                                        }
                                                                                        alt="Delete"
                                                                                        srcSet=""
                                                                                    />
                                                                                </Button>
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
