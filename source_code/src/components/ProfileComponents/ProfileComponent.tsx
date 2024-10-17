import React, { useEffect, useState } from "react";
import ProfileOverviewSection from "./ProfileOverviewSection";
import CommunitySearchComponent from "./CommunityPanel/CommunitySearchComponent";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import FeatureHighlightsComponents from "./CommunityPanel/FeatureHighlightsComponents";
import { useLocation } from "react-router-dom";
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
  const userPermisions = useSelector(
    (state: RootState) => state.auth.userPermissions,
  );

  const [selectedUser, setSelectedUser] = useState<string | number>(userId);

  useEffect(() => {
    setSelectedUser("");
  }, [isCommunitySearch]);

  return (
    <div className="bg-white-700 h-full min-h-[90vh] w-full overflow-auto bg-contain bg-cover bg-fixed bg-no-repeat sm:flex-row sm:bg-profilebackground md:flex-row lg:overflow-hidden">
      <div className="flex pt-6 w-full">
        {userPermisions?.data?.permission["is_player"] && isCommunitySearch ? (
          <CommunitySearchComponent
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        ) : null}
        <div className="ml-auto w-[90%] lg:w-[75%]">
          <ProfileOverviewSection
            userId={id || selectedUser}
            isCommunitySearch={isCommunitySearch}
            role={role}
          />
          {isCommunitySearch ? (
            <FeatureHighlightsComponents selectedUser={selectedUser} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
