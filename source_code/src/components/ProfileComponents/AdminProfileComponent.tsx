import React from 'react'
import { LandPlot, Mail, Phone } from 'lucide-react'

// image imports 

import golfKitIcon from '../../assets/images/golf-kit.svg';



interface AdminProfileComponentProps {
    userinformation: any;
    isModalOpen: boolean;
    setIsModalOpen: (val: boolean) => void;
    fetchUserInformation: () => void
    userId: string | number;
    userInfo: any
}

const AdminProfileComponent: React.FC<AdminProfileComponentProps> = ({ userinformation, setIsModalOpen, userInfo, userId }) => {


    return (
        <div className='flex flex-col mt-40 lg:mt-0 lg:flex-row pl-16 h-full items-center justify-between'>
            <div className='hidden lg:flex  flex-col mr-24' style={{ height: "max-content" }}>
                <h1 className='hidden lg:flex text-[36px] text-[#1D1A0C]'>
                    {userinformation?.firstName?.charAt(0).toUpperCase() + userinformation?.firstName?.slice(1)
                        || ''} {userinformation?.lastName?.charAt(0).toUpperCase() + userinformation?.lastName?.slice(1) || ''}
                </h1>
                <span className='hidden lg:flex ml-auto text-[#7B7887] text-[18px]'>{userinformation?.username || ''}</span>
            </div>
            <div className='flex flex-col  lg:mt-20 lg:ml-auto gap-[16px]'>
                <div className='flex gap-2'>
                    <img src={golfKitIcon} alt="Golf Kit Icon" className='h-[18px] w-[18px]' />
                    <div className='text-[#7B7887]'>{userinformation?.userCourseAndClubInfo?.[0]?.club?.courseList?.map((course: any) => course.courseName + " ") || '---'}</div>
                </div>
                <div className='flex gap-2'>
                    <LandPlot className='h-[18px] w-[18px]' />
                    <div className='text-[#7B7887]'>{(userinformation?.userCourseAndClubInfo?.[0]?.club?.name) || '---'}</div>
                </div>
                <div className='flex gap-2'>
                    <Mail className='h-[18px] w-[18px]' />
                    <div className='text-[#0077B6]'>{userinformation?.email || "---"}</div>
                </div>
                <div className='flex gap-2' ><Phone className='h-[18px] w-[18px]' />
                        {
                            userinformation?.userProfile?.contactNumber ?
                            <div className='text-[#7B7887]'>{"+1" + userinformation?.userProfile?.contactNumber}</div>:
                            '---'
                        }
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
    )
}

export default AdminProfileComponent
