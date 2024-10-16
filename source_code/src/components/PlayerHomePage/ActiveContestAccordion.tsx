import { ChevronDown } from "lucide-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import SwitchComponent from "../SwitchComponent";
import apiService from "../../services/apiService";
import { API_URL } from "../../services/enums";
import { ToastError } from "../Toast";
import { APIResContestData, CourseData } from "./contestdata";
import RegisterConfirmationModal from "./RegisterConfirmationModal";
import TooltipSpan from "../Tooltip/TooltipSpan";
import { useDispatch } from "react-redux";
import { setLoading } from "../../reducers/loader/loader";

const ActiveContestAccordion: React.FC = () => {
  const dispatch = useDispatch();
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

  const handleSwitch = (isChecked: boolean) => {
    if (isChecked) {
      // do api call or any other action here shiv
    }
    setIsModalOpen(true);
  };

  return (
    <div className="w-full">
      {data &&
        data.length > 0 &&
        data.map((item: CourseData, i: number) => (
          <div
            key={i}
            style={{
              borderColor: i === openAccordion ? "#95C11E" : "",
            }}
            className={`relative my-3 rounded-lg border-2 border-gray-200 shadow-sm`}
          >
            <button
              onClick={() => handleToggle(i)}
              className="flex w-[97%] items-center justify-between p-4 text-left font-medium text-gray-800 focus:outline-none"
            >
              <div>
                {item.clubName}
                <p className="text-gray-400"> {item.courseName}</p>
              </div>
              <div>
                Hole <span className="font-semibold">#{item.holeNumber}</span> -
                Par {item.par}
                <p>
                  Tees: <span className="font-semibold">{item.teeName}</span>
                </p>
              </div>
              <span
                className={`absolute right-2 top-4 transform transition-transform ${openAccordion === i ? "rotate-180" : "rotate-0"}`}
              >
                <ChevronDown strokeWidth={1.25} size={32} />
              </span>
            </button>
            <div
              className={`transition-max-height overflow-hidden duration-300 ${
                openAccordion === i ? "max-h-72" : "max-h-0"
              }`}
            >
              {/* content  */}
              {item.allDailyActiveContestDTOS.length > 0 &&
                item.allDailyActiveContestDTOS.map((item, index) => (
                  <div key={index}>
                    <div className="border-t-2 border-[#95C11E] p-4 text-gray-700">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold">
                            {item.contestType}
                          </p>
                          <p className="text-sm">
                            Entry Fees:{" "}
                            <span className="font-semibold text-red-500">
                              ${item.entryFee}
                            </span>
                          </p>
                          <p className="text-sm">
                            Payout:{" "}
                            <span className="text-sm font-bold">
                              (
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
                              {item.charityPercentage > 0 && (
                                <TooltipSpan
                                  text={item.charityPercentage}
                                  tooltip="Charity Percentage"
                                  needPY={false}
                                />
                              )}
                              )
                            </span>
                          </p>
                          <div className="py-2">
                            <p className="text-sm">
                              Start Time:{" "}
                              <span className="text-sm font-bold">
                                {moment
                                  .utc(item.startTime)
                                  .local()
                                  .format("hh:mm A")}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div>
                          <div className="flex w-[150px] justify-between py-3">
                            <div className="">
                              <p className="rounded-md bg-[#DCE8DF] p-1 text-sm font-bold shadow-md">
                                Status:{" "}
                                <span className="text-xs font-bold text-[#248A3D]">
                                  {item.activeStatus}
                                </span>{" "}
                              </p>
                            </div>
                            <div>
                              <SwitchComponent
                                isChecked={item.activeStatus === "Open"}
                                onChange={(isChecked) =>
                                  handleSwitch(isChecked)
                                }
                              />
                            </div>
                          </div>
                          <div className="mt-2">
                            <p className="text-sm">
                              End Time:{" "}
                              <span className="text-sm font-bold">
                                {moment
                                  .utc(item.endTime)
                                  .local()
                                  .format("hh:mm A")}
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
  );
};

export default ActiveContestAccordion;
