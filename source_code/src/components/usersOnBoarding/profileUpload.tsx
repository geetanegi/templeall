import * as React from 'react';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlaceHolderImage from '../../assets/img/PlaceHolderImage.svg';
import Upload from '../../assets/img/UploadIcon.svg';
import { savingProfileData } from '../../redux/slice/users/usersSlice';
import user from '../../assets/img/userOnBoarding/user.svg';
import checkMark from '../../assets/img/userOnBoarding/checkMark.svg';
import plus from '../../assets/img/plus.svg';
import exclamation from '../../assets/img/userOnBoarding/exclamation.svg';
import { Link, useParams } from 'react-router-dom';
import { ROUTES } from '../../constants';
import {
    setOnEdit,
    setOnView,
} from '../../redux/slice/Authorizations/authorization';
export default function ProfileUpload(): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const params = useParams<any>();
    const [showProfile, setShowProfile] = useState<any>();
    const employeeData = useSelector(
        ({ getEmployeeById }: any) => getEmployeeById?.value
    );
    const role = useSelector(
        ({ clientInsurance }: any) => clientInsurance?.roleName
    );

    const accountDetails = useSelector(({ userAccount }: any) => userAccount);
    const modeView = window?.location?.href?.includes('view');
    const modeEdit = params?.id;
    const isSubmitted = useSelector(({ users }: any) => users?.isFormSubmitted);
    const authorizations = useSelector(
        ({ authorization }: any) => authorization?.value?.data
    );
    const insuranceData = useSelector(
        ({ insurance }: any) => insurance?.value?.data
    );

    const account = useSelector(({ userAccount }: any) => userAccount);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const getBase64 = async (file: any): Promise<any> => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const baseURL = reader.result;
                resolve(baseURL);
            };
        });
    };
    const handleImageValue = async (e: any): Promise<any> => {
        const file = e;
        setShowProfile(URL.createObjectURL(e));
        getBase64(file)
            .then((result: any) => {
                file['base64'] = result;
                dispatch(savingProfileData(result));
            })
            .catch(() => {});
    };
    const handleRoute = (): any => {
        if (modeView) {
            dispatch(setOnView(true));
        } else if (modeEdit) {
            dispatch(setOnEdit(true));
        }
    };
    return (
        <div className="w-1/4 shadow-[0_3px_8px_rgb(0,0,0,0.2)] rounded-tl-2xl">
            <div className="flex justify-center mt-7">
                {showProfile ? (
                    <img
                        className="h-40 w-40 rounded-full border border-none bg-cover bg-no-repeat bg-center "
                        src={showProfile}
                    />
                ) : employeeData?.imageData ? (
                    <img
                        className="h-40 w-40 rounded-full border border-none bg-cover bg-no-repeat bg-center "
                        src={employeeData?.imageData}
                    />
                ) : account?.userDetails?.imageData ? (
                    <img
                        className="h-40 w-40 rounded-full border border-none bg-cover bg-no-repeat bg-center "
                        src={account?.userDetails?.imageData}
                    />
                ) : (
                    <img
                        className="h-40 w-40 rounded-full border border-none bg-cover bg-no-repeat bg-center "
                        src={PlaceHolderImage}
                    />
                )}
            </div>
            <input
                className="hidden"
                type="file"
                id="profileImage"
                accept="image/*"
                onChange={(e: any) => handleImageValue(e.target.files[0])}
                ref={fileInputRef}
            />
            <div className="flex justify-center ">
                <button
                    type="button"
                    className="inline-flex items-center py-2 bg-white border-none font-[lato] font-medium  text-md text-[#08627E] tracking-widest  "
                    onClick={() => {
                        if (fileInputRef.current) {
                            fileInputRef.current.click();
                        }
                    }}
                >
                    <img src={Upload} className="pr-2" />
                    Upload Picture
                </button>
            </div>
            {(role?.name === 'Client' ||
                employeeData?.roleName === 'Client' ||
                accountDetails?.userDetails?.roleName === 'Client') && (
                <>
                    <div className=" h-[0.1rem] w-[21rem] bg-zinc-300 mx-7 my-3"></div>
                    <div className={`text-center items-center my-2 `}>
                        <Link
                            to={ROUTES.authorization}
                            className={`${isSubmitted || account?.isAccount ? '' : ' text-zinc-500 pointer-events-none'}`}
                        >
                            <div
                                className={`flex justify-center mt-5 ml-2`}
                                onClick={() => handleRoute()}
                            >
                                <img src={user} className="h-[1.3rem] mx-2" />
                                <div className="w-[12.4rem]">
                                    <h1 className="font-[lato] flex">
                                        Authorization Settings
                                        <img
                                            src={
                                                employeeData?.isClientAuthorizationAdded ||
                                                authorizations?.length
                                                    ? checkMark
                                                    : exclamation
                                            }
                                            className="px-1"
                                        />
                                    </h1>
                                    <h1
                                        className={` font-[lato] text-xs text-left`}
                                    >
                                        Add an authorization having at least one
                                        service code
                                    </h1>
                                </div>
                            </div>
                        </Link>
                        <Link
                            to={ROUTES.payor}
                            className={`${isSubmitted || account?.isAccount ? '' : ' text-zinc-500 pointer-events-none'}`}
                        >
                            <div
                                className="flex justify-center mt-8"
                                onClick={() => handleRoute()}
                            >
                                <img src={plus} className=" h-[1.7rem] px-2" />
                                <div className="w-[12.4rem]">
                                    <h1 className="flex font-[lato] ">
                                        Payor Settings{' '}
                                        <img
                                            src={
                                                employeeData?.isUserInsuranceAdded ||
                                                insuranceData?.length
                                                    ? checkMark
                                                    : exclamation
                                            }
                                            className="px-1"
                                        />
                                    </h1>
                                    <h1
                                        className={` font-[lato] text-xs text-left`}
                                    >
                                        Add payor information for this client
                                    </h1>
                                </div>
                            </div>
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}
