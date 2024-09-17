/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import apiClient from '../../../api/client';
import upload from '../../../assets/img/upload.svg';
import { getFilesCall } from '../../../redux/slice/GetFiles/getFiles';
import { useSelector, useDispatch } from 'react-redux';
import { URLS } from '../../../constants';
import { openNotification } from '../../../redux/slice/Notification/notifications';
import { useParams } from 'react-router-dom';
import iicone from '../../../assets/img/iicone.svg';

interface AppState {
    file?: FileList | File | null | any;
}

const App: React.FC = () => {
    const dispatch = useDispatch<any>();
    const params = useParams();
    const [error, setError] = useState(false);
    const programBookData = useSelector(
        ({ getProgramBookDataById }: any) => getProgramBookDataById?.value?.data
    );
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const [state, setState] = useState<AppState>({
        file: null,
    });

    useEffect(() => {
        const handleFileUpload = (): void => {
            if (!state.file) {
                setState({
                    file: null,
                });
                return;
            }

            const fd = new FormData();
            fd.append('name', state?.file?.name);
            fd.append('fileName', state?.file?.name);
            fd.append('displayName', state?.file?.name);
            fd.append('programBookUUID', programBookData?.programBookUUID);
            fd.append('intakeLocation', '');
            fd.append(
                'createdBy',
                userPermission?.value?.data?.userId || userPermission?.userId
            );
            fd.append(
                'modifiedBy',
                userPermission?.value?.data?.userId || userPermission?.userId
            );
            fd.append(
                'organizationId',
                userPermission?.value?.data?.orgId || '1'
            );
            fd.append('file', state?.file);

            setState({
                file: null,
            });

            apiClient
                .post(URLS.uploadDocument, fd, {
                    onUploadProgress: () => {
                        // Update state or perform actions based on progress if needed
                    },
                })
                .then((res) => {
                    //
                    if (res.data.error) {
                        dispatch(
                            openNotification({
                                success: false,
                                title: 'Unable to upload file. Please try again.',
                                description: '',
                            })
                        );
                        setTimeout(() => {
                            const data = {
                                programBookUUID: params?.id,
                            };
                            dispatch(getFilesCall(data));
                        }, 3000);
                    } else {
                        dispatch(
                            openNotification({
                                success: true,
                                title: 'File uploaded successfully.',
                                description: '',
                            })
                        );
                        setTimeout(() => {
                            const data = {
                                programBookUUID: params?.id,
                            };
                            dispatch(getFilesCall(data));
                        }, 3000);
                    }
                })
                .catch(() => {
                    setState({
                        file: null,
                    });

                    dispatch(
                        openNotification({
                            success: false,
                            title: 'Unable to upload file. Please try again.',
                            description: '',
                        })
                    );
                    setTimeout(() => {
                        const data = {
                            programBookUUID: params?.id,
                        };
                        dispatch(getFilesCall(data));
                    }, 3000);
                });
        };

        handleFileUpload();
    }, [state.file, programBookData, dispatch]);
    const viewMode = useSelector(
        ({ ViewOnly }: any) =>
            ViewOnly?.viewOnlyValue || ViewOnly?.viewOnlyValueLibrary
    );

    const disable = viewMode;
    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError(false);
            }, 3000);
        }
    }, [error]);
    return (
        <>
            <label
                className={`bg-primary-700 flex justify-evenly w-[12vw]  text-white font-bold py-2  rounded ${disable ? 'bg-secondary-200 cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                htmlFor="upload-file"
            >
                <span className="flex  text-center text-white text-sm font-normal font-Lato tracking-wide">
                    <img className="mr-1" src={upload} alt="upload" />
                    Upload
                </span>

                <input
                    onChange={(e) => {
                        const file = e?.target?.files?.[0];
                        const maxSizeInBytes = 15 * 1024 * 1024; // 15 MB in bytes

                        if (file && file.size > maxSizeInBytes) {
                            setError(true);
                            // alert('File size exceeds the maximum limit of 15 MB.');
                            e.target.value = ''; // Reset the file input
                            return;
                        } else {
                            setState({
                                file: e?.target?.files?.[0],
                            });
                            e.target.value = ''; // Reset the file input after successful selection
                        }
                    }}
                    type="file"
                    id="upload-file"
                    className="hidden"
                    accept=".pdf,.docx,.xlsx,.png,.jpg,.txt"
                    disabled={disable}
                />
            </label>
            {error ? (
                <span className=" text-xs text-red-500">
                    File size exceeds the maximum limit of 15 MB.
                </span>
            ) : (
                <span className="flex text-xs text-[#8C8C8C]">
                    <img src={iicone} alt="iicone" className="mr-2" /> File must
                    be under 15 MB.
                </span>
            )}
        </>
    );
};

export default App;
