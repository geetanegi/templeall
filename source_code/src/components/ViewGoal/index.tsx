/* eslint-disable max-lines */
import * as React from 'react';
import Modal, { ModalBody, ModalHeader } from '../Generics/Modal';
import DomainIcon from '../../assets/img/DomainIcon1.svg';
import viewTarget from '../../assets/img/viewTarget.svg';
import energyUsed from '../../assets/img/energyUsed.svg';
import { useSelector } from 'react-redux';
export default function ViewGoalModal({
    open,
    onClose,
}: {
    open: boolean;
    onClose: any;
}): React.JSX.Element {
    const programBookData = useSelector(
        ({ getProgramBookDataById }: any) => getProgramBookDataById?.value?.data
    );
    const values = {
        totalDomain: programBookData?.domainCount,
        domainInProgress:
            programBookData?.domainCount - programBookData?.domainCountAchieved,
        domainMastered: programBookData?.domainCountAchieved,
        totalProgram: programBookData?.programCount,
        programInProgress:
            programBookData?.programCount -
            programBookData?.programCountAchieved,
        programMastered: programBookData?.programCountAchieved,
        totalTarget: programBookData?.targetCount,
        targetInProgress:
            programBookData?.targetCount - programBookData?.targetGoalsCount
                ? programBookData?.targetGoalsCount
                : 0,
        targetMastered: programBookData?.targetGoalsCount
            ? programBookData?.targetGoalsCount
            : 0,
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
                <div className="w-[55rem] my-6">
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
                        <div className="1stSubPart flex ">
                            <div className="Data ">
                                <div className="1stLine">
                                    <span>Total Domains </span>
                                </div>
                                <div className="2ndLine pl-1">
                                    <span>{values?.totalDomain}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-[80%] ml-10 items-center justify-center pl-5 bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem]"></div>
                    <div className="oneBox flex justify-around items-center py-4">
                        <div className="1stSubPart flex">
                            <img src={energyUsed} alt="" />
                            <div className="Data ">
                                <div className="1stLine">
                                    <span className="pl-2">
                                        Program Mastered
                                    </span>
                                    <span className=" text-[#48ABCA] pl-3 ">
                                        {values?.totalProgram
                                            ? (
                                                  (100 *
                                                      values?.programMastered) /
                                                  values?.totalProgram
                                              ).toFixed(2)
                                            : 0}
                                        {'%'}
                                    </span>
                                </div>
                                <div className="2ndLine pl-3">
                                    <span>{values?.programMastered}</span>
                                </div>
                            </div>
                        </div>
                        <div className="1stSubPart flex ml-2">
                            <img src={energyUsed} alt="" />
                            <div className="Data">
                                <div className="1stLine">
                                    <span className="pl-3">
                                        Program In Progress
                                    </span>
                                    <span className=" text-[#48ABCA] pl-3">
                                        {values?.totalProgram
                                            ? (
                                                  (100 *
                                                      values?.programInProgress) /
                                                  values?.totalProgram
                                              ).toFixed(2)
                                            : 0}
                                        {'%'}
                                    </span>
                                </div>
                                <div className="2ndLine pl-3">
                                    <span>{values?.programInProgress}</span>
                                </div>
                            </div>
                        </div>
                        <div className="1stSubPart flex ">
                            <div className="Data">
                                <div className="1stLine">
                                    <span className="pl-2">Total Programs</span>
                                </div>
                                <div className="2ndLine pl-3 ">
                                    <span>{values?.totalProgram}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-[80%] ml-10 items-center justify-center pl-5 bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem]"></div>
                    <div className="oneBox flex justify-around items-center py-4">
                        <div className="1stSubPart flex">
                            <img src={viewTarget} alt="" />
                            <div className="Data">
                                <div className="1stLine">
                                    <span className="pl-2">
                                        Target Mastered
                                    </span>
                                    <span className=" text-[#48ABCA] pl-3">
                                        {values?.totalTarget
                                            ? (
                                                  (100 *
                                                      values?.targetMastered) /
                                                  values?.totalTarget
                                              ).toFixed(2)
                                            : 0}
                                        {'%'}
                                    </span>
                                </div>
                                <div className="2ndLine pl-3">
                                    <span>{values?.targetMastered}</span>
                                </div>
                            </div>
                        </div>
                        <div className="1stSubPart flex">
                            <img src={viewTarget} alt="" />
                            <div className="Data ">
                                <div className="1stLine">
                                    <span className="pl-5">
                                        Target In Progress{' '}
                                    </span>
                                    <span className="text-[#48ABCA] pl-3">
                                        {values?.totalTarget
                                            ? (
                                                  (100 *
                                                      values?.targetInProgress) /
                                                  values?.totalTarget
                                              ).toFixed(2)
                                            : 0}
                                        {'%'}
                                    </span>
                                </div>
                                <div className="2ndLine pl-6">
                                    <span>{values?.targetInProgress}</span>
                                </div>
                            </div>
                        </div>
                        <div className="1stSubPart flex">
                            <div className="Data">
                                <div className="1stLine">
                                    <span>Total Targets</span>
                                </div>
                                <div className="2ndLine pl-1">
                                    <span>{values?.totalTarget}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    );
}
