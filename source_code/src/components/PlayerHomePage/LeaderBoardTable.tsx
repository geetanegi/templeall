import React, { useEffect, useState } from "react";
import TableComponent from "../TableComponent";
import Modal from "../Modals/Modal";
import { LeaderboardEntry } from "./LeaderBoard";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/routesPath";
import { Lock } from "lucide-react";

const LeaderBoardTable: React.FC<{ leaderBoardData: LeaderboardEntry[] }> = ({
  leaderBoardData,
}) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [tableData, setTableData] = useState<any>([]);
  const displayedData = tableData?.slice(0, 3);
  const headers = [
    { id: 1, key: "Pos", field: "Position" },
    { id: 2, key: "Username", field: "Username" },
    { id: 3, key: "Proximity(FEET)", field: "Proximity(FEET)" },
    { id: 4, key: "price", field: "Price" },
  ];
  const updatedTableData = () => {
    const updatedData = leaderBoardData?.map((row: any, index: number) => ({
      Pos: index + 1,
      username: (
        <div
          className="flex cursor-pointer items-center"
          onClick={() => {
            navigate(ROUTES.PROFILE, {
              state: { id: row.playerId, role: "player" },
            });
          }}
        >
          <img
            src={`data:image/png;base64,${row?.imageBase64}`}
            className="mr-1 h-8 w-8 rounded-full"
          />
          <span>{row.username}</span>
        </div>
      ),
      "Proximity(FEET)": row.proximity === null ? "---" : row.proximity,
      price: row.price === null ? <Lock strokeWidth={1.5} /> : row.price,
    }));
    setTableData(updatedData);
    // return updatedData;
  };

  useEffect(() => {
    updatedTableData();
  }, [leaderBoardData]);

  return (
    <div>
      <div className="max-h-44 w-full">
        {leaderBoardData == null ||
          (leaderBoardData.length == 0 && (
            <div>No live data available yet</div>
          ))}
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
            rowData={tableData}
            pagination={false}
            oddRowStyle={{ backgroundColor: "#f0f0f0" }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default LeaderBoardTable;
