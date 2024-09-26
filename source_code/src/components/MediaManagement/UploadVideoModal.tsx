import React, { useRef, useState } from 'react'
import Modal from '../ModalComponent'
import { Formik, FormikHelpers } from 'formik'
import { MonitorUp } from 'lucide-react'

interface UploadVideoModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (flag: boolean) => void
}

const initialValue = {
  title: "",
  description: ""

}

const UploadVideoModal: React.FC<UploadVideoModalProps> = ({ isModalOpen, setIsModalOpen }) => {

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<string | undefined>(undefined);


  const handleButtonClick = () => {
    fileInputRef?.current?.click();
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideoFile(file);
      generateThumbnail(file);
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
    {  }: FormikHelpers<any>,
  ) => {
    console.log(values, videoFile, "values")
  };


  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title='Upload Video'
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
              <div className="relative px-5">
                <select
                  id="videoTab"
                  name="videoTag"
                  // value={values.roleIds}
                  onChange={handleChange}
                  // onBlur={handleBlur}
                  disabled
                  className=" w-full rounded-lg border border-gray-200 bg-[#D7D7D7] px-2 py-3 text-gray-500"
                >
                  <option value="" label="Blooper" />
                  {/* {roles.map((role: any) => (
                  <option
                    key={role.roleId}
                    value={role.roleId}
                    label={role.roleName}
                  />
                ))} */}
                </select>
              </div>
              <div className="relative mx-5">
                <input
                  type="title"
                  name="title"
                  placeholder="Video Title"
                  id="title"
                  value={values.title}
                  onChange={handleChange}
                  // onBlur={handleBlur}
                  className="w-full rounded-lg border border-gray-300 bg-[#FAFAFA] px-2 py-3 text-gray-500"
                />
                <span
                  className={`pointer-events-none absolute left-[21%] top-3 text-red-500 ${values.title ? "hidden" : ""}`}
                >
                  *
                </span>
              </div>
              <div className='relative px-5'>
                <textarea
                  name="description"
                  id="description"
                  onChange={handleChange}
                  placeholder='Video Description'
                  className="w-full resize-none rounded-lg border border-gray-300 bg-[#FAFAFA] px-2 py-3 text-gray-500"></textarea>
                <span
                  className={`pointer-events-none absolute left-[34%] top-3 text-red-500 ${values.description ? "hidden" : ""}`}
                >
                  *
                </span>
              </div>
              <div className='flex px-5 gap-5'>
                <div className='w-[120px]'>
                  <img src={thumbnail} alt="" className='w-[120px] h-[92px] rounded-md' />
                </div>
                <div className=''>
                  <div className='flex flex-col border cursor-pointer rounded-md ml-auto border-[#7B7887] border-dashed items-center justify-center w-[300px] h-[92px] bg-[#F5F6F7]'
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
                  />
                </div>
              </div>

              <div className="flex w-full items-center justify-end rounded-bl-lg rounded-br-lg border border-gray-200 bg-[#F5F6F7] p-6 md:w-[480px]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
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
          )}
        </Formik>
      </Modal>
    </div>
  )
}

export default UploadVideoModal
