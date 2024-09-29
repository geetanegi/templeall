import React, { useState } from "react";
import PlayingCart from "../components/PlayingCart/PlayingCart";
import Golf from "../assets/images/golf_course.png";
import GolfTee from "../assets/images/sports_golf.png";
// import cardType from "../assets/images/Card Type.png";

import { LandPlot, ShoppingCart, Trophy } from "lucide-react";
import CheckoutCard from "../components/Checkout/Checkout";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import BreadCumModal from "../components/Contests/Contest Components/BreadCumModal";
import { API_URL } from "../services/enums";
import apiService from "../services/apiService";
import { ToastError } from "../components/Toast";

const Checkout: React.FC = () => {
  const selectedCourseName = useSelector(
    (state: RootState) => state.courses.courseName,
  );

  const selectedHoleNumber = useSelector(
    (state: RootState) => state.courses.holeNumber,
  );

  const selectedPar = useSelector((state: RootState) => state.courses.par);
  const selectedTeeType = useSelector(
    (state: RootState) => state.courses.selectedTeeType,
  );
  const selectedYardage = useSelector(
    (state: RootState) => state.courses.yardage,
  );
  const selectedContestsList = useSelector(
    (state: RootState) => state.courses.selectedContests,
  );

  const selectedContests =
    selectedTeeType !== null &&
    selectedContestsList[selectedTeeType]?.length > 0 &&
    selectedContestsList[selectedTeeType];

  const totalPrice =
    selectedTeeType !== null &&
    selectedContestsList[selectedTeeType]?.length > 0
      ? selectedContestsList[selectedTeeType].reduce(
          (acc, contest) => acc + contest.entryFee,
          0,
        )
      : 0;

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    "wallet" | "credit_card"
  >("wallet"); // Default to 'wallet'
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  console.log("selectedContests", selectedContests);

  const handleCheckoutCart = async () => {
    const obj = {
      data: {
        playerId: 1,
        registrationDate: "2024-09-11T13:05:51Z",
        totalAmount: totalPrice,
        cartInfo:
          selectedContests && Array.isArray(selectedContests)
            ? selectedContests.map((item) => ({
                scheduleContestId: item.scheduleContestId,
                amount: item.entryFee,
              }))
            : [],
        payment: {
          paymentMethod: "CARD",
          paymentStatus: "SUCCESS",
          transactionId: "@121222",
        },
      },
    };

    try {
      const res = await apiService.post<any>(
        API_URL.contestCheckoutCoreRegistrationSave,
        obj,
      );
      if (res.status === 200 && !res.data.error) {
        console.log(res.data.data);
      } else if (res.data.error) {
        ToastError(res.data.description || "Error fetching course data");
      }
    } catch (error) {
      ToastError("Error fetching course data");
    }
  };

  return (
    <div className="grid min-h-screen w-full grid-cols-[65%_35%] overflow-x-hidden bg-[#ffffff] px-2">
      <div className="pl-10 pt-1">
        {/* Header Section */}
        <h1 className="py-3 text-xl">Player Cart</h1>
        {/* Breadcrumb Section */}
        <div className="mb-4 flex items-center space-x-2 text-sm text-gray-500">
          <span
            className="flex cursor-pointer gap-1"
            onClick={() => setModalOpen(true)}
          >
            <LandPlot className="h-4 w-4" /> {selectedCourseName}
          </span>
          <span>&gt;</span>
          <span
            className="flex cursor-pointer gap-1"
            onClick={() => setModalOpen(true)}
          >
            <img src={Golf} className="h-4 w-4" />
            Hole #{selectedHoleNumber} - Par {selectedPar}
          </span>
          <span>&gt;</span>
          <span
            className="flex cursor-pointer gap-1"
            onClick={() => setModalOpen(true)}
          >
            <img src={GolfTee} className="h-4 w-4" />
            {selectedTeeType}({selectedYardage} yards)
          </span>
          <span>&gt;</span>
          <span className="flex gap-1 text-[#afd156]">
            <Trophy color="#afd156" strokeWidth={1} className="h-4 w-4" />
            Contests
          </span>
        </div>
        <PlayingCart />
      </div>
      <div className="mt-4 pl-10">
        <div className="rounded-md bg-gray-100 p-5 px-10">
          <div className="space-y-2 pb-3">
            <p className="text-gray-600"> Payment Method</p>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  id="payment-method-1"
                  type="radio"
                  value="credit_card"
                  name="payment-method"
                  className="h-5 w-5"
                  checked={selectedPaymentMethod === "credit_card"}
                  onChange={() => setSelectedPaymentMethod("credit_card")}
                />
                <label
                  htmlFor="payment-method-1"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Credit Card
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="payment-method-2"
                  type="radio"
                  value="wallet"
                  name="payment-method"
                  className="h-5 w-5"
                  checked={selectedPaymentMethod === "wallet"}
                  onChange={() => setSelectedPaymentMethod("wallet")}
                />
                <label
                  htmlFor="payment-method-2"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Wallet{" "}
                  <span className="font-semibold text-red-600">
                    ($56,986.00)
                  </span>
                </label>
              </div>
            </div>
          </div>
          {selectedPaymentMethod === "credit_card" && <CheckoutCard />}
          <button
            onClick={handleCheckoutCart}
            className="relative mx-auto flex w-full items-center justify-center gap-1 rounded-md bg-[#95c11e] py-2 text-white"
          >
            <ShoppingCart className="relative" />
            <span className="mx-2">Checkout</span>
          </button>
        </div>
      </div>
      <BreadCumModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(!isModalOpen)}
      />
    </div>
  );
};

export default Checkout;
