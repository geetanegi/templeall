import { ChevronDown } from "lucide-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
// import SwitchComponent from "../SwitchComponent";
import apiService from "../../services/apiService";
import { API_URL } from "../../services/enums";
import { ToastError } from "../Toast";
import { APIResContestData, CourseData } from "./contestdata";
import RegisterConfirmationModal from "./RegisterConfirmationModal";
// import TooltipSpan from "../Tooltip/TooltipSpan";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../reducers/loader/loader";
import { timeZone } from "../../utils/TimeUtils";
import ActiveContest from "../../assets/images/active-contest-bg.jpg";
import { RootState } from "../../store";
import PageLoader from "../PageLoader";

const ActiveContestAccordion: React.FC = () => {
  const dispatch = useDispatch();
  const loader = useSelector((state: RootState) => state.loader.isLoading);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [openAccordion, setOpenAccordion] = useState<number>(0); // Default open first accordion
  const [data, setData] = useState<any>([]);

  const getAllDailyActiveContest = async () => {
    try {
      dispatch(setLoading(true));
      const res = await apiService.post<APIResContestData>(
        API_URL.getAllDailyActiveContest,
        {
          data: {
            date: moment().utc(),
            zoneId: timeZone,
          },
        },
      );
      if (res.status === 200 && !res.data.error) {
        // setCourseData(res.data.data);
        setData(res.data.data);
      } else if (res.data.error) {
        ToastError(res.data.description || "Error fetching contest data");
      }
    } catch (error) {
      ToastError("Error fetching contest data");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getAllDailyActiveContest();
  }, []);

  const handleToggle = (id: number) => {
    setOpenAccordion(openAccordion === id ? -1 : id);
  };

  // const handleSwitch = (isChecked: boolean) => {
  //   if (isChecked) {
  //     // do api call or any other action here shiv
  //   }
  //   setIsModalOpen(true);
  // };

  return (
    <PageLoader isActive={loader}>
      <div className="w-full">
        {(data.length === 0 || data === undefined) && (
          <div className="">
            <p>No Available Active Contest ! </p>
          </div>
        )}

        {data &&
          data.length > 0 &&
          data.map((item: CourseData, i: number) => (
            <div
              key={i}
              // style={{
              //   borderColor: i === openAccordion ? "#95C11E" : "#FFDE59",
              // }}
              className={`relative my-3 overflow-hidden rounded-lg border-2 border-yellowText bg-gradient-green shadow-sm`}
            >
              <button
                onClick={() => handleToggle(i)}
                className="relative flex w-full items-center justify-between overflow-hidden p-4 text-left font-medium text-white focus:outline-none"
              >
                <img
                  src={ActiveContest}
                  alt=""
                  className="absolute"
                  style={{
                    opacity: 0.1,
                    // transform: "translate(0%, -45%)",
                    // height: "25vh",
                    // width: "100%",
                    left: 0,
                    right: 0,
                  }}
                />
                <div>
                  {item.clubName}
                  <p className="text-xs font-thin text-white">
                    {" "}
                    {item.courseName}
                  </p>
                </div>
                <div className="font-sm mr-6 font-thin text-white">
                  Hole <span className="font-semibold">#{item.holeNumber}</span>{" "}
                  - Par {item.par}
                  <p className="text-xs font-thin text-white">
                    Tees:{" "}
                    <span className="text-sm font-semibold text-white">
                      {item.teeName}
                    </span>
                  </p>
                </div>
                <span
                  className={`absolute right-2 top-4 transform transition-transform ${openAccordion === i ? "rotate-180" : "rotate-0"}`}
                >
                  <ChevronDown strokeWidth={1.25} size={32} />
                </span>
              </button>
              <div
                className={`transition-max-height overflow-auto duration-300 ${
                  openAccordion === i ? "max-h-96" : "max-h-0"
                }`}
              >
                {/* content  */}
                {item.allDailyActiveContestDTOS.length > 0 &&
                  item.allDailyActiveContestDTOS.map((item, index) => (
                    <div key={index}>
                      <div className="border-t-2 border-yellowText p-4 text-gray-700">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-bold text-white">
                              {item.contestType}
                            </p>
                            <p className="text-sm font-thin text-white">
                              Entry Fees:{" "}
                              <span className="font-semibold text-white">
                                ${item.entryFee}
                              </span>
                            </p>
                            <p className="text-sm font-thin text-white">
                              Payout:{" "}
                              <span className="text-sm font-bold text-white">
                                ({item.payout})
                                {/* (
                                <TooltipSpan
                                  text={item.playerPercentage}
                                  tooltip="Player Percentage"
                                  needPY={false}
                                />
                                <span>/</span>
                                <TooltipSpan
                                  text={item.coursePercentage}
                                  tooltip="Course Percentage"
                                  needPY={false}
                                />
                                <span>/</span>
                                <TooltipSpan
                                  text={item.acecamPercentage}
                                  tooltip="Acecam Percentage"
                                  needPY={false}
                                />
                                <span>/</span>
                                <TooltipSpan
                                  text={item?.charityPercentage || "0"}
                                  tooltip="Charity Percentage"
                                  needPY={false}
                                />
                                ) */}
                              </span>
                            </p>
                            <div className="py-2">
                              <p className="text-sm font-thin text-white">
                                Reg. start date/time:{" "}
                                <span className="text-sm font-bold">
                                  {moment
                                    .utc(item.registrationStartTime)
                                    .local()
                                    .format("MM/DD/YYYY - hh:mm A")}
                                </span>
                              </p>
                              <p className="text-sm font-thin text-white">
                                Contest start date/time:{" "}
                                <span className="text-sm font-bold">
                                  {moment
                                    .utc(item.startTime)
                                    .local()
                                    .format("MM/DD/YYYY - hh:mm A")}
                                </span>
                              </p>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-end">
                              <div className="flex w-[150px] justify-between py-3">
                                <div className="">
                                  <p className="rounded-md bg-[#97D0A533] p-1 text-sm text-white">
                                    Status:{" "}
                                    <span className="text-xs font-bold text-yellowText">
                                      {item.activeStatus}
                                    </span>{" "}
                                  </p>
                                </div>
                                {/* <div>
                                <SwitchComponent
                                  isChecked={item.activeStatus === "Open"}
                                  onChange={(isChecked) =>
                                    handleSwitch(isChecked)
                                  }
                                />
                              </div> */}
                              </div>
                            </div>
                            <div className="mt-2">
                              <p className="text-sm font-thin text-white">
                                Reg. end date/time :{" "}
                                <span className="text-sm font-bold text-white">
                                  {moment
                                    .utc(item.registrationEndTime)
                                    .local()
                                    .format("MM/DD/YYYY - hh:mm A")}
                                </span>
                              </p>
                              <p className="text-sm font-thin text-white">
                                Contest end date/time:{" "}
                                <span className="text-sm font-bold text-white">
                                  {moment
                                    .utc(item.endTime)
                                    .local()
                                    .format("MM/DD/YYYY - hh:mm A")}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        <RegisterConfirmationModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
    </PageLoader>
  );
};

export default ActiveContestAccordion;
