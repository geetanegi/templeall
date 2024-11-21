import { useEffect, useState, useImperativeHandle, forwardRef } from "react";
import apiService from "../../services/apiService";
import { ToastInfo } from "../Toast";
import { API_URL } from "../../services/enums";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface AdminSidePanelProps {
  selectedUserTab: number;
  setSelectedUserTab: (number: number) => void;
  usersCount: any;
  setCurrentPage: (page: number) => void;
  isCourseAdmin?: boolean;
}

export interface AdminSidePanelHandle {
  getUserCount: (count?:number, searchFlag?:boolean) => void;
}

const AdminSidePanel = forwardRef<AdminSidePanelHandle, AdminSidePanelProps>(
  (
    {
      selectedUserTab,
      setSelectedUserTab,
      usersCount,
      setCurrentPage,
      isCourseAdmin,
    },
    ref,
  ) => {
    const [usersCounts, setUsersCounts] = useState<Array<any>>([]);
    const [updatedCount, setUpdatedCount] = useState<number>(0)
    const [isSearch, setIsSearch] = useState<boolean>(false)
    const userPermisions = useSelector(
      (state: RootState) => state.auth.userPermissions,
    );
    const userInfo = useSelector((state: RootState) => state.auth.userInfo);

    useImperativeHandle(ref, () => ({
      getUserCount,
    }));

    useEffect(() => {
      getUserCount();
    }, []);

    const getUserCount = async (count?:number, searchFlag?:boolean) => {
      if(searchFlag){
        console.log(count, "countcount")
        setUpdatedCount(count || 0)
        setIsSearch(true)
        return
      }
      setIsSearch(false)
      let url = API_URL.getAllCount;
      let payload: Record<string, unknown> = {};
      if (isCourseAdmin && userPermisions.data?.permission["is_course_admin"]) {
        url = API_URL.getCourseAdminByClubId;
        payload = {
          loginUserId:
            typeof userInfo === "object" && "userId" in userInfo
              ? userInfo.userId
              : undefined,
        };
      }
      try {
        const { data, status } = await apiService.post<any>(url, {
          data: payload,
        });
        if (status === 200 && data?.data != null && !data?.error) {
          setUsersCounts(data.data);
        } else if (data?.error && data.description) {
          ToastInfo(data.description);
        }
      } catch (error) {
        console.error(error);
      } finally {
      }
    };
    const handleChangePage = (roleId: number) => {
      setSelectedUserTab(roleId);
      setCurrentPage(0);
    };

        return (
            <div className='flex flex-col rounded-md p-2 bg-[#F3F6F9] '>
                {
                    usersCount.map((itm: any) => (
                        <button
                            key={itm.roleIds}
                            className={`flex items-center justify-between mb-5 px-2 gap-2 rounded-md py-2 tect-[14px] 
                                ${selectedUserTab === itm.roleIds ? 'bg-primaryColor text-white' : 'text-[#7B7887]'}`}
                            onClick={() => handleChangePage(itm.roleIds)}
                        >
                            <div className='flex gap-2 text-[14px]'>{itm.icon} {itm.role}</div>
                            <span className='bg-[#E9ECF1] text-black rounded-2xl w-6 text-sm'>
                                {selectedUserTab === itm.roleIds && isSearch ? updatedCount : usersCounts.length && usersCounts.find((count) => count[itm.key])?.[itm.key]}

                            </span>
                        </button>
                    ))
                }
            </div>
    );
  },
);

export default AdminSidePanel;
