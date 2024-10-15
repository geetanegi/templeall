import React, { useState } from "react";
import TableComponent from "../TableComponent";
import Modal from "../Modals/Modal";
import { LeaderboardEntry } from "./LeaderBoard";

const LeaderBoardTable: React.FC<{ leaderBoardData: LeaderboardEntry[] }> = ({
  leaderBoardData,
}) => {
  const [openModal, setOpenModal] = useState(false);

  const displayedData = leaderBoardData?.slice(0, 3);
  const headers = [
    { id: 1, key: "Pos", field: "Pos" },
    { id: 2, key: "Username", field: "Username" },
    { id: 3, key: "Proximity(FEET)", field: "Proximity(FEET)" },
    { id: 4, key: "Prize", field: "Prize" },
  ];
  return (
    <div>
      <div className="max-h-44 w-full">
        <TableComponent
          Headers={headers}
          rowData={displayedData}
          pagination={false}
          oddRowStyle={{ backgroundColor: "#E6E6E6" }}
        />
        <div className="text-right">
          <button
            className="text-[14px] font-semibold text-[#95C11E] underline"
            onClick={() => setOpenModal(true)}
          >
            See full leaderboard
          </button>
        </div>
      </div>
      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        title="Leaderboard"
        footer={
          <div className="-mt-4 bg-[#F5F6F7] px-3 py-2 text-right">
            <button
              onClick={() => setOpenModal(false)}
              className="rounded-md bg-[#95C11E] px-5 py-2 text-white"
            >
              Ok
            </button>
          </div>
        }
      >
        <div className="-mt-3 h-[80vh]">
          <TableComponent
            Headers={headers}
            rowData={leaderBoardData}
            pagination={false}
            oddRowStyle={{ backgroundColor: "#f0f0f0" }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default LeaderBoardTable;
