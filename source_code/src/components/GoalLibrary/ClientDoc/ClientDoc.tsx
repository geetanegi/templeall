import React, { useEffect, useState } from 'react';
import InterventionHeading from '../Heading/GoalLibraryHeading';
import Tree from '../Tree/Tree';
import MenuTabs from '../MenuTabs/MenuTabs';
import ClientFaceSheet from '../../../assets/img/sessionScreen/ClientFaceSheet.svg';
import plus from '../../../assets/img/plus.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
    getInterventionPlanById,
    getAllInterventionPlanDomainByInterventionId,
} from '../../../redux/slice/InterventionAll/InterventionSlice';
import { useParams } from 'react-router-dom';
import UploadDoc from './UploadDoc';
function ClientDoc(): React.JSX.Element {
    const params = useParams();
    const goalLibrarySlice = useSelector(
        (state: any) => state.interventionSlice
    );
    const phaseType = useSelector(
        ({ interventionSlice }: any) => interventionSlice?.phaseType
    );
    const dispatch = useDispatch<any>();
    const [interventionNewName, setInterventionNewName] = useState(false);
    const handleRenameIntervention = (): void => {
        setInterventionNewName(true);
        dispatch(getInterventionPlanById({ id: params.id }));
    };
    const handleCancel = (): void => {
        setInterventionNewName(false);
        dispatch(getInterventionPlanById({ id: params.id }));
    };
    const handleFaceSheet = (): void => {};
    const menuItems = [
        {
            icon: ClientFaceSheet,
            label: 'Client Facesheet',
            onClick: handleFaceSheet,
        },
    ];
    useEffect(() => {
        dispatch(getInterventionPlanById({ id: params?.interventionId }));
        dispatch(
            getAllInterventionPlanDomainByInterventionId({
                id: params?.interventionId,
                type: phaseType,
            })
        );
    }, [dispatch, params?.interventionId]);
    return (
        <>
            <InterventionHeading
                interventionNewName={interventionNewName}
                goalLibrarySlice={goalLibrarySlice}
                handleRenameIntervention={handleRenameIntervention}
                handleCancel={handleCancel}
            />
            <div className="flex">
                <Tree libraryId={params.id ?? params?.goalLibraryId} />
                <div className=" flex flex-col w-full ml-5">
                    <div className="mr-5">
                        <div>
                            <button
                                type="submit"
                                className="py-2 float-right px-[3rem] w-[12vw] justify-evenly inline-flex items-center gap-x-2 text-sm font-normal rounded-md border border-transparent bg-primary-700 text-white hover:bg-[#48ABCA]-700 disabled:opacity-50 disabled:bg-secondary-200 disabled:cursor-not-allowed"
                            >
                                <img src={plus} alt="plus" />
                                Add New
                            </button>
                        </div>
                        <MenuTabs menuItems={menuItems} clientDocDiv={true} />
                    </div>
                    <div>
                        <UploadDoc />
                    </div>
                </div>
            </div>
        </>
    );
}
export default ClientDoc;
