import React, { useEffect, useState } from 'react'
import BettingOverview from './BettingOverview'
import UserinformationComponent from './UserInformationComponent'
import AdminProfileComponent from './AdminProfileComponent'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setLoading } from '../../reducers/loader/loader';
import apiService from '../../services/apiService';
import { API_URL } from '../../services/enums';
import { ToastError } from '../Toast';
import UpdateProfileModal from './UpdateProfileModal';
import ImageComponent from './ImageComponent';
import { updateProfile, updateProfileImage } from '../../reducers/Profiler/profiler';


interface ProfileOverviewSectionProps {
  userId: string | number,
  isCommunitySearch: boolean | undefined;
  role: string;
}


const ProfileOverviewSection: React.FC<ProfileOverviewSectionProps> = ({ userId, isCommunitySearch, role }) => {
  const userPermisions = useSelector(
    (state: RootState) => state.auth.userPermissions,
  );
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const [userinformation, setUserInformation] = useState<any>()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchUserInformation()
  }, [userId])



  const fetchUserInformation = async () => {
    try {
      dispatch(setLoading(true));
      const { data, status } = await apiService.post<any>(
        API_URL.fetchUserProfile,
        {
          data: {
            loginUserId: userId ? userId :
              typeof userInfo === "object" ? userInfo.userId : undefined,
          },
        },
      );
      if (status === 200 && data?.data != null && !data?.error) {
        setUserInformation(data?.data)
        const profileImage = data?.data?.userProfile?.imageBase64
        if (!userId || (userId == (typeof userInfo === "object" ? userInfo.userId : undefined))) {
          dispatch(updateProfileImage({ profileImage }))
          dispatch(updateProfile({ profiler: data.data }));

        }
      } else if (data?.error && data.description) {
        ToastError(data.description);
      }
    } catch (error) {
      ToastError('Something went wrong')
    } finally {
      dispatch(setLoading(false));
    }
  }

  const computeUserData = () => {
    if (userinformation) {
      return {

        firstName: userinformation?.firstName || '',
        lastName: userinformation?.lastName,
        email: userinformation?.email,
        contactNumber: userinformation?.userProfile?.contactNumber,
      }
    } else {
      return {

        firstName: "",
        lastName: "",
        email: "",
        contactNumber: "",
      }
    }
  }

  const isAdmin = () => {

    if (role && role === "Player") {
      return false;
    } else if (role && role != "Player") {
      return true;
    } else if (!userPermisions?.data?.permission['is_player']) {
      return true
    } else {
      return false
    }
  }

  return (
    <div
      className={`lg:bg-custom-gradient-1 mt-24 sm:mt-0  flex flex-col-reverse mx-auto lg:mx-0 lg:ml-auto sm:flex-row h-[432px] rounded-lg sm:rounded-l-full justify-between  lg:ml-auto  p-6 sm:shadow-lg
              ${(!isCommunitySearch || userId) ? '' : "invisible"}
        `}
    >

      {isAdmin() ? <AdminProfileComponent
        userinformation={userinformation}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        fetchUserInformation={fetchUserInformation}
        userInfo={userInfo}
        userId={userId}
      /> :
        <div className='h-full ml-0 lg:ml-20'>
          <div className='flex flex-col-reverse sm:flex-row'>
            <BettingOverview />
            <UserinformationComponent
              userinformation={userinformation}
              isModalOpen={isModalOpen}
              fetchUserInformation={fetchUserInformation}
              userInfo={userInfo}
              userId={userId}
            />
          </div>
        </div>
      }
      <div className='w-[100%] flex lg:hidden' style={{ width: "max-content" }}>
        <div className='mx-auto relative top-16 left-8 text-center  text-[32px]'>{userinformation?.firstName} {' '}{userinformation?.lastName} </div>
      </div>
      <ImageComponent
        image={userinformation?.userProfile?.imageBase64}
        userDetails={{
          firstName: userinformation?.firstName || '',
          lastName: userinformation?.lastName || '',
          location: userinformation?.userProfile?.location || ''
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
  )
}

export default ProfileOverviewSection
