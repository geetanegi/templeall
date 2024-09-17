/* eslint-disable max-lines */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import domainIcon from '../../../assets/img/domain.svg';
import goalIcon from '../../../assets/img/goal.svg';
import arrowIcon from '../../../assets/img/arrow.svg';
import ClientDoc from '../../../assets/img/document.svg';
import deleteIcon from '../../../assets/img/delete.svg';
import { Link, useParams } from 'react-router-dom';
import {
    getAllInterventionPlanDomainByInterventionId,
    getAllInterventionPlanLongTermByDomainId,
    getAllInterventionPlanShortTermLongTermById,
    getInterventionPlanDomainById,
    getInterventionPlanLongTermById,
    getInterventionPlanShortTermById,
    setActiveDomainIdIntervention,
    setActiveLongTermId,
    setActiveShortTermId,
    toggleExpandedDomain,
    toggleExpandedLongTerm,
} from '../../../redux/slice/InterventionAll/InterventionSlice';
import RenameComponent from '../Rename/RenameEntities';
import ConfirmationModal from '../../Generics/ConfirmationModal';
import { openNotification } from '../../../redux/slice/Notification/notifications';
import InterventionDataById from '../../../api/services/Intervention/Service/InterventionDataById.service';
interface InterventionProps {
    interventionData: any;
}
interface InterventionTree {
    shortTermStatus: any;
    id: string | number | any;
    name: string;
}
const Tree: React.FC<InterventionProps> = ({ interventionData }) => {
    const isViewMode = window.location.href.includes('view');
    const dispatch = useDispatch<any>();
    const params = useParams<{
        id: string;
        interventionId: string;
        domainId: string;
        longTermGoalId: string;
        shortTermGoalId: string;
    }>();
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
    const phaseType = useSelector(
        ({ interventionSlice }: any) => interventionSlice?.phaseType
    );
    useEffect(() => {
        if (renameDomainId !== null) {
            dispatch(getInterventionPlanDomainById({ id: renameDomainId }));
        }
        if (renameLongTerm !== null) {
            dispatch(getInterventionPlanLongTermById({ id: renameLongTerm }));
        }
        if (renameShortTerm !== null) {
            dispatch(getInterventionPlanShortTermById({ id: renameShortTerm }));
        }
    }, [renameDomainId, renameLongTerm, renameShortTerm, dispatch]);
    const handleDomainClick = (domainId: string | number | null): void => {
        if (domainId !== null) {
            if (renameDomainId !== domainId) {
                dispatch(toggleExpandedDomain(domainId));
                dispatch(setActiveDomainIdIntervention(domainId));
                dispatch(setActiveLongTermId(null));
            }
            dispatch(
                getAllInterventionPlanLongTermByDomainId({
                    id: domainId,
                    type: phaseType,
                })
            );
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
                getAllInterventionPlanShortTermLongTermById({ id: longTermId })
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
    const renderNoRecordsMessage = (message: string): React.JSX.Element => (
        <div className="no-records-message text-xs flex justify-center items-center p-3">
            {message}
        </div>
    );
    const handleCancelDomain = (id: string | number | null): void => {
        setRenameDomainId(null);
        dispatch(getInterventionPlanDomainById({ id }));
        dispatch(
            getAllInterventionPlanDomainByInterventionId({
                id: params.id ?? params.interventionId,
                type: phaseType,
            })
        );
    };
    const handleCancelLongTerm = (domainId: string | number | null): void => {
        setRenameLongTerm(null);
        dispatch(
            getInterventionPlanLongTermById({ id: params.longTermGoalId })
        );
        dispatch(
            getAllInterventionPlanLongTermByDomainId({
                id: domainId,
                type: phaseType,
            })
        );
    };
    const handleCancelShortTerm = (
        longTermId: string | number | null
    ): void => {
        setRenameShortTerm(null);
        dispatch(
            getInterventionPlanShortTermById({ id: params.shortTermGoalId })
        );
        dispatch(
            getAllInterventionPlanShortTermLongTermById({ id: longTermId })
        );
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
        const res = await InterventionDataById.deleteIntervention(payload);
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
                    getAllInterventionPlanDomainByInterventionId({
                        id: params?.id ?? params.interventionId,
                        type: phaseType,
                    })
                );
            } else if (modalValues?.value === 'Long Term Goal') {
                dispatch(
                    getAllInterventionPlanLongTermByDomainId({
                        id: modalValues?.parentId,
                        type: phaseType,
                    })
                );
            } else if (modalValues?.value === 'Short Term Goal') {
                dispatch(
                    getAllInterventionPlanShortTermLongTermById({
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
    useEffect(() => {
        dispatch(
            getAllInterventionPlanDomainByInterventionId({
                id: params.id ?? params.interventionId,
                type: phaseType,
            })
        );
        dispatch(
            getAllInterventionPlanLongTermByDomainId({
                id: params.domainId,
                type: phaseType,
            })
        );
        dispatch(
            getAllInterventionPlanShortTermLongTermById({
                id: params.longTermGoalId,
            })
        );
    }, [phaseType]);
    return (
        <>
            <div className="treeMain bg-[#F7F7F7] rounded-t-lg w-96 h-screen ml-3">
                <div className="overview rounded-t-lg bg-[#48ABCA] h-10 flex items-center">
                    <Link
                        to={`/interventionLanding/${params?.id ?? params.interventionId}/${isViewMode ? 'view' : ''}`}
                    >
                        <span className="text-base text-white ml-4 cursor-pointer hover:underline">
                            Overview
                        </span>
                    </Link>
                </div>
                <button
                    type="button"
                    className={`block w-full text-left py-2 px-4 border-b-2`}
                >
                    <Link
                        to={`/interventionLanding/${params.id ?? params.interventionId}/${isViewMode ? 'view' : ''}/clientDoc`}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex text-base">
                                <img
                                    className="mr-2"
                                    src={ClientDoc}
                                    alt="Domain Icon"
                                />
                                Client Document
                            </div>
                        </div>
                    </Link>
                </button>
                {interventionData?.allInterventionPlanDomainByInterventionId?.map(
                    (domain: InterventionTree) => (
                        <div key={domain.id} className="overflow-y-auto">
                            <button
                                onDoubleClick={() =>
                                    isViewMode
                                        ? ''
                                        : setRenameDomainId(domain.id)
                                }
                                type="button"
                                onMouseEnter={() => {
                                    handleMouseEnter(domain.id);
                                }}
                                onMouseLeave={() => {
                                    handleMouseEnter(domain.id);
                                }}
                                className={`block w-full text-left py-2 px-4 hover:bg-[#BBBBBB] hover:text-black ${interventionData?.activeDomainId === domain.id ? 'bg-[#BBBBBB] text-black' : ''}`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex text-xs">
                                        {renameDomainId === domain.id ? (
                                            <RenameComponent
                                                onRenameFromTree={true}
                                                onCancel={() =>
                                                    handleCancelDomain(
                                                        domain.id
                                                    )
                                                }
                                                nameValue={domain?.name}
                                                id={domain?.id}
                                                type="DOMAIN"
                                                interventionPlanId={
                                                    interventionData
                                                        ?.interventionPlanById
                                                        ?.id
                                                }
                                            />
                                        ) : (
                                            <>
                                                <img
                                                    className="mr-2"
                                                    src={domainIcon}
                                                    alt="Domain Icon"
                                                />
                                                <Link
                                                    to={`/interventionLanding/${params.id ?? params.interventionId}/${isViewMode ? 'view' : ''}/domain-screen/${domain.id}`}
                                                >
                                                    {domain.name}
                                                </Link>
                                            </>
                                        )}
                                        {onDelete[domain?.id] &&
                                        !domain?.shortTermStatus ? (
                                            <img
                                                src={deleteIcon}
                                                onClick={() =>
                                                    handleDeleteDomain(domain)
                                                }
                                                className={`h-[1.2rem] cursor-pointer ${isViewMode ? 'pointer-events-none' : ''}`}
                                            />
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                    <div>
                                        <img
                                            onClick={() =>
                                                handleDomainClick(domain.id)
                                            }
                                            src={arrowIcon}
                                            alt="arrowIcon"
                                            className={`transform transition-transform duration-300 ${interventionData?.expandedDomains.includes(domain.id) ? '-rotate-90' : 'rotate-0'}`}
                                        />
                                    </div>
                                </div>
                            </button>
                            {interventionData?.expandedDomains.includes(
                                domain.id as string | number
                            ) && (
                                <div>
                                    {(
                                        interventionData
                                            ?.allInterventionPlanLongTermByDomainId[
                                            domain.id || ''
                                        ] || []
                                    ).length === 0
                                        ? renderNoRecordsMessage(
                                              'No long terms found.'
                                          )
                                        : (
                                              interventionData
                                                  ?.allInterventionPlanLongTermByDomainId[
                                                  domain.id || ''
                                              ] || []
                                          ).map(
                                              (longTerm: InterventionTree) => (
                                                  <div key={longTerm.id}>
                                                      <button
                                                          onDoubleClick={() =>
                                                              isViewMode
                                                                  ? ''
                                                                  : setRenameLongTerm(
                                                                        longTerm.id
                                                                    )
                                                          }
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
                                                          type="button"
                                                          className={`block w-full text-left py-2 px-4 hover:bg-[#D9D9D9] hover:text-black ${interventionData?.activeLongTermId === longTerm.id ? 'bg-[#D9D9D9] text-black' : ''}`}
                                                      >
                                                          <div className="flex items-center justify-between">
                                                              <div className="flex text-xs pl-4">
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
                                                                          interventionPlanId={
                                                                              interventionData
                                                                                  ?.interventionPlanById
                                                                                  ?.id
                                                                          }
                                                                      />
                                                                  ) : (
                                                                      <>
                                                                          <img
                                                                              className="mr-2"
                                                                              src={
                                                                                  goalIcon
                                                                              }
                                                                              alt="Goal Icon"
                                                                          />
                                                                          <Link
                                                                              to={`/interventionLanding/${params.id ?? params?.interventionId}/${isViewMode ? 'view' : ''}/domain-screen/${domain.id}/longTermGoal/${longTerm.id}`}
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
                                                                  ] &&
                                                                  !longTerm?.shortTermStatus ? (
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
                                                                          className={`h-[1.2rem] cursor-pointer ${isViewMode ? 'pointer-events-none' : ''}`}
                                                                      />
                                                                  ) : (
                                                                      ''
                                                                  )}
                                                              </div>
                                                              <div>
                                                                  <img
                                                                      onClick={() =>
                                                                          handleLongTermClick(
                                                                              longTerm.id
                                                                          )
                                                                      }
                                                                      src={
                                                                          arrowIcon
                                                                      }
                                                                      alt="arrowIcon"
                                                                      className={`transform cursor-pointer transition-transform duration-300 ${interventionData?.expandedLongTerms.includes(longTerm.id) ? '-rotate-90' : 'rotate-0'}`}
                                                                  />
                                                              </div>
                                                          </div>
                                                      </button>
                                                      {interventionData?.expandedLongTerms.includes(
                                                          longTerm.id as
                                                              | string
                                                              | number
                                                      ) && (
                                                          <div>
                                                              {(
                                                                  interventionData
                                                                      ?.allInterventionPlanShortTermLongTermById[
                                                                      longTerm.id ||
                                                                          ''
                                                                  ] || []
                                                              ).length === 0
                                                                  ? renderNoRecordsMessage(
                                                                        'No short terms found.'
                                                                    )
                                                                  : (
                                                                        interventionData
                                                                            ?.allInterventionPlanShortTermLongTermById[
                                                                            longTerm.id ||
                                                                                ''
                                                                        ] || []
                                                                    ).map(
                                                                        (
                                                                            shortTerm: InterventionTree
                                                                        ) => (
                                                                            <button
                                                                                onDoubleClick={() =>
                                                                                    isViewMode
                                                                                        ? ''
                                                                                        : setRenameShortTerm(
                                                                                              shortTerm.id
                                                                                          )
                                                                                }
                                                                                type="button"
                                                                                key={
                                                                                    shortTerm.id
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
                                                                                className={`block w-full text-left py-2 px-4 hover:bg-[#f0eeee] hover:text-black ${interventionData?.activeShortTermId === shortTerm.id ? 'bg-[#f0eeee] text-black' : ''}`}
                                                                                onClick={() =>
                                                                                    handleShortTermClick(
                                                                                        shortTerm.id
                                                                                    )
                                                                                }
                                                                            >
                                                                                <div
                                                                                    className="flex text-xs pl-10"
                                                                                    onDoubleClick={() =>
                                                                                        isViewMode
                                                                                            ? ''
                                                                                            : setRenameShortTerm(
                                                                                                  shortTerm.id
                                                                                              )
                                                                                    }
                                                                                >
                                                                                    {renameShortTerm ===
                                                                                    shortTerm?.id ? (
                                                                                        <RenameComponent
                                                                                            onRenameFromTree={
                                                                                                true
                                                                                            }
                                                                                            onCancel={() =>
                                                                                                handleCancelShortTerm(
                                                                                                    longTerm?.id
                                                                                                )
                                                                                            }
                                                                                            nameValue={
                                                                                                shortTerm?.name
                                                                                                    ? shortTerm?.name
                                                                                                    : ''
                                                                                            }
                                                                                            id={
                                                                                                shortTerm?.id
                                                                                            }
                                                                                            type="SHORT_TERM_GOAL"
                                                                                            interventionPlanId={
                                                                                                interventionData
                                                                                                    ?.interventionPlanById
                                                                                                    ?.id
                                                                                            }
                                                                                            interventionPlanDomainId={
                                                                                                domain?.id
                                                                                            }
                                                                                            interventionPlanLongTermGoalId={
                                                                                                longTerm?.id
                                                                                            }
                                                                                        />
                                                                                    ) : (
                                                                                        <>
                                                                                            <img
                                                                                                className="mr-2"
                                                                                                src={
                                                                                                    goalIcon
                                                                                                }
                                                                                                alt="Goal Icon"
                                                                                            />
                                                                                            <Link
                                                                                                to={`/interventionLanding/${params.id ?? params?.interventionId}/${isViewMode ? 'view' : ''}/domain-screen/${params?.domainId ?? domain.id}/longTermGoal/${params?.longTermGoalId ?? longTerm.id}/shortTermGoal/${shortTerm.id}`}
                                                                                            >
                                                                                                {
                                                                                                    shortTerm.name
                                                                                                }
                                                                                            </Link>
                                                                                        </>
                                                                                    )}
                                                                                    {onDelete[
                                                                                        shortTerm
                                                                                            .id
                                                                                    ] &&
                                                                                    !shortTerm?.shortTermStatus ? (
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
                                                                                            className={`h-[1.2rem] cursor-pointer ${isViewMode ? 'pointer-events-none' : ''}`}
                                                                                        />
                                                                                    ) : (
                                                                                        ''
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
                    )
                )}
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
