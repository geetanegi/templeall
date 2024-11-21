import React, { useEffect, useState } from 'react'
import BettingOverview from './BettingOverview'
import AdminProfileComponent from './AdminProfileComponent'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setLoading } from '../../reducers/loader/loader';
import apiService from '../../services/apiService';
import { API_URL } from '../../services/enums';
import UpdateProfileModal from './UpdateProfileModal';
import ImageComponent from './ImageComponent';
import { updateProfile, updateProfileImage } from '../../reducers/Profiler/profiler';
import { useLocation } from 'react-router-dom';
import { ToastInfo } from '../Toast';


interface ProfileOverviewSectionProps {
  userId: string | number;
  isCommunitySearch: boolean | undefined;
  role: string;
}

const ProfileOverviewSection: React.FC<ProfileOverviewSectionProps> = ({
  userId,
  isCommunitySearch,
  role,
}) => {
  const userPermisions = useSelector(
    (state: RootState) => state.auth.userPermissions,
  );
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const location = useLocation();
  const [userinformation, setUserInformation] = useState<any>()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if(isCommunitySearch && userId){
      fetchUserInformation()
    }else if(location.pathname === "/profile"){
      fetchUserInformation()
    }
  }, [userId])

  useEffect(()=>{
    setUserInformation({})
  },[location.pathname ])



  const fetchUserInformation = async () => {
    try {
      dispatch(setLoading(true));
      const { data, status } = await apiService.post<any>(
        API_URL.fetchUserProfile,
        {
          data: {
            loginUserId: userId ? userId : typeof userInfo === "object" ? userInfo.userId : ""
          },
        },
      );
      if (status === 200 && data?.data != null && !data?.error) {
        setUserInformation(data?.data);
        const profileImage = data?.data?.userProfile?.imageBase64;
        if (
          !userId ||
          userId == (typeof userInfo === "object" ? userInfo.userId : undefined)
        ) {
          dispatch(updateProfileImage({ profileImage }));
          dispatch(updateProfile({ profiler: data.data }));
        }
      } else if (data?.error && data.description) {
        ToastInfo(data.description);
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const computeUserData = () => {
    if (userinformation) {
      return {
        firstName: userinformation?.firstName || "",
        lastName: userinformation?.lastName,
        email: userinformation?.email,
        contactNumber: userinformation?.userProfile?.contactNumber,
      };
    } else {
      return {
        firstName: "",
        lastName: "",
        email: "",
        contactNumber: "",
      };
    }
  };

  const isAdmin = () => {
    if (role && role === "Player") {
      return false;
    } else if (role && role != "Player") {
      return true;
    } else if (!userPermisions?.data?.permission["is_player"]) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className='lg:bg-custom-gradient-1 rounded-lg sm:rounded-l-full'>
    <div
      className={`mx-auto mt-24 flex h-[432px] w-full flex-col-reverse justify-between bg-center rounded-lg p-6 sm:mt-0 sm:flex-row sm:rounded-l-full sm:shadow-lg bg-contain bg-no-repeat lg:mx-0 lg:ml-auto lg:bg-golfballBg ${!isCommunitySearch || userId ? "" : "invisible"} `}
      style={{ backgroundPosition: '30% center' }}
    >
      {isAdmin() ? (  
        <AdminProfileComponent
          userinformation={userinformation}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          fetchUserInformation={fetchUserInformation}
          userInfo={userInfo}
          userId={userId}
        />
      ) : (
        <div className="ml-0 h-full w-[70%] lg:ml-20">
          <div className="flex w-full flex-col-reverse justify-between sm:flex-row">
            <BettingOverview
              userinformation={userinformation}
              isModalOpen={isModalOpen}
              fetchUserInformation={fetchUserInformation}
              userInfo={userInfo}
              userId={userId}
              isCommunitySearch={isCommunitySearch}
            />
          </div>
        </div>
      )}
      <div className="flex w-[100%] lg:hidden" style={{ width: "max-content" }}>
        <div className="relative left-8 top-16 mx-auto text-center text-[32px]">
          {userinformation?.firstName} {userinformation?.lastName}{" "}
        </div>
      </div>
      <ImageComponent
        image={userinformation?.userProfile?.imageUrl}
        userDetails={{
          firstName: userinformation?.firstName || '',
          lastName: userinformation?.lastName || '',
          location: (!isCommunitySearch || userId) ? userinformation?.userProfile?.location :  ''
        }}
        userCourseAndClubInfo={userinformation?.userCourseAndClubInfo || {}}
        fetchUserInformation={fetchUserInformation}
        userId={userId}
      />

      <UpdateProfileModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        fetchUserInformation={fetchUserInformation}
        userData={computeUserData()}
      />
    </div>
    </div>
  );
};

export default ProfileOverviewSection;
