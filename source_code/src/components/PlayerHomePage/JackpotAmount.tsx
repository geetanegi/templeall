import React from "react";
import Award from "../../assets/images/image 55.png";
import { jackpot } from "./contestdata";
import { formatNumberWithCustomCommas } from "../../utils/utils";

const JackpotAmount: React.FC<{ jackpot: jackpot }> = ({ jackpot }) => {

  return (
    <div className="rounded-t-md border-b border-[#ffffff]">
        <div className="flex items-center justify-center px-5 mt-5 mb-5  text-white">
          <p className="text-[13px] font-bold font-[600]">{jackpot.clubName}</p>
        </div> 
      <div className="relative flex items-center justify-center">
        {/* <img src={sparklingImg} alt="" className="absolute -top-5" /> */}
        <div className="h-[100%] w-[300px] rounded-full border-2 border-[#DED8B9] text-center">
          <div className="relative rounded-full bg-[#1F1F1F] p-2">
            <div className="absolute bottom-0 left-5">
              <img src={Award} alt="" />
            </div>
            <div className="pl-10">
              <h1 className="bg-gradient-to-r from-[#FFEECC] to-[#AD9515] font-bold bg-clip-text text-lg text-transparent">
                {jackpot.contestType}
              </h1>
              <h1 className="bg-gradient-to-r from-[#FFEECC] to-[#AD9515] font-bold bg-clip-text text-xl text-transparent">
                <span className="bg-gradient-to-r from-[#FFEECC] to-[#AD9515] font-bold bg-clip-text text-[24px] text-transparent">
                  ${jackpot && !isNaN(Number(jackpot.jackpotAmount)) && formatNumberWithCustomCommas(Number(jackpot?.jackpotAmount))}
                </span>
              </h1>
            </div>
          </div>
          {/* <img src={Ribbon} /> */}
        </div>
      </div>
      <div className="flex items-center justify-center mt-2 mb-5 text-center w-full text-white">
          <span className="flex items-center text-[13px]">
            Hole #{jackpot.holeNumber} - Par {jackpot.par}
            <span className="mx-2 h-[6px] w-[6px] rounded-full bg-white"></span>
          </span>
          <span className="text-[13px]">
            {jackpot.teeName} {`(Yards ${jackpot.teeYardage})`}
          </span>
        </div>
    </div>
  );
};

export default JackpotAmount;
