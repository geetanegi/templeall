import React from 'react';
import TempFolder from '../../assets/img/tempFolder.svg';
import { useSelector, useDispatch } from 'react-redux';
import {
    getById,
    savingTemplateId,
} from '../../redux/slice/template/templateSlice';
import Tooltip from '../Generics/Tooltip';
import Blueinformation from '../../assets/img/blueInformation.svg';
import { Field, useFormikContext } from 'formik';

export default function SelectGuidelineTemplate({
    disableSave,
}: {
    disableSave: any;
}): React.JSX.Element {
    const instruction = useSelector((state: any) => state.template.description);
    const tempName = useSelector(
        ({ createProgram }: any) => createProgram?.tempName?.data
    );
    const targetDataByIdClicked = useSelector(
        ({ getTarget }: any) => getTarget?.clickedTarget?.data
    );
    const editProgramData = useSelector(
        ({ renameProgram }: any) => renameProgram
    );
    const templateData = useSelector(({ template }: any) => template);
    const isFromTarget = useSelector(
        ({ getTarget }: any) => getTarget?.isFromTarget
    );
    const hideAll = useSelector(
        ({ getTarget }: any) => getTarget?.hideAddToAll
    );
    const dispatch = useDispatch<any>();

    const domainNames = tempName;
    const tempData = (id: any): void => {
        const data = {
            templateId: id,
            organizationId: '1',
            type: 'GUIDELINE_TEMPLATE',
        };
        dispatch(getById(data));
        dispatch(savingTemplateId(id));
    };
    const { values, handleChange }: { values: any; handleChange: any } =
        useFormikContext();

    return (
        <div className="flex items-baseline">
            {instruction?.length > 0 && (
                <div className="pr-2">
                    <Tooltip title={instruction}>
                        <img
                            className="w-[1rem]"
                            src={Blueinformation}
                            alt="Information icon"
                        />
                    </Tooltip>
                </div>
            )}

            <div
                className="relative inline-block w-2/4"
                data-testid="select-guideline-container"
            >
                <div className="absolute top-2/3 transform -translate-y-1/2 ps-1">
                    <img
                        src={TempFolder}
                        alt="Folder"
                        className="mr-2 h-5 w-5"
                    />
                </div>
                <Field
                    as="select"
                    name={'guidelineName'}
                    id={'guidelineName'}
                    className={`mt-5 w-full border-b-2 border-gray-300 rounded px-3 py-1 pl-8 ${
                        targetDataByIdClicked?.isEditable === false
                            ? 'cursor-not-allowed'
                            : ''
                    }`}
                    placeholder={'Select Program Type'}
                    isRequired={true}
                    onChange={(e: any) => {
                        tempData(e.target.value);
                        disableSave();
                    }}
                    disabled={
                        targetDataByIdClicked?.isEditable === false
                            ? true
                            : false
                    }
                    data-testid="select-guideline-template"
                >
                    <option value={templateData?.name} disabled selected>
                        {(editProgramData?.onRename && templateData?.name) ||
                        templateData?.name
                            ? templateData?.name
                            : 'Select a template'}
                    </option>
                    {domainNames?.map((itemDomain: any, index: any) => (
                        <option key={index} value={itemDomain?.id}>
                            {itemDomain?.name}
                        </option>
                    ))}
                </Field>
            </div>
            <div className="flex ml-12">
                {!isFromTarget && hideAll ? (
                    <>
                        <Field
                            type="checkbox"
                            name="addToGuideline"
                            id="addToGuideline"
                            checked={values?.addToGuideline}
                            onChange={(e: any) => {
                                handleChange(e);
                            }}
                        />
                        <label
                            htmlFor="hs-default-checkbox"
                            className="text-sm font-sm ms-2"
                        >
                            Add to all targets
                        </label>
                    </>
                ) : null}
            </div>
        </div>
    );
}
