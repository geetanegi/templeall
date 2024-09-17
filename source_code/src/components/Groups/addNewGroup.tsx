/* eslint-disable max-lines */
import React, { useEffect, useRef } from 'react';
import Input from '../Generics/Inputs/Input';
import { Field, Formik, FormikErrors } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { EmployeeOnboardingFormActionModal } from '../Generics/Modal';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import search from '../../assets/img/search.svg';
import CrossIcon from '../../assets/img/CrossIcon.svg';
import Button from '../Generics/Button';
import groupApi from '../../api/services/Groups/saveGroup.service';
import { openNotification } from '../../redux/slice/Notification/notifications';
import emptyState from '../../assets/img/emptyStateGroup.svg';
import { ROUTES } from '../../constants';
import Delete from '../../assets/img/delete.svg';
import * as Yup from 'yup';
import {
    getAllEmployeeCall,
    savingSelectedName,
    savingSelectedMember,
    deleteMember,
    clearingData,
    getGroupByIdCall,
} from '../../redux/slice/Group/groupSlice';
import {
    descriptionValidation,
    nameValidation,
} from '../../constants/ValidationMessages';
export default function AddNewGroup(): React.JSX.Element {
    const navigate = useNavigate();
    const modeView = window.location.href.includes('view');
    const dispatch = useDispatch<any>();
    const [searchTerm, setSearchTerm] = useState<any>('');
    const [isOpen, setIsOpen] = useState(false);
    const [changeIcon, setChangeIcon] = useState(false);
    const [showError, setShowError] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const params = useParams();
    const names = useSelector(({ groupOfEmployee }: any) => groupOfEmployee);
    const filteredData = names?.Employee?.filter((item: any) =>
        item.firstName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );
    const initialValues: any = {
        name: names?.groupById?.data?.name || '',
        description: names?.groupById?.data?.description || '',
    };
    useEffect(() => {
        const data = {
            groupId: params?.id,
        };
        dispatch(getGroupByIdCall(data));
    }, []);
    useEffect(() => {
        dispatch(getAllEmployeeCall());
        if (names?.groupById?.data) {
            names?.groupById?.data?.groupUser.map((item: any) => {
                dispatch(savingSelectedMember(item));
            });
        }
    }, [dispatch, names?.groupById?.data?.groupUser]);
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent): any => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);
    interface Values {
        name: string;
        description: string;
    }
    const selectedMemberIds =
        names?.selectedMember?.map((member: any) => ({
            id: member.id,
        })) ?? [];
    const handleSubmitForm = async (values: Values): Promise<any> => {
        const payload = {
            ...values,
            groupId: names?.groupById?.data?.id || '',
            groupUser: selectedMemberIds,
        };
        const res = await groupApi.saveGroup(payload);
        if (!res?.data?.error) {
            if (!res?.data?.data?.isDuplicate) {
                if (names?.groupById?.data?.id) {
                    dispatch(
                        openNotification({
                            success: true,
                            title: 'Group details edited successfully.',
                            description: '',
                        })
                    );
                } else {
                    dispatch(
                        openNotification({
                            success: true,
                            title: 'Group created successfully.',
                            description: '',
                        })
                    );
                }
                dispatch(clearingData());
                setTimeout(() => {
                    navigate(ROUTES.groupsGrid);
                }, 3000);
            } else {
                setShowError(true);
                return null;
            }
        }
    };
    const onClose = async (): Promise<any> => {
        navigate(ROUTES.groupsGrid);
        dispatch(clearingData());
    };
    const isSubmitDisabled = (values: Values): boolean => {
        return (
            !values?.name?.trim() ||
            !values?.description?.trim() ||
            !isFormValid
        );
    };
    const handleOptionClick = (item: any): any => {
        dispatch(savingSelectedMember(item));
        dispatch(savingSelectedName(item));
        setSearchTerm('');
        setIsOpen(false);
        setChangeIcon(false);
    };
    const handleSearchApiCall = (): void => {
        setChangeIcon(false);
    };
    const onEnterHandle = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            handleSearchApiCall();
        }
    };
    const handleClearApiCall = (): void => {
        setSearchTerm('');
        setChangeIcon(false);
    };
    const deleteUserName = (index: any): any => {
        dispatch(deleteMember(index));
    };
    const validationSchema = Yup.object().shape({
        name: Yup.string()

            .matches(
                /^[\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{1,150}$/,
                nameValidation
            ),
        description: Yup.string().matches(
            /^[\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{1,400}$/,
            descriptionValidation
        ),
    });
    return (
        <div className="" data-testid="add-new-group-page">
            <div className="mx-8 py-5">
                <h1 className="font-[lato] text-lg font-semibold">
                    {names?.groupById?.data ? 'Edit Group' : 'Create New Group'}
                </h1>
                <div className=" bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem]"></div>
                <Formik
                    onSubmit={handleSubmitForm}
                    initialValues={initialValues}
                    enableReinitialize={true}
                    validationSchema={validationSchema}
                    validateOnChange={true}
                    validateOnBlur={true}
                >
                    {(props: any) => {
                        const {
                            handleSubmit,
                            values,
                            handleChange,
                            setFieldTouched,
                            errors,
                        } = props;
                        function hasErrors(
                            errorVal: FormikErrors<Values>
                        ): boolean {
                            return Object.values(errorVal).some(
                                (error) =>
                                    typeof error === 'string' &&
                                    error.length > 0
                            );
                        }
                        const shouldDisable = hasErrors(errors);
                        return (
                            <form onSubmit={handleSubmit}>
                                <div className="flex my-5 ">
                                    <div className="w-[20rem]">
                                        <Field
                                            className="p-0 border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 bg-transparent
                                          rounded-none focus:ring-transparent disabled:cursor-not-allowed"
                                            label="Name"
                                            autoComplete="off"
                                            autoFocus={true}
                                            isRequired={true}
                                            id="name"
                                            name="name"
                                            data-testid="group-name-input"
                                            component={Input}
                                            value={values.name}
                                            onChange={(
                                                e: React.ChangeEvent<HTMLInputElement>
                                            ) => {
                                                handleChange(e);
                                                setShowError(false);
                                                setIsFormValid(true);
                                                setFieldTouched(
                                                    'name',
                                                    true,
                                                    false
                                                );
                                            }}
                                            placeholder="Group Name"
                                            disabled={modeView}
                                        />
                                        {showError && (
                                            <div className="errorMsg text-red-700 text-xs  my-1 font-[lato]">
                                                Name should be unique
                                            </div>
                                        )}
                                    </div>
                                    <div className="ml-7 w-[20rem] ">
                                        <Field
                                            className="p-0 border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 bg-transparent
                                          rounded-none focus:outline-none focus:ring-transparent disabled:cursor-not-allowed"
                                            label="Description"
                                            autoComplete="off"
                                            isRequired={true}
                                            id="description"
                                            name="description"
                                            component={Input}
                                            value={values.description}
                                            onChange={(
                                                e: React.ChangeEvent<HTMLInputElement>
                                            ) => {
                                                handleChange(e);
                                                setIsFormValid(true);
                                                setFieldTouched(
                                                    'description',
                                                    true,
                                                    false
                                                );
                                            }}
                                            placeholder="Description "
                                            disabled={modeView}
                                            data-testid="group-description-input"
                                        />
                                    </div>
                                </div>
                                <div className="permission bg-white shadow-[0_3px_9px_rgb(0,0,0,0.2)]  h-[28rem] overflow-y-auto [&::-webkit-scrollbar]:w-0.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 rounded-lg my-4 ">
                                    <div className="title flex justify-between mt-3">
                                        <span className="text-xl font-bold mb-3">
                                            <h1 className="font-[lato] text-md mx-6 pt-5 font-semibold">
                                                Users
                                            </h1>
                                            <div className="bg-gradient-to-r w-[53rem] mx-6 from-[#48ABCA] from-0% to-transparent h-[0.2rem]"></div>
                                        </span>
                                        <div className="searchAndFilter m-3">
                                            <div className="searchBar shadow-[0_3px_8px_rgb(0,0,0,0.2)] mr-5  flex w-[30rem] h-[2.5rem] rounded-full">
                                                <input
                                                    type="text"
                                                    className="outline-none focus:outline-none border-none w-[26rem] rounded-full pl-5 "
                                                    placeholder="Search"
                                                    value={searchTerm}
                                                    onChange={(e) => {
                                                        setSearchTerm(
                                                            e.target.value
                                                        );
                                                        setIsOpen(true);
                                                        setChangeIcon(true);
                                                    }}
                                                    disabled={modeView}
                                                    onKeyDown={onEnterHandle}
                                                    data-testid="member-search-input"
                                                />
                                                {changeIcon ? (
                                                    <Button
                                                        type={''}
                                                        disabled={modeView}
                                                        className={
                                                            'ml-5 disabled:pointer-events-none'
                                                        }
                                                        onClick={
                                                            handleClearApiCall
                                                        }
                                                        data-testid="clear-search-data"
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
                                                        disabled={modeView}
                                                        className={
                                                            'ml-5 disabled:pointer-events-none'
                                                        }
                                                        onClick={
                                                            handleSearchApiCall
                                                        }
                                                    >
                                                        <img
                                                            className="w-7 pt-1"
                                                            src={search}
                                                            alt="Search"
                                                        />
                                                    </Button>
                                                )}
                                            </div>
                                            {isOpen && (
                                                <div
                                                    ref={dropdownRef}
                                                    className="flex flex-col mt-1 w-[30rem] max-h-[20rem] border shadow-md bg-white absolute overflow-y-auto [&::-webkit-scrollbar]:w-0.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300"
                                                >
                                                    {filteredData?.map(
                                                        (item: any) => (
                                                            <label
                                                                key={item.value}
                                                                onClick={() => {
                                                                    handleOptionClick(
                                                                        item
                                                                    );
                                                                    setIsFormValid(
                                                                        true
                                                                    );
                                                                }}
                                                                className="text-sm font-md cursor-pointer px-3 py-2 hover:bg-[#5ab3cf] hover:text-white"
                                                            >
                                                                {`${item.firstName} ${item.lastName}`}
                                                            </label>
                                                        )
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {names?.selectedMember?.length ? (
                                        <div className="my-3  mx-6 space-y-2">
                                            {names?.selectedMember?.map(
                                                (item: any, index: any) => {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className="flex justify-between w-[30rem] items-center "
                                                        >
                                                            <div className="flex space-x-2 font-[lato]">
                                                                <label
                                                                    className={`${modeView ? 'text-secondary-300' : ''}`}
                                                                >
                                                                    {`${item?.firstName} ${item?.lastName}`}
                                                                </label>
                                                                <h1 className=" py-1 text-neutral-400 text-xs font-normal font-['Lato'] ">
                                                                    ID :{' '}
                                                                    {item.id}
                                                                </h1>
                                                            </div>
                                                            <div className="flex  space-x-4 items-center">
                                                                <img
                                                                    className={`${modeView ? 'pointer-events-none opacity-15' : 'cursor-pointer'}`}
                                                                    src={Delete}
                                                                    onClick={() => {
                                                                        deleteUserName(
                                                                            item?.id
                                                                        );
                                                                        setIsFormValid(
                                                                            true
                                                                        );
                                                                    }}
                                                                    data-testid="delete-member"
                                                                />
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center mt-10 p-1">
                                            <img src={emptyState} alt="" />
                                        </div>
                                    )}
                                </div>
                                <div className="buttons py-3 float-right ">
                                    <EmployeeOnboardingFormActionModal
                                        handleSubmit={handleSubmit}
                                        onClose={onClose}
                                        isDisabled={
                                            modeView ||
                                            isSubmitDisabled(values) ||
                                            shouldDisable
                                        }
                                    />
                                </div>
                            </form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
}
