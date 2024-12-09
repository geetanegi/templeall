import React, { useEffect, useState } from "react";
import ProfileOverviewSection from "./ProfileOverviewSection";
import CommunitySearchComponent from "./CommunityPanel/CommunitySearchComponent";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import FeatureHighlightsComponents from "./CommunityPanel/FeatureHighlightsComponents";
import { useLocation } from "react-router-dom";
import { decryptData, secretKey } from "../../utils/encrypt";
// import { useLocation } from 'react-router-dom';

interface ProfileComponentProps {
  userId?: string;
  isCommunitySearch?: boolean | undefined;
}

const ProfileComponent: React.FC<ProfileComponentProps> = ({
  userId = "",
  isCommunitySearch,
}) => {
  const location = useLocation();
  const { id, role } = location.state || {};
  const userPermisions = JSON.parse(decryptData(useSelector(
    (state: RootState) => state.auth.userPermissions,
  ), secretKey))

  const [selectedUser, setSelectedUser] = useState<string | number>(userId);
  const [showUserNotFound, setShowUserNotFound] = useState<boolean>(false)
  useEffect(() => {
    setSelectedUser("");
  }, [isCommunitySearch]);


  return (
    <div className="min-h-[90vh] bg-profile_gradient_bg">
      <div className="bg-white-700 h-full min-h-[90vh] w-full overflow-auto bg-contain bg-cover bg-fixed bg-no-repeat sm:flex-row sm:bg-profilebackground md:flex-row lg:overflow-hidden">
        <div className="flex w-full pt-6">

          {userPermisions?.permission?.["is_player"] &&
            isCommunitySearch ? (
            <CommunitySearchComponent
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
              setShowUserNotFound={setShowUserNotFound}
            />
          ) : null}

          <div className=" ml-auto w-[90%] lg:w-[75%]">
            {
              (isCommunitySearch && showUserNotFound) ?
                <div className="flex h-64 mr-20 flex-col items-center justify-center rounded-lg bg-[#FFFFFF1A] p-6">

                  <h2 className="text-xl font-semibold text-yellowText">

                  </h2>
                  <p className="mt-2 text-center text-yellowText">
                    Sorry, No players match your search criteria.
                  </p>
                </div>
                : <ProfileOverviewSection
                  userId={id || selectedUser}
                  isCommunitySearch={isCommunitySearch}
                  role={role}
                />
            }


            {isCommunitySearch ? (
              <FeatureHighlightsComponents selectedUser={selectedUser} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
