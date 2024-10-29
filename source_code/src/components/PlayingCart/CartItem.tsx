import React, { useEffect, useState } from "react";
import { Minus } from "lucide-react";
import golfStickWithTee from "../../assets/images/image 8.png";
import { useDispatch } from "react-redux";
import { removeSelectedContest } from "../../reducers/Courses_data/courses";
import moment from "moment";

interface ContestProps {
  contestId: number;
  name: string;
  contestType: string;
  startTime: string;
  endTime: string;
  registrationStartTime: string;
  registrationEndTime: string;
  entryFee: number;
  activeStatus: string;
  scheduleContestId: number;
  selectedTeeType: string;
  yardage: number;
  holeId: number;
  teeId: number;
  imageUrl: string;
}

const CartItem: React.FC<{ contest: ContestProps }> = ({ contest }) => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(moment.utc());

  const dispatch = useDispatch();
  const handleRemoveContest = (contest: any) => {
    // Remove the contest if it is already selected
    dispatch(
      removeSelectedContest({
        teeType: contest.selectedTeeType,
        contestId: contest.contestId,
      }),
    );
  };

  //   const currentTime = moment.utc(); // Get the current time in UTC as

  useEffect(() => {
    // Update the current time every minute
    const intervalId = setInterval(() => {
      setCurrentTime(moment.utc());
    }, 60000); // 60000 milliseconds = 1 minute

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const open = currentTime.isBetween(
      moment.utc(contest.registrationStartTime),
      moment.utc(contest.registrationEndTime),
      null,
      "[]",
    );
    setIsRegistrationOpen(open);
  }, [currentTime, contest.registrationStartTime, contest.registrationEndTime]);

  return (
    <div>
      <div
        key={contest.contestId}
        className={`relative flex items-center justify-between px-4 py-3 pb-4 ${!isRegistrationOpen ? "b border-b border-t border-[#FF9800] bg-[#FFF3E0]" : ""}`}
      >
        <div>
          <div className="flex items-center">
            <img
              src={contest.imageUrl || golfStickWithTee}
              alt={contest.name}
              className="mr-4 h-14 w-14"
            />
            <span> {contest?.contestType}</span>
          </div>
        </div>
        <div className="flex w-1/2 items-center justify-between">
          <div className="">
            <span className="text-red-500">${contest.entryFee}</span>
          </div>
          <Minus
            size={32}
            className="cursor-pointer rounded-full bg-red-500 p-1 font-semibold text-white"
            onClick={() => handleRemoveContest(contest)}
          />
        </div>
        {!isRegistrationOpen && (
          <p className="absolute left-20 top-16 text-xs text-[#FF9800]">
            This registration for this contest has now been closed. You cannot
            register for this contest anymore.
          </p>
        )}
      </div>
    </div>
  );
};
export default CartItem;
