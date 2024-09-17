/* eslint-disable max-lines */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import domainIcon from '../../../assets/img/domain.svg';
import goalIcon from '../../../assets/img/goal.svg';
import arrowIcon from '../../../assets/img/arrow.svg';
import deleteIcon from '../../../assets/img/delete.svg';
import {
    clearLongTermGoal,
    getAllGoalLibraryDomainByGoalLibraryId,
    getAllGoalLibraryLongTermByDomainId,
    getAllGoalLibraryShortTermLongTermById,
    getGoalLibraryDomainById,
    getGoalLibraryLongTermById,
    getGoalLibraryShortTermById,
    setActiveDomainId,
    setActiveLongTermId,
    setActiveShortTermId,
    toggleExpandedDomain,
    toggleExpandedLongTerm,
} from '../../../redux/slice/GoalLibrary/GoalLibraryData';
import Checkbox from '../../Generics/Inputs/Checkbox';
import {
    addItemToConfiguration,
    removeItemFromConfiguration,
} from '../../../redux/slice/addFromGoalLibrary/addFromGoalLibrarySlice';
import RenameComponent from '../Rename/RenameEntities';
import ConfirmationModal from '../../Generics/ConfirmationModal';
import { openNotification } from '../../../redux/slice/Notification/notifications';
import addFromLibraryApis from '../../../api/services/addFromLibrary.service';
interface InterventionProps {
    libraryId: any;
    disableLinks?: boolean;
    addToLibrary?: boolean;
    setOverwriteData?: any;
}
interface InterventionTree {
    id: string | number | any;
    name: string;
}
const Tree: React.FC<InterventionProps> = ({
    libraryId,
    disableLinks,
    addToLibrary,
    setOverwriteData,
}) => {
    const dispatch = useDispatch<any>();
    const params = useParams();
    const [domainsChecked, setDomainsChecked] = useState<any>([]);
    const [longTermGoalChecked, setLongTermGoalChecked] = useState<any>([]);
    const [shortTermGoalChecked, setShortTermGoalChecked] = useState<any>([]);
    const goalLibrarySlice = useSelector(
        (state: any) => state.GoalLibrarySlice
    );
    const goalLibraryId = params.id ?? params?.goalLibraryId ?? '';
    const GoalLibraryData = goalLibrarySlice?.goalLibraryById?.[goalLibraryId];
    const [renameDomainId, setRenameDomainId] = useState<
        string | number | null
    >(null);
    const [renameLongTerm, setRenameLongTerm] = useState<
        string | number | null
    >(null);
    const [renameShortTerm, setRenameShortTerm] = useState<
        string | number | null
    >(null);
    const [onDelete, setOnDelete] = useState<any>({});
    const [openConfirmationModalForDelete, setOpenConfirmationModalForDelete] =
        useState(false);
    const [modalValues, setModalValues] = useState({
        id: '',
        name: '',
        value: '',
        parentId: '',
    });
    const addFromGoalLibrary = useSelector(
        (state: any) => state.addFromGoalLibraries
    );
    const handleDomainClick = (domainID: string | number | null): void => {
        if (domainID !== null) {
            if (renameDomainId !== domainID) {
                dispatch(toggleExpandedDomain(domainID));
                dispatch(setActiveDomainId(domainID));
                dispatch(setActiveLongTermId(null));
            }
            dispatch(getAllGoalLibraryLongTermByDomainId({ id: domainID }));
            dispatch(getGoalLibraryDomainById({ id: domainID }));
            dispatch(clearLongTermGoal());
        }
    };
    const handleLongTermClick = (longTermId: string | number | null): void => {
        if (longTermId !== null) {
            if (renameLongTerm !== longTermId) {
                dispatch(toggleExpandedLongTerm(longTermId));
                dispatch(setActiveLongTermId(longTermId));
                dispatch(setActiveShortTermId(null));
            }
            dispatch(
                getAllGoalLibraryShortTermLongTermById({ id: longTermId })
            );
        }
    };
    const handleShortTermClick = (
        shortTermId: string | number | null
    ): void => {
        if (shortTermId !== null) {
            dispatch(setActiveShortTermId(shortTermId));
        }
    };
    const handleLinkClick = (e: any): void => {
        if (disableLinks) {
            e.preventDefault();
        }
    };
    const renderNoRecordsMessage = (message: string): React.JSX.Element => (
        <div className="no-records-message text-xs flex justify-center items-center p-3">
            {message}
        </div>
    );
    const hasDomainId = params?.domainId || null;
    const hasLongTermId = params?.longTermGoalId || null;
    const getEntityId = (): any => {
        return (
            params?.interventionId ||
            params?.id ||
            params?.domainId ||
            params?.longTermGoalId
        );
    };
    const handleCheckChange = async (
        e: any,
        type: string,
        item: any
    ): Promise<void> => {
        if (e.target.checked) {
            const isDuplicateResponse =
                await addFromLibraryApis.checkDuplicateInGoalLibrary({
                    name: item.name,
                    itemType: type,
                    interventionPlanId: getEntityId(),
                    longTermGoalId:
                        params?.longTermGoalId || item?.longTermGoalId || '',
                    domainId: params?.domainId || item?.domainId || '',
                });
            if (!isDuplicateResponse.data.data.dataExists) {
                dispatch(
                    addItemToConfiguration({
                        data: { ...item, goalLibraryId: libraryId },
                        type,
                    })
                );
            } else {
                setOverwriteData({
                    data: { ...item, goalLibraryId: libraryId },
                    type,
                });
            }
        } else {
            dispatch(
                removeItemFromConfiguration({
                    data: { ...item, goalLibraryId: libraryId },
                    type,
                })
            );
        }
    };
    const isDomainChecked = useCallback(
        (DomainID: any): boolean => domainsChecked.includes(DomainID),
        [domainsChecked]
    );
    const isLongTermChecked = useCallback(
        (longTermGoal: any): boolean => {
            const isParentChecked = isDomainChecked(longTermGoal.domainId);
            return (
                isParentChecked ||
                longTermGoalChecked.includes(longTermGoal.longTermGoalId)
            );
        },
        [isDomainChecked, longTermGoalChecked]
    );
    const isShortTermChecked = useCallback(
        (shortTermGoal: any): boolean => {
            const isParentChecked = isLongTermChecked(shortTermGoal);
            return (
                isParentChecked ||
                shortTermGoalChecked.includes(shortTermGoal.shortTermGoalId)
            );
        },
        [isLongTermChecked, shortTermGoalChecked]
    );
    useEffect(() => {
        const domains = addFromGoalLibrary.value.domains
            .filter((item: any) => item.goalLibraryId === libraryId)
            .map((item: any) => item.domainId);
        const longTermGoals = addFromGoalLibrary.value.longTermGoal
            .filter((item: any) => item.goalLibraryId === libraryId)
            .map((item: any) => item.longTermGoalId);
        const shortTermGoals = addFromGoalLibrary.value.shortTermGoal
            .filter((item: any) => item.goalLibraryId === libraryId)
            .map((item: any) => item.shortTermGoalId);
        setDomainsChecked(domains);
        setLongTermGoalChecked(longTermGoals);
        setShortTermGoalChecked(shortTermGoals);
    }, [addFromGoalLibrary.value, libraryId]);
    const handleCancelDomain = (id: string | number | null): void => {
        setRenameDomainId(null);
        dispatch(getGoalLibraryDomainById({ id }));
        dispatch(
            getAllGoalLibraryDomainByGoalLibraryId({
                id: params?.goalLibraryId ?? params?.id,
            })
        );
    };
    const handleCancelLongTerm = (DomainId: string | number | null): void => {
        setRenameLongTerm(null);
        dispatch(getGoalLibraryLongTermById({ id: params.longTermGoalId }));
        dispatch(getAllGoalLibraryLongTermByDomainId({ id: DomainId }));
    };
    const handleCancelShortTerm = (
        longTermId: string | number | null,
        ShortTermID: string | number | null
    ): void => {
        setRenameShortTerm(null);
        dispatch(getGoalLibraryShortTermById({ id: ShortTermID }));
        dispatch(getAllGoalLibraryShortTermLongTermById({ id: longTermId }));
    };
    const handleMouseEnter = (id: any): any => {
        setOnDelete((prevState: any) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };
    const handleDeleteDomain = (item: any): any => {
        setOpenConfirmationModalForDelete(true);
        setModalValues({
            id: item?.id,
            name: item?.name,
            value: 'Domain',
            parentId: '',
        });
    };
    const handleLongTermGoal = (item: any, parentId: any): any => {
        setOpenConfirmationModalForDelete(true);
        setModalValues({
            id: item?.id,
            name: item?.name,
            value: 'Long Term Goal',
            parentId: parentId,
        });
    };
    const handleShortTermGoal = (item: any, parentId: any): any => {
        setOpenConfirmationModalForDelete(true);
        setModalValues({
            id: item?.id,
            name: item?.name,
            value: 'Short Term Goal',
            parentId: parentId,
        });
    };
    const transformKey = (key: any): any => {
        if (key === 'Long Term Goal') {
            return 'longTermGoal';
        } else if (key === 'Short Term Goal') {
            return 'shortTermGoal';
        } else if (key === 'Domain') {
            return 'domain';
        }
    };
    const handleDeleteCall = async (): Promise<any> => {
        const payload = {
            type: transformKey(modalValues?.value),
            id: modalValues?.id,
        };
        const res = await addFromLibraryApis.deleteGoalLibrary(payload);
        if (!res?.data?.error) {
            setOpenConfirmationModalForDelete(false);
            setTimeout(() => {
                dispatch(
                    openNotification({
                        success: true,
                        title: `${modalValues?.value} deleted successfully`,
                        description: '',
                    })
                );
            }, 800);
            if (modalValues?.value === 'Domain') {
                dispatch(
                    getAllGoalLibraryDomainByGoalLibraryId({
                        id: params?.id ?? params?.goalLibraryId,
                    })
                );
            } else if (modalValues?.value === 'Long Term Goal') {
                dispatch(
                    getAllGoalLibraryLongTermByDomainId({
                        id: modalValues?.parentId,
                    })
                );
            } else if (modalValues?.value === 'Short Term Goal') {
                dispatch(
                    getAllGoalLibraryShortTermLongTermById({
                        id: modalValues?.parentId,
                    })
                );
            }
            return res?.data;
        } else {
            setOpenConfirmationModalForDelete(false);
            setTimeout(() => {
                dispatch(
                    openNotification({
                        success: false,
                        title: `Unable to delete this ${modalValues?.value}`,
                        description: '',
                    })
                );
            }, 800);
        }
    };
    return (
        <>
            <div
                className={`treeMain bg-[#F7F7F7] rounded-t-lg h-screen ${addToLibrary ? 'w-full' : 'w-96  ml-3'}`}
            >
                {!addToLibrary && (
                    <div className="overview rounded-t-lg bg-[#48ABCA] h-10 flex items-center">
                        <Link
                            to={`/GoalLibraryLanding/${params.id ?? params.goalLibraryId}`}
                        >
                            <span className="text-base text-white ml-4 cursor-pointer hover:underline">
                                Overview
                            </span>
                        </Link>
                    </div>
                )}
                <div className="tree overflow-y-auto h-screen">
                    {goalLibrarySlice?.allGoalLibraryDomainByGoalLibraryId?.[
                        goalLibrarySlice?.goalLibraryById?.[libraryId]?.id || ''
                    ]?.map((domain: InterventionTree) => (
                        <div key={domain.id}>
                            <button
                                onDoubleClick={() =>
                                    setRenameDomainId(domain.id)
                                }
                                type="button"
                                className={`block w-full text-left py-2 px-4 hover:bg-[#BBBBBB] hover:text-black ${
                                    goalLibrarySlice?.activeDomainId ===
                                    domain.id
                                        ? 'bg-[#BBBBBB] text-black'
                                        : ''
                                }`}
                                onMouseEnter={() => {
                                    handleMouseEnter(domain.id);
                                }}
                                onMouseLeave={() => {
                                    handleMouseEnter(domain.id);
                                }}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex">
                                        {renameDomainId === domain.id ? (
                                            <RenameComponent
                                                onCancel={() =>
                                                    handleCancelDomain(
                                                        domain.id
                                                    )
                                                }
                                                nameValue={domain?.name}
                                                id={domain?.id}
                                                type="DOMAIN"
                                                interventionLibraryId={
                                                    GoalLibraryData?.id
                                                }
                                                onRenameFromTree={true}
                                            />
                                        ) : (
                                            <>
                                                {addToLibrary &&
                                                    !hasDomainId && (
                                                        <Checkbox
                                                            checked={isDomainChecked(
                                                                domain.id
                                                            )}
                                                            onChange={(
                                                                e: any
                                                            ) =>
                                                                handleCheckChange(
                                                                    e,
                                                                    'domain',
                                                                    {
                                                                        domainId:
                                                                            domain?.id,
                                                                        name: domain.name,
                                                                    }
                                                                )
                                                            }
                                                        />
                                                    )}
                                                <img
                                                    className="mr-2"
                                                    src={domainIcon}
                                                    alt="Domain Icon"
                                                />
                                                <Link
                                                    to={`/GoalLibraryLanding/${params.id ?? params.goalLibraryId}/domain-screen/${domain.id}`}
                                                    onClick={handleLinkClick}
                                                    className="flex text-xs"
                                                >
                                                    {domain.name}
                                                </Link>
                                            </>
                                        )}
                                        {onDelete[domain?.id] ? (
                                            <img
                                                src={deleteIcon}
                                                onClick={() =>
                                                    handleDeleteDomain(domain)
                                                }
                                                className="h-[1.2rem] cursor-pointer"
                                            />
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                    <img
                                        src={arrowIcon}
                                        alt="arrowIcon"
                                        onClick={() =>
                                            handleDomainClick(domain.id)
                                        }
                                        className={`transform transition-transform duration-300 ${goalLibrarySlice?.expandedDomains.includes(domain.id) ? '-rotate-90' : 'rotate-0'}`}
                                    />
                                </div>
                            </button>
                            {goalLibrarySlice?.expandedDomains.includes(
                                domain.id
                            ) && (
                                <div>
                                    {(
                                        goalLibrarySlice
                                            ?.allGoalLibraryLongTermByDomainId[
                                            domain.id || ''
                                        ] || []
                                    ).length === 0
                                        ? renderNoRecordsMessage(
                                              'No long terms found.'
                                          )
                                        : (
                                              goalLibrarySlice
                                                  ?.allGoalLibraryLongTermByDomainId[
                                                  domain.id || ''
                                              ] || []
                                          ).map(
                                              (longTerm: InterventionTree) => (
                                                  <div key={longTerm.id}>
                                                      <button
                                                          onDoubleClick={() =>
                                                              setRenameLongTerm(
                                                                  longTerm.id
                                                              )
                                                          }
                                                          type="button"
                                                          className={`block w-full text-left py-2 px-4 hover:bg-[#D9D9D9] hover:text-black ${
                                                              goalLibrarySlice?.activeLongTermId ===
                                                              longTerm.id
                                                                  ? 'bg-[#D9D9D9] text-black'
                                                                  : ''
                                                          }`}
                                                          onMouseEnter={() => {
                                                              handleMouseEnter(
                                                                  longTerm.id
                                                              );
                                                          }}
                                                          onMouseLeave={() => {
                                                              handleMouseEnter(
                                                                  longTerm.id
                                                              );
                                                          }}
                                                      >
                                                          <div className="flex items-center justify-between">
                                                              <div className="flex">
                                                                  {renameLongTerm ===
                                                                  longTerm?.id ? (
                                                                      <RenameComponent
                                                                          onRenameFromTree={
                                                                              true
                                                                          }
                                                                          onCancel={() =>
                                                                              handleCancelLongTerm(
                                                                                  domain.id
                                                                              )
                                                                          }
                                                                          nameValue={
                                                                              longTerm?.name
                                                                                  ? longTerm?.name
                                                                                  : ''
                                                                          }
                                                                          id={
                                                                              longTerm?.id
                                                                          }
                                                                          type="LONG_TERM_GOAL"
                                                                          interventionPlanDomainId={
                                                                              domain?.id
                                                                          }
                                                                          interventionLibraryId={
                                                                              GoalLibraryData?.id
                                                                          }
                                                                      />
                                                                  ) : (
                                                                      <>
                                                                          {addToLibrary &&
                                                                              !hasLongTermId && (
                                                                                  <Checkbox
                                                                                      checked={isLongTermChecked(
                                                                                          {
                                                                                              domainId:
                                                                                                  domain?.id,
                                                                                              longTermGoalId:
                                                                                                  longTerm.id,
                                                                                          }
                                                                                      )}
                                                                                      onChange={(
                                                                                          e: any
                                                                                      ) =>
                                                                                          handleCheckChange(
                                                                                              e,
                                                                                              'longTermGoal',
                                                                                              {
                                                                                                  domainId:
                                                                                                      domain?.id,
                                                                                                  longTermGoalId:
                                                                                                      longTerm.id,
                                                                                                  name: longTerm.name,
                                                                                              }
                                                                                          )
                                                                                      }
                                                                                  />
                                                                              )}
                                                                          <img
                                                                              className="mr-2"
                                                                              src={
                                                                                  goalIcon
                                                                              }
                                                                              alt="Goal Icon"
                                                                          />
                                                                          <Link
                                                                              to={`/GoalLibraryLanding/${params.id ?? params.goalLibraryId}/domain-screen/${
                                                                                  params.domainId ??
                                                                                  domain.id
                                                                              }/longTermGoal/${longTerm.id}`}
                                                                              onClick={
                                                                                  handleLinkClick
                                                                              }
                                                                              className="flex text-xs pl-4"
                                                                          >
                                                                              {
                                                                                  longTerm.name
                                                                              }
                                                                          </Link>
                                                                      </>
                                                                  )}
                                                                  {onDelete[
                                                                      longTerm
                                                                          ?.id
                                                                  ] ? (
                                                                      <img
                                                                          src={
                                                                              deleteIcon
                                                                          }
                                                                          onClick={() =>
                                                                              handleLongTermGoal(
                                                                                  longTerm,
                                                                                  domain?.id
                                                                              )
                                                                          }
                                                                          className="h-[1.2rem] cursor-pointer"
                                                                      />
                                                                  ) : (
                                                                      ''
                                                                  )}
                                                              </div>
                                                              <img
                                                                  src={
                                                                      arrowIcon
                                                                  }
                                                                  alt="arrowIcon"
                                                                  onClick={() =>
                                                                      handleLongTermClick(
                                                                          longTerm.id
                                                                      )
                                                                  }
                                                                  className={`transform cursor-pointer transition-transform duration-300 ${goalLibrarySlice?.expandedLongTerms.includes(longTerm.id) ? '-rotate-90' : 'rotate-0'}`}
                                                              />
                                                          </div>
                                                      </button>
                                                      {goalLibrarySlice?.expandedLongTerms.includes(
                                                          longTerm.id
                                                      ) && (
                                                          <div>
                                                              {(
                                                                  goalLibrarySlice
                                                                      ?.allGoalLibraryShortTermLongTermById[
                                                                      longTerm.id ||
                                                                          ''
                                                                  ] || []
                                                              ).length === 0
                                                                  ? renderNoRecordsMessage(
                                                                        'No short terms found.'
                                                                    )
                                                                  : (
                                                                        goalLibrarySlice
                                                                            ?.allGoalLibraryShortTermLongTermById[
                                                                            longTerm.id ||
                                                                                ''
                                                                        ] || []
                                                                    ).map(
                                                                        (
                                                                            shortTerm: InterventionTree
                                                                        ) => (
                                                                            <button
                                                                                onDoubleClick={() =>
                                                                                    setRenameShortTerm(
                                                                                        shortTerm.id
                                                                                    )
                                                                                }
                                                                                type="button"
                                                                                key={
                                                                                    shortTerm.id
                                                                                }
                                                                                className={`block w-full text-left py-2 px-4 hover:bg-[#f0eeee] hover:text-black ${
                                                                                    goalLibrarySlice?.activeShortTermId ===
                                                                                    shortTerm.id
                                                                                        ? 'bg-[#f0eeee] text-black'
                                                                                        : ''
                                                                                }`}
                                                                                onClick={() =>
                                                                                    handleShortTermClick(
                                                                                        shortTerm.id
                                                                                    )
                                                                                }
                                                                                onMouseEnter={() => {
                                                                                    handleMouseEnter(
                                                                                        shortTerm.id
                                                                                    );
                                                                                }}
                                                                                onMouseLeave={() => {
                                                                                    handleMouseEnter(
                                                                                        shortTerm.id
                                                                                    );
                                                                                }}
                                                                            >
                                                                                <div className="flex">
                                                                                    {renameShortTerm ===
                                                                                    shortTerm?.id ? (
                                                                                        <RenameComponent
                                                                                            onRenameFromTree={
                                                                                                true
                                                                                            }
                                                                                            onCancel={() =>
                                                                                                handleCancelShortTerm(
                                                                                                    longTerm?.id,
                                                                                                    shortTerm?.id
                                                                                                )
                                                                                            }
                                                                                            nameValue={
                                                                                                shortTerm?.name
                                                                                                    ? shortTerm?.name
                                                                                                    : ''
                                                                                            }
                                                                                            id={
                                                                                                shortTerm.id ||
                                                                                                goalLibrarySlice
                                                                                                    ?.goalLibraryShortTermById
                                                                                                    ?.id
                                                                                            }
                                                                                            type="SHORT_TERM_GOAL"
                                                                                            interventionPlanDomainId={
                                                                                                domain?.id
                                                                                            }
                                                                                            interventionLibraryId={
                                                                                                GoalLibraryData?.id
                                                                                            }
                                                                                            interventionPlanLongTermGoalId={
                                                                                                goalLibrarySlice
                                                                                                    .goalLibraryShortTermById
                                                                                                    ?.interventionPlanLongTermGoalId
                                                                                                    ?.id ??
                                                                                                params.longTermGoalId ??
                                                                                                longTerm.id
                                                                                            }
                                                                                        />
                                                                                    ) : (
                                                                                        <>
                                                                                            {addToLibrary && (
                                                                                                <Checkbox
                                                                                                    checked={isShortTermChecked(
                                                                                                        {
                                                                                                            domainId:
                                                                                                                domain?.id,
                                                                                                            longTermGoalId:
                                                                                                                longTerm.id,
                                                                                                            shortTermGoalId:
                                                                                                                shortTerm.id,
                                                                                                        }
                                                                                                    )}
                                                                                                    onChange={(
                                                                                                        e: any
                                                                                                    ) =>
                                                                                                        handleCheckChange(
                                                                                                            e,
                                                                                                            'shortTermGoal',
                                                                                                            {
                                                                                                                domainId:
                                                                                                                    domain?.id,
                                                                                                                longTermGoalId:
                                                                                                                    longTerm.id,
                                                                                                                shortTermGoalId:
                                                                                                                    shortTerm.id,
                                                                                                                name: shortTerm.name,
                                                                                                            }
                                                                                                        )
                                                                                                    }
                                                                                                />
                                                                                            )}
                                                                                            <div className="flex ml-3">
                                                                                                <img
                                                                                                    className="mr-2"
                                                                                                    src={
                                                                                                        goalIcon
                                                                                                    }
                                                                                                    alt="Goal Icon"
                                                                                                />
                                                                                                <Link
                                                                                                    to={`/GoalLibraryLanding/${
                                                                                                        params.id ??
                                                                                                        params.goalLibraryId
                                                                                                    }/domain-screen/${
                                                                                                        params.domainId ??
                                                                                                        domain.id
                                                                                                    }/longTermGoal/${
                                                                                                        goalLibrarySlice
                                                                                                            .goalLibraryShortTermById
                                                                                                            ?.interventionPlanLongTermGoalId
                                                                                                            ?.id ??
                                                                                                        params.longTermGoalId ??
                                                                                                        longTerm.id
                                                                                                    }/shortTermGoal/${shortTerm.id}`}
                                                                                                    onClick={
                                                                                                        handleLinkClick
                                                                                                    }
                                                                                                    className="flex text-xs ml-3"
                                                                                                >
                                                                                                    {
                                                                                                        shortTerm.name
                                                                                                    }
                                                                                                </Link>
                                                                                                {onDelete[
                                                                                                    shortTerm
                                                                                                        .id
                                                                                                ] ? (
                                                                                                    <img
                                                                                                        src={
                                                                                                            deleteIcon
                                                                                                        }
                                                                                                        onClick={() =>
                                                                                                            handleShortTermGoal(
                                                                                                                shortTerm,
                                                                                                                longTerm?.id
                                                                                                            )
                                                                                                        }
                                                                                                        className="h-[1.2rem] cursor-pointer"
                                                                                                    />
                                                                                                ) : (
                                                                                                    ''
                                                                                                )}
                                                                                            </div>
                                                                                        </>
                                                                                    )}
                                                                                </div>
                                                                            </button>
                                                                        )
                                                                    )}
                                                          </div>
                                                      )}
                                                  </div>
                                              )
                                          )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            {openConfirmationModalForDelete && (
                <ConfirmationModal
                    header={`Delete ${modalValues?.value} `}
                    name={modalValues?.name}
                    title={`Are you sure you want to delete this ${modalValues?.value} ?`}
                    open={openConfirmationModalForDelete}
                    onClose={() => setOpenConfirmationModalForDelete(false)}
                    handleStop={handleDeleteCall}
                />
            )}
        </>
    );
};
export default Tree;
