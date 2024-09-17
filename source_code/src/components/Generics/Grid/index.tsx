/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { Column } from 'primereact/column';
import { useDispatch, useSelector } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Paginator } from 'primereact/paginator';
import systemGen from '../../../assets/img/systemGen.svg';
import customMade from '../../../assets/img/customMade.svg';
import { getActiveAsync } from '../../../redux/slice/MineSlice/getMine';
import LoaderComponent from '../../LoaderComponent';
import { useLocation } from 'react-router-dom';
import { getActiveAsyncHistory } from '../../../redux/slice/MineSlice/getOtherGridData';
interface Obj1 {
    id?: any;
    getGridData: any;
    columnOfGrid: any;
    sumTotalData?: any;
    filter?: any;
    mode?: any;
    selection?: any;
    onSelectionChange?: any;
    rowClassName?: any;
}
export default function CommonGrid({
    id,
    getGridData,
    columnOfGrid,
    sumTotalData,
    filter,
    mode,
    selection,
    onSelectionChange,
    rowClassName,
}: Readonly<Obj1>): React.JSX.Element {
    //
    const dispatch = useDispatch<any>();
    const location = useLocation();
    const { state } = location;
    const [currentOffset, setCurrentOffset] = useState<number>(
        getGridData?.value?.data?.pageable?.offset
    );
    const getMineData = useSelector(({ getMine }: any) => getMine);
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    useEffect(() => {
        if (!currentOffset) {
            setCurrentOffset(getGridData?.value?.data?.pageable?.offset);
        }
    }, [currentOffset, getGridData?.value?.data?.pageable?.offset]);
    const generateCustomPageOption = (): number[] => {
        return Array.from(
            { length: Math.ceil(getGridData?.value?.data?.totalElements / 19) },
            (data, index) => (index + 1) * 19
        );
    };
    const onPageChange = (event: any): any => {
        // Calculate the new offset based on the selected page
        setCurrentOffset(event.first);
        const data = {
            ...getGridData?.value?.data,
            heading: '',
            roleId: userPermission?.userRoles?.data?.roleId,
            appointmentId: 1,
            authorizationCodeId: state?.id,
            type: getMineData?.tab,
            assignedTo: userPermission?.value?.data?.userId,
            pagination: { startIndex: event?.page, noOfRecords: event?.rows },
            name: getGridData?.sortingData?.sortingKey,
            order: getGridData?.sortingData?.order,
            filterValue: getMineData?.searchValue1,
        };
        const initialData = {
            id: id,
            heading: '',
            roleId: userPermission?.userRoles?.data?.roleId,
            type: getMineData?.tabHistory,
            assignedTo: userPermission?.value?.data?.userId,
            pagination: { startIndex: event?.page, noOfRecords: event?.rows },
            order: '',
            name: '',
            filterValue: getMineData?.searchValue1,
            appointmentWith: '1',
            publishStatus: 'Published',
        };
        const dataFilter = {
            heading: '',
            roleId: userPermission?.userRoles?.data?.roleId,
            type: 'BILLING',
            assignedTo: userPermission?.userId,
            pagination: { startIndex: event?.page, noOfRecords: event?.rows },
            order: '',
            name: '',
            filterValue: filter,
            appointmentWith: '1',
            publishStatus: 'Published',
        };
        // Update the state to the new offset
        if (
            getMineData?.tabHistory === 'INTERVENTION_HISTORY' ||
            getMineData?.tabHistory === 'PROGRAMBOOK_HISTORY'
        ) {
            dispatch(getActiveAsyncHistory(initialData));
        } else if (getMineData?.tab == 'BILLING') {
            dispatch(getActiveAsync(dataFilter));
        } else {
            dispatch(getActiveAsync(data));
        }
        // Call any additional logic or API fetch if needed
    };
    useEffect(() => {
        // Function to move the frozen tbody to the end of the table
        const moveFrozenRowToBottom = () => {
            const frozenTbody = document.querySelector(
                '.p-datatable-frozen-tbody'
            );
            const dataTable = document.querySelector('.p-datatable-table');
            if (frozenTbody && dataTable) {
                const parent = frozenTbody.parentNode;
                if (parent) {
                    parent.removeChild(frozenTbody);
                }
                dataTable.appendChild(frozenTbody);
            }
        };
        // Wait for the DataTable to render and then move the frozen row
        setTimeout(moveFrozenRowToBottom, 100);
    }, [getGridData, sumTotalData, id]);
    return getGridData?.loading ? (
        <LoaderComponent />
    ) : (
        <>
            <div className="card m-5 border border-[#E5E5E5] rounded shadow-md">
                {sumTotalData ? (
                    <DataTable
                        frozenValue={[sumTotalData]}
                        stripedRows
                        size={'small'}
                        value={getGridData?.value?.data?.content || []}
                        scrollable
                        scrollHeight={`${id ? '80vh' : '90vh'}`}
                        style={{
                            minWidth: '50rem',
                            minHeight: id ? '80vh' : '90vh',
                        }}
                        selection={selection}
                        selectionMode={mode}
                        onSelectionChange={onSelectionChange}
                        rowClassName={rowClassName}
                        className="custom-checkbox"
                    >
                        <Column
                            selectionMode={mode}
                            headerStyle={{ width: '3rem' }}
                        />
                        {columnOfGrid.map((column: any) => (
                            <Column
                                style={{
                                    width: `${column.width ? column.width : ''}`,
                                    fontSize: '13px',
                                    fontFamily: 'Lato',
                                }}
                                key={column?.header}
                                header={column?.header}
                                body={(rowData): React.JSX.Element => (
                                    <span>{column?.body(rowData)}</span>
                                )}
                            />
                        ))}
                    </DataTable>
                ) : (
                    <DataTable
                        stripedRows
                        size={'small'}
                        value={getGridData?.value?.data?.content || []}
                        scrollable
                        scrollHeight={`${id ? '80vh' : '90vh'}`}
                        style={{
                            minWidth: '50rem',
                            minHeight: id ? '80vh' : '90vh',
                        }}
                    >
                        {columnOfGrid.map((column: any) => (
                            <Column
                                style={{
                                    width: `${column.width ? column.width : ''}`,
                                    fontSize: '13px',
                                    fontFamily: 'Lato',
                                }}
                                key={column?.header}
                                header={column?.header}
                                body={(rowData): React.JSX.Element => (
                                    <span>{column?.body(rowData)}</span>
                                )}
                            />
                        ))}
                    </DataTable>
                )}
            </div>
            <div className="gridFooter flex justify-between items-center">
                {getMineData?.tab === 'BILLING' ? (
                    <div className="option flex justify-evenly items-center ml-5">
                        <div className="Ellipse95 ml-3 mr-2 w-2.5 h-2.5 bg-orange-400 rounded-full shadow" />
                        <div className="mr-3 text-s font-light font-['Lato'] text-zinc-700">
                            New
                        </div>
                        <div className="Ellipse95 ml-3 mr-2 w-2.5 h-2.5 bg-zinc-300 rounded-full shadow" />
                        <div className="text-s font-light font-['Lato'] text-zinc-700">
                            Invoiced
                        </div>
                        <div className="Ellipse95 ml-3 mr-2 w-2.5 h-2.5 bg-white rounded-full shadow" />
                        <div className="mr-3 text-s font-light font-['Lato'] text-zinc-700">
                            Not Invoiced
                        </div>
                        <div className="Ellipse95 ml-3 mr-2 w-2.5 h-2.5 bg-red-500 rounded-full shadow" />
                        <div className="text-s font-light font-['Lato'] text-zinc-700">
                            Overpaid
                        </div>
                        <div className="Ellipse95 ml-3 mr-2 w-2.5 h-2.5 bg-blue-500 rounded-full shadow" />
                        <div className="mr-3 text-s font-light font-['Lato'] text-zinc-700">
                            Outstanding
                        </div>
                        <div className="Ellipse95 ml-3 mr-2 w-2.5 h-2.5 bg-green-400 rounded-full shadow" />
                        <div className="text-s font-light font-['Lato'] text-zinc-700">
                            Paid
                        </div>
                    </div>
                ) : getMineData?.tab === 'Diagnosis Codes' ||
                  getMineData?.tab === 'Insurance' ||
                  getMineData?.tab === 'Services' ||
                  getMineData?.tab === 'SESSION_HISTORY' ||
                  getMineData?.tab === 'GOAL_LIBRARY' ||
                  getMineData?.tab === 'Default Rate' ||
                  getMineData?.tab === 'Custom Rate' ||
                  getMineData?.tab === 'mine ' ||
                  getMineData?.tab === 'all ' ||
                  getMineData?.tab === 'discharged ' ||
                  getMineData?.tab === 'GROUPS' ||
                  getMineData?.tab === 'AUTHORIZED_CODE' ||
                  getMineData?.tab === 'ORGANIZATIONS' ||
                  getMineData?.tab === 'SESSION_EXISTING_NOTE' ||
                  getMineData?.tab === 'PROGRAMBOOK_LIBRARY' ||
                  getMineData?.tab === 'SESSION' ||
                  getMineData?.tab === 'mine' ||
                  getMineData?.tab === 'all' ||
                  getMineData?.tab === 'Mine' ||
                  getMineData?.tab === 'All' ||
                  getMineData?.tab === 'discharged' ||
                  getMineData?.tab === 'Discontinued' ||
                  getMineData?.tab === 'ClIENT_INTAKE_DETAILS' ||
                  getMineData?.tab === 'New Inquiry' ||
                  getMineData?.tab === 'All ' ||
                  getMineData?.tab === 'Published' ||
                  getMineData?.tab === 'allNote' ||
                  getMineData?.tab === 'Sent for Information' ||
                  getMineData?.tab === 'Users' ||
                  getMineData?.tab === 'Employee' ||
                  getMineData?.tab === 'Client' ||
                  getMineData?.tab === 'ROLES' ||
                  getMineData?.tab === 'meta data' ||
                  getMineData?.tab === 'Inbox' ||
                  getMineData?.tab === 'Your Dictionary' ||
                  getMineData?.tab === 'Waitlist' ||
                  getMineData?.tab === 'Question Bank Management' ||
                  getMineData?.tab === 'Organization Dictionary' ||
                  getMineData?.tab === 'Claims Inbox' ||
                  getMineData?.tab === 'Inbox' ||
                  getMineData?.tab === 'Client Intake Forms' ||
                  getMineData?.tab === 'Deleted' ? (
                    <div className="empty"></div>
                ) : (
                    <div className="option flex justify-evenly ml-5">
                        <img className="w-3 mr-3" src={systemGen} alt="" />
                        <div className="mr-3 text-s font-light font-['Lato'] text-zinc-700">
                            System Generated Template
                        </div>
                        <img className="w-3 mr-3" src={customMade} alt="" />
                        <div className="text-s font-light font-['Lato'] text-zinc-700">
                            Custom Template
                        </div>
                    </div>
                )}
                <Paginator
                    first={currentOffset} //offset
                    rows={getGridData?.value?.data?.pageable?.pageSize} //pageSize
                    totalRecords={getGridData?.value?.data?.totalElements} //total element
                    rowsPerPageOptions={generateCustomPageOption()}
                    onPageChange={(e) => onPageChange(e)}
                    className="flex justify-end"
                />
            </div>
        </>
    );
}
