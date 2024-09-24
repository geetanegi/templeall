import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { setLoading } from '../../../reducers/loader/loader';
import apiService from '../../../services/apiService';
import { API_URL } from '../../../services/enums';
import { useDispatch } from 'react-redux';
import { ToastError } from '../../Toast';
import PlayerCard from './PlayerCard';

interface CommunitySearchComponentProps {
    selectedUser: string | number;
    setSelectedUser: (userid: string | number) => void
}

const CommunitySearchComponent: React.FC<CommunitySearchComponentProps> = ({ selectedUser, setSelectedUser }) => {

    const dispatch = useDispatch();
    const [searchString, setSearchString] = useState<string>('')
    const [playersList, setPlayerList] = useState<any>()

    const getPlayer = async () => {
        dispatch(setLoading(true));
        setPlayerList([])
        try {
            const payload = {
                "username": searchString,
                "firstName": searchString,
                "lastName": searchString,
                "email": searchString
            }
            const { data, status } = await apiService.post<any>(
                API_URL.searchPlayer,
                { data: { searchParams: payload } },
            );
            if (status === 200 && data?.data != null && !data?.error) {

                setPlayerList(data?.data?.content || [])
            } else if (data?.error && data.description) {
                setSelectedUser("")
                ToastError(data.description);
            }
        } catch (error) {
            ToastError("Something went wrong");
        } finally {
            dispatch(setLoading(false));
        }
        if (!searchString) {
            setSelectedUser("")
        }
    };


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchString(value)
    }
    const scrollbarStyles: React.CSSProperties = {
        overflow: 'auto',  // Enable scrolling
        scrollbarWidth: 'none', // Firefox
        msOverflowStyle: 'none', // IE and Edge
    };

    return (
        <div className='ml-5 h-[90vh] overflow-auto'
            style={scrollbarStyles}
        >
            <div className="flex align-center  mt-5 bg-gray-100 w-full justify-between rounded-md border border-gray-300 py-2 px-4 md:mt-0 md:w-[242px]">
                <input
                    className="pl-2 focus:outline-none bg-gray-100 w-full"
                    type="text"
                    placeholder="Search Player"
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            getPlayer();
                        }
                    }}
                />
                <Search size={20} color="gray" className='cursor-pointer' onClick={getPlayer} />
            </div>
            <div className='text-[20px] tracking-wide font-semibold my-3'>Community</div>
            <div>
                {
                    playersList?.map((profile: any) => (
                        <PlayerCard
                            profile={profile}
                            isSelected={selectedUser == profile.id}
                            setSelectedUser={setSelectedUser}
                        />
                    ))
                }
            </div>

        </div>
    )
}



export default CommunitySearchComponent
