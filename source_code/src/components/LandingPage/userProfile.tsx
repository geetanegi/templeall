import React from 'react';
import { useSelector } from 'react-redux';
import PlaceHolderImage from '../../assets/img/PlaceHolderImage.svg';
import { useParams } from 'react-router-dom';
export default function UserProfile(): React.JSX.Element {
    const params = useParams();
    const isNavigatedUser = params.userId && params.orgId;
    const userPermission = useSelector((state: any) =>
        isNavigatedUser ? state.userDetails : state?.getUserPermission
    );
    const profileData = useSelector((state: any) =>
        isNavigatedUser
            ? state.userDetails?.value?.data
            : state.userProfileData?.value?.data
    );
    return (
        <div className="profile font-[lato] my-14">
            <div className="flex justify-center">
                <img
                    className="h-40 w-40 rounded-full border border-none bg-cover bg-no-repeat bg-center"
                    src={
                        profileData?.imageData
                            ? profileData?.imageData
                            : PlaceHolderImage
                    }
                />
            </div>
            {profileData?.userId?.firstName ? (
                <h1 className="my-8 font-bold text-2xl">
                    {profileData?.userId?.firstName +
                        ' ' +
                        profileData?.userId?.lastName}
                </h1>
            ) : (
                <div
                    className="h-1.5 mx-4 my-5 bg-gradient-to-r
             from-[#F0F0F0]
             to-transparent rounded-full"
                ></div>
            )}

            <div className="flex ml-16">
                <div className="overflow-auto">
                    <table className=" text-wrap">
                        <tbody className=" text-sm">
                            <tr className="hover:bg-gray-100">
                                <td className=" font-base text-right py-1 ">
                                    Legal Name
                                </td>
                                <td className="font-light text-left py-1 px-3">
                                    {profileData?.userId?.firstName ? (
                                        profileData?.userId?.firstName +
                                        ' ' +
                                        profileData?.userId?.lastName
                                    ) : (
                                        <div className="h-1.5 w-36 bg-gradient-to-r from-[#F0F0F0] to-transparent rounded-full"></div>
                                    )}
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-100">
                                {userPermission?.userRoles?.data?.roleName ===
                                'Client' ? (
                                    <td className=" font-base text-right py-1 ">
                                        Client ID
                                    </td>
                                ) : (
                                    <td className=" font-base text-right py-1 ">
                                        Employee ID
                                    </td>
                                )}
                                <td className="font-light text-left py-1 px-3">
                                    {profileData?.userId?.id ? (
                                        profileData?.userId?.id
                                    ) : (
                                        <div className="h-1.5 w-36 bg-gradient-to-r from-[#F0F0F0] to-transparent rounded-full"></div>
                                    )}
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-100 ">
                                <td className=" font-base text-right py-1 ">
                                    Gender
                                </td>
                                <td className="font-light text-left py-1 px-3">
                                    {profileData?.gender ? (
                                        profileData?.gender
                                    ) : (
                                        <div className="h-1.5 w-36 bg-gradient-to-r from-[#F0F0F0] to-transparent rounded-full"></div>
                                    )}
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-100 ">
                                <td className=" font-base text-right py-1 ">
                                    Email
                                </td>
                                <td className="font-light text-left py-1 px-3">
                                    {profileData?.userId?.username ? (
                                        profileData?.userId?.username
                                    ) : (
                                        <div className="h-1.5 w-36 bg-gradient-to-r from-[#F0F0F0] to-transparent rounded-full"></div>
                                    )}
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-100 ">
                                <td className=" font-base text-right py-1 ">
                                    Emergency Contact
                                </td>
                                <td className="font-light text-left py-1 px-3">
                                    {profileData?.cellPhone ? (
                                        profileData?.cellPhone
                                    ) : (
                                        <div className="h-1.5 w-36 bg-gradient-to-r from-[#F0F0F0] to-transparent rounded-full"></div>
                                    )}
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-100 ">
                                <td className=" font-base text-right align-top py-1 ">
                                    Primary Address
                                </td>
                                <td className="font-light text-left py-1 px-3">
                                    {
                                        <>
                                            {profileData?.primaryAddress1
                                                ? profileData?.primaryAddress1
                                                : ''}
                                            {profileData?.primaryAddress2 ? (
                                                <>
                                                    <br />
                                                    {
                                                        profileData?.primaryAddress2
                                                    }
                                                </>
                                            ) : (
                                                ''
                                            )}
                                            <br />
                                            {profileData?.personalCity
                                                ? profileData?.personalCity
                                                : ''}
                                            {' - '}
                                            {profileData?.personaPostalCode
                                                ? profileData?.personaPostalCode
                                                : ''}
                                            <br />
                                            {profileData?.personalState
                                                ? profileData?.personalState
                                                : ''}
                                        </>
                                    }
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-100 ">
                                <td className=" font-base text-right align-top py-1 ">
                                    Mailing Address
                                </td>
                                <td className="font-light text-left py-1 px-3">
                                    {
                                        <>
                                            {profileData?.mailingAddress1
                                                ? profileData?.mailingAddress1
                                                : ''}
                                            {profileData?.mailingAddress2 ? (
                                                <>
                                                    <br />
                                                    {
                                                        profileData?.mailingAddress2
                                                    }
                                                </>
                                            ) : (
                                                ''
                                            )}
                                            <br />
                                            {profileData?.workCity
                                                ? profileData?.workCity
                                                : ''}
                                            {' - '}
                                            {profileData?.workPostalCode
                                                ? profileData?.workPostalCode
                                                : ''}
                                            <br />
                                            {profileData?.workState
                                                ? profileData?.workState
                                                : ''}
                                        </>

                                        // <div className="h-1.5 w-36 bg-gradient-to-r from-[#F0F0F0] to-transparent rounded-full"></div>
                                    }
                                </td>
                            </tr>
                            {userPermission?.userRoles?.data?.roleName ===
                            'Client' ? (
                                <>
                                    <tr className="hover:bg-gray-100 ">
                                        <td className=" font-base text-right align-top py-1 ">
                                            Insurance
                                        </td>
                                        {profileData?.insurances ? (
                                            profileData?.insurances?.map(
                                                (data: any) => (
                                                    <tr key={data.id}>
                                                        <td className="font-light text-left h-auto py-1 px-3">
                                                            {data?.name}
                                                        </td>
                                                    </tr>
                                                )
                                            )
                                        ) : (
                                            <td className="font-light text-left h-auto py-1 px-3">
                                                <div className="h-1.5  w-36 bg-gradient-to-r from-[#F0F0F0] to-transparent rounded-full"></div>
                                            </td>
                                        )}
                                    </tr>

                                    <tr className="hover:bg-gray-100 ">
                                        <td className=" font-base text-right align-top py-1 ">
                                            Services
                                        </td>
                                        {profileData?.services ? (
                                            profileData?.services?.map(
                                                (data: any) => (
                                                    <tr key={data.id}>
                                                        <td className="font-light text-left h-auto py-1 px-3">
                                                            {data?.name}
                                                        </td>
                                                    </tr>
                                                )
                                            )
                                        ) : (
                                            <td className="font-light text-left h-auto py-1 px-3">
                                                <div className="h-1.5  w-36 bg-gradient-to-r from-[#F0F0F0] to-transparent rounded-full"></div>
                                            </td>
                                        )}
                                    </tr>
                                </>
                            ) : null}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
