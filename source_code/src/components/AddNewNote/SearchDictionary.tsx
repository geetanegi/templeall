import React, { useState } from 'react';
import Button from '../Generics/Button';
import search from '../../assets/img/search.svg';
import CrossIcon from '../../assets/img/CrossIcon.svg';
import { useSelector, useDispatch } from 'react-redux';
import {
    getActiveAsync,
    savingSearchData,
} from '../../redux/slice/MineSlice/getMine';
export const SearchDictionary: React.FC = () => {
    const [searchData, setSearchData] = useState<string>('');
    const [changeIcon, setChangeIcon] = useState(false);
    const getMineData = useSelector(({ getMine }: any) => getMine);
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const appointment = useSelector((state: any) => state?.appointment?.value);
    const provider = useSelector((state: any) => state.scheduling?.provider);

    const dispatch = useDispatch<any>();
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchData(e.target.value);
        dispatch(savingSearchData({ searchValue1: e.target.value }));
    };
    const handleSearchApiCall = (): void => {
        setChangeIcon(true);
        const data = {
            heading: '',
            authorizationCodeId: '',
            roleId: userPermission?.userRoles?.data?.roleId,
            type: getMineData?.tab,
            assignedTo: userPermission?.value?.data?.userId,
            pagination: { startIndex: 0, noOfRecords: 19 },
            order: '',
            name: '',
            filterValue: searchData.trim(),
            appointmentWith: '1',
            publishStatus: 'Published',
            serviceProviderId:
                provider || appointment?.primaryProvider?.id || '',
        };
        // Switch statement to dispatch API calls based on tab
        dispatch(getActiveAsync(data));
    };
    const handleClearApiCall = (): void => {
        setSearchData('');
        setChangeIcon(false);
        const data = {
            authorizationCodeId: '',
            heading: '',
            roleId: userPermission?.userRoles?.data?.roleId,
            type: getMineData?.tab,
            assignedTo: userPermission?.value?.data?.userId,
            pagination: { startIndex: 0, noOfRecords: 19 },
            order: '',
            name: '',
            filterValue: '',
            appointmentWith: '1',
            publishStatus: 'Published',
            serviceProviderId:
                provider || appointment?.primaryProvider?.id || '',
        };
        dispatch(savingSearchData({ searchValue1: '' }));
        // Switch statement to dispatch API calls based on tab
        dispatch(getActiveAsync(data));
    };
    const onEnterHandle = (e: React.KeyboardEvent<HTMLInputElement>): any => {
        if (e.key === 'Enter') {
            handleSearchApiCall();
        }
    };
    return (
        <>
            <div className="">
                <div className="title flex justify-between">
                    <div className="searchAndFilter flex justify-center items-center text-center ">
                        <div className="searchBar shadow-xl flex w-[30rem] h-[2.5rem] rounded-full">
                            <input
                                className="outline-none border-none w-[26rem] rounded-full pl-5"
                                type="text"
                                value={searchData}
                                placeholder="Search"
                                onChange={handleSearch}
                                onKeyDown={onEnterHandle}
                            />
                            {changeIcon ? (
                                <Button
                                    type={''}
                                    className={'ml-5'}
                                    onClick={handleClearApiCall}
                                >
                                    <img
                                        className="w-7"
                                        src={CrossIcon}
                                        alt="Clear search"
                                    />
                                </Button>
                            ) : (
                                <Button
                                    type={''}
                                    className={'ml-5'}
                                    onClick={handleSearchApiCall}
                                >
                                    <img
                                        className="w-7"
                                        src={search}
                                        alt="Search"
                                    />
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
