import React from "react";
import ClubCard from "./ClubCard";
import LeaderBoardTable from "./LeaderBoardTable";

const MostRecent: React.FC = () => {
  return (
    <div>
      <ClubCard
        contestInfo={{
          contestType: "Ace-Cam Jackpot",
          courseName: "Test 2",
          club: "Test",
          holeNumber: "Test 3",
          tee: "TEE",
          par: 2,
          yardage: 200,
          status: "Completed",
          entryFee: 20.0,
          playerCount: 4,
          totalPrize: 1000.0,
          playerPercentage: 2.0,
          acecamPercentage: 3.0,
          coursePercentage: 0.5,
          charityPercentage: 2.0,
        }}
      />
      <LeaderBoardTable
        leaderBoardData={[
          {
            position: 1,
            username: "Akshay",
            proximity: 20.0,
            prize: 10.0,
          },
          {
            position: 1,
            username: "Akshay",
            proximity: 20.0,
            prize: 10.0,
          },
          {
            position: 1,
            username: "Akshay",
            proximity: 20.0,
            prize: 10.0,
          },
          {
            position: 1,
            username: "Akshay",
            proximity: 20.0,
            prize: 10.0,
          },
          {
            position: 1,
            username: "Akshay",
            proximity: 20.0,
            prize: 10.0,
          },
          {
            position: 1,
            username: "Akshay",
            proximity: 20.0,
            prize: 10.0,
          },
          {
            position: 1,
            username: "Akshay",
            proximity: 20.0,
            prize: 10.0,
          },
        ]}
      />
    </div>
  );
};

export default MostRecent;
