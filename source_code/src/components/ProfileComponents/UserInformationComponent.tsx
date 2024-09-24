import React, { useState } from 'react'


// image imports 

import golfKitIcon from '../../assets/images/golf-kit.svg';
import golfCourse from '../../assets/images/golf_course.svg'
import golfBallIcon from '../../assets/images/sports_golf.svg';
import faceBookImage from '../../assets/images/Facebook.svg'
import InstagramImage from '../../assets/images/Instagram.svg'
import twitterImage from '../../assets/images/Twitter-Logо.png';
import googleImage from '../../assets/images/Google.svg'
import UpdatePlayerInformationModal from './UpdatePlayerInformationModal';
import StripeIntegration from '../../pages/StripeIntegration';
interface UserinformationComponentProps {
  userinformation: any;
  isModalOpen: boolean;
  fetchUserInformation: () => void;
  userId: string | number;
  userInfo: any
}


const UserinformationComponent: React.FC<UserinformationComponentProps> = ({ userinformation, fetchUserInformation, userId, userInfo }) => {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)


  function calculateAge(dob: string): number {
    // Create a Date object from the ISO 8601 format date string
    const birthDate = new Date(dob);
    const today = new Date();

    // Calculate the age
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Adjust age if the birthday hasn't occurred yet this year
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }


  return (
    <>
      <div className=' lg:relative slex mt-16 lg:mt-auto w-[245px] h-[298px]  lg:right-0 bg-[#ffffff99]   rounded-lg mx-auto lg:mx-0  sm:ml-10 p-4'
        style={{ height: "max-content" }}
      >

        <div className='flex'>
          <div className='mr-3 my-auto'>
            <img src={golfKitIcon} alt="Golf Kit Icon" className='my-2' />
            <img src={golfBallIcon} alt="Golf Ball Icon" className='my-2' />
            <img src={golfCourse} alt="Golf Course Icon" />
          </div>
          <div>
            <div><span className='mr-5'>Age :</span><span >{calculateAge(userinformation?.userProfile?.dateOfBirth || '') || '---'}</span></div>
            <div><span className='mr-5'>Handicap :</span><span>{userinformation?.userProfile?.handicap || '---'}</span></div>
            <div><span className='mr-5'>Clubs :</span><span></span>{userinformation?.userProfile?.clubs || '---'}</div>
            <div><span className='mr-5'>Ball :</span><span>{userinformation?.userProfile?.ball || '---'}</span></div>
            <div><span className='mr-5'>Course :</span><span>{userinformation?.userCourseAndClubInfo?.[0]?.club?.courseList?.map((course: any) => course.courseName + " ") || '---'}</span></div>
            <div><span className='mr-5'>Member Since:</span><span>{userinformation?.userCourseAndClubInfo?.[0]?.club?.createdBy || '---'}</span></div>
          </div>
          <div>
          </div>
        </div>
        <div>
          <div className='w-full flex align-center justify-center gap-4 mt-5' >
            <img className='h-[18px] cursor-pointer' src={faceBookImage} alt="" />
            <img className='h-[18px] cursor-pointer' src={twitterImage} alt="" />
            <img className='h-[18px] cursor-pointer' src={InstagramImage} alt="" />
            <img className='h-[18px] cursor-pointer' src={googleImage} alt="" />

          </div>
          {
            !userId || (userId == userInfo?.userId) ?
              <button
                className='border border-[#95C11E] ml-10 mt-5 text-[#95C11E] w-[138px] h-[30px] rounded-md'
                onClick={() => setIsModalOpen(true)}
              >Edit Profile</button> : <div className='ml-10 mt-5  w-[138px] h-[30px]'></div>
          }

        </div>

      </div>

      <StripeIntegration>
        <UpdatePlayerInformationModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          fetchUserInformation={fetchUserInformation}
          userData={userinformation}
        />
      </StripeIntegration>
    </>
  )
}

export default UserinformationComponent
