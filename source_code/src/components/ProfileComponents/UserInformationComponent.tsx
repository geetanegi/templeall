import React, { useState } from "react";

// image imports

import golfKitIcon from "../../assets/images/club_icon_new.svg";
import golfBallIcon from "../../assets/images/sports_golf_new.svg";
import golfCourseIcon from "../../assets/images/cource_icon_new.svg";

import UpdatePlayerInformationModal from "./UpdatePlayerInformationModal";
interface UserinformationComponentProps {
  userinformation: any;
  isModalOpen: boolean;
  fetchUserInformation: () => void;
  userId: string | number;
  userInfo: any;
}

const UserinformationComponent: React.FC<UserinformationComponentProps> = ({
  userinformation,
  fetchUserInformation,
  userId,
  userInfo,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  function formatDate(dateString: string): string {
    // Parse the date string
    const date = new Date(dateString);

    // Extract the month, day, and year
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();

    // Return the formatted date
    return `${month}-${day}-${year}`;
  }

  return (
    <>
      {userinformation?.userProfile && (
        <div >

          <div
            className="mt-10  h-auto w-[100%] rounded-lg bg-[#FFFFFF4D] p-4"
          // style={{ height: "max-content" }}
          >
            <div className="flex">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-1 whitespace-nowrap text-primaryText">
                  <span className="whitespace-nowrap font-light text-[14px]">Age:</span>
                  <span className="whitespace-nowrap font-light text-[14px] ">
                    {userinformation?.userProfile?.age || "---"}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-primaryText">
                  <span className="whitespace-nowrap font-light text-[14px]">Handicap:</span>
                  <div className="flex flex-wrap font-light text-[14px]">
                    {userinformation?.userProfile?.handicap || "---"}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[14px] text-primaryText">
                  <img src={golfKitIcon} alt="Golf Kit Icon" className="-ml-[2px]" />
                  <div className="whitespace-nowrap font-light text-[14px]">Clubs:</div>
                  <div className="flex flex-wrap font-light text-[14px]  truncate">
                    {userinformation?.userProfile?.clubs || "---"}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[14px] text-primaryText">
                  <img src={golfBallIcon} alt="Golf Ball Icon" className="-ml-[4px]" />
                  <div className="whitespace-nowrap font-light text-[14px]">Ball:</div>
                  <div className="flex flex-wrap font-light text-[14px]  truncate">
                    {userinformation?.userProfile?.ball || "---"}
                  </div>
                </div>
                <div className="flex items-center gap-1 whitespace-nowrap text-[14px] text-primaryText">
                  <img src={golfCourseIcon} alt="Golf Ball Icon" className="-ml-[2px]" />
                  <div className="whitespace-nowrap font-light text-[14px]">Course :</div>
                  <div className="flex flex-wrap font-light leading-tight  text-[14px] truncate">
                    {userinformation?.userCourseAndClubInfo?.[0]?.club?.courseList?.map(
                      (course: any) => course.courseName + " ",
                    ) || "---"}
                  </div>
                </div>
                <div className="flex items-center gap-2 whitespace-nowrap text-[14px] text-primaryText">
                  <span className="whitespace-nowrap font-light text-[14px]">Member Since:</span>
                  <span className="whitespace-nowrap font-light text-[14px]">
                    {userinformation?.userProfile?.memberSince
                      ? formatDate(userinformation?.userProfile?.memberSince)
                      : "---"}
                  </span>
                </div>
              </div>
              <div></div>
            </div>
            <div className="flex justify-center">
              {!userId || userId == userInfo?.userId ? (
                <button
                  className="mt-[30px] h-[30px] w-[138px] rounded-md border border-[#95C11E] text-[#95C11E]"
                  onClick={() => setIsModalOpen(true)}
                >
                  Edit Profile
                </button>
              ) : (
                <div className="ml-10 mt-5 h-[30px] w-[138px]"></div>
              )}
            </div>
          </div>

          {/* <StripeIntegration> */}
          <UpdatePlayerInformationModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            fetchUserInformation={fetchUserInformation}
            userData={userinformation}
          />
          {/* </StripeIntegration> */}
        </div>
      )}
    </>
  );
};

export default UserinformationComponent;
