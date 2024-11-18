import React, { useState } from "react";
import Modal from "../ModalComponent";
import { Formik, FormikHelpers } from "formik";
import apiService from "../../services/apiService";
import { API_URL } from "../../services/enums";
import moment from "moment";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { ToastInfo, ToastSuccess } from "../Toast";
import { setLoading } from "../../reducers/loader/loader";
import * as Yup from "yup";
import FormikControl from "../../Formik/components/FormikControl";

interface UploadVideoModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (flag: boolean) => void;
  requestVideoPayload: any;
  getAllVideos: () => void;
}

const initialValue = {
  videoCategory: "",
  description: "",
};

const validationSchema = Yup.object({
  description: Yup.string()
    .required("Description is required.")
    .max(100, "Video description must be less than 100 characters"),
});

const VideoRequestModal: React.FC<UploadVideoModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  requestVideoPayload,
  getAllVideos,
}) => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [selectedOption, setSelectedOption] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (values: any, {}: FormikHelpers<any>) => {
    if (selectedOption) {
      try {
        dispatch(setLoading(true));
        const payload = {
          requestVideoId: requestVideoPayload?.requestVideoId,
          scheduleContestId: requestVideoPayload?.scheduleContestId,
          playerId: typeof userInfo === "object" ? userInfo.userId : null,
          description: values.description,
          requestDate: moment().utc().format("YYYY-MM-DDTHH:mm:ss[Z]"),
          videoCategory: selectedOption,
        };

        const { data, status } = await apiService.post<any>(
          API_URL.requestHighlight,
          {
            data: {
              ...payload,
              contestQueueRecordId: requestVideoPayload?.contestQueueId,
            },
          },
        );

        if (status === 200 && data.message !== null) {
          ToastSuccess(data.data.message);
          setIsModalOpen(false);
          getAllVideos();
        } else if (data.description) {
          ToastInfo(data.description);
        }
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setLoading(false));
      }
    }
  };

  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div
      style={{
        color: "black",
        fontSize: "18px",
        fontWeight: "400",
        width: "420px",
      }}
    >
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Video Request"
      >
        <Formik
          initialValues={initialValue}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, touched, isSubmitting }) => {
            return (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="relative mt-[-15px] px-5">
                  <span className="mb-0 text-[13px] text-black">
                    Select your video category
                  </span>
                  <span
                    className={`pointer-events-none absolute left-[42%] top-1 text-[14px] text-red-500`}
                  >
                    *
                  </span>

                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="videoCategory"
                        value="TOP_SHOT"
                        checked={selectedOption === "TOP_SHOT"}
                        onChange={handleTagChange}
                        className="form-radio text-blue-600"
                      />
                      <span className="ml-2 text-[14px]">Top Shot</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="videoCategory"
                        value="NOT_TOP_SHOT"
                        checked={selectedOption === "NOT_TOP_SHOT"}
                        onChange={handleTagChange}
                        className="form-radio text-blue-600"
                      />
                      <span className="ml-2 text-[14px]">Not Top Shot</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="videoCategory"
                        value="BLOOPERS"
                        checked={selectedOption === "BLOOPERS"}
                        onChange={handleTagChange}
                        className="form-radio text-blue-600"
                      />
                      <span className="ml-2 text-[14px]">Blooper</span>
                    </label>
                  </div>

                  <div>
                    {!selectedOption && touched.videoCategory ? (
                      <span className="ml-4 text-[13px] text-[#d32f2f]">
                        {" "}
                        Please select category.
                      </span>
                    ) : null}
                  </div>
                </div>

                <span className="mb-0 px-5 text-[13px] text-black">
                  Describe your video
                </span>
                <div className="flex px-5">
                  <FormikControl
                    label="Video Description"
                    name="description"
                    control="textarea"
                    placeholder="Video Description"
                    type="text"
                    required={true}
                  />
                </div>

                <div className="mt-[20px] flex h-[70px] w-[420px] items-center justify-end rounded-bl-lg rounded-br-lg border border-gray-200 bg-[#F5F6F7] p-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="mr-5 h-[40px] w-[76px] rounded-md bg-[#7B7887] py-2 text-[14px] text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-[40px] w-[76px] rounded-md bg-lime-500 py-2 text-[14px] text-white"
                  >
                    Request
                  </button>
                </div>
              </form>
            );
          }}
        </Formik>
      </Modal>
    </div>
  );
};

export default VideoRequestModal;
