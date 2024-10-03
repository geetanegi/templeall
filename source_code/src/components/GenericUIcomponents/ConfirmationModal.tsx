import React from 'react'
import Modal from '../ModalComponent'
import { CircleCheck, Trash2 } from 'lucide-react';

interface ConfirmationModalProps {
    type:string;
    confirmationText: string;
    isOpen:boolean;
    onClose:(flag: boolean)=>void
    onOk:()=>void;
    
}

const ConfirmationModal:React.FC<ConfirmationModalProps> = ({type, confirmationText, isOpen, onClose, onOk }) => {
  return (
    <div>
        <Modal
        isOpen={isOpen}
        onClose={() => onClose(false)}
        title="Confirmation"
        >
            <>
          <div className="mb-6 w-full items-center justify-center rounded-bl-lg rounded-br-lg px-6 text-center md:w-[480px]">
            {
                type ==="success" ? 
                <CircleCheck className="m mx-auto mb-6 h-[38px] w-[38px] rounded-full bg-[#248A3D59] p-2" /> :
                <Trash2 className="m mx-auto mb-6 h-[50px] border-4 border-[#FF3B3026] shadow-lg w-[50px] rounded-full bg-[#FF3B3059] p-2 text-[#FF3B30]"
                /> 
            }
            <p className="text-center">
              {confirmationText}
            </p>
          </div>
          <div className="flex w-full items-center justify-end rounded-bl-lg rounded-br-lg border border-gray-200 bg-[#F5F6F7] p-6 md:w-[480px]">
            <button
              type="button"
              onClick={() => onClose(false)}
              className="mr-5 w-32 rounded-md bg-[#7B7887] py-2 text-white"
            >
              No
            </button>
            <button
              type="submit"
              onClick={() => onOk()}
              className="w-32 rounded-md bg-[#95c11e] py-2 text-white"
            >
              {"Yes"}
            </button>
          </div>
        </> 
        </Modal>
    </div>
  )
}

export default ConfirmationModal
