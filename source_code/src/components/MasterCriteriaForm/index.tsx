/* eslint-disable max-len */
import * as React from 'react';
import Breadcrumb from '../MasterCriteriaLandingPageComponents/Breadcrumb';
import SaveCriteria from '../MasterCriteriaLandingPageComponents/SaveCriteria';
import DataCollectionButtonTypes from '../MasterCriteriaLandingPageComponents/DataCollectionButtonTypes';
import { useSelector } from 'react-redux';
import CriteriaForm from './TemplateForm/CriteriaForm';

export default function MasterCriteriaForm(): React.JSX.Element {
    const criteriaData = useSelector(
        ({ saveMasterCriteria }: any) => saveMasterCriteria
    );
    const isProgramModal = useSelector(
        ({ saveMasterCriteria }: any) => saveMasterCriteria?.isFromModal
    );
    const editData = useSelector(
        ({ getTemplate }: any) => getTemplate?.templateData
    );
    const titleRendering = (): any => {
        return <CriteriaForm />;
    };

    return (
        <>
            <div className="px-5 py-2" data-testid="master-criteria-form">
                {!isProgramModal && (
                    <>
                        <Breadcrumb
                            name={
                                editData?.id
                                    ? editData?.name
                                    : criteriaData?.value?.name
                            }
                        />
                        <SaveCriteria />
                        <DataCollectionButtonTypes />
                    </>
                )}
                <div
                    className={`${criteriaData?.value?.id || criteriaData?.onEditCriteria || isProgramModal ? '' : 'opacity-20 cursor-not-allowed pointer-events-none'} cards flex pl-6 pr-8 pt-4 w-full`}
                >
                    {titleRendering()}
                </div>
            </div>
        </>
    );
}
