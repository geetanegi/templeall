import React, { lazy, useEffect, useRef, useState } from 'react'
import AdminSidePanel from './AdminSidePanel'
import AdminRightPanel from './AdminRightPanel'

const AddAdminModal = lazy(() => import('./AddAdminModal'))

// lucide imports 
import { LandPlot, UserCog, Users } from 'lucide-react'


// image imports
import BG from '../../assets/images/dashboardBG.svg';



// define propType
import { AdminRightPanelHandle } from './AdminRightPanel'
import { AdminSidePanelHandle } from './AdminSidePanel'
interface AdminPanelProps {
    isCourseAdmin?: boolean
}

const Adminpanel: React.FC<AdminPanelProps> = ({ isCourseAdmin = false }) => {

    const [selectedUserTab, setSelectedUserTab] = useState<number>(isCourseAdmin ? 2 : 3)
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


    useEffect(() => {
        if (isCourseAdmin) {
            setSelectedUserTab(2)
        }
    }, [isCourseAdmin])
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

    let usersCount = [
        { roleIds: 3, key: "Player User", role: "Players", icon: <Users /> },
        { roleIds: 2, key: "Course Admin", role: "Course Admin", icon: <LandPlot /> },
        { roleIds: 1, key: "Super Admin", role: "Super Admin", icon: <UserCog /> }
    ]
    if (isCourseAdmin) {
        usersCount = []
        usersCount = [{ roleIds: 2, key: "Course Admin", role: "Course Admin", icon: <LandPlot /> }]

    }

    return (
        <>
            <div
                className="flex flex-col bg-fixed bg-[#ffffff] bg-contain md:flex-row min-h-[88vh] bg-no-repeat bg-contain pt-10 bg-admin-bg-position"
                style={{ backgroundImage: `url(${BG})`, height: "max-content" }}
            >
                <div className="flex-1 px-4 md:flex-[0.25] lg:flex-[0.25] xl:flex-[0.25] md:px-10">
                    <AdminSidePanel
                        selectedUserTab={selectedUserTab}
                        setSelectedUserTab={setSelectedUserTab}
                        usersCount={usersCount}
                        ref={adminSidePanelRef}
                        setCurrentPage={setCurrentPage}
                        isCourseAdmin={isCourseAdmin}
                    />
                </div>


                <AdminRightPanel
                    isCourseAdmin={isCourseAdmin}
                    openModal={openModal}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    selectedUserTab={selectedUserTab}
                    handleRefreshUserCount={handleRefreshUserCount}
                    ref={adminRightPanelRef}
                />


            </div>
            <AddAdminModal
                closeModal={closeModal}
                userData={userData}
                setIsModalOpen={setIsModalOpen}
                isModalOpen={isModalOpen}
                handleRefreshUserCount={handleRefreshUserCount}
                refreashUserData={() => adminRightPanelRef?.current?.getUserData()}
                selectedUserTab={selectedUserTab}
            />
        </>
    );
};
export default Adminpanel;
