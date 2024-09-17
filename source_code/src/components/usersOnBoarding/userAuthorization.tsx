import * as React from 'react';
import authorizationIcon from '../../assets/img/authorizations.svg';
import deleteIcon from '../../assets/img/GridIcons/delete.svg';
import view from '../../assets/img/GridIcons/view.svg';
import edit from '../../assets/img/GridIcons/edit.svg';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';
import ConfirmationModal from '../Generics/ConfirmationModal';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAuthorizationByIdCall,
    getAuthorizationCall,
    setOnView,
} from '../../redux/slice/Authorizations/authorization';
import getAuthorizationAPI from '../../api/services/Authorizations/getAuthorization.service';
import { openNotification } from '../../redux/slice/Notification/notifications';
import AddAuthorization from './AddAuthorization';
import { AppDispatch, IRootState } from '../../redux/store';
interface RootState {
    getEmployeeById: { value: { userId: string } };
    authorization: { value: { data: { id: number }[] } };
    insurance: { clientId: { id: number } };
}
export default function UserAuthorization(): React.JSX.Element {
    const dispatch = useDispatch<AppDispatch>();
    const id = useSelector(({ insurance }: RootState) => insurance?.clientId);
    const userId = useSelector(
        ({ getEmployeeById }: RootState) => getEmployeeById?.value?.userId
    );
    const authorizations = useSelector(
        ({ authorization }: any) => authorization?.value?.data
    );
    const modeView = useSelector(
        ({ authorization }: IRootState) => authorization?.view
    );
    const modeEdit = useSelector(
        ({ authorization }: IRootState) => authorization?.edit
    );
    const userData = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const clientUserId = userData?.value?.data?.userId || userData?.userId;
    const permission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const isClient =
        permission?.userRoles?.data?.primaryRoleName === 'Client'
            ? true
            : false;
    const [openAuthorizationModal, setOpenAuthorizationModal] =
        React.useState(false);
    const [openConfirmationModalForDelete, setOpenConfirmationModalForDelete] =
        React.useState(false);
    const [deleteId, setDeleteId] = React.useState(false);
    const deleteAuthorizationData = async (): Promise<any> => {
        const payload = {
            id: deleteId,
        };
        const data = {
            clientId: id?.id || userId || '',
        };
        const res = await getAuthorizationAPI.deleteAuthorization(payload);
        if (!res?.data?.error) {
            setOpenConfirmationModalForDelete(false);
            setTimeout(() => {
                dispatch(
                    openNotification({
                        success: true,
                        title: 'Authorization deleted successfully',
                        description: '',
                    })
                );
            }, 800);
            dispatch(getAuthorizationCall(data));
            return res?.data;
        } else {
            return 'error';
        }
    };
    const onClickEdit = (item: any): any => {
        const data = {
            id: item?.id,
        };
        dispatch(getAuthorizationByIdCall(data));
        setOpenAuthorizationModal(true);
    };
    const onClickView = (item: any): any => {
        const data = {
            id: item?.id,
        };
        dispatch(getAuthorizationByIdCall(data));
        setOpenAuthorizationModal(true);
        dispatch(setOnView(true));
    };
    React.useEffect(() => {
        const data = {
            clientId: id?.id || userId || clientUserId || '',
        };
        dispatch(getAuthorizationCall(data));
    }, []);
    return (
        <>
            <div className="w-full " data-testid="user-authorization-page">
                <div className="my-10">
                    <div className="flex flex-col space-y-1">
                        <div className="flex space-x-1">
                            <img src={authorizationIcon}></img>
                            <label className="text-lg font-semibold">
                                Authorizations
                            </label>
                        </div>
                        <div className="flex items-center relative">
                            <div className="bg-gradient-to-r from-[#48ABCA] from-0% to-transparent w-4/5 h-[0.2rem] rounded-md"></div>
                            <button
                                type="button"
                                disabled={modeView || isClient}
                                className={`absolute end-0 bg-theme-lightBlue1 py-2 shadow-md text-white w-1/5 rounded-md text-[12.9px] disabled:pointer-events-none disabled:bg-secondary-100`}
                                id="fill-and-justify-item-1"
                                data-hs-tab="#fill-and-justify-1"
                                aria-controls="fill-and-justify-1"
                                onClick={() => {
                                    setOpenAuthorizationModal(true);
                                }}
                            >
                                {'+ Add New Authorization'}
                            </button>
                        </div>
                    </div>
                    <div className="overflow-y-scroll h-[99vh]">
                        <div className="my-8">
                            {authorizations?.map(
                                (itemCard: any, indexCard: any) => {
                                    return (
                                        <div
                                            className="border shadow-lg p-4 mt-3 mb-6 rounded-md"
                                            key={indexCard}
                                        >
                                            <div className="flex flex-col space-y-2">
                                                <div className="flex justify-between">
                                                    <div className="flex space-x-7">
                                                        <div className="flex space-x-1">
                                                            <label className="text-sm font-semibold">
                                                                {`Payor:`}
                                                            </label>
                                                            <label className="text-sm font-light">
                                                                {
                                                                    itemCard
                                                                        ?.payor
                                                                        ?.name
                                                                }
                                                            </label>
                                                        </div>
                                                        <div className="flex space-x-3">
                                                            <label className="text-sm font-semibold">
                                                                {`Valid From:`}
                                                            </label>
                                                            <label className="text-sm font-light">
                                                                {
                                                                    itemCard?.validFrom
                                                                }
                                                            </label>
                                                        </div>
                                                        <div className="flex space-x-4">
                                                            <label className="text-sm font-semibold">
                                                                {`Valid To:`}
                                                            </label>
                                                            <label className="text-sm font-light">
                                                                {
                                                                    itemCard?.validTo
                                                                }
                                                            </label>
                                                        </div>
                                                        <div className="flex space-x-4">
                                                            <label className="text-sm font-semibold">
                                                                {`Child Name:`}
                                                            </label>
                                                            <label className="text-sm font-light">
                                                                {`${itemCard?.child?.firstName} ${itemCard?.child?.lastName}`}
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="flex space-x-6">
                                                        {!modeEdit && (
                                                            <div
                                                                className="flex  items-center space-x-1 cursor-pointer"
                                                                onClick={() => {
                                                                    onClickView(
                                                                        itemCard
                                                                    );
                                                                }}
                                                            >
                                                                <img
                                                                    src={view}
                                                                    alt="view"
                                                                />
                                                                <label className="text-sm font-medium">
                                                                    View
                                                                </label>
                                                            </div>
                                                        )}

                                                        {!modeView &&
                                                            !isClient && (
                                                                <div
                                                                    className={
                                                                        "cursor-pointer' flex  items-center space-x-1 "
                                                                    }
                                                                    onClick={() => {
                                                                        onClickEdit(
                                                                            itemCard
                                                                        );
                                                                    }}
                                                                >
                                                                    <img
                                                                        src={
                                                                            edit
                                                                        }
                                                                        alt="edit"
                                                                    />
                                                                    <label className="text-sm font-medium">
                                                                        Edit
                                                                    </label>
                                                                </div>
                                                            )}
                                                        {!modeView &&
                                                            !isClient && (
                                                                <div
                                                                    className={`${itemCard?.billedAuthorization ? 'pointer-events-none' : 'cursor-pointer'} flex items-center space-x-1 `}
                                                                    onClick={() => {
                                                                        setOpenConfirmationModalForDelete(
                                                                            true
                                                                        );
                                                                        setDeleteId(
                                                                            itemCard.id
                                                                        );
                                                                    }}
                                                                >
                                                                    <img
                                                                        src={
                                                                            deleteIcon
                                                                        }
                                                                        alt="delete"
                                                                        className={`${itemCard?.billedAuthorization ? 'cursor-not-allowed opacity-[0.5]' : 'cursor-pointer'}`}
                                                                    ></img>
                                                                    <label
                                                                        className={`${itemCard?.billedAuthorization ? 'opacity-[0.5]' : ''} text-sm font-medium `}
                                                                    >
                                                                        Delete
                                                                    </label>
                                                                </div>
                                                            )}
                                                    </div>
                                                </div>
                                                <div className="bg-gradient-to-r from-gray-300 from-70% to-transparent w-full h-[0.2rem]"></div>
                                            </div>
                                            <div className="flex space-x-4 mt-5 mb-3">
                                                <label className="text-sm font-semibold space-x-2">
                                                    Code
                                                </label>
                                                <label className="text-sm font-semibold space-x-2">
                                                    Description
                                                </label>
                                            </div>
                                            <div className="space-y-2">
                                                <div key={authorizations.id}>
                                                    {itemCard?.authorizationCodes?.map(
                                                        (codeItem: any) => (
                                                            <div
                                                                className="flex space-x-4"
                                                                key={
                                                                    codeItem.id
                                                                }
                                                            >
                                                                <label className="text-sm font-light">
                                                                    {
                                                                        codeItem.code
                                                                    }
                                                                </label>
                                                                <label className="text-sm font-light">
                                                                    {
                                                                        codeItem.description
                                                                    }
                                                                </label>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    </div>
                </div>
                <div className="text-end">
                    <Link to={ROUTES.addUser}>
                        <button
                            type="button"
                            className="py-2 px-8 w-[110px] border border-gray-800 inline-flex items-center gap-x-2 text-sm font-medium rounded-md bg-transparent text-gray-800 shadow-sm hover:bg-theme-lightBlue1 hover:border-theme-lightBlue1 hover:text-white disabled:opacity-50 disabled:pointer-events-none"
                            data-hs-overlay="#hs-slide-down-animation-modal"
                        >
                            Cancel
                        </button>
                    </Link>
                </div>
            </div>
            {openConfirmationModalForDelete && (
                <ConfirmationModal
                    header={'Delete Authorization'}
                    title={
                        'Are you sure you want to delete this authorized group of billing codes?'
                    }
                    open={openConfirmationModalForDelete}
                    onClose={() => setOpenConfirmationModalForDelete(false)}
                    handleStop={deleteAuthorizationData}
                />
            )}
            {openAuthorizationModal && (
                <AddAuthorization
                    open={openAuthorizationModal}
                    onClose={() => {
                        setOpenAuthorizationModal(false);
                    }}
                    modeView={modeView}
                />
            )}
        </>
    );
}
