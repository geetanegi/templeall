import { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import apiService from '../../services/apiService';
import { ToastError } from '../Toast';
import { API_URL } from '../../services/enums';
import { setLoading } from '../../reducers/loader/loader';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';

interface AdminSidePanelProps {
    selectedUserTab: number;
    setSelectedUserTab: (number: number) => void;
    usersCount: any;
    setCurrentPage: (page: number) => void;
    isCourseAdmin?: boolean
}

export interface AdminSidePanelHandle {
    getUserCount: () => void;
}

const AdminSidePanel = forwardRef<AdminSidePanelHandle, AdminSidePanelProps>(
    ({ selectedUserTab, setSelectedUserTab, usersCount, setCurrentPage, isCourseAdmin }, ref) => {
        const [usersCounts, setUsersCounts] = useState<Array<any>>([]);
        const userPermisions = useSelector(
            (state: RootState) => state.auth.userPermissions,
        );
        const userInfo = useSelector((state: RootState) => state.auth.userInfo);


        const dispatch = useDispatch();

        useImperativeHandle(ref, () => ({
            getUserCount
        }));

        useEffect(() => {
            getUserCount();
        }, []);

        const getUserCount = async () => {
            dispatch(setLoading(true));
            let url = API_URL.getAllCount
            let payload: Record<string, unknown> = {};
            if (isCourseAdmin && userPermisions.data?.permission['is_course_admin']) {
                url = API_URL.getCourseAdminByClubId
                payload = {
                    loginUserId: typeof userInfo === 'object' && 'userId' in userInfo ? userInfo.userId : undefined
                };
            }
            try {
                const { data, status } = await apiService.post<any>(
                    url,
                    { data: payload },
                );
                if (status === 200 && data?.data != null && !data?.error) {
                    setUsersCounts(data.data);
                } else if (data?.error && data.description) {
                    ToastError(data.description);
                } 
            } catch (error) {
                ToastError("Something went wrong");
            } finally {
                dispatch(setLoading(false));
            }

        };
        const handleChangePage = (roleId: number) => {
            setSelectedUserTab(roleId)
            setCurrentPage(0)
        }

        return (
            <div className='flex flex-col rounded-md p-2 bg-[#F3F6F9] '>
                {
                    usersCount.map((itm: any) => (
                        <button
                            key={itm.roleIds}
                            className={`flex justify-between mb-5 px-2 gap-2 rounded-md py-2 
                                ${selectedUserTab === itm.roleIds ? 'bg-lime-500 text-white' : 'text-[#7B7887]'}`}
                            onClick={() => handleChangePage(itm.roleIds)}
                        >
                            <div className='flex gap-2'>{itm.icon} {itm.role}</div>
                            <span className='bg-[#E9ECF1] text-black rounded-2xl w-6 text-sm'>
                                {usersCounts.length && usersCounts.find((count) => count[itm.key])?.[itm.key]}
                            </span>
                        </button>
                    ))
                }
            </div>
        );
    }
);

export default AdminSidePanel;
