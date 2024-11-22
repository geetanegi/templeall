import React, { useEffect, useState } from "react";
import PlayerSOTW from "./PlayerSOTW";
import { CircleArrowLeft, VideoOff } from "lucide-react";
import ContestTabs from "./ContestTabs";
import apiService from "../../services/apiService";
import { API_URL } from "../../services/enums";
import { ToastInfo } from "../Toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setLoading } from "../../reducers/loader/loader";
import PageLoader from "../PageLoader";

const AdminHomePage: React.FC = () => {
  const dispatch = useDispatch();
  const loader = useSelector((state: RootState) => state.loader.isLoading);

  const [videosData, setVideosData] = useState<any>([]);

  const fetchSOTWVideosAPI = async () => {
    try {
      dispatch(setLoading(true));
      const { data, status } = await apiService.post<any>(
        API_URL.getAllShotOfTheWeek,
        {
          data: {
            searchParams: {
              isPublished: true,
            },
          },
        },
      );
      if (status === 200 && data?.data != null && !data?.error) {
        setVideosData(data?.data);
      } else if (data?.error && data.description) {
        ToastInfo(data.description);
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchSOTWVideosAPI();
  }, []);

  const [showAll, setShowAll] = useState(false);

  const displayedData = showAll ? videosData : videosData.slice(0, 4);

  return (
    <PageLoader isActive={loader}>
      <div className="flex">
        <div className="w-full bg-[#ffffff]">
          <div className="bg-[#ffffff] bg-fixed px-4 pb-10 mb-10">
            <div className="flex items-center justify-between px-4 py-4">
              <p className="flex text-[18px] font-semibold">
                {showAll && (
                  <CircleArrowLeft
                    className="mr-3 cursor-pointer"
                    strokeWidth={1.25}
                    color="#95C11E"
                    onClick={() => setShowAll(false)}
                  />
                )}
                Shot of the week
              </p>
              {!showAll && videosData.length > 4 && (
                <button
                  onClick={() => setShowAll(true)}
                  className="text-[14px] font-semibold text-[#95C11E]"
                >
                  View All
                </button>
              )}
            </div>
            <div className="">
              {videosData.length === 0 ? (
                <div className="my-5 h-[206px] w-full rounded-[8px] border bg-[#F5F6F7] p-3">
                  <div className="mt-2 flex h-[152px] w-[full] flex-col items-center justify-center rounded-[6px] bg-[#FFFFFF1A]">
                    <VideoOff
                      color="#7B7887"
                      strokeWidth={1}
                      size={84}
                      className="font-extralight"
                    />
                    <span className="text-[#7B7887]">
                      No videos available at this time.
                    </span>
                  </div>
                </div>
              ) : (
                <PlayerSOTW data={displayedData} />
              )}
            </div>

            {!showAll && (
              <div className="mt-6 px-4">
                {/* highlights tabs  */}
                <ContestTabs showMostRecent={false} />
              </div>
            )}
          </div>
        </div>
        <div className="hidden">
          <div className="flex min-h-screen items-center justify-center bg-gray-100 text-center">
            <p>Advertisement space here</p>
          </div>
        </div>
      </div>
    </PageLoader>
  );
};

export default AdminHomePage;
