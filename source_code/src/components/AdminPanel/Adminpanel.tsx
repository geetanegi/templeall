import React, { useEffect, useRef, useState } from "react";
import AdminSidePanel from "./AdminSidePanel";
import AdminRightPanel from "./AdminRightPanel";
import AddAdminModal from "./AddAdminModal";
// const AddAdminModal = lazy(() => import("./AddAdminModal"));

// lucide imports
import { LandPlot, UserCog, Users } from "lucide-react";

// image imports
import BG from "../../assets/images/dashboardBG.svg";

// define propType
import { AdminRightPanelHandle } from "./AdminRightPanel";
import { AdminSidePanelHandle } from "./AdminSidePanel";
import PageLoader from "../PageLoader";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
interface AdminPanelProps {
  isCourseAdmin?: boolean;
}

const Adminpanel: React.FC<AdminPanelProps> = ({ isCourseAdmin = false }) => {
  const loader = useSelector((state: RootState) => state.loader.isLoading);

  const [selectedUserTab, setSelectedUserTab] = useState<number>(
    isCourseAdmin ? 2 : 3,
  );
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>();

  const adminSidePanelRef = useRef<AdminSidePanelHandle>(null);
  const adminRightPanelRef = useRef<AdminRightPanelHandle>(null);

  const handleRefreshUserCount = () => {
    if (adminSidePanelRef.current) {
      adminSidePanelRef.current.getUserCount(); // Call the method exposed by the child component
    }
  };

  useEffect(() => {
    if (isCourseAdmin) {
      setSelectedUserTab(2);
    }
  }, [isCourseAdmin]);
  const openModal = (userData?: any, roleIds?: number) => {
    if (userData && roleIds) {
      setUserData({ ...userData, roleIds });
    }
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setUserData(null);
    setIsModalOpen(false);
  };

  let usersCount = [
    {
      roleIds: 3,
      key: "Player User",
      role: "Players",
      icon: <Users size={16} />,
    },
    {
      roleIds: 2,
      key: "Course Admin",
      role: "Course Admin",
      icon: <LandPlot size={16} />,
    },
    {
      roleIds: 1,
      key: "Super Admin",
      role: "Super Admin",
      icon: <UserCog size={16} />,
    },
  ];
  if (isCourseAdmin) {
    usersCount = [];
    usersCount = [
      {
        roleIds: 2,
        key: "Course Admin",
        role: "Course Admin",
        icon: <LandPlot size={16} />,
      },
    ];
  }

  return (
    <PageLoader isActive={loader}>
      <>
        <div
          className="bg-admin-bg-position flex min-h-[88vh] flex-col bg-[#ffffff] bg-contain bg-fixed bg-no-repeat pt-10 md:flex-row"
          style={{ backgroundImage: `url(${BG})`, height: "max-content" }}
        >
          <div className="flex-1 px-4 md:flex-[0.25] md:px-10 lg:flex-[0.25] xl:flex-[0.25]">
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
    </PageLoader>
  );
};
export default Adminpanel;
