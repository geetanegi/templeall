/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
import CommonGrid from '../Generics/Grid';
import { useSelector, useDispatch } from 'react-redux';
import clearall from '../../assets/img/clearall.svg';
import ConstColumnDiv, {
    CustomName,
    CustomDateWithoutTime,
} from '../Generics/Grid/CommonFunction';
import view from '../../assets/img/GridIcons/view.svg';
import edit from '../../assets/img/GridIcons/edit.svg';
import Tooltip from '../Generics/Tooltip';
import CommonSubHeader from '../SubHeader/CommonSubHeader';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { IRootState } from '../../redux/store';
import moment from 'moment';
import Button from '../Generics/Button';
import Select from '../Generics/Select';
import { availabilityDropdown } from '../../redux/slice/ClientIntakeDetails/clientIntakeDetails';

import {
    getActiveAsync,
    savingTabData,
} from '../../redux/slice/MineSlice/getMine';
// import Select from '../Generics/Select';
const ActionIntakeGrid = (e: { id: string }): React.JSX.Element => {
    return (
        <div className="flex ml-[-2rem] justify-evenly items-start">
            <Tooltip title="View">
                <Link
                    to={`${ROUTES.clinetIntakeDetails}/${e?.id}`}
                    className="cursor-pointer"
                >
                    <img src={view} alt="view" />
                </Link>
            </Tooltip>
        </div>
    );
};
const ActionIntakeGrid1 = (e: { id: string }): React.JSX.Element => {
    return (
        <div className="flex ml-[-2rem] justify-evenly items-start">
            <Tooltip title="View">
                <Link
                    to={`/client-intake-details-sentInfo/${e?.id}/view`}
                    className="cursor-pointer"
                >
                    <img src={view} alt="view" />
                </Link>
            </Tooltip>
            <Tooltip title="Edit">
                <Link
                    to={`/client-intake-details-sentInfo/${e?.id}`}
                    className="cursor-pointer"
                >
                    <img src={edit} alt="edit" />
                </Link>
            </Tooltip>
        </div>
    );
};

export default function ClientIntakeDetailsGrid(): React.JSX.Element {
    const title = 'Client Intake Details';
    const dispatch = useDispatch<any>();
    // const dispatch = useDispatch<AppDispatch>();
    const getGridData = useSelector((state: IRootState) => state.getMine);
    const userPermission = useSelector((state: any) => state.getUserPermission);
    const [loading, setLoading] = React.useState(false);
    const [selectedValues, setSelectedValues] = React.useState<Array<string>>(
        []
    );
    const intakeDataDropdown = useSelector(
        (state: any) => state.clientIntakeDetails?.availabilityDropdown?.data
    );
    console.log(intakeDataDropdown);

    function convertToLabelValue(input: any[]) {
        return input.map((item: { name: any; id: any }) => ({
            label: item.name,
            value: item.name,
        }));
    }
    const handleChange = (values: Array<string>) => {
        setSelectedValues(values);
    };
    const columnDefinitionsTemplateGrid = [
        {
            header: ConstColumnDiv(
                'Client Name',
                getGridData,
                'childFirstname'
            ),
            body: (e: { userChildren: string }) =>
                CustomName(JSON.parse(e?.userChildren ?? '[]')?.[0]?.name, ''),
        },
        {
            headerName: 'Parent/Guardian Name',
            header: ConstColumnDiv(
                'Parent/Guardian Name',
                getGridData,
                'parentFirstname'
            ),
            body: (e: { parentFirstname: string; parentLastname: string }) =>
                CustomName(e?.parentFirstname, e?.parentLastname),
        },
        {
            header: ConstColumnDiv('Date of Birth', getGridData, 'dateOfBirth'),
            body: (e: { dateOfBirth: string }) =>
                CustomName(moment(e?.dateOfBirth).format('MM/DD/YYYY'), ''),
        },
        {
            header: ConstColumnDiv('Phone Number', getGridData, 'phoneNumber'),
            body: (e: { phoneNumber: string }) =>
                CustomName(e?.phoneNumber, ''),
        },
        {
            header: ConstColumnDiv('Email', getGridData, 'email'),
            body: (e: { email: string }) => CustomName(e?.email, ''),
        },
        {
            header: ConstColumnDiv('Insurance', getGridData, 'orgInsurances'),
            body: (e: { orgInsurances: { name: string }[] }) => {
                return (
                    <div className="w-[9rem]">
                        {e?.orgInsurances?.map((insurance, index: number) => (
                            <span
                                key={index}
                                className="font-light whitespace-nowrap truncate"
                            >
                                {insurance.name}
                                {index !== e?.orgInsurances?.length - 1 && ', '}
                                {index !== e?.orgInsurances?.length - 1 && ' '}
                                {(index + 1) % 3 === 0 && <br />}
                            </span>
                        ))}
                    </div>
                );
            },
        },
        {
            header: ConstColumnDiv('Services', getGridData, 'orgService'),
            body: (e: { orgService: { name: string }[] }) => {
                return (
                    <div className="w-[20rem]">
                        {e?.orgService?.map((Service, index: number) => (
                            <span
                                key={index}
                                className="font-light whitespace-nowrap truncate"
                            >
                                {Service.name}
                                {index !== e?.orgService?.length - 1 && ',  '}
                                {index !== e?.orgService?.length - 1 && ' '}
                                {(index + 1) % 2 == 0 && <br />}
                            </span>
                        ))}
                    </div>
                );
            },
        },

        {
            header: ConstColumnDiv(
                'Availability',
                getGridData,
                'clientAvailability'
            ),
            body: (e: { clientAvailability: string }) =>
                CustomName(e?.clientAvailability, ''),
        },
        {
            header: ConstColumnDiv('Location', getGridData, 'orgLocation'),
            body: (e: {
                orgLocation: { city: string; zipCode: string; state: string };
            }) => {
                const location = e?.orgLocation;
                if (!location) {
                    return null;
                }
                const formattedLocation = `${location.city}, ${location.zipCode} - ${location.state}`;
                return CustomName(formattedLocation, '');
            },
        },
        {
            header: ConstColumnDiv('Actions', getGridData, ''),
            field: '',
            body: (e: { id: string }) => ActionIntakeGrid(e),
        },
    ];
    const columnDefinitionsTemplateGrid1 = [
        {
            header: ConstColumnDiv(
                'Client Name',
                getGridData,
                'childFirstname'
            ),
            body: (e: { userChildren: string }) =>
                CustomName(JSON.parse(e?.userChildren)?.[0]?.name, ''),
        },
        {
            headerName: 'Parent/Guardian Name',
            header: ConstColumnDiv(
                'Parent/Guardian Name',
                getGridData,
                'parentFirstname'
            ),
            body: (e: { parentFirstname: string; parentLastname: string }) =>
                CustomName(e?.parentFirstname, e?.parentLastname),
        },
        {
            header: ConstColumnDiv('Date of Birth', getGridData, 'dateOfBirth'),
            body: (e: { dateOfBirth: string }) =>
                CustomDateWithoutTime(e?.dateOfBirth),
        },
        {
            header: ConstColumnDiv('Phone Number', getGridData, 'phoneNumber'),
            body: (e: { phoneNumber: string }) =>
                CustomName(e?.phoneNumber, ''),
        },
        {
            header: ConstColumnDiv('Email', getGridData, 'email'),
            body: (e: { email: string }) => CustomName(e?.email, ''),
        },
        {
            header: ConstColumnDiv('Insurance', getGridData, 'orgInsurances'),
            body: (e: { orgInsurances: { name: string }[] }) => {
                return (
                    <div className="w-[9rem]">
                        {e?.orgInsurances?.map((insurance, index: number) => (
                            <span
                                key={index}
                                className="font-light whitespace-nowrap truncate"
                            >
                                {insurance.name}
                                {index !== e?.orgInsurances?.length - 1 && ', '}
                                {index !== e?.orgInsurances?.length - 1 && ' '}
                                {(index + 1) % 3 === 0 && <br />}
                            </span>
                        ))}
                    </div>
                );
            },
        },
        {
            header: ConstColumnDiv('Services', getGridData, 'orgService'),
            body: (e: { orgService: { name: string }[] }) => {
                return (
                    <div className="w-[20rem]">
                        {e?.orgService?.map((Service, index: number) => (
                            <span
                                key={index}
                                className="font-light whitespace-nowrap truncate"
                            >
                                {Service.name}
                                {index !== e?.orgService?.length - 1 && ',  '}
                                {index !== e?.orgService?.length - 1 && ' '}
                                {(index + 1) % 2 == 0 && <br />}
                            </span>
                        ))}
                    </div>
                );
            },
        },
        {
            header: ConstColumnDiv('Actions', getGridData, ''),
            field: '',
            body: (e: { id: string }) => ActionIntakeGrid1(e),
        },
    ];
    const columnDefinitionsTemplateGrid2 = [
        {
            header: ConstColumnDiv("Child's Name", getGridData, 'childId'),
            body: (e: any) => CustomName(e?.childId, ''),
        },
        {
            header: ConstColumnDiv(
                'Parent/Guardian Name',
                getGridData,
                'parentId'
            ),
            body: (e: any) => CustomName(e?.parentId, ''),
        },
        {
            header: ConstColumnDiv('Date of Birth', getGridData, 'dateOfBirth'),
            body: (e: any) => CustomName(e?.dateOfBirth, ''),
        },
        {
            header: ConstColumnDiv('Phone Number', getGridData, 'phoneNumber'),
            body: (e: any) => CustomName(e?.phoneNumber, ''),
        },
        {
            header: ConstColumnDiv('Email', getGridData, 'email'),
            body: (e: any) => CustomName(e?.email, ''),
        },
        {
            header: ConstColumnDiv('Insurance', getGridData, 'insuranceId'),
            body: (e: any) => CustomName(e?.insuranceId, ''),
        },
        {
            header: ConstColumnDiv('Services', getGridData, 'serviceId'),
            body: (e: any) => CustomName(e?.serviceId, ''),
        },
        {
            header: ConstColumnDiv(
                'Availability',
                getGridData,
                'clientAvailabilityId'
            ),
            body: (e: { clientAvailabilityId: string }) =>
                CustomName(e?.clientAvailabilityId, ''),
        },
        {
            header: ConstColumnDiv('Actions', getGridData, ''),
            field: '',
            body: (e: { id: string }) => ActionIntakeGrid(e),
        },
    ];
    const checkButton = () => {
        console.log(selectedValues);

        const dataFilter = {
            heading: '',
            roleId: userPermission?.userRoles?.data?.roleId,
            type: getGridData?.tab,
            assignedTo: userPermission?.userId,
            pagination: { startIndex: 0, noOfRecords: 19 },
            order: '',
            name: '',
            filterValue: '',
            appointmentWith: '1',
            isAvailabilityFilter: true,
            availabilityFilterList: selectedValues,
            publishStatus: 'Published',
        };
        setLoading(true);
        dispatch(getActiveAsync(dataFilter));
        dispatch(savingTabData({ tab: getGridData?.tab }));
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };
    const clearButton = () => {
        setSelectedValues([]);
        const dataFilter = {
            heading: '',
            roleId: userPermission?.userRoles?.data?.roleId,
            type: getGridData?.tab,
            assignedTo: userPermission?.userId,
            pagination: { startIndex: 0, noOfRecords: 19 },
            order: '',
            name: '',
            filterValue: '',
            isAvailabilityFilter: false,
            availabilityFilterList: [],
            appointmentWith: '1',
            publishStatus: 'Published',
        };
        dispatch(getActiveAsync(dataFilter));
        dispatch(savingTabData({ tab: getGridData?.tab }));
    };
    React.useEffect(() => {
        dispatch(availabilityDropdown());
    }, []);

    return (
        <>
            <CommonSubHeader title={title} />
            {getGridData?.tab === 'Waitlist' && (
                <div className=" flex justify-end -mt-10 mr-2 bg-transparent items-center">
                    <div className=" -mt-2 mr-5 bg-transparent">
                        <Select
                            label="Availability"
                            inputClassName={
                                'border-0 border-b border-gray-400 focus:border-blue-500 rounded-none focus:ring-0 px-0 ps-0 w-1/2'
                            }
                            options={
                                convertToLabelValue(intakeDataDropdown) ?? []
                            }
                            value={selectedValues}
                            onChange={handleChange}
                            multi={true} // Set to true for multi-select
                            showSearch={true} // Enable search functionality
                            placeholder="Select options"
                            isDisabled={false}
                        />
                    </div>
                    <div className="btn">
                        <Button
                            onClick={() => checkButton()}
                            data-testid="check-btn"
                            type="submit"
                            loading={loading}
                            disabled={false}
                            className="py-2 px-[3rem]  justify-evenly inline-flex items-center gap-x-2 text-sm font-normal rounded-md border border-transparent bg-primary-700 text-white hover:bg-[#48ABCA]-700 disabled:opacity-50 disabled:bg-secondary-200 disabled:cursor-not-allowed"
                        >
                            <span>{loading ? '' : 'Search'}</span>
                        </Button>
                    </div>
                    <div className="btn ml-2 mr-4">
                        <Button
                            onClick={() => clearButton()}
                            type="submit"
                            data-testid="clear-btn"
                            loading={false}
                            disabled={false}
                            className="py-2   justify-evenly inline-flex items-center gap-x-2 text-sm font-normal rounded-md border border-transparent  text-[#48abca] hover:bg-[#48ABCA]-700 disabled:opacity-50 disabled:bg-secondary-200 disabled:cursor-not-allowed"
                        >
                            <img src={clearall} alt="" className="mr-2 w-5" />
                            <span>Clear All</span>
                        </Button>
                    </div>
                </div>
            )}

            <CommonGrid
                getGridData={getGridData}
                columnOfGrid={
                    getGridData?.tab === 'Sent for Information'
                        ? columnDefinitionsTemplateGrid1
                        : getGridData?.tab === 'Waitlist'
                          ? columnDefinitionsTemplateGrid2
                          : columnDefinitionsTemplateGrid
                }
            />
        </>
    );
}
