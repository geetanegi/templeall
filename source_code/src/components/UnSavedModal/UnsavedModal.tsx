import React from "react";
import Modal from "../Modals/Modal";

interface unsavedModalProps {
  onClose: () => void;
  isOpenModal: boolean;
  handleDiscard: () => void;
}

const UnsavedModal: React.FC<unsavedModalProps> = ({
  isOpenModal,
  onClose,
  handleDiscard,
}) => {
  return (
    <Modal
      isOpen={isOpenModal}
      onClose={onClose}
      title={<p className="text-[18px] font-semibold">Unsaved Changes</p>}
      footer={
        <div className="flex justify-end p-4">
          <div className="space-x-2">
            <button
              onClick={handleDiscard}
              className={`rounded-lg bg-primaryColor px-5 py-2 text-sm font-medium text-white`}
            >
              Discard
            </button>

            <button
              onClick={onClose}
              className="rounded-md bg-[#7B7887] px-8 py-2 text-sm font-medium text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      }
    >
      <div>
        <p className="font-semibold text-[18]">
          Are you sure you want to discard changes?
        </p>
      </div>
    </Modal>
  );
};

export default UnsavedModal;
