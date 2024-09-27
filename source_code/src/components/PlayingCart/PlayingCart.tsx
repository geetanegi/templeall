import React from "react";
import { Minus } from "lucide-react";
import golfStickWithTee from "../../assets/images/image 8.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { removeSelectedContest } from "../../reducers/Courses_data/courses";

const PlayingCart: React.FC = () => {
  const dispatch = useDispatch();

  const selectedContestsList = useSelector(
    (state: RootState) => state.courses.selectedContests,
  );

  const selectedTeeType = useSelector(
    (state: RootState) => state.courses.selectedTeeType,
  );

  const totalPrice =
    selectedTeeType !== null &&
    selectedContestsList[selectedTeeType]?.length > 0
      ? selectedContestsList[selectedTeeType].reduce(
          (acc, contest) => acc + contest.entryFee,
          0,
        )
      : 0;

  const handleRemoveContest = (contest: any) => {
    // Remove the contest if it is already selected
    dispatch(
      removeSelectedContest({
        teeType: contest.selectedTeeType,
        contestId: contest.contestId,
      }),
    );
  };

  return (
    <div className="max-w-4xl rounded-lg bg-white shadow-md">
      {/* Contests List */}
      <div className="rounded-lg">
        <div className="rounded-lg bg-gray-100">
          <div className="mb-4 flex justify-between p-4">
            <span className="text-gray-700">Contest</span>
            <span className="text-gray-700">Total Price</span>
            <span></span>
          </div>
        </div>
        {/* Contest Items */}
        {selectedTeeType !== null &&
        selectedContestsList[selectedTeeType]?.length > 0
          ? selectedContestsList[selectedTeeType].map((contest) => (
              <div
                key={contest.contestId}
                className="mb-4 flex items-center justify-between px-4 py-3"
              >
                <div>
                  <div className="flex items-center">
                    <img
                      src={contest.imageUrl || golfStickWithTee}
                      alt={contest.name}
                      className="mr-4 h-14 w-14"
                    />
                    <span>{contest.name}</span>
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
              </div>
            ))
          : null}

        {/* Total Price */}
        <div className="flex justify-end border-t bg-gray-100 p-4">
          <span className="text-lg font-bold">Total: </span>
          <span className="ml-2 text-lg font-bold">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};
export default PlayingCart;
