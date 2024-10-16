import React from "react";
import { CircleCheck, LandPlot } from "lucide-react";
import Golf from "../../assets/images/golf_course (3).png";
import GolfTee from "../../assets/images/sports_golf (2).png";
import orangeGolf from "../../assets/images/sports_golf-orange.png";
import BGGolfImage from "../../assets/images/bg-img-authflow.jpg";
import { ContestInfo, leaderBoard } from "./LeaderBoard";
import TooltipSpan from "../Tooltip/TooltipSpan";

const ClubCard: React.FC<{
  contestInfo?: ContestInfo;
  showDropDown?: boolean;
  dropDownList?: leaderBoard[];
  setSelectedValue?: (value: string) => void;
}> = ({
  contestInfo,
  showDropDown = false,
  dropDownList,
  setSelectedValue,
}) => {
  return (
    <div>
      <div
        className={`relative my-4 w-full overflow-hidden rounded-lg border border-gray-300`}
      >
        <img
          src={BGGolfImage}
          alt=""
          className="absolute"
          style={{
            opacity: 0.1,
          }}
        />
        {showDropDown && (
          <div className="" style={{ zIndex: 2, opacity: 0.9 }}>
            <div className="flex items-center justify-center">
              <select
                name=""
                id=""
                onChange={(e) => {
                  setSelectedValue?.(e.target.value);
                }}
              >
                {dropDownList &&
                  dropDownList?.length > 0 &&
                  dropDownList?.map((item) => (
                    <option value={item.scheduleContestId}>
                      <div>
                        <span>{`${item.clubName} `}</span>
                        <span>Hole #{item.holeNumber}-</span>
                        <span>Par {item.par}</span>
                      </div>
                    </option>
                  ))}
              </select>
            </div>
          </div>
        )}
        {contestInfo && (
          <div className="flex items-center justify-between p-2">
            {/* part 1 */}
            <div className="space-y-3">
              {/* sub-part 1 */}
              <div className="-mt-5 mb-8">
                <div className="flex items-center space-x-2">
                  <LandPlot strokeWidth={1.25} className="h-5 w-5" />
                  <span className="text-sm font-semibold">
                    {contestInfo.clubName}
                  </span>
                </div>
                <p className="text-xs text-gray-500">{contestInfo.location}</p>
              </div>
              {/* sub-part 2 */}
              <div>
                <div className="flex items-center space-x-2">
                  <img
                    src={Golf}
                    alt="golf"
                    className="h-4 w-4 text-gray-600"
                  />
                  <span className="text-sm">
                    Hole <strong>#{contestInfo.holeNumber}</strong>, Par{" "}
                    {contestInfo.par}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <img src={GolfTee} alt="" className="h-4 w-4" />
                  <span className="text-sm">
                    {contestInfo.teeName} ({contestInfo.yardage} yards)
                  </span>
                </div>
              </div>
            </div>
            {contestInfo.activeStatus === "Open" && (
              <div className="flex items-center space-x-1 rounded-lg bg-[#FD8A0233] p-1 px-2">
                <img src={orangeGolf} alt="" className="h-4 w-4" />
                <p className="text-xs text-[#FD8A02]">
                  {contestInfo.activeStatus}
                </p>
              </div>
            )}
            {contestInfo.activeStatus === "Completed" && (
              <div className="flex items-center space-x-1 rounded-lg bg-[#defceb] p-1 px-2">
                <CircleCheck
                  color="#07ce6f"
                  strokeWidth={1.25}
                  className="h-5 w-5"
                  // size={18}
                />
                <p className="text-xs text-[#07CE6F]">
                  {contestInfo.activeStatus}
                </p>
              </div>
            )}

            {/* part 2 */}
            <div className="space-y-2">
              <h3 className="text-sm">{contestInfo.contestType}</h3>
              <h3 className="text-sm">Entry Fee: ${contestInfo.entryFee}</h3>
              <h3 className="text-sm">Players: {contestInfo.playerCount}</h3>
              <h3 className="text-sm">Total Prize: {contestInfo.totalPrize}</h3>
              <h3 className="text-sm">
                Payout:{" "}
                <span className="-mb-2.5">
                  (
                  <TooltipSpan
                    text={contestInfo.playerPercentage}
                    tooltip="Player Percentage"
                    needPY={false}
                  />
                  <span>/</span>
                  <TooltipSpan
                    text={contestInfo.coursePercentage}
                    tooltip="Course Percentage"
                    needPY={false}
                  />
                  <span>/</span>
                  <TooltipSpan
                    text={contestInfo.acecamPercentage}
                    tooltip="Acecam Percentage"
                    needPY={false}
                  />
                  <span>/</span>
                  {contestInfo.charityPercentage > 0 && (
                    <TooltipSpan
                      text={contestInfo.charityPercentage}
                      tooltip="Charity Percentage"
                      needPY={false}
                    />
                  )}
                  )
                </span>
              </h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClubCard;
