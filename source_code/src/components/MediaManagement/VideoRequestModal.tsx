import React, { useRef, useState } from 'react'
import Modal from '../ModalComponent'
import { Formik, FormikHelpers } from 'formik'
import apiService from '../../services/apiService';
import { API_URL } from '../../services/enums';
import moment from 'moment';
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { ToastError, ToastSuccess } from '../Toast';
import { setLoading } from '../../reducers/loader/loader';


interface UploadVideoModalProps {
    isModalOpen: boolean;
    setIsModalOpen: (flag: boolean) => void;
    requestVideoPayload:any;
    getAllVideos:()=>void
}

const initialValue = {
    title: "",
    description: ""
    
}

const VideoRequestModal: React.FC<UploadVideoModalProps> = ({ isModalOpen, setIsModalOpen, requestVideoPayload, getAllVideos }) => {
    const userInfo = useSelector((state: RootState) => state.auth.userInfo);
    const [selectedOption, setSelectedOption] = useState('');
    
    const dispatch = useDispatch();


    const handleSubmit = async (
        values: any,
        { }: FormikHelpers<any>,
    ) => {
        try {
            dispatch(setLoading(true));
            const payload = {
                "requestVideoId":requestVideoPayload?.requestVideoId,
                "scheduleContestId": requestVideoPayload?.scheduleContestId,
                "playerId": typeof userInfo === "object" ? userInfo.userId : null,
                "description": values.description,
                "requestDate":  moment().utc().format('YYYY-MM-DDTHH:mm:ss[Z]'),
                "videoCategory":selectedOption
            }

            console.log("requestVideoPayload?.contestQueueId",  requestVideoPayload)
            const { data, status } = await apiService.post<any>( 
                API_URL.requestHighlight,
                {
                    data:{ ...payload, 
                        "contestQueueRecordId": requestVideoPayload?.contestQueueId
                    }
                }
            )

            if (status === 200 && data.message !== null){
                    ToastSuccess(data.data.message)
                    setIsModalOpen(false)
                    getAllVideos()
            }else if(data.description){
                ToastError(data.description)
            }
              
            
        } catch (error) {
            ToastError('Something went wrong')
        }finally{
            dispatch(setLoading(false));
        }
    };



    const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };

    

    return (
        <div style={{ color: "black", fontSize: "18px", fontWeight: "400",width:"420px" }}>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title='Video Request'
                
            >
                <Formik
                    initialValues={initialValue}
                    // validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({
                        values,

                        handleChange,
                        handleSubmit,
                        isSubmitting,
                    }) => (
                        <form
                            onSubmit={handleSubmit}
                            className='flex flex-col gap-4'

                        >
                            <div className="relative px-5 mt-[-15px]">

                            <span className='text-black mb-0 text-[13px]'>Select your video category</span>
                            
                                <div className="flex space-x-4">
                                    
                                    <label className="inline-flex items-center">
                                    
                                        <input
                                            type="radio"
                                            name="TopShots"
                                            value="TOP_SHOT"
                                            checked={selectedOption === 'TOP_SHOT'}
                                            onChange={handleTagChange}
                                            className="form-radio text-blue-600"
                                        />
                                        <span className="ml-2 text-[14px]">Top Shots</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="NotTopShots"
                                            value="NOT_TOP_SHOT"
                                            checked={selectedOption === 'NOT_TOP_SHOT'}
                                            onChange={handleTagChange}
                                            className="form-radio text-blue-600"
                                        />
                                        <span className="ml-2 text-[14px]">Not Top Shots</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="Bloopers"
                                            value="BLOOPERS"
                                            checked={selectedOption === 'BLOOPERS'}
                                            onChange={handleTagChange}
                                            className="form-radio text-blue-600"
                                        />
                                        <span className="ml-2 text-[14px]">Bloopers</span>
                                    </label>
                                </div>
                            </div>


                            <span className='text-black px-5 mb-0 text-[13px]'>Describe your video</span>
                            <div className='relative px-5' style={{ marginTop: '-5px' }}>

                                <textarea
                                    name="description"
                                    id="description"
                                    onChange={handleChange}
                                    placeholder='Description'
                                    className="w-[382px] h-[60px] resize-none rounded-[4px] text-[14px] border border-gray-300 bg-[#FAFAFA] px-2 py-3 text-gray-500"></textarea>
                                <span
                                    className={`pointer-events-none absolute left-[25%] top-3 text-red-500 ${values.description ? "hidden" : ""}`}
                                >
                                    *
                                </span>
                            </div>


                            <div className="mt-[20px] flex h-[70px]  items-center justify-end rounded-bl-lg rounded-br-lg border border-gray-200 bg-[#F5F6F7] p-6 w-[420px]">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="mr-5 w-[76px] h-[40px] text-[14px] rounded-md bg-[#7B7887] py-2 text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-[76px] h-[40px] text-[14px] rounded-md bg-lime-500 py-2 text-white"
                                >
                                    Request
                                </button>
                            </div>
                        </form>
                    )}
                </Formik>
            </Modal>
        </div>
    )
}

export default VideoRequestModal
