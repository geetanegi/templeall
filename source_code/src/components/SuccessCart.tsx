import { CircleCheck } from "lucide-react";
import React from "react";
import BG from "../assets/images/dashboardBG.svg";

const PaymentSuccess: React.FC = () => {
  return (
    <div
      className="bg-[#ffffff] bg-contain bg-fixed bg-no-repeat"
      style={{ backgroundImage: `url(${BG})` }}
    >
      <div className="flex h-screen justify-center border-2 pt-10">
        <div className="relative h-[70%] w-full max-w-2xl space-y-8 rounded-2xl bg-white p-8 shadow-lg">
          {/* Ticket-style cutout */}

          {/* Checkmark icon */}
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-[#eaf6ed] p-2">
              <div className="rounded-full bg-[#a5d0af] p-3">
                <CircleCheck color="#248a3d" />
              </div>
            </div>
          </div>

          {/* Payment Successful Message */}
          <div className="text-center" style={{ marginBottom: "50px" }}>
            <h1 className="text-4xl font-bold text-green-500">
              Payment Successful!
            </h1>
            <p className="mt-1 text-gray-500">
              Transaction Number: 3444554333445
            </p>
          </div>

          {/* Divider */}
          {/* <div className="my-4 h-3 border-t border-dashed border-gray-300 text-2xl"></div> */}
          <div className="w-full px-2">
            <div className="h-px border-b-2 border-dashed border-[#E6E6E6]" />
          </div>
          <div className="">
            <div className="absolute inset-y-0 -left-6 top-28 flex items-center">
              <div className="relative">
                <div className="h-14 w-14 rounded-full bg-gray-100"></div>
                <div className="absolute inset-0 -right-4 h-14 w-14 rounded-full border-r-2"></div>
              </div>
            </div>

            <div className="absolute inset-y-0 -right-6 top-28 flex items-center">
              {/* <div className="h-14 w-14 rounded-full bg-gray-100"></div> */}
              <div className="relative">
                <div className="h-14 w-14 rounded-full bg-[#FFFFFF]"></div>
                <div className="absolute inset-0 -left-0 h-14 w-14 rounded-full border-l-2"></div>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div>
            <div className="flex justify-around text-lg text-gray-600">
              <p>Amount Paid:</p>
              <p>$15</p>
            </div>
            <div className="mt-2 flex justify-around text-lg text-gray-600">
              <p>Payment Method:</p>
              <p>Wallet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
