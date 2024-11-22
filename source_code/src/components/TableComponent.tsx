import React from "react";
import PaginationComponent from "./PaginationComponent";

interface TableComponentProps {
  Headers: Array<any>;
  rowData: Array<any>;
  currentPage?: number;
  setCurrentPage?: (page: number) => void;
  pageSize?: number;
  setPageSize?: (pageSize: number) => void;
  totalPages?: number;
  totalAdminCount?: Array<any>;
  pagination?: boolean;
  style?: any;
  oddRowStyle?: React.CSSProperties;
  evenRowStyle?: React.CSSProperties;
  greenTheme?: boolean;
  totalElement?: number;
  elementPerPage?: number
}

const TableComponent: React.FC<TableComponentProps> = ({
  Headers,
  rowData,
  currentPage = 0,
  setCurrentPage = () => { },
  totalPages = 1,
  pagination = true,
  style = {},
  oddRowStyle = {},
  evenRowStyle = {},
  greenTheme = false,
  totalElement = 10,
  elementPerPage = 10
}) => {

  const scrollbarStyles: React.CSSProperties = {
    overflow: "auto", // Enable scrolling
    scrollbarWidth: "none", // Firefox
    msOverflowStyle: "none", // IE and Edge
  };

  return (
    <div className="mb-2 mt-3 flex h-full text-sm mb-5">
      <div className="w-full">
        <div
          className={`w-full overflow-x-scroll ${rowData.length ? "rounded-lg" : "rounded-t-lg"} 2xl:max-w-none mt-2 border border-gray-100 md:overflow-auto`}
          style={rowData.length ? {} : scrollbarStyles}
        >
          <table className="font-inter w-full table-auto overflow-scroll border text-left text-sm md:overflow-auto">
            {greenTheme ? (
              <thead className="w-full rounded-lg text-base font-semibold text-white">
                <tr className="bg-[#07321B] text-sm">
                  {Headers.map((item, index) => {
                    return (
                      <th
                        key={index}
                        className={`whitespace-nowrap px-3 py-3 font-normal text-white ${style}`}
                        style={{
                          width: "max-content",
                        }}
                      >
                        {item.field}
                      </th>
                    );
                  })}
                </tr>
              </thead>
            ) : (
              <thead className="w-full rounded-lg text-base font-semibold text-white">
                <tr className="bg-[#F3F6F9] text-sm">
                  {Headers.map((item, index) => {
                    return (
                      <th
                        key={index}
                        className={`whitespace-nowrap px-3 py-3 font-normal text-[#7B7887] ${style}`}
                        style={{
                          width: "max-content",
                        }}
                      >
                        {item.field}
                      </th>
                    );
                  })}
                </tr>
              </thead>
            )}

            <tbody className="bg-white text-sm">
              {rowData?.map((data, index) => (
                <tr
                  key={index}
                  style={(index + 1) % 2 !== 0 ? oddRowStyle : evenRowStyle}
                >
                  {Object.entries(data).map(([key], index) => {
                    return (
                      <td
                        key={index}
                        className={`whitespace-nowrap px-3 py-2 font-normal text-black`}
                      >
                        {data[key]}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {rowData.length ? null : (
          <div className="align-center flex h-[100px] w-full justify-center rounded-b-lg border bg-white">
            <div className="my-auto">Nothing to display</div>
          </div>
        )}
        {pagination ? (
          <div className="mt-1.5 mt-5 flex w-full flex-col items-center justify-center gap-5 px-1 sm:flex-row sm:justify-between">
            <div className="flex items-center justify-center">
              {/* <div>Rows</div>
              <select
                name="example"
                id="example"
                onChange={handlePageSizeChange}
                className="mx-2 h-[30px] rounded-md border border-gray-200 px-5"
              >
                {rowCount.map((row) => (
                  <option selected={pageSize === row} value={row}>
                    {row}
                  </option>
                ))}
              </select> */}
              <div>Showing results {currentPage * 10 + 1} to {currentPage * 10 + elementPerPage} of {totalElement}</div>
            </div>
            <PaginationComponent
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TableComponent;
