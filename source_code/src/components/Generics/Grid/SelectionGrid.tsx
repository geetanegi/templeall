import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    getActiveAsync,
    savingTabData,
} from '../../../redux/slice/MineSlice/getMine';
import ConstColumnDiv, { CurrentDuration, CustomName } from './CommonFunction';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import ViewTargetInSummary from '../../AddNewNote/ViewTargetInSummary';
import { AddInterventionModalFooter } from '../Modal/index';
import {
    clearRowData,
    getTargetRunSummary,
    selectedSessionSummary,
} from '../../../redux/slice/session/sessionSlice';
import {
    clearSummary,
    showSelectedData,
} from '../../../redux/slice/template/templateSlice';
import LoaderComponent from '../../LoaderComponent';

type GridData = {
    id: number;
    sessionRunId: string; // Add sessionRunId
    sessionName: string; // Add sessionName
    createdFor?: string; // Optional, based on usage
    duration?: string; // Optional, based on usage
    createdDate?: string; // Optional, based on usage
};

type ColumnDefinition = {
    header: React.ReactNode;
    body: (data: any) => React.ReactNode;
    width?: string;
};

type DataTableComponentProps = {
    getGridData: any;
    selectedProducts: GridData[];
    onSelectionChange: (e: SelectionChangeEvent) => void;
};

type ViewTargetComponentProps = {
    isSelected: boolean;
    selectedName: string;
    setIsSelected: React.Dispatch<React.SetStateAction<boolean>>;
};

type FooterComponentProps = {
    onClose: () => void;
    isEditingGrid: boolean;
    dispatch: any;
    sendDataForTarget: any;
    allTargets: any;
    selectedSummary: any;
};

// Define the shape of the event parameter for the onSelectionChange function
type SelectionChangeEvent = {
    value: GridData[];
};

const columnDefinitions = (getGridData: any): ColumnDefinition[] => [
    {
        header: ConstColumnDiv('Session Name', getGridData, 'name'),
        body: (e: any) => CustomName(e?.sessionName, ''),
    },
    {
        header: ConstColumnDiv(
            'Created For',
            getGridData,
            'clientId.firstName'
        ),
        body: (e: any) => CustomName(e?.createdFor, ''),
    },
    {
        header: ConstColumnDiv('Duration', getGridData, 'createdDate'),
        width: '20rem',
        body: (e: any) => CurrentDuration(e?.duration),
    },
];

const rowClassName = (selectedProducts: GridData[]) => (rowData: any) =>
    selectedProducts?.includes(rowData) ? 'bg-[#48ABCA78] text-black' : '';

const mapSessionData = (
    data: any,
    selectedSummary: any,
    checked: any
): GridData[] => {
    if (selectedSummary[checked] && data.length) {
        const sessionRunningIds = Object.values(selectedSummary[checked])
            .flat()
            .map((item: any) => item.sessionRunId);

        return data.filter((item: any) =>
            sessionRunningIds.includes(item.sessionRunId)
        );
    }
    return [];
};

const DataTableComponent: React.FC<DataTableComponentProps> = ({
    getGridData,
    selectedProducts,
    onSelectionChange,
}) => (
    <div className="card m-1 border border-[#E5E5E5] rounded shadow-md">
        <DataTable
            stripedRows
            size="small"
            value={getGridData?.value?.data || []}
            scrollable
            scrollHeight="70vh"
            style={{ minHeight: '70vh' }}
            selection={selectedProducts}
            onSelectionChange={onSelectionChange}
            dataKey="sessionRunId"
            selectionMode="multiple"
            rowClassName={rowClassName(selectedProducts)}
            className="custom-checkbox"
        >
            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
            {columnDefinitions(getGridData).map((column, index) => (
                <Column
                    style={{
                        width: column.width || '',
                        fontSize: '13px',
                        fontFamily: 'Lato',
                    }}
                    key={index}
                    header={column.header}
                    body={(rowData): React.ReactElement => (
                        <span>{column.body(rowData)}</span>
                    )}
                />
            ))}
        </DataTable>
    </div>
);

const ViewTargetComponent: React.FC<ViewTargetComponentProps> = ({
    isSelected,
    selectedName,
    setIsSelected,
}) => {
    return isSelected ? (
        <ViewTargetInSummary
            onClose={() => setIsSelected(false)}
            selectedName={selectedName}
        />
    ) : null; // Return null when isSelected is false
};

const FooterComponent: React.FC<FooterComponentProps> = ({
    onClose,
    isEditingGrid,
    dispatch,
    sendDataForTarget,
    allTargets,
    selectedSummary,
}) => (
    <AddInterventionModalFooter
        onClose={() => {
            onClose();
            if (!isEditingGrid) {
                dispatch(clearSummary());
                dispatch(clearRowData());
            }
        }}
        handleSubmit={() => {
            dispatch(
                selectedSessionSummary({
                    sendDataForTarget,
                    allTargets,
                    selectedSummary,
                })
            );
            onClose();
        }}
    />
);

const SelectSummaryGrid: React.FC<{
    dateValue: any;
    onClose: () => void;
    isDateChange: boolean;
}> = ({ dateValue, onClose, isDateChange }) => {
    const dispatch = useDispatch<any>();
    const getGridData = useSelector(({ getMine }: any) => getMine);
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission?.value?.data
    );
    const selectedSummary = useSelector(
        (state: any) => state.session.selectedSummary
    );
    const checked = useSelector((state: any) => state.session.selectedRow);
    const showSelected = useSelector(
        (state: any) => state.template.showSelected
    );
    const allTargets = useSelector((state: any) => state.session.allTargets);
    const isEditingGrid = useSelector(
        (state: any) => state.template.isGridEdit
    );
    const appointment = useSelector((state: any) => state.appointment.value);

    const [selectedProducts, setSelectedProducts] = React.useState<GridData[]>(
        []
    );
    const [isSelected, setIsSelected] = React.useState<boolean>(false);
    const [selectedName, setSelectedName] = React.useState<string>('');
    const [sendDataForTarget, setSendDataForTarget] = React.useState<any>({});

    const data = {
        heading: '',
        roleId: userPermission?.userRoles?.data?.roleId,
        type: 'SUMMARY',
        assignedTo: userPermission?.userId,
        pagination: { startIndex: 0, noOfRecords: 19 },
        order: '',
        name: '',
        filterValue: '',
        appointmentWith: '1',
        publishStatus: 'Published',
        clientId: appointment?.appointmentWith?.id,
        date: dateValue?.startDate,
        providerId: appointment?.primaryProvider?.id,
        organizationId: '',
    };

    React.useEffect(() => {
        dispatch(getActiveAsync(data));
        dispatch(savingTabData({ tab: 'SUMMARY' }));
    }, [dispatch, data]);

    React.useEffect(() => {
        setSelectedProducts(
            mapSessionData(getGridData?.value?.data, selectedSummary, checked)
        );
    }, [isDateChange, getGridData, selectedSummary, checked]);

    React.useEffect(() => {
        document.querySelectorAll('tr').forEach((tr) => {
            const divWithAriaChecked = tr.querySelector(
                'td > div > div[aria-checked="true"]'
            );
            if (divWithAriaChecked) {
                tr.classList.add('bg-[#48ABCA78]', 'text-black');
            }
        });
    });

    const onSelectionChange: (e: SelectionChangeEvent) => void = (e) => {
        const lastSelectedSession = e?.value[e?.value?.length - 1];
        const lastSessionRunId = lastSelectedSession?.sessionRunId;
        const lastSessionName = lastSelectedSession?.sessionName;

        dispatch(getTargetRunSummary({ sessionRunId: lastSessionRunId }));

        const sessionObj: any = {};
        const sendObject: any = {};
        const selectObject: any = {};

        e?.value.forEach((session: any) => {
            const uniqueKey = `${session.sessionName}_${session.sessionRunId}`;
            sessionObj[uniqueKey] = session.sessionRunId;
            sendObject[uniqueKey] = session.sessionRunId;
            selectObject[uniqueKey] = session;
        });

        dispatch(
            showSelectedData({
                ...showSelected,
                [checked]: { ...showSelected[checked], ...e?.value },
            })
        );

        setSendDataForTarget(sendObject);
        setSelectedName(lastSessionName);
        setSelectedProducts(e.value);
        setIsSelected(e.value.length > 0);
    };

    if (getGridData?.loading) {
        return <LoaderComponent />;
    } else {
        return (
            <>
                <DataTableComponent
                    getGridData={getGridData}
                    selectedProducts={selectedProducts}
                    onSelectionChange={onSelectionChange}
                />
                <ViewTargetComponent
                    isSelected={isSelected}
                    selectedName={selectedName}
                    setIsSelected={setIsSelected}
                />
                <FooterComponent
                    onClose={onClose}
                    isEditingGrid={isEditingGrid}
                    dispatch={dispatch}
                    sendDataForTarget={sendDataForTarget}
                    allTargets={allTargets}
                    selectedSummary={selectedSummary}
                />
            </>
        );
    }
};

export default SelectSummaryGrid;
