/* eslint-disable max-lines */
import * as React from 'react';
import Modal, { ModalBody, ModalHeader } from '../../Generics/Modal';
import DomainIcon from '../../../assets/img/DomainIcon1.svg';
import viewTarget from '../../../assets/img/viewTarget.svg';
import energyUsed from '../../../assets/img/energyUsed.svg';
import { useSelector } from 'react-redux';
export default function ViewGoalInterventionModal({
    open,
    onClose,
}: {
    open: boolean;
    onClose: any;
}): React.JSX.Element {
    const GoalData = useSelector(
        (state: any) => state.interventionSlice?.interventionPlanById
    );

    const values = {
        totalDomain: GoalData?.domainCount + GoalData?.domainCountAchieved,
        domainInProgress: GoalData?.domainCount,
        domainMastered: GoalData?.domainCountAchieved,
        totalLongTermGoal:
            GoalData?.longTermGoalCount + GoalData?.longTermGoalCountAchieved,
        LongTermGoalInProgress: GoalData?.longTermGoalCount,
        LongTermGoalMastered: GoalData?.longTermGoalCountAchieved,
        totalShortTermGoal:
            GoalData?.shortTermGoalCount + GoalData?.shortTermGoalCountAchieved,
        ShortTermGoalInProgress: GoalData?.shortTermGoalCount,
        ShortTermGoalMastered: GoalData?.shortTermGoalCountAchieved,
    };

    return (
        <Modal open={open} id={'Goal-View-Summary'} expandModal={false}>
            <ModalHeader
                title={'Goal View Summary'}
                onExpand={undefined}
                icon={false}
                onClose={onClose}
                closeIcon={true}
            />
            <ModalBody expandModal={false}>
                <div className="w-[55rem]">
                    <div className="oneBox flex justify-around items-center py-4">
                        <div className="1stSubPart flex">
                            <img src={DomainIcon} alt="" />
                            <div className="Data">
                                <div className="1stLine">
                                    <span className="pl-2">
                                        Domains Mastered
                                    </span>
                                    <span className=" text-[#48ABCA] pl-3">
                                        {values?.totalDomain
                                            ? (
                                                  (100 *
                                                      values?.domainMastered) /
                                                  values?.totalDomain
                                              ).toFixed(2)
                                            : 0}
                                        {'%'}
                                    </span>
                                </div>
                                <div className="2ndLine pl-3">
                                    <span>{values?.domainMastered}</span>
                                </div>
                            </div>
                        </div>
                        <div className="1stSubPart flex">
                            <img src={DomainIcon} alt="" />
                            <div className="Data ">
                                <div className="1stLine">
                                    <span className="pl-2">
                                        Domains In Progress
                                    </span>
                                    <span className=" text-[#48ABCA]">
                                        <span className=" text-[#48ABCA] pl-3">
                                            {values?.totalDomain
                                                ? (
                                                      (100 *
                                                          values?.domainInProgress) /
                                                      values?.totalDomain
                                                  ).toFixed(2)
                                                : 0}
                                            {'%'}
                                        </span>
                                    </span>
                                </div>
                                <div className="2ndLine pl-3">
                                    <span>{values?.domainInProgress}</span>
                                </div>
                            </div>
                        </div>
                        <div className="1stSubPart flex ps-3">
                            <div className="Data ">
                                <div className="1stLine">
                                    <span>Total </span>
                                </div>
                                <div className="2ndLine pl-1">
                                    <span>{values?.totalDomain}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-[80%] ml-10 items-center justify-center bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem]"></div>
                    <div className="oneBox flex justify-around items-center py-4">
                        <div className="1stSubPart flex pl-4">
                            <img src={energyUsed} alt="" />
                            <div className="Data ">
                                <div className="1stLine">
                                    <span className="">
                                        Long Term Goals Mastered
                                    </span>
                                    <span className=" text-[#48ABCA] pl-3 ">
                                        {values?.totalLongTermGoal
                                            ? (
                                                  (100 *
                                                      values?.LongTermGoalMastered) /
                                                  values?.totalLongTermGoal
                                              ).toFixed(2)
                                            : 0}
                                        {'%'}
                                    </span>
                                </div>
                                <div className="2ndLine">
                                    <span>{values?.LongTermGoalMastered}</span>
                                </div>
                            </div>
                        </div>
                        <div className="1stSubPart flex ml-2">
                            <img src={energyUsed} alt="" />
                            <div className="Data">
                                <div className="1stLine">
                                    <span className="">
                                        Long Term Goals In Progress
                                    </span>
                                    <span className=" text-[#48ABCA] pl-3">
                                        {values?.totalLongTermGoal
                                            ? (
                                                  (100 *
                                                      values?.LongTermGoalInProgress) /
                                                  values?.totalLongTermGoal
                                              ).toFixed(2)
                                            : 0}
                                        {'%'}
                                    </span>
                                </div>
                                <div className="2ndLine">
                                    <span>
                                        {values?.LongTermGoalInProgress}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="1stSubPart flex ">
                            <div className="Data">
                                <div className="1stLine">
                                    <span className="pr-4">Total</span>
                                </div>
                                <div className="2ndLine">
                                    <span>{values?.totalLongTermGoal}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-[80%] ml-10 items-center justify-center bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem]"></div>
                    <div className="oneBox flex justify-around items-center py-4">
                        <div className="1stSubPart flex pl-4">
                            <img src={viewTarget} alt="" />
                            <div className="Data">
                                <div className="1stLine">
                                    <span className="pl-2">
                                        Short Term Goals Mastered
                                    </span>
                                    <span className=" text-[#48ABCA] pl-3">
                                        {values?.totalShortTermGoal
                                            ? (
                                                  (100 *
                                                      values?.ShortTermGoalMastered) /
                                                  values?.totalShortTermGoal
                                              ).toFixed(2)
                                            : 0}
                                        {'%'}
                                    </span>
                                </div>
                                <div className="2ndLine pl-3">
                                    <span>{values?.ShortTermGoalMastered}</span>
                                </div>
                            </div>
                        </div>
                        <div className="1stSubPart flex ps-2">
                            <img src={viewTarget} alt="" />
                            <div className="Data ">
                                <div className="1stLine">
                                    <span className="pl-2">
                                        Short Term Goals In Progress{' '}
                                    </span>
                                    <span className="text-[#48ABCA] pl-3">
                                        {values?.totalShortTermGoal
                                            ? (
                                                  (100 *
                                                      values?.ShortTermGoalInProgress) /
                                                  values?.totalShortTermGoal
                                              ).toFixed(2)
                                            : 0}
                                        {'%'}
                                    </span>
                                </div>
                                <div className="2ndLine pl-3">
                                    <span>
                                        {values?.ShortTermGoalInProgress}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="1stSubPart flex">
                            <div className="Data">
                                <div className="1stLine pr-4">
                                    <span>Total</span>
                                </div>
                                <div className="2ndLine pl-1">
                                    <span>{values?.totalShortTermGoal}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    );
}
