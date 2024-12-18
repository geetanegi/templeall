import React from "react";
import Modal from "../../ModalComponent";
import Contests from "../../../pages/Contests";

interface contestModalProps {
  isContestModalOpen: boolean;
  setIsContestModalOpn: (flag: boolean) => void;
  contestId: number | string;
  setContestId: (value: any) => void;
}

const ContestModal: React.FC<contestModalProps> = ({
  isContestModalOpen,
  setIsContestModalOpn,
  contestId,
  setContestId,
}) => {

const handleClose = () => {
    setContestId("");
    setIsContestModalOpn(false);
  }
  return (
    <Modal
      isOpen={isContestModalOpen}
      onClose={handleClose}
      // title="View Contest"
    >
      <div className="h-[80vh] p-5  rounded-md overflow-auto">
        <Contests contestId={contestId} handleClose={handleClose} />
      </div>
    </Modal>
  );
};

export default ContestModal;
