import React, { useEffect, useState } from 'react';
import InterventionHeading from '../Heading/InterventionHeading';
import Tree from '../Tree/Tree';
import MenuTabs from '../MenuTabs/MenuTabs';
import ClientFaceSheet from '../../../assets/img/sessionScreen/ClientFaceSheet.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
    getInterventionPlanById,
    getAllInterventionPlanDomainByInterventionId,
    getInterventionByInterventionId,
    getInterventionDocumentCall,
} from '../../../redux/slice/InterventionAll/InterventionSlice';
import { useParams } from 'react-router-dom';
import UploadDoc from './UploadDoc';
import AddMenuClientDocumentModal from '../../AddMenuClientDocumentModal';
function ClientDoc(): React.JSX.Element {
    const params = useParams();
    const interventionData = useSelector(
        (state: any) => state.interventionSlice
    );
    const dispatch = useDispatch<any>();
    const [interventionNewName, setInterventionNewName] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [idData, setIdData] = useState({});
    const handleRenameIntervention = (): void => {
        setInterventionNewName(true);
        dispatch(getInterventionPlanById({ id: params.id }));
    };
    const handleCancel = (): void => {
        setInterventionNewName(false);
        dispatch(getInterventionPlanById({ id: params.id }));
    };
    const phaseType = useSelector(
        ({ interventionSlice }: any) => interventionSlice?.phaseType
    );
    const handleFaceSheet = (): void => {
        setOpenModal(true);
        const temp = interventionData?.getAllDocument?.data?.find(
            (e: any) => e.type === 'ClientFaceSheet'
        );
        setIdData(temp?.id);
    };
    const menuItems = [
        {
            icon: ClientFaceSheet,
            label: 'Client Facesheet',
            onClick: handleFaceSheet,
        },
    ];
    useEffect(() => {
        const temp = interventionData?.getAllDocument?.data?.find(
            (e: any) => e.type === 'ClientFaceSheet'
        );
        const payload = { id: temp?.id };
        dispatch(getInterventionDocumentCall(payload));
    }, [interventionData?.getAllDocument]);
    useEffect(() => {
        dispatch(getInterventionPlanById({ id: params?.interventionId }));
        dispatch(
            getAllInterventionPlanDomainByInterventionId({
                id: params?.interventionId,
                type: phaseType,
            })
        );
    }, [dispatch, params?.interventionId]);
    useEffect(() => {
        const payload1 = { interventionPlanId: params?.interventionId };
        dispatch(getInterventionByInterventionId(payload1));
    }, [dispatch, params.interventionId]);
    return (
        <>
            <InterventionHeading
                interventionNewName={interventionNewName}
                interventionData={interventionData}
                handleRenameIntervention={handleRenameIntervention}
                handleCancel={handleCancel}
            />
            <div className="flex" data-testid="client-doc-intervention-page">
                <Tree interventionData={interventionData} />
                <div className=" flex flex-col w-full ml-5">
                    <div className="mr-5">
                        <div></div>
                        <MenuTabs menuItems={menuItems} clientDocDiv={true} />
                    </div>
                    <div>
                        <UploadDoc />
                    </div>
                </div>
            </div>
            {openModal ? (
                <AddMenuClientDocumentModal
                    open={openModal}
                    titleData={'Client Face Sheet'}
                    titleValue={''}
                    onClose={() => setOpenModal(false)}
                    id={idData}
                    editDocumentData={
                        interventionData?.getDocument?.data?.description
                            ? JSON.parse(
                                  interventionData?.getDocument?.data
                                      ?.description
                              )
                            : ''
                    }
                    addNewType={''}
                    isIntervention={true}
                />
            ) : null}
        </>
    );
}
export default ClientDoc;
