import * as React from 'react';
import ConstColumnDiv, {
    CustomName,
    CustomStatusInsurance,
} from '../Generics/Grid/CommonFunction';
import { useDispatch, useSelector } from 'react-redux';
import {
    getActiveAsync,
    savingTabData,
} from '../../redux/slice/MineSlice/getMine';
import CommonSubHeader from '../SubHeader/CommonSubHeader';
import CommonGrid from '../Generics/Grid';
import edit from '../../assets/img/GridIcons/edit.svg';
import Active from '../../assets/img/GridIcons/CheckIcon.svg';
import Inactive from '../../assets/img/GridIcons/CrossIcon.svg';
import Tooltip from '../Generics/Tooltip';
import ConfirmationModal from '../Generics/ConfirmationModal';
import Button from '../Generics/Button';
import ChangeInsuranceStatus from '../../api/services/Insurance/ChangeInsuranceStatus.service';
import { openNotification } from '../../redux/slice/Notification/notifications';
import AddInsurance from './InsuranceFiles/Modal/AddInsurance';
import AddDiagnosisCodeModal from './InsuranceFiles/Modal/addDiagnosisCode';
import {
    clearDiagnosisData,
    getDiagnosisCodeById,
    getEmailByIdApiId,
} from '../../redux/slice/MetaDataManagement/metaData';
import diagnosisCodeGridApi from '../../api/services/MetaDataManagement/diagnosisCodeGrid.service';
import servicesGridApi from '../../api/services/MetaDataManagement/serivesGrid.service';
import { Link } from 'react-router-dom';

export default function DiagnosisCodeGrid(): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const title = 'Meta Data Management';
    const getGridData = useSelector(({ getMine }: any) => getMine);
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    React.useEffect(() => {
        dispatch(savingTabData({ tab: getGridData?.tab }));
    }, [dispatch, getGridData?.tab]);

    const [openConfirmationModal, setOpenConfirmationModal] =
        React.useState(false);
    const [openEditModal, setOpenEditModal] = React.useState(false);
    const [openEditDiagnosisCodeModal, setEditDiagnosisCodeModal] =
        React.useState(false);
    const [openDiagnosisConfirmationModal, setDiagnosisConfirmationModal] =
        React.useState(false);
    const [diagnosisCodeId, setDiagnosisCodeId] = React.useState('');
    const [insuranceData, setInsuranceData] = React.useState('');
    const [insuranceId, setInsuranceId] = React.useState('');
    const [status, setStatus] = React.useState(false);
    const [openServiceConfirmationModal, setServiceConfirmationModal] =
        React.useState(false);
    const [serviceId, setServiceId] = React.useState('');
    const handleYes = async (): Promise<any> => {
        setOpenConfirmationModal(false);
        setDiagnosisConfirmationModal(false);
        const payload = {
            id: insuranceId,
            isActive: status,
        };
        const diagnosisPayload = {
            diagnosisCodeId: diagnosisCodeId,
            status: status,
        };
        const servicePayload = {
            id: serviceId,
            isActive: status,
        };
        if (openDiagnosisConfirmationModal) {
            try {
                const res =
                    await diagnosisCodeGridApi.changeDiagnosisCodeStatusApi(
                        diagnosisPayload
                    );
                dispatch(
                    openNotification({
                        success: true,
                        title: `Diagnosis Code is ${status ? 'active' : 'inactive'} now`,
                        description: '',
                    })
                );
                dispatch(savingTabData({ tab: 'Diagnosis Codes' }));
                const initialData = {
                    id: '',
                    heading: '',
                    roleId: userPermission?.userRoles?.data?.roleId,
                    type: 'Diagnosis Codes',
                    assignedTo: userPermission?.value?.data?.userId,
                    pagination: { startIndex: 0, noOfRecords: 19 },
                    order: '',
                    name: '',
                    filterValue: '',
                    appointmentWith: '1',
                    publishStatus: 'Published',
                };
                setTimeout(() => {
                    dispatch(getActiveAsync(initialData));
                }, 1000);
                console.log('API response:', res);
            } catch (error) {
                console.error('API call failed:', error);
            }
        } else if (openServiceConfirmationModal) {
            try {
                const res =
                    await servicesGridApi.changeServiceStatusApi(
                        servicePayload
                    );
                setServiceConfirmationModal(false);
                dispatch(
                    openNotification({
                        success: true,
                        title: `Services is ${status ? 'active' : 'inactive'} now`,
                        description: '',
                    })
                );
                dispatch(savingTabData({ tab: 'Services' }));
                const initialData = {
                    id: '',
                    heading: '',
                    roleId: userPermission?.userRoles?.data?.roleId,
                    type: 'Services',
                    assignedTo: userPermission?.value?.data?.userId,
                    pagination: { startIndex: 0, noOfRecords: 19 },
                    order: '',
                    name: '',
                    filterValue: '',
                    appointmentWith: '1',
                    publishStatus: 'Published',
                };
                setTimeout(() => {
                    dispatch(getActiveAsync(initialData));
                }, 1000);
                console.log('API response:', res);
            } catch (error) {
                console.error('API call failed:', error);
            }
        } else {
            try {
                const res =
                    await ChangeInsuranceStatus.ChangeInsuranceStatusApi(
                        payload
                    );
                dispatch(
                    openNotification({
                        success: true,
                        title: `${status ? 'Insurance activated successfully.' : ' Insurance is now inactive.'}`,
                        description: '',
                    })
                );
                dispatch(savingTabData({ tab: 'Insurances' }));
                const initialData = {
                    id: '',
                    heading: '',
                    roleId: userPermission?.userRoles?.data?.roleId,
                    type: 'Insurances',
                    assignedTo: userPermission?.value?.data?.userId,
                    pagination: { startIndex: 0, noOfRecords: 19 },
                    order: '',
                    name: '',
                    filterValue: '',
                    appointmentWith: '1',
                    publishStatus: 'Published',
                };
                setTimeout(() => {
                    dispatch(getActiveAsync(initialData));
                }, 1000);
                console.log('API response:', res);
            } catch (error) {
                console.error('API call failed:', error);
            }
        }
    };
    const ActionIntakeGrid = (e: any): React.JSX.Element => {
        const handleEditIcon = (): void => {
            setOpenEditModal(true);
            setInsuranceData(e);
            console.log(insuranceData);
        };
        const handleCheckIcon = (): void => {
            setOpenConfirmationModal(true);
            setInsuranceId(e?.id);
            setStatus(true);
            console.log(e);
        };
        const handleCrossIcon = (): void => {
            setOpenConfirmationModal(true);
            setInsuranceId(e?.id);
            setStatus(false);
            console.log(e);
        };

        return (
            <div className="flex items-start">
                <Tooltip title="Edit">
                    <Button className={''} type={''} onClick={handleEditIcon}>
                        <img
                            data-testid="Edit2-element"
                            src={edit}
                            alt="Edit"
                        />
                    </Button>
                </Tooltip>
                <Tooltip title="Active">
                    <Button
                        disabled={e?.isActive}
                        className={' ml-4'}
                        type={''}
                        onClick={handleCheckIcon}
                    >
                        <img data-testid="Active2" src={Active} alt="Active" />
                    </Button>
                </Tooltip>
                <Tooltip title="Inactive">
                    <Button
                        disabled={!e?.isActive}
                        className={' ml-3'}
                        type={''}
                        onClick={handleCrossIcon}
                    >
                        <img
                            data-testid="Inactive2"
                            className="ml-3"
                            src={Inactive}
                            alt="Inactive"
                        />
                    </Button>
                </Tooltip>
            </div>
        );
    };

    const ActionDiagnosisGrid = (e: any): React.JSX.Element => {
        const handleEditDiagnosisCode = async (): Promise<any> => {
            setEditDiagnosisCodeModal(true);
            dispatch(getDiagnosisCodeById({ diagnosisCodeId: e?.id }));
        };
        const handleActiveDiagnosis = (): void => {
            setDiagnosisConfirmationModal(true);
            setStatus(true);
            setDiagnosisCodeId(e?.id);
        };
        const handleInactiveDiagnosis = (): void => {
            setDiagnosisConfirmationModal(true);
            setStatus(false);
            setDiagnosisCodeId(e?.id);
        };
        return (
            <div className="flex items-start">
                <Tooltip title="Edit">
                    <Button
                        className={''}
                        type={''}
                        onClick={handleEditDiagnosisCode}
                    >
                        <img
                            data-testid="edit1-element"
                            src={edit}
                            alt="Edit"
                        />
                    </Button>
                </Tooltip>
                <Tooltip title="Active">
                    <Button
                        disabled={e?.status}
                        className={' ml-4'}
                        type={''}
                        onClick={handleActiveDiagnosis}
                    >
                        <img
                            data-testid="active1-element"
                            src={Active}
                            alt="Active"
                        />
                    </Button>
                </Tooltip>
                <Tooltip title="Inactive">
                    <Button
                        disabled={!e?.status}
                        className={' ml-3'}
                        type={''}
                        onClick={handleInactiveDiagnosis}
                    >
                        <img
                            data-testid="inactive1-element"
                            className="ml-3"
                            src={Inactive}
                            alt="Inactive"
                        />
                    </Button>
                </Tooltip>
            </div>
        );
    };

    const activeCount = getGridData?.value?.data?.content?.filter(
        (service: any) => service.isActive
    ).length;
    const ActionServicesGrid = (e: any): React.JSX.Element => {
        const handleActiveService = (): void => {
            setServiceConfirmationModal(true);
            setStatus(true);
            setServiceId(e?.id);
        };
        const handleInactiveService = (): void => {
            setServiceConfirmationModal(true);
            setStatus(false);
            setServiceId(e?.id);
        };
        return (
            <div className="flex items-start">
                <Tooltip title="Active">
                    <Button
                        disabled={e?.isActive}
                        className={''}
                        type={''}
                        onClick={handleActiveService}
                    >
                        <img
                            data-testid="Active-element"
                            src={Active}
                            alt="Active"
                        />
                    </Button>
                </Tooltip>
                <Tooltip title="Inactive">
                    <Button
                        disabled={!e?.isActive || activeCount === 1}
                        className={' ml-3'}
                        type={''}
                        onClick={handleInactiveService}
                    >
                        <img
                            data-testid="Inactive-element"
                            className="ml-3"
                            src={Inactive}
                            alt="Inactive"
                        />
                    </Button>
                </Tooltip>
            </div>
        );
    };
    const ActionEmailGrid = (e: any): React.JSX.Element => {
        const editFunction = (): void => {
            const payload = {
                id: e?.id,
            };
            dispatch(getEmailByIdApiId(payload));
        };
        return (
            <div className="flex  items-center">
                <Tooltip title="Edit">
                    <Link to={`/emailFormat-by-id/${e?.id}`}>
                        <Button className={''} type={''} onClick={editFunction}>
                            <img
                                data-testid="edit-element"
                                src={edit}
                                alt="Edit"
                                className="ml-4"
                            />
                        </Button>
                    </Link>
                </Tooltip>
            </div>
        );
    };

    const columnDefinitionsTemplateDiagnosisGrid = [
        {
            header: ConstColumnDiv('Code', getGridData, 'code'),
            width: '8rem',
            body: (e: any) => CustomName(e?.code, ''),
        },
        {
            header: ConstColumnDiv('Name', getGridData, 'name'),
            body: (e: any) => CustomName(e?.name, ''),
        },
        {
            header: ConstColumnDiv('Description ', getGridData, 'description'),
            width: '38rem',
            body: (e: any) => CustomName(e?.description, ''),
        },
        {
            header: ConstColumnDiv('Status', getGridData, 'status'),
            body: (e: any) => CustomStatusInsurance(e?.status),
        },
        {
            header: ConstColumnDiv('Actions', getGridData, ''),
            field: '',
            body: (e: any) => ActionDiagnosisGrid(e),
        },
    ];
    const columnDefinitionsTemplateGrid1 = [
        {
            header: ConstColumnDiv('', getGridData, ''),
            width: '10px',
            body: () => CustomName('', ''),
        },
        {
            header: ConstColumnDiv('Insurance ', getGridData, 'name'),
            body: (e: any) => CustomName(e?.name, ''),
        },
        {
            header: ConstColumnDiv('Status', getGridData, 'isActive'),
            width: '10rem',
            body: (e: any) => CustomStatusInsurance(e?.isActive),
        },
        {
            header: ConstColumnDiv('Actions', getGridData, ''),
            width: '8rem',
            body: (e: any) => ActionIntakeGrid(e),
        },
    ];
    const columnDefinitionsTemplateServicesGrid = [
        {
            header: ConstColumnDiv('', getGridData, ''),
            width: '10px',
            body: () => CustomName('', ''),
        },
        {
            header: ConstColumnDiv('Services ', getGridData, 'name'),
            body: (e: any) => CustomName(e?.name, ''),
        },
        {
            header: ConstColumnDiv('Status', getGridData, 'isActive'),
            width: '10rem',
            body: (e: any) => CustomStatusInsurance(e?.isActive),
        },
        {
            header: ConstColumnDiv('Actions', getGridData, ''),
            width: '8rem',
            body: (e: any) => ActionServicesGrid(e),
        },
    ];
    const columnDefinitionsTemplateEmailFormatGrid = [
        {
            header: ConstColumnDiv('', getGridData, ''),
            width: '15px',
            body: () => CustomName('', ''),
        },
        {
            header: ConstColumnDiv('Event', getGridData, 'event'),
            width: '90rem',
            body: (e: any) => CustomName(e?.event, ''),
        },

        {
            header: ConstColumnDiv('Actions', getGridData, ''),
            field: '',
            body: (e: any) => ActionEmailGrid(e),
        },
    ];

    return (
        <>
            <CommonSubHeader title={title} />
            <CommonGrid
                getGridData={getGridData}
                columnOfGrid={
                    getGridData?.tab === 'Email Format'
                        ? columnDefinitionsTemplateEmailFormatGrid
                        : getGridData?.tab === 'Insurances'
                          ? columnDefinitionsTemplateGrid1
                          : getGridData?.tab === 'Services'
                            ? columnDefinitionsTemplateServicesGrid
                            : columnDefinitionsTemplateDiagnosisGrid
                }
            />

            {openEditModal && (
                <AddInsurance
                    open={openEditModal}
                    onClose={() => setOpenEditModal(false)}
                    insuranceData={insuranceData}
                />
            )}
            {openEditDiagnosisCodeModal && (
                <AddDiagnosisCodeModal
                    open={openEditDiagnosisCodeModal}
                    onClose={() => {
                        setEditDiagnosisCodeModal(false);
                        dispatch(clearDiagnosisData());
                    }}
                />
            )}
            {openConfirmationModal && (
                <ConfirmationModal
                    title={`${status ? 'Are you sure you want to activate this insurance ?' : 'Are you sure you want to make this insurance inactive ?'}`}
                    open={openConfirmationModal}
                    onClose={() => setOpenConfirmationModal(false)}
                    handleStop={() => handleYes()}
                />
            )}
            {openDiagnosisConfirmationModal && (
                <ConfirmationModal
                    title={`Are you sure you want to make this diagnosis code ${status ? 'active' : 'inactive'}  ?`}
                    open={openDiagnosisConfirmationModal}
                    onClose={() => setDiagnosisConfirmationModal(false)}
                    handleStop={() => handleYes()}
                />
            )}
            {openServiceConfirmationModal && (
                <ConfirmationModal
                    title={`Are you sure you want to make this service ${status ? 'active' : 'inactive'}  ?`}
                    open={openServiceConfirmationModal}
                    onClose={() => setServiceConfirmationModal(false)}
                    handleStop={() => handleYes()}
                />
            )}
        </>
    );
}
