import React, { lazy, useRef, useState } from 'react'
import AdminSidePanel from './AdminSidePanel'
import AdminRightPanel from './AdminRightPanel'

const AddAdminModal = lazy(() => import('./AddAdminModal'))

// lucide imports 
import { LandPlot, QrCode, UserCog, Users } from 'lucide-react'


// image imports
import BG from '../../assets/images/dashboardBG.svg';
import CoursePanel from './courses/CoursePanel'



// define propType
import { AdminRightPanelHandle } from './AdminRightPanel'
import { AdminSidePanelHandle } from './AdminSidePanel'
interface AdminPanelProps { }

const Adminpanel: React.FC<AdminPanelProps> = () => {

    const [selectedUserTab, setSelectedUserTab] = useState<number>(3)
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [userData, setUserData] = useState<any>()

    const adminSidePanelRef = useRef<AdminSidePanelHandle>(null);
    const adminRightPanelRef = useRef<AdminRightPanelHandle>(null);

    const handleRefreshUserCount = () => {
        if (adminSidePanelRef.current) {
            adminSidePanelRef.current.getUserCount(); // Call the method exposed by the child component
        }
    };
    
    

    const openModal = (userData?: any, roleIds?: number) => {
        if (userData && roleIds) {
            setUserData({ ...userData, roleIds })
        }
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setUserData(null)
        setIsModalOpen(false);
    }

    const usersCount = [
        { roleIds: 3, key: "Player User", role: "Players",  icon: <Users /> },
        { roleIds: 2, key: "Course Admin", role: "Course Admin", icon: <LandPlot /> },
        { roleIds: 1, key: "Super Admin", role: "Super Admin", icon: <UserCog /> }
    ]

    return (
        <>
            <div
                className="flex flex-col bg-fixed bg-contain md:flex-row h-full bg-no-repeat bg-contain pt-10 bg-admin-bg-position"
                style={{ backgroundImage: `url(${BG})` }}
            >
                <div className="flex-1 px-4 md:flex-[0.25] lg:flex-[0.25] xl:flex-[0.25] md:px-10">
                    <div className="mb-4 w-full text-center md:mb-0">
                        <button
                            onClick={() => setSelectedUserTab(0)}
                            className={`flex w-full text-center overflow-hidden rounded-md border border-lime-500 px-4 py-2 text-gray-500 md:px-14 md:py-2 ${selectedUserTab === 0 ? 'bg-lime-500 text-white' : 'text-[#7B7887]'}`}>
                            <div className='mx-auto flex whitespace-nowrap'><QrCode className='mr-3' /> <p>Generate QR Code </p></div>
                        </button>
                    </div>
                    <AdminSidePanel
                        selectedUserTab={selectedUserTab}
                        setSelectedUserTab={setSelectedUserTab}
                        usersCount={usersCount}
                        ref={adminSidePanelRef}
                    />
                </div>
                {
                    selectedUserTab === 0 ? <CoursePanel /> :
                        <AdminRightPanel
                            openModal={openModal}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                            selectedUserTab={selectedUserTab}
                            handleRefreshUserCount={handleRefreshUserCount}
                            ref={adminRightPanelRef}
                        />
                }

            </div>
            <AddAdminModal
                closeModal={closeModal}
                userData={userData}
                setIsModalOpen={setIsModalOpen}
                isModalOpen={isModalOpen}
                handleRefreshUserCount={handleRefreshUserCount}
                refreashUserData={()=>adminRightPanelRef?.current?.getUserData()}
            />
        </>
    );
};

export default Adminpanel;
