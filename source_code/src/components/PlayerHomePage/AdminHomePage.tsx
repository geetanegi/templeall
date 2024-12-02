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
  const [totalSotwCount, setTotalSotwCount] = useState<number | string>(4);

  const fetchSOTWVideosAPI = async (pagesize = 4) => {
    try {
      dispatch(setLoading(true));
      const { data, status } = await apiService.post<any>(
        API_URL.getAllShotOfTheWeek,
        {
          data: {
            pageSortingParam: {
              sortDir: "DESC",
              sortBy: "createdDate",
              pageNumber: 0,
              pageSize: pagesize,
            },
            searchParams: {
              isPublished: true,
            },
          },
        },
      );
      if (status === 200 && data?.data != null && !data?.error) {
        setVideosData(data?.data.content);
        setTotalSotwCount(data?.data.totalElements);
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


  return (
    <PageLoader isActive={loader}>
      <div className="flex">
        <div className="w-full bg-[#ffffff]">
          <div className="mb-10 bg-[#ffffff] bg-fixed px-4 pb-10">
            <div className="flex items-center justify-between px-4 py-4">
              <p className="flex text-[18px] font-semibold">
                {showAll && (
                  <CircleArrowLeft
                    className="mr-3 cursor-pointer"
                    strokeWidth={1.25}
                    color="#95C11E"
                    onClick={() => {
                      fetchSOTWVideosAPI(4);
                      setShowAll(false);
                    }}
                  />
                )}
                Shot of the week
              </p>
              {!showAll && Number(totalSotwCount) > 4 && (
                <button
                  onClick={() => {
                    fetchSOTWVideosAPI(10);
                    setShowAll(true);
                  }}
                  className="text-[#046221 ] text-[14px] font-semibold"
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
                <PlayerSOTW data={videosData} />
              )}
            </div>

            {!showAll && (
              <div className="mt-6">
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
