import React, { useState } from "react";

// image imports

import golfKitIcon from "../../assets/images/club_icon.svg";
import golfBallIcon from "../../assets/images/sports_golf 1.svg";
import UpdatePlayerInformationModal from "./UpdatePlayerInformationModal";
// import StripeIntegration from '../../pages/StripeIntegration';
import { LandPlot } from "lucide-react";
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
      <div
        className="mt-10  h-[290px] w-[245px] rounded-lg bg-[#FFFFFF4D] p-4"
        // style={{ height: "max-content" }}
      >
        <div className="flex">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1 whitespace-nowrap text-[14px] text-primaryText">
              <span className="whitespace-nowrap font-thin">Age:</span>
              <span className="whitespace-nowrap">
                {userinformation?.userProfile?.age || "---"}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[14px] text-primaryText">
              <span className="whitespace-nowrap font-thin">Handicap:</span>
              <div className="flex flex-wrap">
                {userinformation?.userProfile?.handicap || "---"}
              </div>
            </div>
            <div className="flex items-center gap-1 text-[14px] text-primaryText">
              <img src={golfKitIcon} alt="Golf Kit Icon" className="ml-1" />
              <div className="whitespace-nowrap font-thin">Clubs:</div>
              <div className="flex flex-wrap">
                {userinformation?.userProfile?.clubs || "---"}
              </div>
            </div>
            <div className="flex items-center gap-1 text-[14px] text-primaryText">
              {" "}
              <img src={golfBallIcon} alt="Golf Ball Icon" />
              <div className="whitespace-nowrap font-thin">Ball:</div>
              <div className="flex flex-wrap">
                {userinformation?.userProfile?.ball || "---"}
              </div>
            </div>
            <div className="flex items-center gap-1 whitespace-nowrap text-[14px] text-primaryText">
              <LandPlot size={16} className=" ml-[2px]"/>
              <div className="whitespace-nowrap font-thin">Course :</div>
              <div className="flex flex-wrap leading-tight">
                {userinformation?.userCourseAndClubInfo?.[0]?.club?.courseList?.map(
                  (course: any) => course.courseName + " ",
                ) || "---"}
              </div>
            </div>
            <div className="flex items-center gap-2 whitespace-nowrap text-[14px] text-primaryText">
              <span className="whitespace-nowrap font-thin">Member Since:</span>
              <span className="whitespace-nowrap">
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
              className="mt-20 h-[30px] w-[138px] rounded-md border border-[#95C11E] text-[#95C11E]"
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
    </>
  );
};

export default UserinformationComponent;
