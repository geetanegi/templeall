import { Plus, Search } from 'lucide-react';
import React, { useEffect, useState, forwardRef, useImperativeHandle, Ref, ForwardedRef } from 'react';
import TableComponent from '../TableComponent';
import apiService from '../../services/apiService';
import SwitchComponent from '../SwitchComponent';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../reducers/loader/loader';
import { computeTableHeaders } from './AddpanalUtils/AddPanelUtils';
import { RootState } from '../../store';
import PageLoader from '../PageLoader';
import { ToastError, ToastSuccess } from '../Toast';
import { API_URL } from '../../services/enums';

interface AdminRightPanelProps {
    selectedUserTab: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    openModal: (item: any, roleIds: number) => void;
    handleRefreshUserCount: () => void;
}

interface PageSortingParam {
    sortDir: 'ASC' | 'DESC';
    sortBy: string;
    pageNumber?: any;
    pageSize?: any;
}

interface PayloadTypes {
    pageSortingParam?: PageSortingParam;
}

export interface AdminRightPanelHandle {
    getUserData: () => void;
}

const AdminRightPanel = forwardRef<AdminRightPanelHandle, AdminRightPanelProps>(({
    openModal, selectedUserTab, currentPage, setCurrentPage, handleRefreshUserCount
}, ref: ForwardedRef<AdminRightPanelHandle>) => {
    const loader = useSelector((state: RootState) => state.loader.isLoading);

    const [tableHeaders, setTableHeaders] = useState<any>([]);
    const [rowData, setRowData] = useState<Array<any>>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [totalAdminCount, setTotalAdminCount] = useState<any>([]);

    const dispatch = useDispatch();

    useImperativeHandle(ref, () => ({
        getUserData
    }));

    useEffect(() => {
        getUserData();
    }, [selectedUserTab]);

    useEffect(() => {
        if (selectedUserTab === 2 || selectedUserTab === 1) {
            setTotalPages(0);
            const startIndex = currentPage * pageSize;
            const currentItems = totalAdminCount?.slice(startIndex, Number(startIndex) + Number(pageSize)) || [];
            setRowData(computeTableData(currentItems, selectedUserTab));
        }
    }, [pageSize, currentPage, totalAdminCount]);

    const handleAdctiveDeactiveUser = async (value: boolean, userId: any) => {
        dispatch(setLoading(true));
        try {
            let payload = {};
            if (value) {
                payload = {
                    "selectedUserId": userId, "activeStatus": "AC"
                };
            } else {
                payload = {
                    "selectedUserId": userId, "activeStatus": "DE"
                };
            }
            const { data, status } = await apiService.post<any>(
                API_URL.activeInactiveUser,
                { data: payload },
            );
            if (status === 200 && data?.data != null && !data?.error) {
                ToastSuccess(data.data.message);
            } else if (data?.error && data.description) {
                ToastError(data.description);
            } else if (data.description) {
                ToastError(data.description);
            }
        } catch (error) {
            ToastError("Something went wrong");
        }finally{
            dispatch(setLoading(false));
        }
    };

    const computeTableData = (Data: Array<any>, selectedUserTab: number) => {
        const userRole = selectedUserTab === 1 ? "Super Admin" : selectedUserTab === 2 ? "Course Admin" : "Player";
        return Data.map((item) => {
            const activeStatus = (item.activeStatus === "AC");
            return {
                "name": computeUserName(item.firstName, item.lastName, item.imageUrl, userRole),
                "userName": item.username,
                "email": item.email,
                "status": <div className='flex gap-4'>
                    <SwitchComponent isChecked={activeStatus} id={item.id} onChange={(value) => handleAdctiveDeactiveUser(value, item.id)} />
                </div>,
            };
        });
    };

    const getUserData = async () => {
        dispatch(setLoading(true));
        let message = '';
        try {
            let payload: PayloadTypes = {};
            let listingEndPoint = API_URL.getAllPlayer;
            if (selectedUserTab === 3) {
                listingEndPoint = API_URL.getAllPlayer;
                setTableHeaders(computeTableHeaders('player'));
                payload.pageSortingParam = {
                    "sortDir": "ASC",
                    "sortBy": "username",
                    "pageNumber": currentPage,
                    "pageSize": pageSize
                };
            } else if (selectedUserTab === 2) {
                listingEndPoint = API_URL.getAllCourseAdmin;
                setTableHeaders(computeTableHeaders('courseAdmin'));
            } else if (selectedUserTab === 1) {
                listingEndPoint = API_URL.getAllSuperAdmin;
                setTableHeaders(computeTableHeaders('superAdmin'));
            }

            const { data, status } = await apiService.post<any>(
                listingEndPoint,
                { data: payload },
            );

            if (status === 200 && data?.data != null && !data?.error) {
                setTotalPages(data.data.totalPages);
                if (selectedUserTab === 3) {
                    setRowData(computeTableData(data.data.content, selectedUserTab));
                } else {
                    setTotalAdminCount(data.data.content);
                }
                handleRefreshUserCount();
            } else if (data?.error && data.description) {
                ToastError(data.description);
            } else if (data.description) {
                ToastError(data.description);
            }

            message = data.description;

        } catch (error) {
            ToastError("Something went wrong");
        }finally{
            dispatch(setLoading(false));

        }
    };

    const computeUserName = (firstName: string, lastName: string, image: string, role: string) => {
        return (
            <div className='flex'>
                <div className='border rounded-md mr-5 w-10 bg-[#ebf0fa]'>
                    <img src={image} alt="" />
                </div>
                <div className='flex flex-col text-gray-500 text-sm'>
                    <span className='text-lime-500 text-md'>{firstName} {lastName}</span>
                    {role}
                </div>
            </div>
        );
    };

    return (
        <div className="flex-1 md:flex-[0.75] lg:flex-[0.75] xl:flex-[0.75] px-4 md:px-8">
            <div className="flex flex-col md:flex-row justify-between mb-4">
                <div className="flex align-center md:ml-2 mt-5 bg-gray-100 w-full justify-between rounded-md border border-gray-300 py-2 px-4 md:mt-0 md:w-[320px]">
                    <input
                        className="pl-2 focus:outline-none bg-gray-100 w-full"
                        type="text"
                        placeholder="Search Player"
                    />
                    <Search size={20} color="gray" />
                </div>
                <button
                    className="flex mt-4 md:mt-0 bg-lime-500 md:mr-2 px-4 md:px-6 gap-2 rounded-md py-2 text-white"
                    onClick={() => openModal('', 0)}
                >
                    <Plus /> Add User
                </button>
            </div>
            <PageLoader isActive={loader}>
                <TableComponent
                    Headers={tableHeaders}
                    rowData={rowData}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    totalAdminCount={totalAdminCount}
                />
            </PageLoader>
        </div>
    );
});

export default React.memo(AdminRightPanel);
