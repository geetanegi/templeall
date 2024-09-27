import React from "react";
import { Info } from "lucide-react";
import Modal from "../../Modals/Modal";
import { useNavigate } from "react-router-dom";

interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
}

const BreadCumModal: React.FC<ModalComponentProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  return (
    <div>
      <Modal
        footer={
          <div className="flex justify-end space-x-2 rounded-b-lg bg-gray-100 px-4 py-5">
            <div className="space-x-2">
              <button
                onClick={onClose}
                className="rounded-lg bg-[#95c11e] px-5 py-2 text-sm font-medium text-white"
              >
                Stay on this Page
              </button>

              <button
                onClick={() => navigate(-1)}
                className="rounded-md bg-[#7B7887] px-8 py-2 text-sm font-medium text-white"
              >
                Leave this Page
              </button>
            </div>
          </div>
        }
        isOpen={isOpen}
        onClose={onClose}
        title="warning"
      >
        <div className="flex flex-col items-center justify-center space-y-3 p-2">
          <div className="rounded-full bg-[#f3c4736a] p-1">
            <Info
              color="#ec8530"
              strokeWidth={2}
              size={32}
              className="rounded-full bg-[#f3c4736a]"
            />
          </div>
          <div className="text-center">
            <p className="pb-4">
              The items added to cart will be lost if you navigate away from
              this page. Are you sure you want to leave this page?
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BreadCumModal;
