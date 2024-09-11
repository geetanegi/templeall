import React, { useEffect, useState, useImperativeHandle, forwardRef, Ref } from 'react';
import apiService from '../../services/apiService';
import { ToastError } from '../Toast';
import { API_URL } from '../../services/enums';
import { setLoading } from '../../reducers/loader/loader';
import { useDispatch } from 'react-redux';

interface AdminSidePanelProps {
    selectedUserTab: number;
    setSelectedUserTab: (number: number) => void;
    usersCount: any;
}

export interface AdminSidePanelHandle {
    getUserCount: () => void;
}

const AdminSidePanel = forwardRef<AdminSidePanelHandle, AdminSidePanelProps>(
    ({ selectedUserTab, setSelectedUserTab, usersCount }, ref) => {
        const [usersCounts, setUsersCounts] = useState<Array<any>>([]);

        const dispatch = useDispatch();

        useImperativeHandle(ref, () => ({
            getUserCount
        }));

        useEffect(() => {
            getUserCount();
        }, []);

        const getUserCount = async () => {
            dispatch(setLoading(true));
            try {
                const { data, status } = await apiService.post<any>(
                    API_URL.getAllCount,
                    { data: {} },
                );
                if (status === 200 && data?.data != null && !data?.error) {
                    setUsersCounts(data.data);
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

        return (
            <div className='flex flex-col rounded-md p-2 bg-[#F3F6F9] mt-8'>
                {
                    usersCount.map((itm: any) => (
                        <button 
                            key={itm.roleIds} 
                            className={`flex justify-between mb-5 px-2 gap-2 rounded-md py-2 
                                ${selectedUserTab === itm.roleIds ? 'bg-lime-500 text-white' : 'text-[#7B7887]'}`} 
                            onClick={() => setSelectedUserTab(itm.roleIds)}
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
