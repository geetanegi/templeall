import React, { useEffect } from 'react';
import Doc from '../../../assets/img/LandingPageIcons/MyDoc.svg';
import { myDocumentsCall } from '../../../redux/slice/UserDashboardData/userDashboard';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import download from '../../../assets/img/LandingPageIcons/download.svg';
import downloadInterventionFile from '../../../api/services/Intervention/downloadInterventionFile';
import downloadFile from '../../../api/services/ClientDoc/downloadFile.service';
export default function MyDocuments(): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const params = useParams();
    const isNavigatedUser = params.userId && params.orgId;
    const userPermission = useSelector((state: any) =>
        isNavigatedUser ? state.userDetails : state?.getUserPermission
    );
    const documents = useSelector(
        ({ userDashboard }: any) => userDashboard?.myDocuments
    );
    const uniqueChildren = Array.from(
        new Set(documents?.programBook?.map((item: any) => item?.childName))
    );
    const uniqueChildren2 = Array.from(
        new Set(
            documents?.interventionPlan?.map((item: any) => item?.childName)
        )
    );
    const groupedData = uniqueChildren?.map((childName: any) => {
        const programBooks = documents?.programBook.filter(
            (item: any) => item?.childName === childName
        );
        const uniqueProgramBooks = Array.from(
            new Set(programBooks?.map((item: any) => item?.programBookName))
        );

        return {
            childName,
            programBooks: uniqueProgramBooks?.map((programBookName: any) => {
                const files = programBooks.filter(
                    (item: any) => item?.programBookName === programBookName
                );
                return {
                    programBookName,
                    files: files?.map((item: any) => ({
                        fileName: item?.programBookFileName,
                        fileId: item?.programBookFileId,
                        programbookUUID: item?.programBookUUID,
                    })),
                };
            }),
        };
    });

    const interventionData = uniqueChildren2?.map((childName: any) => {
        const interventions = documents?.interventionPlan?.filter(
            (item: any) => item?.childName === childName
        );
        const uniqueInterventions = Array.from(
            new Set(
                interventions?.map((item: any) => item?.interventionPlanName)
            )
        );

        return {
            childName,
            interventions: uniqueInterventions?.map(
                (interventionPlanName: any) => {
                    const files = interventions?.filter(
                        (item: any) =>
                            item?.interventionPlanName === interventionPlanName
                    );
                    return {
                        interventionPlanName,
                        files: files.map((item: any) => ({
                            fileName: item?.interventionPlanFileName,
                            fileId: item?.interventionPlanFileId,
                        })),
                    };
                }
            ),
        };
    });
    useEffect(() => {
        const payload = {
            profileUserId: isNavigatedUser
                ? params?.userId
                : userPermission?.value?.data?.userId || userPermission?.userId,
            profileOrgId: isNavigatedUser
                ? params?.orgId
                : userPermission?.value?.data?.orgId || userPermission?.orgId,
        };
        dispatch(myDocumentsCall(payload));
    }, [
        dispatch,
        isNavigatedUser,
        params?.orgId,
        params?.userId,
        userPermission?.orgId,
        userPermission?.userId,
        userPermission?.value?.data?.orgId,
        userPermission?.value?.data?.userId,
    ]);
    return (
        <div className="clientDocuments my-2 mx-3">
            <div className="flex py-1 px-3 ">
                <div className="watch w-8 h-8 bg-white rounded-lg shadow-[0_3px_8px_rgb(0,0,0,0.2)]">
                    <img className="py-1 px-1 align-middle" src={Doc} alt="" />
                </div>

                <h1 className="font-[lato] mx-6  font-semibold p-1">
                    My Documents
                </h1>
            </div>
            <div className="">
                <div className="flex flex-col">
                    <div className="p-1 min-w-full inline-block align-middle">
                        <div className="mx-2 p-1.5 py-3 min-w-full inline-block align-middle h-[32rem]  overflow-y-auto [&::-webkit-scrollbar]:w-0.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
                            <table className="min-w-full">
                                <tbody className=" whitespace-nowrap text-xs font-normal">
                                    {groupedData.map((child) => (
                                        <tr key={child?.childName}>
                                            <td
                                                className={`py-1 text-base font-medium font-['Lato']`}
                                            >
                                                <h1>{child?.childName}</h1>
                                                <div className=" bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem]"></div>
                                                {child?.programBooks.map(
                                                    (programBook: any) => (
                                                        <div
                                                            className=""
                                                            key={
                                                                programBook?.programBookName
                                                            }
                                                        >
                                                            <h2 className="py-2 flex">
                                                                <img
                                                                    src={Doc}
                                                                    alt="doc"
                                                                />
                                                                {
                                                                    programBook?.programBookName
                                                                }
                                                            </h2>
                                                            {programBook?.files?.map(
                                                                (
                                                                    file: any,
                                                                    index: any
                                                                ) => (
                                                                    <tr
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="text-sm font-['Lato'] hover:bg-gray-100"
                                                                    >
                                                                        <td
                                                                            className="px-6 text-zinc-500  w-[20rem] max-w-[16rem] truncate overflow-hidden"
                                                                            title={
                                                                                file?.fileName
                                                                            }
                                                                        >
                                                                            {
                                                                                file?.fileName
                                                                            }
                                                                        </td>
                                                                        <td
                                                                            className={`py-4 text-base font-medium font-['Lato']`}
                                                                            onClick={() => {
                                                                                downloadFile.DownloadFile(
                                                                                    {
                                                                                        id: file?.programbookUUID,
                                                                                        fileId: file?.fileId,
                                                                                        name: file?.fileName,
                                                                                    }
                                                                                );
                                                                            }}
                                                                        >
                                                                            <img
                                                                                className="text-[#48ABCA] ml-14"
                                                                                alt="download"
                                                                                src={
                                                                                    download
                                                                                }
                                                                            />
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            )}
                                                        </div>
                                                    )
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                    {interventionData?.map((child) => (
                                        <tr key={child?.childName}>
                                            <td
                                                className={`py-1 text-base font-medium font-['Lato']`}
                                            >
                                                <h1>{child.childName}</h1>
                                                <div className="bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem]"></div>
                                                {child?.interventions.map(
                                                    (intervention: any) => (
                                                        <div
                                                            className=""
                                                            key={
                                                                intervention?.interventionPlanName
                                                            }
                                                        >
                                                            <h2 className="py-2 flex">
                                                                <img
                                                                    src={Doc}
                                                                    alt="doc"
                                                                />
                                                                {
                                                                    intervention?.interventionPlanName
                                                                }
                                                            </h2>
                                                            {intervention?.files.map(
                                                                (
                                                                    file: any,
                                                                    index: any
                                                                ) => (
                                                                    <tr
                                                                        key={
                                                                            index
                                                                        }
                                                                        className=" text-sm font-['Lato'] hover:bg-gray-100"
                                                                    >
                                                                        <td
                                                                            className="px-6 text-zinc-500 w-[19rem] max-w-[17rem] truncate overflow-hidden"
                                                                            title={
                                                                                file.fileName
                                                                            }
                                                                        >
                                                                            {
                                                                                file.fileName
                                                                            }
                                                                        </td>
                                                                        <td
                                                                            className={`py-4 text-base font-medium font-['Lato']`}
                                                                            onClick={() => {
                                                                                downloadInterventionFile.DownloadInterventionFile(
                                                                                    {
                                                                                        id: file?.fileId,
                                                                                        name: file?.fileName,
                                                                                    }
                                                                                );
                                                                            }}
                                                                        >
                                                                            <img
                                                                                className="text-[#48ABCA] ml-10"
                                                                                src={
                                                                                    download
                                                                                }
                                                                                alt="download"
                                                                            />
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            )}
                                                        </div>
                                                    )
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
