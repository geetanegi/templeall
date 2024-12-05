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
import { decryptData, secretKey } from '../../utils/encrypt';


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
  const userPermisions = JSON.parse(decryptData(useSelector(
    (state: RootState) => state.auth.userPermissions,
  ), secretKey))
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
        const profileImage = data?.data?.userProfile?.imageUrl;
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
        countryCode: userinformation?.userProfile?.countryCode,
        clubId: userinformation?.userCourseAndClubInfo?.[0]?.club?.id || null,
        courseId:  userinformation?.userCourseAndClubInfo?.[0]?.club?.courseList?.[0]?.id || null,
      };
    } else {
      return {
        firstName: "",
        lastName: "",
        email: "",
        contactNumber: "",
        countryCode:"",
        clubId: null,
        courseId:null,
      };
    }
  };

  const isAdmin = () => {
    if (role && role === "Player") {
      return false;
    } else if (role && role != "Player") {
      return true;
    } else if (!userPermisions?.permission["is_player"]) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className={`lg:bg-custom-gradient-1 rounded-lg sm:rounded-l-full ${!isCommunitySearch || userId ? "" : "invisible"}`}>
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
          userPermisions={userPermisions}
          role={role}
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
