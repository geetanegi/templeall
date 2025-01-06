import React, { useEffect, useState } from "react";
import golfStickWithTee from "../../../assets/images/image 8.png";
import { Plus, Minus, ShoppingCart, Info, StickyNote } from "lucide-react";
import GolfTee from "../../../assets/images/sp-golf.svg";
import { ROUTES } from "../../../utils/routesPath";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  addSelectedContest,
  removeSelectedContest,
} from "../../../reducers/Courses_data/courses";
import { RootState } from "../../../store";
import TooltipSpan from "../../Tooltip/TooltipSpan";

interface TeeContest {
  contestId: number | null;
  name: string | null;
  contestType: string | null;
  startTime: string | null;
  endTime: string | null;
  registrationStartTime: string | null;
  registrationEndTime: string | null;
  entryFee: number | null;
  limitSection: boolean | null;
  entriesPer24Hours: number | null;
  waitTimeBetweenEntries: number | null;
  queueLimit: number | null;
  activeStatus: string | null;
  activeContestDate: string | null;
  recurringType: string | null;
  scheduleContestId: number | null;
  selectedTeeType: string | null;
  progressiveContestId: number | null;
  note: string | null;
  eligibleForRegistration: boolean;
  eligibleRegistrationTime: string | null;
}

const TeeContests: React.FC<{ teeContest: TeeContest }> = ({ teeContest }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentTime = moment.utc();

  // console.log("teeContest info", teeContest);

  // Parse eligibleRegistrationTime as UTC
  const eligibleTimeUTC = teeContest?.eligibleRegistrationTime
    ? moment.utc(teeContest.eligibleRegistrationTime)
    : null;

  const isCrossed = eligibleTimeUTC
    ? currentTime.isAfter(eligibleTimeUTC)
    : true;

  const [isContestAlreadySelected, setIsContestAlreadySelected] =
    useState(false);

  const selectedTeeType = useSelector(
    (state: RootState) => state.courses.selectedTeeType,
  );

  const selectedHoleId = useSelector(
    (state: RootState) => state.courses.selectedHoleId,
  );

  const selectedTeeId = useSelector(
    (state: RootState) => state.courses.selectedTeeId,
  );

  const currentSelectedYardage = useSelector(
    (state: RootState) => state.courses.yardage,
  );

  // Get the current time in UTC as
  // Function to check if the date string is in UTC
  const isUtcDate = (dateString: any) => {
    // Check for 'Z' at the end or a timezone offset
    return dateString.endsWith("Z") || /[+-]\d{2}:\d{2}$/.test(dateString);
  };

  // Parse registration start and end times
  const registrationStart = isUtcDate(teeContest.registrationStartTime)
    ? moment(teeContest.registrationStartTime) // already in UTC
    : moment.utc(teeContest.registrationStartTime); // treat as UTC

  const registrationEnd = isUtcDate(teeContest.registrationEndTime)
    ? moment(teeContest.registrationEndTime) // already in UTC
    : moment.utc(teeContest.registrationEndTime); // treat as UTC

  // Check if the current UTC time is between the registration start and end times
  const isRegistrationOpen = currentTime.isBetween(
    registrationStart,
    registrationEnd,
    null,
    "[]",
  );
  const selectedContests = useSelector(
    (state: RootState) => state.courses.selectedContests,
  );
  // Check if the current contest is already selected
  const isSelected =
    teeContest.selectedTeeType &&
    selectedContests[teeContest.selectedTeeType]?.some(
      (contest: any) => contest.contestId === teeContest.contestId,
    );

  const selectedContestsList = useSelector(
    (state: RootState) => state.courses.selectedContests,
  );

  const selectedContestObj: any =
    selectedTeeType !== null && selectedContestsList;

  const selectedContestTee = Object.keys(selectedContestObj)[0];

  useEffect(() => {
    if (Object.keys(selectedContestObj)[0] !== selectedTeeType) {
      if (selectedContestsList[selectedContestTee]?.length > 0) {
        setIsContestAlreadySelected(true);
      }
    }
  }, [selectedTeeType, selectedContestsList[selectedContestTee]]);

  const handleContestSelection = () => {
    if (Object.keys(selectedContestObj)[0] !== selectedTeeType) {
      if (selectedContestsList[selectedContestTee]?.length > 0) {
        // ToastInfo("You can only register for contests from one tee at a time");
        return;
      }
    }

    // When selecting a contest, replace any existing contests for that tee type
    if (teeContest?.contestId !== null && teeContest.selectedTeeType) {
      dispatch(
        addSelectedContest({
          teeType: teeContest.selectedTeeType,
          contest: {
            ...teeContest,
            yardage: currentSelectedYardage,
            holeId: selectedHoleId,
            teeId: selectedTeeId,
          },
        }),
      );
    }
  };

  const handleRemoveContest = () => {
    // Remove the contest if it is already selected
    if (teeContest?.contestId !== null && teeContest.selectedTeeType) {
      dispatch(
        removeSelectedContest({
          teeType: teeContest.selectedTeeType,
          contestId: teeContest.contestId,
        }),
      );
    }
  };

  const showMessageDialogFunc = () => {
    if (!isRegistrationOpen) {
      return "The registration window for the contest has closed.";
    } else if (
      teeContest?.limitSection &&
      !teeContest?.eligibleForRegistration
    ) {
      return "You have reached today's playing limit for this contest.";
    } else if (teeContest?.limitSection && !isCrossed) {
      //  eligibleRegistrationTime is greater than current time
      return `You recently took part in the contest. Registration will reopen after ${moment.utc(teeContest.eligibleRegistrationTime).local().format("hh:mm A")}`;
    }
  };

  return (
    <div className="">
      <div className="m-4">
        <div className="rounded-[6px] border shadow-md">
          <div className="my-2 flex w-full items-center justify-between px-6 pt-6">
            <div className="flex items-center">
              <img src={golfStickWithTee} alt="" className="h-14 w-14" />
              <div className="pl-1">
                <p className="text-sm font-semibold">
                  {teeContest?.contestType}
                </p>
                <p className="text-sm font-semibold text-red-600">
                  ${teeContest.entryFee}
                </p>
              </div>
            </div>

            <div className="flex flex-col place-items-end">
              <p className="text-xs font-normal text-[#3C3C4399]">{`${moment.utc(teeContest.registrationStartTime).local().format("hh:mm A")} - ${moment.utc(teeContest.registrationEndTime).local().format("hh:mm A")} `}</p>{" "}
              <span className="mt-[4px] flex items-center rounded-md bg-green-100 px-2">
                <img src={GolfTee} alt="" className="" />
                <span className="p-1 text-xs font-semibold text-green-700">
                  {teeContest.activeStatus ? "Active" : "Inactive"}
                </span>
              </span>
            </div>
            <div>
              {/* 
               check 1. check registration is (status) open/close  
               check 2.check if eligibleForRegistration  
              check 3. check time is crossed or  based on eligibleRegistrationTime 
              */}
              {isRegistrationOpen &&
                (teeContest?.eligibleForRegistration == null ||
                  teeContest?.eligibleForRegistration) &&
                isCrossed && (
                  <>
                    {isSelected ? (
                      <Minus
                        size={32}
                        className="cursor-pointer rounded-full bg-red-600 p-1 font-semibold text-white"
                        onClick={handleRemoveContest}
                      />
                    ) : (
                      <span className="flex items-center gap-1">
                        {!isContestAlreadySelected && (
                          <Plus
                            size={32}
                            className={`${isContestAlreadySelected ? "bg-gray-300 bg-opacity-50 backdrop-blur" : "cursor-pointer"} rounded-full bg-primaryColor p-1 font-semibold text-white`}
                            onClick={handleContestSelection}
                          />
                        )}
                        {isContestAlreadySelected && (
                          <TooltipSpan
                            text={<Info size={32} className="ml-auto text-blue-700" />}
                            tooltip={"You can only register for contests from one tee at a time."}
                            needPY={true}
                            position="left"
                          />

                        )}
                      </span>
                    )}
                  </>
                )}
            </div>
          </div>
          <div className="px-2 text-right text-xs text-red-500">
            <span className="text-xs">{showMessageDialogFunc()}</span>
          </div>
          {teeContest.note !== null && (
            <div className="rounded-b-[6px] bg-warning">
              <p className="px-1 py-1 text-[11px] text-warningText break-words ">

                <span className="inline font-bold whitespace-nowrap">
                  <StickyNote color="#FFFF00" size={14} className="mx-1 inline" />
                  Eligibility criteria: </span>
                <span className="">{teeContest.note}</span>
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="absolute bottom-1 flex w-[69%] justify-end rounded-lg bg-white p-4">
        <button
          className={`relative flex h-[38px] w-[132px] items-center justify-evenly gap-1 rounded-md bg-primaryColor px-3 py-1 text-white ${Object.values(selectedContests).flat().length === 0
              ? "cursor-not-allowed"
              : ""
            }`}
          onClick={() => {
            navigate(ROUTES.CHECKOUT);
          }}
          disabled={Object.values(selectedContests).flat().length === 0}
        >
          <ShoppingCart className="relative" height={21} width={21} />
          <span className="absolute right-[5.9rem] top-[5px] flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
            {Object.values(selectedContests).flat().length}
          </span>
          <span className="mx-2 text-[14px]">Register</span>
        </button>
      </div>
    </div>
  );
};

export default TeeContests;
