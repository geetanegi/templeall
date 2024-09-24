import React from 'react'
import PaginationComponent from './PaginationComponent';

interface TableComponentProps {
    Headers: Array<any>;
    rowData: Array<any>;
    currentPage: number;
    setCurrentPage: (page: number) => void
    pageSize: number;
    setPageSize: (pageSize: number) => void
    totalPages: number;
    totalAdminCount: Array<any>
}

const TableComponent: React.FC<TableComponentProps> = ({ Headers, rowData, currentPage, setCurrentPage, totalPages, pageSize, setPageSize, totalAdminCount }) => {

    const rowCount = Array.from({ length: 10 }, (_, index) => index + 1)

    const totalPage = (rowData.length >= pageSize) ? Math.ceil(totalAdminCount.length / pageSize) : 1;

    const handlePageSizeChange = (value: any) => {
        setCurrentPage(0)
        setPageSize(value.target.value)
    }


    return (
        <div className="min-h-screen h-full flex mt-3 pb-14 text-sm">
            <div className="w-full  px-2">
                <div className={`w-full overflow-x-scroll ${rowData.length ? "rounded-lg " : "rounded-t-lg"} border border-gray-100  md:overflow-auto  2xl:max-w-none mt-2`}>
                    <table className="table-auto overflow-scroll md:overflow-auto w-full text-left font-inter border text-sm ">
                        <thead className="rounded-lg text-base text-white font-semibold w-full">
                            <tr className="bg-[#F3F6F9] text-sm">
                                {
                                    Headers.map((item, index) => {
                                        return (
                                            <th key={index} className="py-3 px-3 text-[#7B7887] font-normal whitespace-nowrap">
                                                {item.field}
                                            </th>
                                        )
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody className='bg-white text-sm'>
                            {rowData?.map((data, index) => (
                                <tr key={index} >
                                    {
                                        Object.entries(data).map(([key], index) => {
                                            return (
                                                <td
                                                    key={index}
                                                    className={`py-2 px-3 font-normal  whitespace-nowrap text-black`}
                                                >
                                                    {data[key]}
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
                {
                    rowData.length ? null : <div className='flex justify-center h-[100px] align-center border rounded-b-lg bg-white w-full'><div className='my-auto'>Nothing to display</div></div>
                }
                <div className="w-full  flex justify-center mt-5 sm:justify-between flex-col sm:flex-row gap-5 mt-1.5 px-1 items-center">
                    <div className='flex  items-center  justify-center'>
                        <div >Page</div>
                        <select
                            name="example"
                            id="example"
                            onChange={handlePageSizeChange}
                            className='border border-gray-200  h-[30px]  px-5 mx-2 rounded-md'>
                            {
                                rowCount.map((row) => (
                                    <option selected={pageSize === row} value={row}>{row}</option>
                                ))
                            }
                        </select>
                        <div>of 10</div>
                    </div>
                    <PaginationComponent
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPages ? totalPages : totalPage}
                    />
                </div>
            </div>
        </div>
    );
}

export default TableComponent
