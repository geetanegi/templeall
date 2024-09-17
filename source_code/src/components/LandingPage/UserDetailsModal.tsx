import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../Generics/Modal';
import {
    getUserDetailsCall,
    getUserDetailsPermissionCall,
} from '../../redux/slice/userDetails/userDetailsSlice';

export default function UserDetailsModal({
    open,
    onClose,
    userValue,
}: {
    readonly open: boolean;
    readonly onClose: any;
    readonly userValue: any;
}): React.JSX.Element {
    const dispatch = useDispatch<any>();

    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const userDetailData = useSelector(
        ({ userDetails }: any) => userDetails?.value?.data
    );

    useEffect(() => {
        const payload = {
            profileUserId: userValue?.id || '',
            profileOrgId: '1',
        };
        dispatch(getUserDetailsCall(payload));
        dispatch(getUserDetailsPermissionCall(payload));
    }, [
        dispatch,
        userPermission?.orgId,
        userPermission?.value?.data?.orgId,
        userPermission?.value?.data?.userId,
    ]);
    const address = `
    ${userDetailData?.primaryAddress1 ?? ''}
    ${userDetailData?.primaryAddress2 ?? ''}
    ${userDetailData?.personalCity ?? ''}
    ${userDetailData?.personalState ?? ''}
    ${userDetailData?.personaPostalCode ?? ''}
`.trim();
    const mailingAddress = `
    ${userDetailData?.mailingAddress1 ?? ''}
    ${userDetailData?.mailingAddress2 ?? ''}
    ${userDetailData?.workCity ?? ''}
    ${userDetailData?.workState ?? ''}
    ${userDetailData?.workPostalCode ?? ''}
`.trim();

    const targetData = [
        {
            label: 'Legal Name',
            value:
                userDetailData?.userId?.firstName +
                    ' ' +
                    userDetailData?.userId?.lastName || '',
        },
        { label: 'Employee ID', value: userDetailData?.userId?.id || '' },
        { label: 'Role', value: userDetailData?.userId?.roleName || '' },
        { label: 'Gender', value: userDetailData?.gender || '' },
        {
            label: 'Email',
            value: userDetailData?.userId?.username || '',
        },
        { label: 'Work Contact', value: userDetailData?.workPhone || '' },
        // { label: 'Minimum Trial', value: targetDetails?.minTrials },
        {
            label: 'Cell Contact',
            value: userDetailData?.cellPhone || '',
        },
        {
            label: 'Home Contact',
            value: userDetailData?.homePhone || '',
        },
        {
            label: 'Primary Address',
            value: address,
        },
        {
            label: 'Mailing Address',
            value: mailingAddress,
        },
    ];
    return (
        <Modal open={open} id={''} expandModal={false}>
            <span className="text-right mr-5 mt-5" onClick={onClose}>
                X
            </span>
            <div className="body p-5 flex">
                <div className="md:px-2 w-[30rem]">
                    {targetData?.map((item, index) => {
                        return (
                            <div
                                className="flex space-x-2 items-baseline mb-2"
                                key={index}
                            >
                                <label className="text-medium font-medium text-[#394148]">
                                    {`${item?.label}: `}
                                </label>
                                <label className="text-medium font-light text-gray-500">
                                    {item?.value}
                                </label>
                            </div>
                        );
                    })}
                </div>
                <div className="img w-30">
                    <img src={userDetailData?.imageData} alt="imageData" />
                </div>
            </div>
        </Modal>
    );
}
