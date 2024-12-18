import React, { useEffect, useState } from "react";
import PlayingCart from "../components/PlayingCart/PlayingCart";
import Golf from "../assets/images/golf_course_green.svg";
import GolfTee from "../assets/images/sp-golf.svg";
// import cardType from "../assets/images/Card Type.png";

import { LandPlot, Trophy } from "lucide-react";
import CheckoutCard from "../components/Checkout/Checkout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import BreadCumModal from "../components/Contests/Contest Components/BreadCumModal";
import { API_URL } from "../services/enums";
import apiService from "../services/apiService";
import { ToastInfo } from "../components/Toast";
import momentTz from "moment-timezone";

import BG from "../assets/images/dashboardBG.svg";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/routesPath";
import moment from "moment";
import { clearAllSelectedContests } from "../reducers/Courses_data/courses";
import { setPaymentSuccess } from "../reducers/Payment/Payment";
import PageLoader from "../components/PageLoader";
import { setLoading } from "../reducers/loader/loader";

const Checkout: React.FC = () => {
  const tz = momentTz.tz.guess();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loader = useSelector((state: RootState) => state.loader.isLoading);

  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  // Function to handle leaving the page
  const onLeave = () => {
    setModalOpen(false); // Close modal before navigating
    navigate(ROUTES.CONTESTS, { replace: true }); // Go back to the previous URL
    dispatch(clearAllSelectedContests());
  };

  useEffect(() => {
    const handlePopState = () => {
      setModalOpen(true); // Show modal when back button is clicked
      window.history.pushState(null, "", window.location.href); // Push a new state to keep the modal open
    };

    window.addEventListener("popstate", handlePopState);

    // Push initial state to history
    window.history.pushState(null, "", window.location.href);

    return () => {
      window.removeEventListener("popstate", handlePopState); // Clean up listener on unmount
    };
  }, []);

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
  const selectedContestsList = useSelector(
    (state: RootState) => state.courses.selectedContests,
  );

  const isPaymentSuccess = useSelector((state: RootState) => state.payment.paymentSuccess,)

  const selectedContestObj: any =
    selectedTeeType !== null && selectedContestsList;

  const selectedContestTee = Object.keys(selectedContestObj)[0];

  const selectedContests =
    selectedContestTee !== null &&
    selectedContestsList[selectedContestTee]?.length > 0 &&
    selectedContestsList[selectedContestTee];

  const totalPrice =
    selectedContestTee !== null &&
    selectedContestsList[selectedContestTee]?.length > 0
      ? selectedContestsList[selectedContestTee].reduce(
          (acc, contest) => acc + contest.entryFee,
          0,
        )
      : 0;

  const paymentSucess = useSelector(
    (state: RootState) => state.payment.paymentSuccess,
  );

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    "wallet" | "credit_card"
  >("wallet"); // Default to 'wallet'
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    console.log(!selectedContests, selectedContestsList)
    if (!selectedContests && !isPaymentSuccess) {
      debugger;
      navigate(ROUTES.CONTESTS, { replace: true });
    }
  }, [selectedContests]);

  const handleCheckoutCart = async () => {
    // api obj
    const obj = {
      data: {
        playerId: typeof userInfo === "object" ? userInfo.userId : undefined,
        registrationDate: moment.utc(new Date()).format(),
        totalAmount: totalPrice,
        holeId: selectedContests && selectedContests[0]?.holeId,
        teeId: selectedContests && selectedContests[0]?.teeId,
        zoneId: tz,
        cartInfo:
          selectedContests && Array.isArray(selectedContests)
            ? selectedContests.map((item) => ({
                scheduleContestId: item.scheduleContestId,
                amount: item.entryFee,
                progressiveContestId: item.progressiveContestId,
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
      dispatch(setLoading(true));
      const res = await apiService.post<any>(
        API_URL.contestCheckoutCoreRegistrationSave,
        obj,
      );
      if (res.status === 200 && !res.data.error) {
        dispatch(setPaymentSuccess(true));
        dispatch(clearAllSelectedContests());
      } else if (res.data.error) {
        ToastInfo(res.data.description || "Error fetching course data");
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (paymentSucess) {
    navigate(ROUTES.PAYMENT_SUCCESS);
  }

  return (
    <PageLoader isActive={loader}>
      <div
        className="bg-[#ffffff] bg-contain bg-fixed bg-no-repeat"
        style={{ backgroundImage: `url(${BG})` }}
      >
        <div className="grid min-h-screen w-full grid-cols-[65%_35%] overflow-x-hidden px-2">
          <div className="pl-10 pt-1">
            {/* Header Section */}
            <h1 className="pb-1 pt-3 text-[18px] font-normal">Playing Cart</h1>
            {/* Breadcrumb Section */}
            <div className="mb-4 flex items-center space-x-2 text-sm font-normal text-gray-500">
              <span
                className="flex cursor-pointer items-center gap-1 text-primaryColor"
                onClick={() => setModalOpen(true)}
              >
                <LandPlot className="h-3 w-3" /> {selectedCourseName}
              </span>
              <span>&gt;</span>
              <span
                className="flex cursor-pointer items-center gap-1 text-primaryColor"
                onClick={() => setModalOpen(true)}
              >
                <img src={Golf} className="h-3 w-3" />
                Hole #{selectedHoleNumber} - Par {selectedPar}
              </span>
              <span>&gt;</span>
              <span
                className="flex cursor-pointer items-center gap-1 text-primaryColor"
                onClick={() => setModalOpen(true)}
              >
                <img src={GolfTee} className="h-3 w-3" color="#7B7887" />
                {selectedContestTee}(
                {selectedContests && selectedContests[0]?.yardage} yards)
              </span>
              <span>&gt;</span>
              <span className="flex items-center gap-1 text-[12px] text-[#7B7887]">
                <Trophy color="#7B7887" strokeWidth={1} className="h-3 w-3" />
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
                onClick={() => {
                  if (selectedContests) {
                    handleCheckoutCart();
                  }
                }}
                className={`relative mx-auto mt-12 flex w-full items-center justify-center gap-1 rounded-md bg-primaryColor py-2 text-white ${selectedContests ? "" : "cursor-not-allowed opacity-50"}`}
              >
                <span className="mx-2">Register</span>
              </button>
            </div>
          </div>
          <BreadCumModal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(!isModalOpen)}
            onLeave={onLeave}
          />
        </div>
      </div>
    </PageLoader>
  );
};

export default Checkout;
