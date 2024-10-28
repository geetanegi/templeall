import React from "react";
import Award from "../../assets/images/image 55.png";
import { jackpot } from "./contestdata";

const JackpotAmount: React.FC<{ jackpot: jackpot }> = ({ jackpot }) => {
  return (
    <div className="h-[150px] rounded-t-md border-b border-[#046221]">
      <div className="relative my-12 mt-[80px] flex items-center justify-center">
        <div className="absolute -top-16 left-6 text-white">
          <h1 className="text-xl">{jackpot.clubName}</h1>
        </div>
        <div className="absolute left-6 top-24 text-white">
          <span className="text-normal">Hole #{jackpot.holeNumber}</span>
          <span className="text-normal">{` ${jackpot.teeName} (${jackpot.yardage})}`}</span>
        </div>
        {/* <img src={sparklingImg} alt="" className="absolute -top-5" /> */}
        <div className="h-[100%] w-[300px] rounded-full border-2 border-[#DED8B9] text-center">
          <div className="relative rounded-full bg-[#1F1F1F] p-2">
            <div className="absolute bottom-0 left-5">
              <img src={Award} alt="" />
            </div>
            <div className="pl-10">
              <h1 className="bg-gradient-to-r from-[#FFEECC] to-[#AD9515] bg-clip-text text-lg text-transparent">
                {jackpot.contestType}
              </h1>
              <h1 className="bg-gradient-to-r from-[#FFEECC] to-[#AD9515] bg-clip-text text-xl text-transparent">
                <span className="bg-gradient-to-r from-[#FFEECC] to-[#AD9515] bg-clip-text text-transparent">
                  ${jackpot.jackpotAmount}
                </span>
              </h1>
            </div>
          </div>
          {/* <img src={Ribbon} /> */}
        </div>
      </div>
    </div>
  );
};

export default JackpotAmount;
