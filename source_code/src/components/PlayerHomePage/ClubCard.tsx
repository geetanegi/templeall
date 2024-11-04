import React from "react";
import { CircleCheck, LandPlot } from "lucide-react";
import whiteGolf from "../../assets/images/golf_course-white.png";
import GolfTee from "../../assets/images/sports_golf-white.png";
import orangeGolf from "../../assets/images/sports_golf.png";
import { ContestInfo, leaderBoard } from "./LeaderBoard";
// import TooltipSpan from "../Tooltip/TooltipSpan";
import GolfDrive from "../../assets/images/golfDrive.jpg";
import CustomDropdown from "./CustomDropdown";

const ClubCard: React.FC<{
  contestInfo?: ContestInfo;
  showDropDown?: boolean;
  dropDownList?: leaderBoard[];
  setSelectedValue?: (value: string) => void;
  selectedValue?: string;
}> = ({
  contestInfo,
  showDropDown = false,
  dropDownList,
  setSelectedValue,
  selectedValue = "",
}) => {
  return (
    <div>
      <div
        className={`relative my-4 w-full overflow-hidden rounded-lg border border-gray-300 bg-gradient-green`}
      >
        <img
          src={GolfDrive}
          alt=""
          className="absolute"
          style={{
            opacity: 0.1,
            transform: `translate(0px, -150px)`,
          }}
        />
        <div className="relative flex flex-col items-center justify-center gap-4 p-4">
          {showDropDown && (
            <div>
              <CustomDropdown
                dropDownList={
                  dropDownList && dropDownList?.length > 0 ? dropDownList : []
                }
                setSelectedValue={(value: string | number) => {
                  if (setSelectedValue) {
                    setSelectedValue(value.toString());
                  }
                }}
                selectedValue={selectedValue}
              />
            </div>
          )}
        </div>
        {contestInfo && (
          <div className="flex items-center justify-between p-2">
            {/* part 1 */}
            <div className="space-y-3">
              {/* sub-part 1 */}
              <div className="-mt-5 mb-8">
                <div className="flex items-center space-x-2">
                  <LandPlot
                    strokeWidth={1.25}
                    color="#ffffff"
                    className="h-5 w-5"
                  />
                  <span className="text-sm font-semibold text-white">
                    {contestInfo.clubName}
                  </span>
                </div>
                <p className="text-xs font-thin text-white">
                  {contestInfo.location}
                </p>
              </div>
              {/* sub-part 2 */}
              <div>
                <div className="flex items-center space-x-2">
                  <img
                    src={whiteGolf}
                    alt="golf"
                    className="h-4 w-4 text-gray-600"
                  />
                  <span className="text-sm font-thin text-white">
                    Hole <strong>#{contestInfo.holeNumber}</strong>, Par{" "}
                    {contestInfo.par}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <img src={GolfTee} alt="" className="h-4 w-4" />
                  <span className="text-sm text-white">
                    {contestInfo.teeName}{" "}
                    <span className="font-thin">
                      ({contestInfo.teeYardage} yards)
                    </span>
                  </span>
                </div>
              </div>
            </div>
            {contestInfo.activeStatus === "Open" && (
              <div className="flex items-center space-x-1 rounded-lg bg-[#FD8A0233] p-1 px-2">
                <img src={orangeGolf} alt="" className="h-4 w-4" />
                <p className="text-xs text-yellowText">
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
              <h3 className="text-sm font-semibold text-white">
                {contestInfo.contestType}
              </h3>
              <h3 className="text-sm font-thin text-white">
                Entry Fee:{" "}
                <span className="font-semibold">${contestInfo.entryFee}</span>
              </h3>
              <h3 className="text-sm text-white">
                Players:{" "}
                <span className="font-semibold">
                  {contestInfo.totalRegistrationCount}
                </span>
              </h3>
              <h3 className="text-sm text-white">
                Total Price:{" "}
                <span className="font-semibold">{contestInfo.totalPrize}</span>
              </h3>
              <h3 className="text-sm text-white">
                Payout:{" "}
                <span className="-mb-2.5">
                  <span className="font-semibold"> ({contestInfo.payout})</span>
                  {/* (
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
                  <TooltipSpan
                    text={contestInfo.charityPercentage}
                    tooltip="Charity Percentage"
                    needPY={false}
                  />
                  ) */}
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
