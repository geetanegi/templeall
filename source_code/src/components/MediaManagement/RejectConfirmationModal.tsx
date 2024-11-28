import React from "react";
import Modal from "../ModalComponent";
import { Formik, FormikHelpers } from "formik";
import FormikControl from "../../Formik/components/FormikControl";
import * as Yup from "yup";
interface RejectConfirmationModalProps {
  setIsRejectModalOpen: (flag: boolean) => void;
  isRejectModalOpen: boolean;
  handleUpdateStatus: (
    id: number | string,
    status: string,
    statusId: string | number,
    rejectReasons: string,
  ) => void;
  updateStatusData: any;
  setIsStatusChange: (flag: boolean) => void;
  isStatusChange: boolean;
}

const validationSchema = Yup.object({
  rejectReasons: Yup.string()
    .required("Reject Reason is required.")
    .max(100, "Reject Reason must be less than 100 characters"),
});

const RejectConfirmationModal: React.FC<RejectConfirmationModalProps> = ({
  setIsStatusChange,
  isStatusChange,
  isRejectModalOpen,
  setIsRejectModalOpen,
  handleUpdateStatus,
  updateStatusData,
}) => {
  const handleSubmit = (values: any, {}: FormikHelpers<any>) => {
    handleUpdateStatus(
      updateStatusData.id,
      updateStatusData.status,
      updateStatusData.statusId,
      values.rejectReasons,
    );
    setIsRejectModalOpen(false);
  };

  return (
    <>
      {updateStatusData.status === "Rejected" ? (
        <Modal
          title="Confirmation"
          isOpen={isRejectModalOpen}
          onClose={() => {
            setIsStatusChange(!isStatusChange);
            setIsRejectModalOpen(false);
          }}
        >
          <Formik
            initialValues={{ rejectReasons: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, isSubmitting }) => {
              return (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex px-5">
                    <FormikControl
                      label="Reject Reason"
                      name="rejectReasons"
                      control="textarea"
                      type="text"
                      required={true}
                    />
                  </div>
                  <div className="flex w-full items-center justify-end rounded-bl-lg rounded-br-lg border border-gray-200 bg-[#F5F6F7] p-6 md:w-[480px]">
                    <button
                      type="button"
                      onClick={() => {
                        setIsStatusChange(!isStatusChange);
                        setIsRejectModalOpen(false);
                      }}
                      className="mr-5 w-32 rounded-md bg-[#7B7887] py-2 text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-32 rounded-md bg-primaryColor py-2 text-white"
                    >
                      Ok
                    </button>
                  </div>
                </form>
              );
            }}
          </Formik>
        </Modal>
      ) : null}
    </>
  );
};

export default RejectConfirmationModal;
