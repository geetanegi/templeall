import React from "react";
import { Minus } from "lucide-react";
import golfStickWithTee from "../../assets/images/image 8.png";

const PlayingCart: React.FC = () => {
  const contests = [
    {
      id: 1,
      name: "Closest-to-Pin",
      price: 5.0,
      imageUrl: golfStickWithTee,
    },
    {
      id: 2,
      name: "Hole-in-One",
      price: 10.0,
      imageUrl: golfStickWithTee,
    },
  ];

  const totalPrice = contests.reduce((acc, contest) => acc + contest.price, 0);

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
        {contests.map((contest) => (
          <div
            key={contest.id}
            className="mb-4 flex items-center justify-between px-4 py-3"
          >
            <div>
              <div className="flex items-center">
                <img
                  src={contest.imageUrl}
                  alt={contest.name}
                  className="mr-4 h-14 w-14"
                />
                <span>{contest.name}</span>
              </div>
            </div>
            <div className="flex w-1/2 items-center justify-between">
              <div className="">
                <span className="text-red-500">
                  ${contest.price.toFixed(2)}
                </span>
              </div>
              <Minus
                size={32}
                className="rounded-full bg-red-500 p-1 font-semibold text-white"
              />
            </div>
          </div>
        ))}

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
