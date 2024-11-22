import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import CartItem from "./CartItem";
import { setTotalPrice } from "../../reducers/Courses_data/courses";

const PlayingCart: React.FC = () => {
  const dispatch = useDispatch();
  const selectedContestsList = useSelector(
    (state: RootState) => state.courses.selectedContests,
  );

  const selectedTeeType = useSelector(
    (state: RootState) => state.courses.selectedTeeType,
  );

  const selectedContestObj: any =
    selectedTeeType !== null && selectedContestsList;

  const selectedContestTee = Object.keys(selectedContestObj)[0];

  const totalPrice =
    selectedContestTee !== null &&
      selectedContestsList[selectedContestTee]?.length > 0
      ? selectedContestsList[selectedContestTee].reduce(
        (acc, contest) => acc + contest.entryFee,
        0,
      )
      : 0;

  useEffect(() => {
    dispatch(setTotalPrice(totalPrice));
  }, []);

  return (
    <div className="max-w-4xl rounded-lg bg-white shadow-md">
      {/* Contests List */}
      <div className="rounded-lg">
        <div className="rounded-lg bg-gray-100">
          <div className="mb-4 flex justify-between p-4">
            <span className="text-gray-700">Contest</span>
            <span className="text-gray-700">Total Prize</span>
            <span></span>
          </div>
        </div>
        {/* Contest Items */}
        {selectedContestTee !== null &&
          selectedContestsList[selectedContestTee]?.length > 0 ? (
          selectedContestsList[selectedContestTee].map((contest) => (
            <CartItem contest={contest} />
          ))
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500">
                Your cart is empty. Please add a contest to proceed to checkout.
              </p>
            </div>
          </div>
        )}

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
