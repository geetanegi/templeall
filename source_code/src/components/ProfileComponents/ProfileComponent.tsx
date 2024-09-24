import React, { useEffect, useState } from 'react';
import ProfileOverviewSection from './ProfileOverviewSection';
import CommunitySearchComponent from './CommunityPanel/CommunitySearchComponent';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import FeatureHighlightsComponents from './CommunityPanel/FeatureHighlightsComponents';
import { useLocation } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';


interface ProfileComponentProps {
  userId?: string;
  isCommunitySearch?: boolean | undefined
}

const ProfileComponent: React.FC<ProfileComponentProps> = ({ userId = '', isCommunitySearch }) => {
  const location = useLocation();
  const { id, role } = location.state || {};
  const userPermisions = useSelector(
    (state: RootState) => state.auth.userPermissions,
  );

  const [selectedUser, setSelectedUser] = useState<string | number>(userId)

  useEffect(() => {
    setSelectedUser('')
  }, [isCommunitySearch])


  return (
    <div
      className="min-h-[90vh] bg-white-700 overflow-auto lg:overflow-hidden sm:bg-profilebackground bg-cover bg-contain bg-fixed bg-contain md:flex-row sm:flex-row h-full bg-no-repeat "
    >
      <div className="flex pt-6">

        {userPermisions?.data?.permission['is_player']
          && isCommunitySearch ? <CommunitySearchComponent
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser} /> : null
        }
        <div className='w-[90%] lg:w-3/4 ml-auto'>
          <ProfileOverviewSection
            userId={id || selectedUser}
            isCommunitySearch={isCommunitySearch}
            role={role}
          />
          {
            isCommunitySearch ?
              <FeatureHighlightsComponents /> : null
          }

        </div>

      </div>
    </div>
  );
}

export default ProfileComponent;