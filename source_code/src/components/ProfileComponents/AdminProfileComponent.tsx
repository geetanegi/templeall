import React from "react";
import { LandPlot, Mail, Phone } from "lucide-react";

// image imports

import golfKitIcon from "../../assets/images/clubs.png";

interface AdminProfileComponentProps {
  userinformation: any;
  isModalOpen: boolean;
  setIsModalOpen: (val: boolean) => void;
  fetchUserInformation: () => void;
  userId: string | number;
  userInfo: any;
  userPermisions: any;
  role:string
}

const AdminProfileComponent: React.FC<AdminProfileComponentProps> = ({
  userinformation,
  setIsModalOpen,
  userInfo,
  userId,
  userPermisions,
  role
}) => {

  return (
    <div className="mt-40 flex h-full flex-col items-center justify-between pl-16 lg:mt-0 lg:flex-row">
      <div
        className="mr-24 hidden flex-col text-primaryText lg:flex"
        style={{ height: "max-content" }}
      >
        <h1 className="hidden text-[36px] lg:flex">
          {userinformation?.firstName?.charAt(0).toUpperCase() +
            userinformation?.firstName?.slice(1) || ""}{" "}
          {userinformation?.lastName?.charAt(0).toUpperCase() +
            userinformation?.lastName?.slice(1) || ""}
        </h1>
        <span className="ml-auto hidden text-[18px] text-[#F5F6F7] lg:flex">
          {userinformation?.username || ""}
        </span>
      </div>
      <div className="flex flex-col gap-[16px] lg:ml-auto lg:mt-20">
        {userPermisions?.permission["is_course_admin"] || role === "Course Admin" ? (
          <>
            <div className="flex gap-2">
              <img
                src={golfKitIcon}
                alt="Golf Kit Icon"
                className="h-[18px] w-[18px]"
              />
              <div className="text-[#F5F6F7]">
                {userinformation?.userCourseAndClubInfo?.[0]?.club?.name ||
                  "---"}
              </div>
            </div>
            <div className="flex gap-2">
              <LandPlot className="h-[18px] w-[18px] text-[#F5F6F7]" />
              <div className="text-[#F5F6F7]">
                
                {userinformation?.userCourseAndClubInfo?.[0]?.club?.courseList?.map(
                  (course: any) => course.courseName + " ",
                ) || "---"}
              </div>
            </div>
          </>
        ) : null}
        <div className="flex gap-2">
          <Mail className="h-[18px] w-[18px] text-[#F5F6F7]" />
          <div className="text-link">{userinformation?.email || "---"}</div>
        </div>
        <div className="flex gap-2 text-[#F5F6F7]">
          <Phone className="h-[18px] w-[18px] text-[#F5F6F7]" />
          {userinformation?.userProfile?.contactNumber ? (
            <div className="text-[#F5F6F7]">
              {userinformation?.userProfile?.countryCode +
                userinformation?.userProfile?.contactNumber}
            </div>
          ) : (
            "---"
          )}
        </div>
        {!userId || userId == userInfo?.userId ? (
          <button
            className="ml-10 mt-5 h-[30px] w-[138px] rounded-md border border-[#95C11E] text-[#95C11E]"
            onClick={() => setIsModalOpen(true)}
          >
            Edit Profile
          </button>
        ) : (
          <div className="ml-10 mt-5 h-[30px] w-[138px]"></div>
        )}
      </div>
    </div>
  );
};

export default AdminProfileComponent;
