import React, { useState } from 'react'


// image imports 

import golfKitIcon from '../../assets/images/clubs.png';
import golfBallIcon from '../../assets/images/sports_golf_ball.png';
import UpdatePlayerInformationModal from './UpdatePlayerInformationModal';
import StripeIntegration from '../../pages/StripeIntegration';
import {LandPlot} from "lucide-react"
interface UserinformationComponentProps {
  userinformation: any;
  isModalOpen: boolean;
  fetchUserInformation: () => void;
  userId: string | number;
  userInfo: any
}


const UserinformationComponent: React.FC<UserinformationComponentProps> = ({ userinformation, fetchUserInformation, userId, userInfo }) => {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)


  function formatDate(dateString: string): string {
    // Parse the date string
    const date = new Date(dateString);
    
    // Extract the month, day, and year
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();

    // Return the formatted date
    return `${month}-${day}-${year}`;
}


  return (
    <>
      <div className='mt-16  w-[245px] h-[298px]  bg-[#FFFFFF4D]  rounded-lg  p-4'
        style={{ height: "max-content" }}
      >

        <div className='flex'>
          <div className='flex flex-col gap-1'>
            <div className='flex items-center text-primaryText  text-[14px] gap-2 whitespace-nowrap'><span className='mr-3 whitespace-nowrap'>Age :</span><span className='whitespace-nowrap'>{userinformation?.userProfile?.age || '---'}</span></div>
            <div className='flex items-center text-primaryText text-[14px] gap-2'><span className='mr-3 whitespace-nowrap'>Handicap :</span><div className='flex flex-wrap'>{userinformation?.userProfile?.handicap || '---'}</div></div>
            <div className='flex items-center text-primaryText text-[14px] gap-2'><img src={golfKitIcon} alt="Golf Kit Icon" className='ml-1' /><div className='whitespace-nowrap'>Clubs :</div><div className='flex flex-wrap'>{userinformation?.userProfile?.clubs || '---'}</div></div>
            <div className='flex items-center text-primaryText text-[14px] gap-2' > <img src={golfBallIcon} alt="Golf Ball Icon" className='' /><div className=' whitespace-nowrap'>Ball :</div><div className='flex flex-wrap'>{userinformation?.userProfile?.ball || '---'}</div></div>
            <div className='flex items-center text-primaryText text-[14px] gap-2 whitespace-nowrap '><LandPlot size={16} className='text-primaryText'  /><div className=' whitespace-nowrap'>Course :</div><div className='flex flex-wrap leading-tight  ' >{userinformation?.userCourseAndClubInfo?.[0]?.club?.courseList?.map((course: any) => course.courseName + " ") || '---'}</div></div>
            <div className='flex items-center text-primaryText text-[14px] gap-2 whitespace-nowrap'><span className='mr-3 whitespace-nowrap'>Member Since:</span><span className='whitespace-nowrap'>{userinformation?.userProfile?.memberSince ? formatDate(userinformation?.userProfile?.memberSince) : '---'}</span></div>
          </div>
          <div>
          </div>
        </div>
        <div>
          {
            !userId || (userId == userInfo?.userId) ?
              <button
                className='border border-[#95C11E] ml-10 mt-10 text-[#95C11E] w-[138px] h-[30px] rounded-md'
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
