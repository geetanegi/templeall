import React from 'react'
import defaultUserImage from "../../../assets/images/default-user 1.png"
interface PlayerCardProps {
    profile: any;
    isSelected: boolean;
    setSelectedUser: (userId: string | number) => void
}

const PlayerCard: React.FC<PlayerCardProps> = ({ profile, isSelected, setSelectedUser }) => {

    return (
        <div className={`${isSelected ? 'w-[252px]' : "w-[242px]" }  my-5`} >
            <div className={`flex  cursor-pointer py-2 pl-2   
                 ${isSelected? "h-[64px] w-[232px] bg-[#1D1A0CB2] rounded-t-md ml-auto" : "h-[64px] w-[242px] bg-[#FFFFFFB2] rounded-md"}
            `}
                onClick={() => setSelectedUser(profile.id)}
            >
                <div className='border border-gray-300 rounded-md h-[48px] w-[48px]  overflow-hidden'>
                    {
                        profile?.userProfile?.imageBase64 ? 
                        <img src={`data:image/png;base64,${profile?.userProfile?.imageBase64}`} alt="" className='h-[48px] mx-auto' /> :
                        <img src={defaultUserImage} alt="" className='h-[48px] mx-auto' />
                    }
                </div>
                <div className='flex justify-center flex-col ml-3 h-full text-gray-500 text-sm'>
                    <span className={`text-[16px]  font-semibold ${isSelected ? "text-[#ffffff]" : "text-[#1D1A0CB2]"}`}>{profile.firstName} {profile.lastName}</span>
                    <span className={`text-[14px] tracking-[0.25px] ${isSelected ? "text-[#F5F6F7]" : "text-[#7B7887]" } ${profile.userProfile.location ? "visible": "invisible"} `}>{profile.userProfile.location || "location"}</span>
                </div>
            </div>
            <div className={isSelected ? 'bg-custom-gradient-3 h-[4px]' : ''} ></div>
        </div>

    )
}

export default PlayerCard
