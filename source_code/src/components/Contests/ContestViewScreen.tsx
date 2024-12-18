import moment from "moment";
import React from "react";
import { getOrdinal } from "../../utils/RegexPatterns";
import TooltipSpan from "../Tooltip/TooltipSpan";
import { Info } from "lucide-react";

interface ContestViewScreenProps {
  contestData: any;
  saveState: any;
}

const ContestViewScreen: React.FC<ContestViewScreenProps> = ({
  contestData,
  saveState,
}) => {
  return (
    <div className="w-[70vw] px-5">
      <h1 className="mb-5 -mt-6">Viewing Contest ID {contestData?.cid || ""}</h1>
      <div className="mb-2 flex w-[69vw] flex-wrap">
        <div className="w-[23vw]">
          <span className="text-[11px] font-bold">Contest Type</span>
          <p className="whitespace-nowrap text-[14px]">
            {contestData?.contestType || ""}
          </p>
        </div>
        <div className="w-[23vw]">
          <span className="text-[11px] font-bold">Club Name</span>
          <p className="whitespace-nowrap text-[14px]">
            {contestData?.club?.name || ""}
          </p>
        </div>
        <div className="w-[23vw]">
          <span className="text-[11px] font-bold">Course Name</span>
          <p className="whitespace-nowrap text-[14px]">
            {contestData?.course?.courseName || ""}
          </p>
        </div>
      </div>
      <div className="mb-2 flex w-[70vw] flex-wrap">
        <div className="w-[23vw]">
          <span className="text-[11px] font-bold">Hole Number</span>
          <p className="whitespace-nowrap text-[14px]">
            {contestData?.hole?.holeNumber
              ? `Hole #${contestData?.hole?.holeNumber} - Par ${contestData?.hole?.par}`
              : ""}
          </p>
        </div>
        <div className="w-[23vw]">
          <span className="text-[11px] font-bold">Tee</span>
          <p className="whitespace-nowrap text-[14px]">
            {contestData?.tee?.teeName
              ? `${contestData?.tee?.teeName} (Yards ${contestData?.tee?.yardage || ""})`
              : ""}
          </p>
        </div>
      </div>
      <div className="mt-5 flex">
        <div className="mb-2 w-[23vw]">
          <div className="flex items-center">
            <span className="text-[11px] font-bold"> Contest Duration</span>
            <TooltipSpan
              text={<Info className="text-black" size={14} />}
              tooltip={"Set the dates for which the contest begins and ends."}
              needPY={false}
              position="right"
            />
          </div>
          <p className="text-[12px]">
            {moment.utc(contestData?.startTime).local().format("MM/DD/YYYY") ||
              ""}{" "}
            -{" "}
            {moment.utc(contestData?.entTime).local().format("MM/DD/YYYY") ||
              ""}{" "}
          </p>
          {saveState.selectedDays !== "" && saveState.frequency !== "" && (
            <div className="flex items-center">
              {saveState?.frequency === "WEEKLY" && (
                <span className="text-xs text-gray-500">
                  {" "}
                  Occurs every{" "}
                  {saveState?.selectedDays?.length < 7
                    ? saveState.selectedDays.join(", ")
                    : "day"}{" "}
                  until{" "}
                  <span className="text-xs font-semibold text-gray-500">
                    {moment.utc(contestData?.startTime).format("MM/DD/YYYY")}
                  </span>
                </span>
              )}
              {saveState?.frequency === "DAILY" && (
                <span className="w-[20vw] text-[12px] text-gray-500">
                  {" "}
                  Occurs{" "}
                  {saveState.repeatEvery === 1
                    ? "every"
                    : ` every ${getOrdinal(saveState.repeatEvery)} `}
                  day until{" "}
                  <span className="text-xs font-semibold text-gray-500">
                    {moment.utc(contestData?.endTime).format("MM/DD/YYYY")}
                  </span>
                </span>
              )}
            </div>
          )}
        </div>
        <div className="flex">
          <div className="w-[23vw]">
            <div className="-mb-2 flex items-center">
              <span className="text-[11px] font-bold">Active Hours</span>
              <TooltipSpan
                text={<Info className="text-black" size={14} />}
                tooltip={
                  "Set the time frame during which the contest will be ACTIVE; all tee shots must be taken within this period to be eligible for contest prizes."
                }
                needPY={false}
                position="right"
              />
            </div>
            <div className="flex gap-2">
              <div>
                <span className="text-[11px]">Contest Start Time</span>
                <p className="text-[14px]">
                  {moment
                    .utc(contestData?.startTime)
                    .local()
                    .format("HH:mm A") || ""}
                </p>
              </div>
              <div>
                <span className="text-[11px]">Contest End Time</span>
                <p className="text-[14px]">
                  {moment.utc(contestData?.endTime).local().format("HH:mm A") ||
                    ""}
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="-mb-2 flex items-center">
              <span className="text-[11px] font-bold">
                {" "}
                Registration Period
              </span>
              <TooltipSpan
                text={<Info className="text-black" size={14} />}
                tooltip={
                  "Set the time frame during which players can register for the contest."
                }
                needPY={false}
                position="right"
              />
            </div>
            <div className="flex gap-10">
              <div>
                <span className="text-[11px]">Registration Start Time</span>
                <p className="text-[14px]">
                  {moment
                    .utc(contestData?.registrationStartTime)
                    .local()
                    .format("HH:mm A") || ""}
                </p>
              </div>
              <div>
                <span className="text-[11px]">Registration End Time</span>
                <p className="text-[14px]">
                  {moment
                    .utc(contestData?.registrationEndTime)
                    .local()
                    .format("HH:mm A") || ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span className="text-[11px] font-bold">Payout</span>
      <div className="mb-7 flex items-center gap-4">
        <div>
          <span className="text-[11px]">Player %</span>
          <p className="text-[14px]">
            {contestData?.payoutStructure?.playerPercentage || ""}
          </p>
        </div>
        <div>
          <span className="text-[11px]">AceCam %</span>
          <p className="text-[14px]">
            {contestData?.payoutStructure?.acecamPercentage || ""}
          </p>
        </div>
        <div>
          <span className="text-[11px]">Course %</span>
          <p className="text-[14px]">
            {contestData?.payoutStructure?.coursePercentage || ""}
          </p>
        </div>
        <div>
          <span className="text-[11px]">Charity %</span>
          <p className="text-[14px]">
            {contestData?.payoutStructure?.charityPercentage || ""}
          </p>
        </div>
      </div>
      <div className="mb-7 items-center gap-4">
        <span className="text-[11px] font-bold">Eligibility Requirements</span>
        <p className="text-[14px]">
          {contestData?.note || ""}
        </p>
      </div>
      <div className="mb-2 flex items-center">
        <span className="text-[11px] font-bold">Limit Entries Per User -</span>
        <p className="text-[12px]">
          {contestData?.limitSection ? "Yes" : "No"}
        </p>
      </div>
      <div className="flex gap-20">
        {!contestData?.limitSection ? (
          <>
            <div className="items-center gap-1">
              <span className="text-[11px] font-bold">
                How many Entries Per 24 Hours -{" "}
              </span>
              <p className="text-[14px]">
                {contestData?.entriesPer24Hours || 0}
              </p>
            </div>
            <div className="items-center gap-1">
              <span className="text-[11px] font-bold">
                Wait Time in Between Entries Hours -{" "}
              </span>
              <p className="text-[14px]">
                {contestData?.waitTimeBetweenEntries || 0}
              </p>
            </div>
          </>
        ) : null}

        <div className="items-center gap-1">
          <span className="text-[11px] font-bold">Queue Limit (4)</span>
          <p className="text-[14px]">4</p>
        </div>
      </div>
    </div>
  );
};

export default ContestViewScreen;
