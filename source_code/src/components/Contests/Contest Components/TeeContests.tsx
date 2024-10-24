import React, { useEffect, useState } from "react";
import golfStickWithTee from "../../../assets/images/image 8.png";
import { Plus, Minus, ShoppingCart, Info } from "lucide-react";
import GolfTee from "../../../assets/images/sports_golf (1).png";
import { ROUTES } from "../../../utils/routesPath";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  addSelectedContest,
  removeSelectedContest,
} from "../../../reducers/Courses_data/courses";
import { RootState } from "../../../store";

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
}

const TeeContests: React.FC<{ teeContest: TeeContest }> = ({ teeContest }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const currentTime = moment.utc(); // Get the current time in UTC as
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
        // ToastError("You can only register for contests from one tee at a time");
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

  return (
    <div className="">
      <div className="m-4">
        <div className="my-2 flex w-full items-center justify-between rounded-xl border p-6 shadow-md">
          <div className="flex">
            <img src={golfStickWithTee} alt="" className="h-14 w-14" />
            <div className="pl-1">
              <p className="text-sm font-semibold">{teeContest?.contestType}</p>
              <p className="text-sm font-semibold text-red-600">
                ${teeContest.entryFee}
              </p>
            </div>
          </div>

          <div className="flex flex-col place-items-end">
            <p className="text-sm">{`${moment.utc(teeContest.registrationStartTime).local().format("hh:mm A")} - ${moment.utc(teeContest.registrationEndTime).local().format("hh:mm A")} `}</p>{" "}
            <span className="flex items-center rounded-md bg-green-100 px-2">
              <img src={GolfTee} alt="" className="" />
              <span className="p-1 text-xs font-semibold text-green-700">
                {teeContest.activeStatus}
              </span>
            </span>
          </div>
          <div>
            {isRegistrationOpen && (
              <>
                {isSelected ? (
                  <Minus
                    size={32}
                    className="cursor-pointer rounded-full bg-red-600 p-1 font-semibold text-white"
                    onClick={handleRemoveContest}
                  />
                ) : (
                  <span className="flex items-center gap-1">
                    <Plus
                      size={32}
                      className={`${isContestAlreadySelected ? "cursor-not-allowed bg-gray-300" : "cursor-pointer"} rounded-full bg-[#95c11e] p-1 font-semibold text-white`}
                      // className="cursor-pointer rounded-full bg-[#95c11e] p-1 font-semibold text-white"
                      onClick={handleContestSelection}
                    />
                    {isContestAlreadySelected && (
                      <div title="You can only register for contests from one tee at a time">
                        <Info size={20} className="ml-auto text-blue-700" />
                      </div>
                    )}
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="absolute bottom-1 flex w-[69%] justify-end rounded-lg bg-white p-4">
        <button
          className={`relative flex gap-1 rounded-md bg-[#95c11e] px-3 py-2 text-white ${
            Object.values(selectedContests).flat().length === 0
              ? "cursor-not-allowed"
              : ""
          }`}
          onClick={() => {
            navigate(ROUTES.CHECKOUT);
          }}
          disabled={Object.values(selectedContests).flat().length === 0}
        >
          <ShoppingCart className="relative" />
          <span className="absolute right-[6rem] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {Object.values(selectedContests).flat().length}
          </span>
          <span className="mx-2">Checkout</span>
        </button>
      </div>
    </div>
  );
};

export default TeeContests;
