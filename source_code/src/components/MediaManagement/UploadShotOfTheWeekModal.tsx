import React, { useCallback, useEffect, useRef, useState } from 'react'
import Modal from '../ModalComponent'
import { Formik, FormikHelpers } from 'formik'
import { MonitorUp } from 'lucide-react'
import FormikControl from '../../Formik/components/FormikControl';
import MUISelect from '../../Formik/components/MUISelect';
import CustomDatePicker from '../../Formik/components/CustomDatePicker';
import { ToastError, ToastSuccess } from '../Toast';
import { API_URL } from '../../services/enums';
import apiService from '../../services/apiService';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import PageLoader from '../PageLoader';
import * as Yup from "yup";
import { setLoading } from '../../reducers/loader/loader';
interface UploadVideoModalProps {
    isModalOpen: boolean;
    setIsModalOpen: (flag: boolean) => void;
    isSoTW: boolean;
    videoCategory: string;
    selectedReqVideoId: number | string;
    setIsRefreshList: (flag: boolean) => void;
    isRefreshList: boolean
}

const initialValue = {
    title: "",
    description: "",
    club: "",
    course: "",
    hole: "",
    tee: "",
    dateTime: "",
    videoUrl: ''

}

const validationSchema = Yup.object({
    title: Yup.string()
        .required("Video title is required. Please provide a title (up to 25 words).")
        .max(25, "Video title must be less than 100 characters"),
    description: Yup.string()
        .required("Video description is required. Please provide a description (up to 100 words)")
        .max(100, "Video description must be less than 100 characters"),
    club: Yup.string().required("Club must be selected"),
    course: Yup.string().required("Course must be selected"),
    hole: Yup.string().required("Hole must be selected"),
    tee: Yup.string().required("Tee must be selected"),
    contestName: Yup.string().required("Contest Name must be selected"),
    dateTime: Yup.string().required("Date and Time Name must be selected"),
    username: Yup.string()
        .required("Username is required"),

});

const UploadShotOfTheWeekModal: React.FC<UploadVideoModalProps> = ({ isModalOpen, setIsModalOpen, isSoTW = false, videoCategory, selectedReqVideoId, setIsRefreshList, isRefreshList }) => {

    const courseData = useSelector(
        (state: RootState) => state.courses.courseData,
    );
    const loader = useSelector((state: RootState) => state.loader.isLoading);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const clubOptions =
        courseData?.data?.map((item: { id: number; name: string }) => ({
            value: item.id,
            key: item.name,
        })) || [];
    const [selectedClub, setSelectedClub] = useState("");
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [thumbnail, setThumbnail] = useState<string | undefined>(undefined);
    const [courseOptions, setCourseOptions] = useState<[]>([]);
    const [holeOptions, setHoleOptions] = useState<[]>([]);
    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedHole, setSelectedHole] = useState("");
    const [teeOptions, setTeeOptions] = useState<[] | null>(null);
    const [, setCheckVideo] = useState<boolean>(false)
    const dispatch = useDispatch();
    useEffect(() => {
        const courseList =
            courseData?.data?.find((club) => club.id === parseInt(selectedClub))
                ?.courseList || [];
        if (courseList.length > 0) {
            const courseListOptions =
                courseList?.map((course) => ({
                    value: course.id,
                    key: course.courseName,
                })) || [];
            setCourseOptions(courseListOptions as []);
            const holeList = courseList.find(
                (item) => item.id === parseInt(selectedCourse),
            )?.holeList;

            if (selectedCourse) {
                const holeListOptions =
                    holeList?.map((item) => ({
                        key: item.holeNumber,
                        value: item.id,
                    })) || [];
                setHoleOptions(holeListOptions as []);
                if (selectedHole) {
                    const teeList =
                        holeList?.find((hole) => hole.id === parseInt(selectedHole))
                            ?.teeList || [];
                    const teeOptions =
                        teeList?.map((item) => ({
                            key: item.teeName,
                            value: item.id,
                        })) || [];
                    setTeeOptions(teeOptions as []);
                } else {
                    setTeeOptions([]);
                }

            } else {
            }
        }

    }, [selectedClub, selectedCourse, selectedHole]);

    useEffect(() => {
        setVideoFile(null);
        setThumbnail(undefined)
    }, [isModalOpen])

    const handleButtonClick = () => {
        fileInputRef?.current?.click();

    };

    const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = event.target.files?.[0];
            if (file) {
                setVideoFile(file);
                generateThumbnail(file);
                setCheckVideo(false)
            } else {
                setCheckVideo(true)
            }
        } catch (error) {


        }
    };

    const generateThumbnail = (file: File) => {
        const videoURL = URL.createObjectURL(file);
        const video = document.createElement('video');
        video.src = videoURL;

        video.addEventListener('loadeddata', () => {
            if (video.readyState >= 2) {
                video.currentTime = 2; // Set the time to capture the thumbnail (in seconds)
            }
        });

        video.addEventListener('seeked', () => {
            const canvas = document.createElement('canvas');
            canvas.width = 160; // Set the desired width for the thumbnail
            canvas.height = 90; // Set the desired height for the thumbnail
            const context = canvas.getContext('2d');
            if (context) {
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                const dataURL = canvas.toDataURL('image/png');
                setThumbnail(dataURL); // Set the generated thumbnail URL
            }
        });

        video.load();
    }



    const handleSubmit = async (
        values: any,
        { }: FormikHelpers<any>,
    ) => {

        try {
            dispatch(setLoading(true));
            if (videoFile) {
                let formData = new FormData();
                formData.append("file", videoFile)
                if (videoFile.type === "video/mp4") {
                    if (!isSoTW) {
                        const data1 = {
                            data: {
                                "requestType": "REQUEST_VIDEO",
                                "videoCategory": "TOP_SHOT",
                                "videoDescription": values.description,
                                "videoTitle": values.title,
                                "requestId": selectedReqVideoId
                            }
                        }

                        let newBlobData = new Blob([JSON.stringify(data1)], {
                            type: "application/json",
                        });
                        formData.append("data", newBlobData);

                        const { data, status } = await apiService.post<any>(
                            API_URL.uploadRequestedVideo,
                            formData
                        );
                        if (status === 200 && data?.data != null && !data?.error) {
                            ToastSuccess(data?.data?.message)
                            setIsRefreshList(!isRefreshList)
                        } else if (data?.error && data.description) {
                            ToastError(data.description);
                        }
                    } else if (isSoTW) {
                        const data1 = {
                            data: {
                                "dateTime": values.dateTime,
                                "contestType": values.contestName,
                                "club": 1,
                                "course": 1,
                                "hole": 1,
                                "tee": "1",
                                "videoDescription": values.description,
                                "videoTitle": values.title,
                                "player": "2"
                            }
                        }

                        let newBlobData = new Blob([JSON.stringify(data1)], {
                            type: "application/json",
                        });
                        formData.append("data", newBlobData);

                        const { data, status } = await apiService.post<any>(
                            API_URL.uploadShotOfTheWeek,
                            formData
                        );
                        if (status === 200 && data?.data != null && !data?.error) {
                            ToastSuccess(data?.data?.message)
                            setIsRefreshList(!isRefreshList)
                        } else if (data?.error && data.description) {
                            ToastError(data.description);
                        }
                    } else {
                        //do nothing
                    }
                } else {
                    ToastError("The uploaded video is not in MP4 format. Please upload a valid MP4 file")
                }

            } else {
                ToastError("No video has been uploaded. Please upload an MP4 video under 250MB.")
            }
        } catch (error) {
            ToastError("Video Upload Failed")
        } finally {
            setIsModalOpen(false)
            dispatch(setLoading(false));
        }

    };

    const scrollbarStyles: React.CSSProperties = {
        overflow: 'auto',  // Enable scrolling
        scrollbarWidth: 'none', // Firefox
        msOverflowStyle: 'none', // IE and Edge
    };
    const handleValues = useCallback((values: any) => {
        setSelectedClub(values.club);
        setSelectedCourse(values.course);
        setSelectedHole(values.hole)
    }, []);


    return (
        <div>
            <PageLoader isActive={loader}>
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setCheckVideo(false)
                        setIsModalOpen(false)
                    }}
                    title='Upload Video'
                >
                    <Formik
                        initialValues={initialValue}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({
                            values,
                            errors,
                            handleSubmit,
                            touched,
                            isSubmitting,
                        }) => {
                            handleValues(values);
                            return (<form
                                onSubmit={handleSubmit}
                                className='flex flex-col gap-4'

                            >
                                <div className='h-[360px] overflow-auto pt-[6px] scrollbar-hidden'
                                    style={scrollbarStyles}>

                                    {
                                        !isSoTW ?
                                            <div className="px-5 mb-3">
                                                <span className='text-[gray]' >Video Category :</span><span className='text-[#000000] font-semibold'> {videoCategory}</span>
                                            </div> : <>
                                                <div className="px-5  mb-3">
                                                    <MUISelect
                                                        label="Club"
                                                        name="club"
                                                        required={true}
                                                        options={clubOptions}
                                                    />
                                                </div>
                                                <div className="px-5  mb-3">
                                                    <MUISelect
                                                        label="Course"
                                                        name="course"
                                                        required={true}
                                                        options={courseOptions || []}
                                                    />
                                                </div>
                                                <div className="px-5  mb-3">
                                                    <MUISelect
                                                        label="Hole"
                                                        name="hole"
                                                        required={true}
                                                        options={holeOptions || []}
                                                    />
                                                </div>
                                                <div className="px-5  mb-3">
                                                    <MUISelect
                                                        label="Tee"
                                                        name="tee"
                                                        required={true}
                                                        options={teeOptions || []}
                                                    />
                                                </div>

                                                <div className="px-5  mb-3">
                                                    <MUISelect
                                                        label="Contest Name"
                                                        name="contestName"
                                                        required={true}
                                                        options={[
                                                            {
                                                                key: "AceCam-Jackpot",
                                                                value: "ACE_CAM_JACKPOT",
                                                            },
                                                            {
                                                                key: "Closest-to-the-Pin",
                                                                value: "CLOSEST_TO_THE_PIN",
                                                            },
                                                        ]}
                                                    // disabled={isUpdateContest ? true : false || isSuperAdmin}
                                                    />
                                                </div>
                                                <div className="px-5  mb-3">
                                                    <CustomDatePicker
                                                        name="dateTime"
                                                        label="Date/Time"
                                                        required={true}
                                                    />
                                                    <div className="mb-5 ml-6 w-[450px] ">
                                                        {touched.dateTime &&
                                                            errors.dateTime &&
                                                            typeof errors.dateTime === "string" && (
                                                                <span className="text-red-600">{errors.dateTime}</span>
                                                            )}
                                                    </div>
                                                </div>
                                            </>
                                    }
                                    <div className="flex  px-5">
                                        <FormikControl
                                            label="Player Username"
                                            name="username"
                                            control="customInput"
                                            className="w-full"
                                            placeholder="Player Username"
                                            type="text"
                                            required={true}
                                        />
                                    </div>
                                    <div className="flex  px-5">
                                        <FormikControl
                                            label="Video Title"
                                            name="title"
                                            control="customInput"
                                            className="w-full"
                                            placeholder="Your First Name"
                                            type="text"
                                            required={true}
                                        />
                                    </div>
                                    <div className="flex  px-5">
                                        <FormikControl
                                            label="Video Description"
                                            name="description"
                                            control="textarea"
                                            placeholder="Video Description"
                                            type="text"
                                            required={true}
                                        />
                                    </div>
                                    <div className='flex px-5 gap-5'>
                                        <div className='w-[120px]'>
                                            <img src={thumbnail} alt="" className='w-[120px] h-[92px] rounded-md' />
                                        </div>
                                        <div className=''>
                                            <div className='flex flex-col border cursor-pointer rounded-md ml-auto border-[#7B7887] border-dashed items-center justify-center w-[350px] h-[92px] bg-[#F5F6F7]'
                                                onClick={handleButtonClick}

                                            >
                                                <MonitorUp className='text-[#7B7887]' />
                                                <div className='text-[#7B7887]'>Upload Video</div>
                                            </div>
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                id="videoUpload"
                                                accept="video/*"
                                                className="hidden "
                                                onChange={handleVideoUpload}
                                                name='videoUrl'
                                            />
                                        </div>
                                    </div>
                                    

                                </div>

                                <div className="flex w-full items-center justify-end rounded-bl-lg rounded-br-lg border border-gray-200 bg-[#F5F6F7] p-6 ">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setCheckVideo(false)
                                            setIsModalOpen(false)
                                        }}
                                        className="mr-5 w-32 rounded-md bg-[#7B7887] py-2 text-white"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-32 rounded-md bg-lime-500 py-2 text-white"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                            )
                        }}
                    </Formik>
                </Modal>
            </PageLoader>
        </div>
    )
}

export default UploadShotOfTheWeekModal
