import React, { useState } from "react";
import Modal from "../ModalComponent";
import { Info } from "lucide-react";

interface RegisterConfirmationModalityProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const RegisterConfirmationModal: React.FC<
  RegisterConfirmationModalityProps
> = ({ isModalOpen, setIsModalOpen }) => {
  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirmation"
      >
        <>
          <div className="mb-6 w-full items-center justify-center rounded-bl-lg rounded-br-lg px-16 text-center md:w-[480px]">
            <Info
              color="#0077B6"
              className="m mx-auto mb-6 h-[38px] w-[38px] rounded-full bg-[#A1D3E5] p-2"
            />
            <p className="text-center text-[16px]">
              Are you sure you want to register for the contest? Once
              registered, you cannot cancel your registration, and the fee will
              be deducted from your wallet.
            </p>
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
              onClick={() => {
                setIsModalOpen(false);

                // do here
              }}
              className="w-32 rounded-md bg-[#95c11e] py-2 text-white"
            >
              {"Yes"}
            </button>
          </div>
        </>
      </Modal>
    </div>
  );
};

export default RegisterConfirmationModal;
