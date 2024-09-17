/* eslint-disable max-len */
import * as React from 'react';
import Grid from '../Generics/Grid';
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from '../Generics/Tooltip';
//Icons Import
import edit from '../../assets/img/editIcon.svg';
import view from '../../assets/img/GridIcons/view.svg';
import ConstColumnDiv, { CustomName } from '../Generics/Grid/CommonFunction';
import {
    getActiveAsync,
    savingTabData,
} from '../../redux/slice/MineSlice/getMine';
import { organizationByIdSlice } from '../../redux/slice/organizations/organizationByIdSlice';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import CommonSubHeader from '../SubHeader/CommonSubHeader';
import Button from '../Generics/Button';
export default function OrganizationsGrid(): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const ActionTemplateGrid = (e: any): any => {
        const editOrganizations = (): any => {
            dispatch(organizationByIdSlice(e.id));
            setTimeout(() => {
                navigate(ROUTES.organizationsForm);
            }, 1000);
        };
        const ViewOrganizations = (): any => {
            dispatch(organizationByIdSlice(e.id));
            setTimeout(() => {
                navigate(ROUTES.organizationsView);
            }, 1000);
        };
        return (
            <div className="flex ml-[-2rem] justify-evenly items-start">
                <Tooltip title="View">
                    <Button
                        data-testid="View-element"
                        className="mt-1"
                        type={''}
                        onClick={ViewOrganizations}
                    >
                        <img className=" mt-1" src={view} alt="View" />
                    </Button>
                </Tooltip>
                <Tooltip title="Edit">
                    <Button
                        data-testid="Edit-element"
                        className="mt-1"
                        type={''}
                        onClick={editOrganizations}
                    >
                        <img src={edit} alt="edit" />
                    </Button>
                </Tooltip>
            </div>
        );
    };
    const title = 'Organizations';
    const getGridData = useSelector(({ getMine }: any) => getMine);
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    React.useEffect(() => {
        const data = {
            heading: '',
            roleId: userPermission?.userRoles?.data?.roleId,
            type: 'ORGANIZATIONS',
            assignedTo: userPermission?.value?.data?.userId,
            pagination: { startIndex: 0, noOfRecords: 19 },
            order: '',
            name: '',
            filterValue: '',
            appointmentWith: '1',
            publishStatus: 'Published',
        };
        dispatch(getActiveAsync(data));
        dispatch(savingTabData({ tab: 'ORGANIZATIONS' }));
    }, [
        dispatch,
        userPermission?.userRoles?.data?.roleId,
        userPermission?.value?.data?.userId,
    ]);
    const columnDefinitionsTemplateGrid = [
        {
            header: ConstColumnDiv('Organization', getGridData, 'name'),
            width: '12rem',
            body: (e: any) => CustomName(e?.name, ''),
        },
        {
            header: ConstColumnDiv(
                'Organization E-mail',
                getGridData,
                'organizationEmail'
            ),
            body: (e: any) => CustomName(e?.organizationEmail, ''),
        },
        {
            header: ConstColumnDiv('Admin', getGridData, 'firstName'),
            body: (e: any) => CustomName(e?.firstName, e?.lastName),
        },
        {
            header: ConstColumnDiv('Admin E-mail', getGridData, 'userEmail'),
            body: (e: any) => CustomName(e?.userEmail, ''),
        },
        {
            header: ConstColumnDiv('Cell Phone', getGridData, 'cellPhone'),
            body: (e: any) => CustomName(e?.cellPhone, ''),
        },
        {
            header: ConstColumnDiv('Actions', getGridData, ''),
            body: (e: any) => ActionTemplateGrid(e),
        },
    ];
    return (
        <>
            <CommonSubHeader title={title} />
            <Grid
                getGridData={getGridData}
                columnOfGrid={columnDefinitionsTemplateGrid}
            />
        </>
    );
}
