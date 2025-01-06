import React, { useState } from "react";
import PaginationComponent from "./PaginationComponent";
import { EllipsisVertical, MoveDown, MoveUp } from "lucide-react";

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
  thirdRowStyle?: React.CSSProperties;
  secondRowStyle?: React.CSSProperties;
  firstRowStyle?: React.CSSProperties;
  greenTheme?: boolean;
  totalElement?: number;
  elementPerPage?: number;
  handleSorting?: (sortDir: string | null, sortBy: string | null) => void
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
  firstRowStyle = {},
  secondRowStyle = {},
  thirdRowStyle = {},
  greenTheme = false,
  totalElement = 10,
  elementPerPage = 10,
  handleSorting = () => { }
}) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const clearSorting = () => {
    setSortConfig({ key: null, direction: "asc" });
    handleSorting(null, null);
    setIsDropdownOpen(false);
  };

  const scrollbarStyles: React.CSSProperties = {
    overflow: "auto", // Enable scrolling
    scrollbarWidth: "none", // Firefox
    msOverflowStyle: "none", // IE and Edge
  };

  const styleForRow = (index: number) => {
    if (index === 0) {
      return firstRowStyle;
    } else if (index === 1) {
      return secondRowStyle;
    } else if (index === 2) {
      return thirdRowStyle;
    } else if (index > 2) {
      return oddRowStyle;
    }
  };

  return (
    <div className="mb-2 mt-[16px] flex h-full text-sm mb-1">
      <div className="w-full">
        <div
          className={`w-full overflow-x-scroll ${rowData.length ? "rounded-lg" : "rounded-t-lg"} 2xl:max-w-none  border border-gray-100 md:overflow-auto`}
          style={rowData.length ? {} : scrollbarStyles}
        >
          <table className="font-inter w-full table-auto overflow-scroll border text-left text-sm md:overflow-auto">
            {greenTheme ? (
              <thead className="w-full rounded-lg text-base font-semibold text-white">
                <tr className="bg-[#07321B] text-sm">
                  {Headers.map((item, index) => (
                    <th
                      key={index}
                      className={`whitespace-nowrap px-3 py-3 font-normal text-white ${style}`}
                      style={{
                        width: "max-content",
                        cursor: "pointer",
                      }}
                    >
                      {item.field}
                      {sortConfig.key === item.field && (
                        <span>
                          {sortConfig.direction === "asc" ? <MoveUp /> : <MoveDown />}
                        </span>
                      )}
                    </th>
                  ))}
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
                          cursor: item.isSort ? "pointer" : "default",
                        }}

                      >
                        <div className="flex">
                        <div className="flex w-full items-center gap-3"
                          onClick={() => {
                            if (item.isSort) {
                              const isSameColumn = sortConfig.key === item.key;
                              const newDirection: "asc" | "desc" = isSameColumn && sortConfig.direction === "asc" ? "desc" : "asc";

                              const updatedSortConfig = { key: item.key, direction: newDirection };
                              setSortConfig(updatedSortConfig);

                              // Call handleSorting with the updated sort direction and key
                              handleSorting(updatedSortConfig.direction, updatedSortConfig.key);
                            }
                          }}
                        >
                          {item.field}
                          {sortConfig.key === item.key && (
                            <span>
                              {sortConfig.direction === "asc" ? <MoveUp size={14} /> : <MoveDown size={14} />}
                            </span>
                          )}
                        </div>
                        {item.key === sortConfig.key && (
                        <div className="relative ml-auto">
                          <EllipsisVertical
                            onClick={toggleDropdown}
                            size={20}
                            className="cursor-pointer "
                          />
                          {isDropdownOpen && (
                            <div className="absolute top-6 right-0 z-10 w-32 rounded-md border bg-white shadow-md">
                              <ul>
                                <li
                                  onClick={clearSorting}
                                  className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                                >
                                  Clear Sorting
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                        </div>
                      </th>


                    );
                  })}
                </tr>
              </thead>
            )}

            <tbody className="bg-white text-sm">
              {rowData?.map((data, index) => (
                <tr key={index} style={styleForRow(index)}>
                  {Object.entries(data).map(([key], index) => (
                    <td key={index} className={`whitespace-nowrap px-3 py-2 font-normal text-black`}>
                      {data[key]}
                    </td>
                  ))}
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

        {pagination && (
          <div className="mt-4 flex w-full flex-col items-center justify-center gap-5 sm:flex-row sm:justify-between">
            <div className="flex items-center justify-center">
              <div>
                Showing results {currentPage * 10 + 1} to {currentPage * 10 + elementPerPage} of {totalElement}
              </div>
            </div>
            <PaginationComponent currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TableComponent;
