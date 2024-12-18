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
      <div className="mb-2 flex gap-10">
        <div>
          <span className="text-[11px]">Contest Type</span>
          <p className="text-[14px]">{contestData?.contestType || ""}</p>
        </div>
        <div>
          <span className="text-[11px]">Club Name</span>
          <p className="text-[14px]">{contestData?.club?.name || ""}</p>
        </div>
        <div>
          <span className="text-[11px]">Course Name</span>
          <p className="text-[14px]">{contestData?.course?.courseName || ""}</p>
        </div>
        <div>
          <span className="text-[11px]">Hole Number</span>
          <p className="text-[14px]">
            {contestData?.hole?.holeNumber
              ? `Hole #${contestData?.hole?.holeNumber} - Par ${contestData?.hole?.par}`
              : ""}
          </p>
        </div>
        <div>
          <span className="text-[11px]">Tee</span>
          <p className="text-[14px]">
            {contestData?.tee?.teeName
              ? `${contestData?.tee?.teeName} (Yards ${contestData?.tee?.yardage || ""})`
              : ""}
          </p>
        </div>
      </div>
      <div className="flex gap-20">
        <div className="mb-2">
          <div className="flex items-center">
            <span className="text-[11px]"> Contest Duration</span>
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
                <span className="text-xs text-gray-500">
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
        <div className="flex gap-20">
          <div>
            <div className="flex items-center">
              <span className="text-[11px]">Active Hours</span>
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
            <div className="flex items-center">
              <span className="text-[11px]"> Registration Period</span>
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
      <span className="text-[11px]">Payout</span>
      <div className="mb-2 flex items-center gap-4">
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
      <div className="mb-2 items-center gap-4">
        <span className="text-[11px]">Eligibility Requirements</span>
        <p className="text-[14px]">
          {contestData?.note || ""}{" "}
          Your HDCP must be no less than 7.0 to be eligible for participation, unless you are woman, or older than 70 years of age. Your HDCP must be no less t
        </p>
      </div>
      <div className="flex gap-20">
        <div className="mb-2 items-center">
          <span className="text-[11px]">Limit Entries Per User -</span>
          <p className="text-[12px]">
            {contestData?.limitSection ? "Yes" : "No"}
          </p>
        </div>
        {!contestData?.limitSection ? (
          <>
            <div className="items-center gap-1">
              <span className="text-[11px]">
                How many Entries Per 24 Hours -{" "}
              </span>
              <p className="text-[14px]">
                {contestData?.entriesPer24Hours || 0}
              </p>
            </div>
            <div className="items-center gap-1">
              <span className="text-[11px]">
                Wait Time in Between Entries Hours -{" "}
              </span>
              <p className="text-[14px]">
                {contestData?.waitTimeBetweenEntries || 0}
              </p>
            </div>
          </>
        ) : null}

        <div className="items-center gap-1">
          <span className="text-[11px]">Queue Limit (4) - </span>
          <p className="text-[14px]">4</p>
        </div>
      </div>
    </div>
  );
};

export default ContestViewScreen;
