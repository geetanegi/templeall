import React from "react";
import Award from "../../assets/images/image 55.png";
import { jackpot } from "./contestdata";

const JackpotAmount: React.FC<{ jackpot: jackpot }> = ({ jackpot }) => {
  return (
    <div className="rounded-t-md border-b border-[#046221]">
      <div className="relative my-12 mt-[80px] flex items-center justify-center">
        <div className="absolute -top-16 left-6 text-white">
          <p className="text-[18px] font-[600]">{jackpot.clubName}</p>
        </div>
        <div className="absolute left-8 top-[90px] flex text-white">
          <span className="flex items-center text-[13px]">
            Hole #{jackpot.holeNumber} - Par {jackpot.par}
            <span className="mx-2 h-[6px] w-[6px] rounded-full bg-white"></span>
          </span>
          <span className="text-[13px]">
            {jackpot.teeName} {`(Yards ${jackpot.teeYardage})`}
          </span>
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
                <span className="bg-gradient-to-r from-[#FFEECC] to-[#AD9515] bg-clip-text text-[18px] text-transparent">
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
