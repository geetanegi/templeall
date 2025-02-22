import React from "react";
import Modal from "../../ModalComponent";
import Contests from "../../../pages/Contests";

interface contestModalProps {
  isContestModalOpen: boolean;
  setIsContestModalOpn: (flag: boolean) => void;
  contestId: number | string;
  setContestId: (value: any) => void;
  cid: string | null
}

const ContestModal: React.FC<contestModalProps> = ({
  isContestModalOpen,
  setIsContestModalOpn,
  contestId,
  setContestId,
  cid
}) => {

const handleClose = () => {
    setContestId("");
    setIsContestModalOpn(false);
  }
  return (
    <Modal
      isOpen={isContestModalOpen}
      onClose={handleClose}
      title={`Viewing Contest ID ${cid || ""}`}
    >
      <div className="px-6 py-6 pt-5  rounded-md ">
        <Contests contestId={contestId} handleClose={handleClose} />
      </div>
    </Modal>
  );
};

export default ContestModal;
