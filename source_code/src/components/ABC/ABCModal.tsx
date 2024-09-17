import * as React from 'react';
import Modal, { ModalBody, ModalHeader } from '../Generics/Modal';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import ABCData from '../../api/services/ABC/getABCData.service';
import { useSelector } from 'react-redux';
import search from '../../assets/img/search.svg';
import { CustomDate } from '../Generics/Grid/CommonFunction';
import LoaderComponent from '../LoaderComponent';
import CrossIcon from '../../assets/img/CrossIcon.svg';

export default function ABCModal({
    open,
    onClose,
}: {
    open: boolean;
    onClose: any;
}): React.JSX.Element {
    const [searchData, setSearchData] = React.useState<any>({});
    const [checkFilter, setCheckFilter] = React.useState(false);
    const [updatedData, setUpdatedData] = React.useState<any>([]);
    const [manageIcon, setManageIcon] = React.useState<any>([]);
    const programBookData = useSelector(
        ({ getProgramBookDataById }: any) => getProgramBookDataById?.value?.data
    );
    const [getGridData, setGetGridData] = React.useState<any>(false);

    const updateOptions = async (): Promise<void> => {
        const data = { programBookId: programBookData?.id };
        const res = await ABCData.abc(data);
        setGetGridData(res?.data?.data);
        setUpdatedData(res?.data?.data);
    };

    React.useEffect(() => {
        updateOptions();
    }, []);

    const filterValues = async (
        gridKey: string,
        searchKey: string,
        dateValue?: any
    ): Promise<void> => {
        const result = searchKey.toLowerCase();
        const gridData = getGridData[gridKey];

        if (searchKey === 'Date' && dateValue) {
            const filterData = gridData?.filter((item: any) => {
                const c1 = item?.[result];
                const c2 = dateValue;
                if (c1 && c2) {
                    const date1 = new Date(c1);
                    const date2 = new Date(c2);
                    const newDate1 = new Date(
                        date1.getFullYear(),
                        date1.getMonth(),
                        date1.getDate()
                    );
                    const newDate2 = new Date(
                        date2.getFullYear(),
                        date2.getMonth(),
                        date2.getDate()
                    );
                    if (newDate1 && newDate2) {
                        return newDate1.getTime() === newDate2.getTime();
                    }
                }
            });
            setCheckFilter(true);
            setUpdatedData((prev: any) => ({ ...prev, [gridKey]: filterData }));
        } else if (searchKey === 'Note' && searchData?.[gridKey]?.[searchKey]) {
            const filterData = gridData?.filter((item: any) => {
                const c1 = item?.[result]?.toLowerCase();
                const c2 = searchData?.[gridKey]?.[searchKey]?.toLowerCase();
                if (c1 && c2) {
                    return c1.includes(c2);
                }
            });
            setCheckFilter(true);
            setUpdatedData((prev: any) => ({ ...prev, [gridKey]: filterData }));
        } else if (
            searchKey !== 'Note' &&
            searchKey !== 'Date' &&
            searchData?.[gridKey]?.[searchKey]
        ) {
            const filterData = gridData?.filter((item: any) => {
                const c1 = item?.[result]?.name?.toLowerCase();
                const c2 = searchData?.[gridKey]?.[searchKey]?.toLowerCase();
                if (c1 && c2) {
                    return c1.includes(c2);
                }
            });
            setCheckFilter(true);
            setUpdatedData((prev: any) => ({ ...prev, [gridKey]: filterData }));
        } else if (!searchData[gridKey]?.[searchKey]) {
            setCheckFilter(true);
            setUpdatedData((prev: any) => ({ ...prev, [gridKey]: gridData }));
        } else {
            setUpdatedData((prev: any) => ({ ...prev, [gridKey]: gridData }));
        }

        setManageIcon((prev: any) => ({
            ...prev,
            [gridKey]: {
                ...prev[gridKey],
                [searchKey]: true,
            },
        }));
    };
    const clearFilter = (gridKey: string, searchKey: string): void => {
        const gridData = getGridData[gridKey];
        setUpdatedData((prev: any) => ({ ...prev, [gridKey]: gridData }));
        setManageIcon((prev: any) => ({
            ...prev,
            [gridKey]: {
                ...prev[gridKey],
                [searchKey]: false,
            },
        }));
        setSearchData((prev: any) => ({
            ...prev,
            [gridKey]: {
                ...prev[gridKey],
                [searchKey]: '',
            },
        }));
    };
    const handleChange = (e: any, gridKey: string, searchKey: string): void => {
        setSearchData((prev: any) => ({
            ...prev,
            [gridKey]: {
                ...prev[gridKey],
                [searchKey]: e.target.value,
            },
        }));
        if (searchKey === 'Date') {
            filterValues(gridKey, searchKey, e.target.value);
        }
    };

    const renderHeader = (gridKey: string, header: string): any => {
        return (
            <div className="">
                <div>
                    <span className="ps-3 ">{header}</span>
                </div>
                {header !== 'Date' ? (
                    <div className="flex items-center mt-2 rounded-full">
                        <input
                            className="outline-none border-b-4 border-gray-400 text-sm text-stone-400 w-[15rem] rounded-full"
                            type="text"
                            value={searchData?.[gridKey]?.[header]}
                            placeholder="Search"
                            onChange={(e: any) =>
                                handleChange(e, gridKey, header)
                            }
                            style={{ backgroundColor: '#E5EFFB' }}
                        />
                        {manageIcon?.[gridKey]?.[header] ? (
                            <img
                                className="h-[1.2rem] relative end-8"
                                src={CrossIcon}
                                alt="Clear search"
                                onClick={() => clearFilter(gridKey, header)}
                            />
                        ) : (
                            <img
                                className="h-[1.6rem] relative end-8 mt-[.5rem]"
                                src={search}
                                alt="Search"
                                onClick={() => filterValues(gridKey, header)}
                            />
                        )}
                    </div>
                ) : (
                    <div className="mt-2 rounded-full">
                        <input
                            className="outline-none border-b-4 border-gray-400 text-sm w-[15rem] text-stone-400 rounded-full"
                            type="date"
                            value={searchData?.[gridKey]?.[header]}
                            placeholder="dd/mm/yyyy"
                            onChange={(e: any) =>
                                handleChange(e, gridKey, header)
                            }
                            style={{ backgroundColor: '#E5EFFB' }}
                        />
                    </div>
                )}
            </div>
        );
    };

    const columnDefinitionsGrid = [
        {
            header: 'Antecedent',
            body: (e: any) =>
                e?.antecedent?.name === 'Other'
                    ? e?.antecedentText
                    : e?.antecedent?.name,
        },
        {
            header: 'Behavior',
            body: (e: any) =>
                e?.behavior?.name === 'Other'
                    ? e?.behaviorText
                    : e?.behavior?.name,
        },
        {
            header: 'Consequence',
            body: (e: any) =>
                e?.consequence?.name === 'Other'
                    ? e?.consequenceText
                    : e?.consequence?.name,
        },
        {
            header: 'Note',
            body: (e: any) => e?.note,
        },
        {
            header: 'Date',
            body: (e: any) => CustomDate(e?.date),
        },
    ];

    const keysArray = Object.keys(getGridData);

    return (
        <Modal open={open} id={'add-Client-Doc-modal'} expandModal={false}>
            <ModalHeader
                title={'ABC Data'}
                onExpand={undefined}
                icon={false}
                onClose={onClose}
                closeIcon={true}
            />
            <ModalBody expandModal={false}>
                {getGridData ? (
                    keysArray?.length ? (
                        keysArray.map((gridKey: any, index: any) => (
                            <div key={index} className="mt-5">
                                <div className="flex justify-between items-center pl-1 pb-2 pr-3">
                                    <div className="flex space-x-2">
                                        <h3 className="font-semibold text-gray-800 w-full">
                                            {gridKey}
                                        </h3>
                                    </div>
                                </div>
                                <div className="bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem] rounded-md mb-2"></div>
                                <div className="card m-1 border border-[#E5E5E5] rounded shadow-md w-full">
                                    <DataTable
                                        value={
                                            checkFilter
                                                ? updatedData[gridKey]
                                                : getGridData[gridKey]
                                        }
                                        dataKey="id"
                                        emptyMessage="No customers found."
                                    >
                                        {columnDefinitionsGrid.map(
                                            (column: any) => (
                                                <Column
                                                    style={{
                                                        width: column.width
                                                            ? column.width
                                                            : '',
                                                        fontSize: '13px',
                                                        fontFamily: 'Lato',
                                                    }}
                                                    key={column.header}
                                                    header={renderHeader(
                                                        gridKey,
                                                        column.header
                                                    )}
                                                    body={(
                                                        rowData
                                                    ): React.JSX.Element => (
                                                        <div className="ps-3">
                                                            {column.body(
                                                                rowData
                                                            )}
                                                        </div>
                                                    )}
                                                />
                                            )
                                        )}
                                    </DataTable>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="w-[85rem]">
                            <h3>No Data Found.</h3>
                        </div>
                    )
                ) : (
                    <div className="w-[85rem]">
                        <LoaderComponent />
                    </div>
                )}
            </ModalBody>
        </Modal>
    );
}
