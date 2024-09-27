import React, { useRef, useState } from 'react'
import Modal from '../ModalComponent'
import { Formik, FormikHelpers } from 'formik'


interface UploadVideoModalProps {
    isModalOpen: boolean;
    setIsModalOpen: (flag: boolean) => void
}

const initialValue = {
    title: "",
    description: ""

}

const VideoRequestModal: React.FC<UploadVideoModalProps> = ({ isModalOpen, setIsModalOpen }) => {








    const handleSubmit = async (
        values: any,
        { }: FormikHelpers<any>,
    ) => {

    };


    const [selectedOption, setSelectedOption] = useState('option1');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
                                            value="TopShots"
                                            checked={selectedOption === 'TopShots'}
                                            onChange={handleChange}
                                            className="form-radio text-blue-600"
                                        />
                                        <span className="ml-2 text-[14px]">Top Shots</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="NotTopShots"
                                            value="NotTopShots"
                                            checked={selectedOption === 'NotTopShots'}
                                            onChange={handleChange}
                                            className="form-radio text-blue-600"
                                        />
                                        <span className="ml-2 text-[14px]">Not Top Shots</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="Bloopers"
                                            value="Bloopers"
                                            checked={selectedOption === 'Bloopers'}
                                            onChange={handleChange}
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
