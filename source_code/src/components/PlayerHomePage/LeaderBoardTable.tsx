import React, { useEffect, useState } from "react";
import TableComponent from "../TableComponent";
import Modal from "../Modals/Modal";
import { LeaderboardEntry } from "./LeaderBoard";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/routesPath";
import { Lock } from "lucide-react";

const LeaderBoardTable: React.FC<{
  leaderBoardData: LeaderboardEntry[];
  registered: Boolean;
}> = ({ leaderBoardData, registered }) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [tableData, setTableData] = useState<any>([]);
  const displayedData = tableData?.slice(0, 3);
  const headers = [
    { id: 1, key: "Pos", field: "Position" },
    { id: 2, key: "Username", field: "Username" },
    { id: 3, key: "Proximity(FEET)", field: "Proximity(FEET)" },
    { id: 4, key: "price", field: "Prize" },
  ];

  const showPrice = (row: LeaderboardEntry) => {
    if (row.price) {
      return row.price;
    }
    if (row.price === null && row.showLock === true) {
      return <Lock strokeWidth={1.5} height={14} width={14} />;
    }
    if (row.price === null && row.showLock === false) {
      return "N/A";
    }
  };



  const updatedTableData = () => {
    const updatedData = leaderBoardData?.map((row: any, index: number) => ({

      Pos: <span style={index > 1 ? { color: '#fff' } : { color: '#000' }}>{index + 1}</span>,
      username: (
        <div
          className="flex cursor-pointer items-center"
          style={index > 1 ? { color: '#fff' } : { color: '#000' }}
          onClick={() => {
            navigate(ROUTES.PROFILE, {
              state: { id: row.playerId, role: "Player" },
            });
          }}
        >
          <img
            src={row?.imageUrl}
            style={index > 2 ? { color: '#fff' } : { color: '#000' }}
            className="mr-[8px] h-5 w-5 rounded-full border border-[#FFDE59]"
          />
          <span className="text-[13px]" style={index > 1 ? { color: '#fff' } : { color: '#000' }}>{row.username}</span>
        </div>
      ),
      "Proximity(FEET)": (
        <span className="text-[13px] " style={index > 1 ? { color: '#fff' } : { color: '#000' }}>
          {row.proximity === null ? "N/A" : row.proximity}
        </span>
      ),
      price: (
        <span className="text-[13px]"
          style={index > 1 ? { color: '#fff' } : { color: '#000' }}>
          {showPrice(row)}
        </span>
      ),
    }));
    setTableData(updatedData);
  };

  useEffect(() => {
    updatedTableData();
  }, [leaderBoardData]);

  return (
    <div className="">
      <div className="max-h-44 w-full">
        <TableComponent
          Headers={headers}
          rowData={displayedData}
          pagination={false}
          oddRowStyle={{
            background: '#284226',
            borderBottom: '1px solid #FFDE59'
          }}
          firstRowStyle={{
            background: 'linear-gradient(180deg, #A09825 0%, #FFF5BA 25%, #F7F6B1 46%, #C5BB61 87%)',
          }}
          secondRowStyle={{
            background: 'linear-gradient(180deg, #BABABA 16.67%, #DFDFDF 52.17%, #A5A5A5 82.67%, #BCBCBC 100%)'
          }}
          thirdRowStyle={{
            background: 'linear-gradient(180deg, #907B4B 0%, #B09659 11%, #865F1C 52%, #8A6629 75%, #B38531 100%)'

          }}

          greenTheme={true}
        />
        <div className="text-right">
          {registered && leaderBoardData?.length > 0 && (
            <button
              className="text-[14px] font-semibold text-[#95C11E] underline"
              onClick={() => setOpenModal(true)}
            >
              See full leaderboard
            </button>
          )}
        </div>
      </div>
      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        title="Leaderboard"
        footer={
          <div className="-mt-4 rounded-lg   bg-[#F5F6F7] px-3 py-2 text-right">
            <button
              onClick={() => setOpenModal(false)}
              className="rounded-md bg-primaryColor px-5 py-2 text-white"
            >
              Ok
            </button>
          </div>
        }
      >
        <div className="-mt-3 pt-5 pb-10" style={{height:"max-content"}}>
          <TableComponent
            Headers={headers}
            rowData={tableData}
            pagination={false}
            oddRowStyle={{
              background: '#284226',
              borderBottom: '1px solid #FFDE59'
            }}

            firstRowStyle={{
              background: 'linear-gradient(180deg, #A09825 0%, #FFF5BA 25%, #F7F6B1 46%, #C5BB61 87%)',
              borderBottom: '1px solid #FFDE59'
            }}
            secondRowStyle={{
              background: 'linear-gradient(180deg, #BABABA 16.67%, #DFDFDF 52.17%, #A5A5A5 82.67%, #BCBCBC 100%)',
              borderBottom: '1px solid #FFDE59'
            }}
            thirdRowStyle={{
              background: 'linear-gradient(180deg, #907B4B 0%, #B09659 11%, #865F1C 52%, #8A6629 75%, #B38531 100%)',
              borderBottom: '1px solid #FFDE59'

            }}
            greenTheme={true}
          />
        </div>
      </Modal>
    </div>
  );
};

export default LeaderBoardTable;
