import React, { useState } from 'react'
import TableComponent from '../TableComponent';

import { computeMediaHeaders } from './mediaUtils/mediaUtils';
import { Minus, CirclePlay } from 'lucide-react';
import ConfirmationModal from '../GenericUIcomponents/ConfirmationModal';

interface MediaManagementTableProps {
  setIsVideoPlayerVisible: (flag: boolean)=>void;
  selectedTab: number
}


const MediaManagementTable:React.FC<MediaManagementTableProps> = ({setIsVideoPlayerVisible, selectedTab}) => {
  
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState<boolean>(false)

  const rowData = [
    {
      contestName: "Hole-in-One",
      club:"Saginaaw Country Club",
      course:"Saginaw Course",
      hole: "Hole #17 - Par 4",
      tee: "White Tees(147 Yards)",
      playerUserName:"MDeTizio",
      date:"9/11/2024",
      time:"05:03 PM",
      upload: <div className='flex py-4 gap-2'>
        <button className='text-[#0077B6]' onClick={()=>setIsVideoPlayerVisible(true)}>Uploaded</button>
        <Minus size={20} className='bg-[red] rounded-full text-[#fff] cursor-pointer'
            onClick={()=>setIsConfirmationModalOpen(true)}
        />
      </div>,
    }
  ]

  return (
    <div className='px-10'>
        <TableComponent
           rowData={rowData}
           Headers={computeMediaHeaders(selectedTab)}
           currentPage={0}
           pageSize={10}
           setCurrentPage={()=>{}}
           setPageSize={()=>{}}
           totalPages={1}
           pagination={false}
           style='min-w-[150px]'
        />
        <ConfirmationModal
            type={"error"}
            confirmationText={'Are you sure you want to delete this Video?'}
            isOpen={isConfirmationModalOpen}
            onClose={setIsConfirmationModalOpen}
            onOk={()=>{setIsConfirmationModalOpen(false)}}
        />
    </div>
  )
}

export default MediaManagementTable
