import { CircleArrowLeft, CircleCheck } from "lucide-react";
import React, { useEffect } from "react";
import BG from "../assets/images/dashboardBG.svg";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { ROUTES } from "../utils/routesPath";
import CardImg from "../assets/images/CardImg.png";

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();

  const paymentSucess = useSelector(
    (state: RootState) => state.payment.paymentSuccess,
  );

  const TotalPrice = useSelector(
    (state: RootState) => state.courses.TotalPrice,
  );

  useEffect(() => {
    if (!paymentSucess) {
      navigate(-1);
    }
  }, [paymentSucess]);

  return (
    <div
      className="bg-[#ffffff] bg-contain bg-fixed bg-no-repeat"
      // style={{ backgroundImage: `url(${BG})` }}
      style={{ backgroundImage: `url(${BG})`, height: "max-content" }}
    >
      <div className="relative flex h-screen justify-center border-2 pt-10">
        <img src={CardImg} alt="" className="max-w-2xl"  style={{height: "max-content"}} />
        <div className="absolute">
          {/* card data here  */}
          <div className="h-[75%] w-[700px] space-y-2 rounded-2xl bg-transparent p-8" style={{height: "max-content"}}>
            {/* Ticket-style cutout */}

            {/* Checkmark icon */}
            <div className="flex justify-center">
              <div className="rounded-full bg-[#eaf6ed] p-2">
                <div className="rounded-full bg-[#a5d0af] p-3">
                  <CircleCheck color="#248a3d" />
                </div>
              </div>
            </div>

            {/* Payment Successful Message */}
            <div className="space-y-3 text-center">
              <p className="text-[24px] font-semibold text-primaryColor">
                Payment Successful!
              </p>
              <p className="px-12 text-[14px]">
                You're all set to play. To enter queue, please open the app and
                scan the QR code at the registered tee.
              </p>
              <p className="mt-1 text-gray-500">
                Transaction Number: 3444554333445
              </p>
            </div>

            {/* Divider */}
            {/* <div className="my-4 h-3 border-t border-dashed border-gray-300 text-2xl"></div> */}
            <div className="mt-8 flex w-full justify-center">
              <div
                className="mt-[22px] w-[90%]"
                style={{
                  background:
                    "repeating-linear-gradient(to right, #A0A0A0, #A0A0A0 7px, transparent 7px, transparent 14px)",
                  height: "1px", // reduces the height to a thin line
                }}
              />
            </div>
            <div className="">
              <div className="absolute inset-y-0 -left-6 top-28 flex items-center">
                <div className="relative">
                  {/* <div className="h-14 w-14 rounded-full bg-gray-100"></div> */}
                  {/* <div className="absolute inset-0 -right-4 h-14 w-14 rounded-full border-r-2"></div> */}
                </div>
              </div>

              <div className="absolute inset-y-0 -right-6 top-28 flex items-center">
                {/* <div className="h-14 w-14 rounded-full bg-gray-100"></div> */}
                <div className="relative">
                  {/* <div className="h-14 w-14 rounded-full bg-[#FFFFFF]"></div>
                // <div className="absolute inset-0 -left-0 h-14 w-14 rounded-full border-l-2"></div> */}
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div style={{ marginTop: "24px" }}>
              <div className="space-y-1">
                <div className="flex justify-around text-[16px] text-[#7B7887]">
                  <p>Amount Paid:</p>
                  <p className="text-[#1D1A0C]">${TotalPrice}</p>
                </div>
                <div className="flex justify-around text-[16px] text-[#7B7887]">
                  <p>Payment Method:</p>
                  <p className="text-[#1D1A0C]">Wallet</p>
                </div>
              </div>
            </div>
            <div
              className="flex items-center justify-center"
              style={{ marginTop: "10px" }}
            >
              <Link
                to={ROUTES.DASHBOARD}
                className="flex items-center text-[#5FB643] underline"
              >
                <CircleArrowLeft
                  strokeWidth={1}
                  size={20}
                  color="#5FB643"
                  className="mx-1"
                />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
