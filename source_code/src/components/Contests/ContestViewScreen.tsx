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
    <div className="-mt-5 w-[70vw] border px-5 py-2">
      <div className="mb-2 flex w-[69vw] flex-wrap">
        <div className="w-[27vw]">
          <span className="text-[14px] font-bold">Contest Type</span>
          <p className="whitespace-nowrap text-xs">
            {contestData?.contestType || ""}
          </p>
        </div>
        <div className="w-[23vw]">
          <span className="text-[14px] font-bold">Club Name</span>
          <p className="whitespace-nowrap text-xs">
            {contestData?.club?.name || ""}
          </p>
        </div>
        <div className="w-[19vw]">
          <span className="text-[14px] font-bold">Course Name</span>
          <p className="whitespace-nowrap text-xs">
            {contestData?.course?.courseName || ""}
          </p>
        </div>
      </div>
      <div className="mb-7 flex w-[70vw] flex-wrap">
        <div className="w-[27vw]">
          <span className="text-[14px] font-bold">Hole Number</span>
          <p className="whitespace-nowrap text-xs">
            {contestData?.hole?.holeNumber
              ? `Hole #${contestData?.hole?.holeNumber} - Par ${contestData?.hole?.par}`
              : ""}
          </p>
        </div>
        <div className="w-[23vw]">
          <span className="text-[14px] font-bold">Tee</span>
          <p className="whitespace-nowrap text-xs">
            {contestData?.tee?.teeName
              ? `${contestData?.tee?.teeName} (Yards ${contestData?.tee?.yardage || ""})`
              : ""}
          </p>
        </div>
      </div>
      <div className="mb-7 flex">
        <div className="min-w-[27vw]">
          <div className="flex -mb-2 items-center">
            <span className="text-[14px] font-bold"> Contest Duration</span>
            <TooltipSpan
              text={<Info className="text-black" size={14} />}
              tooltip={"Set the dates for which the contest begins and ends."}
              needPY={false}
              position="right"
            />
          </div>
          <div className="flex gap-10">
            <div>
              <span className="text-[14px]"> Start Date</span>
              <p className="text-[12px]">
                {moment
                  .utc(contestData?.startTime)
                  .local()
                  .format("MM/DD/YYYY") || ""}{" "}
              </p>
            </div>
            <div>
              <span className="text-[14px]"> End Date</span>
              <p className="text-[12px]">
                {moment
                  .utc(contestData?.endTime)
                  .local()
                  .format("MM/DD/YYYY") || ""}{" "}
              </p>
            </div>
          </div>
          {saveState.selectedDays !== "" && saveState.frequency !== "" && (
            <div className="flex w-[80%] items-center">
              {saveState?.frequency === "WEEKLY" && (
                <span className="text-xs text-gray-500">
                  {" "}
                  Occurs every{" "}
                  {saveState?.selectedDays?.length < 7
                    ? saveState.selectedDays.join(", ")
                    : "day"}{" "}
                  until{" "}
                  <span className="text-xs font-semibold text-gray-500">
                    {moment
                      .utc(contestData?.endTime)
                      .local()
                      .format("MM/DD/YYYY")}
                  </span>
                </span>
              )}
              {saveState?.frequency === "DAILY" && (
                <span className="w-[20vw] text-xs text-gray-500">
                  {" "}
                  Occurs{" "}
                  {saveState.repeatEvery === 1
                    ? "every"
                    : ` every ${getOrdinal(saveState.repeatEvery)} `}
                  day until{" "}
                  <span className="text-xs font-semibold text-gray-500">
                    {moment
                      .utc(contestData?.endTime)
                      .local()
                      .format("MM/DD/YYYY")}
                  </span>
                </span>
              )}
            </div>
          )}
        </div>
        <div className="flex">
          <div className="w-[23vw]">
            <div className="-mb-2 flex items-center">
              <span className="text-[14px] font-bold">Active Hours</span>
              <TooltipSpan
                text={<Info className="text-black" size={14} />}
                tooltip={
                  "Set the time frame during which the contest will be ACTIVE; all tee shots must be taken within this period to be eligible for contest prizes."
                }
                needPY={false}
                position="right"
              />
            </div>
            <div className="flex gap-10">
              <div>
                <span className="text-[14px]"> Start Time</span>
                <p className="text-xs">
                  {moment
                    .utc(contestData?.startTime)
                    .local()
                    .format("HH:mm A") || ""}
                </p>
              </div>
              <div>
                <span className="text-[14px]"> End Time</span>
                <p className="text-xs">
                  {moment.utc(contestData?.endTime).local().format("HH:mm A") ||
                    ""}
                </p>
              </div>
            </div>
          </div>
          <div className="w-[19vw]">
            <div className="-mb-2 flex items-center">
              <span className="text-[14px] font-bold">
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
                <span className="text-[14px]"> Start Time</span>
                <p className="text-xs">
                  {moment
                    .utc(contestData?.registrationStartTime)
                    .local()
                    .format("HH:mm A") || ""}
                </p>
              </div>
              <div>
                <span className="text-[14px]"> End Time</span>
                <p className="text-xs">
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

      <span className="text-[14px] font-bold">Payout</span>
      <div className="mb-7 flex items-center gap-4">
        <div>
          <span className="text-[14px]">Player %</span>
          <p className="text-center text-xs">
            {contestData?.payoutStructure?.playerPercentage || "0"}
          </p>
        </div>
        <div>
          <span className="text-[14px]">AceCam %</span>
          <p className="text-center text-xs">
            {contestData?.payoutStructure?.acecamPercentage || "0"}
          </p>
        </div>
        <div>
          <span className="text-[14px]">Course %</span>
          <p className="text-center text-xs">
            {contestData?.payoutStructure?.coursePercentage || "0"}
          </p>
        </div>
        <div>
          <span className="text-[14px]">Charity %</span>
          <p className="text-center text-xs">
            {contestData?.payoutStructure?.charityPercentage || "0"}
          </p>
        </div>
      </div>
      <div className="mb-7 items-center gap-4">
        <span className="text-[14px] font-bold">Eligibility Requirements</span>
        <p className="text-xs">{contestData?.note || ""}</p>
      </div>
      <div className="flex items-center">
        <span className="text-[14px] font-bold">Limit Entries Per User -</span>
        <p className="text-xs">{contestData?.limitSection ? "Yes" : "No"}</p>
      </div>
      <div className="flex gap-20">
        {!contestData?.limitSection ? (
          <>
            <div className="items-center gap-1">
              <span className="text-[14px]">
                How many Entries Per 24 Hours -{" "}
              </span>
              <p className="text-xs">{contestData?.entriesPer24Hours || 0}</p>
            </div>
            <div className="items-center gap-1">
              <span className="text-[14px]">
                Wait Time in Between Entries Hours -{" "}
              </span>
              <p className="text-xs">
                {contestData?.waitTimeBetweenEntries || 0}
              </p>
            </div>
          </>
        ) : null}

        <div className="items-center gap-1">
          <span className="text-[14px]">Queue Limit (4)</span>
          <p className="text-xs">4</p>
        </div>
      </div>
    </div>
  );
};

export default ContestViewScreen;
