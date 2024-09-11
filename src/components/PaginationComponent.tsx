import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import React from 'react'

interface PaginationConponentProps {
    currentPage: any;
    setCurrentPage: (value: number) => void;
    totalPages: number;
}

const PaginationComponent: React.FC<PaginationConponentProps> = ({ currentPage, setCurrentPage, totalPages }) => {

    const handlePageChange = (value: any) => {
        setCurrentPage(value-1);
    }



    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const previousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        } else {
            setCurrentPage(0);
        }
    };

    const renderPageNumbers = () => {
        let pages = [];

        if (totalPages <= 6) {
            // Show all pages if there are 6 or fewer pages
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show the first three pages
            for (let i = 1; i <= 3; i++) {
                pages.push(i);
            }

            // Add dots if the current page is greater than 4
            if (currentPage > 4) {
                pages.push('...');
            }

            // Add current and next pages, up to last page
            let start = Math.max(currentPage - 1, 4);
            let end = Math.min(currentPage + 1, totalPages - 1);

            if (start > 4) {
                for (let i = start; i <= end; i++) {
                    pages.push(i);
                }
            }

            // Add dots if there are more pages after the current set
            if (end < totalPages - 1) {
                pages.push('...');
            }

            // Always show the last page
            if (totalPages > 3) {
                pages.push(totalPages);
            }
        }

        return pages.map((page, index) => (
            <button
                key={index}
                onClick={() => page !== '...' && handlePageChange(page)}
                className={`flex text-center py-1 px-3 justify-center rounded-[6px]  border-[1px] border-solid border-[#E4E4EB] ${page == (currentPage + 1) ? 'bg-lime-500 text-white' : 'text-black'} `}

            >
                {page}
            </button>
        ));
    };

    return (
        <div className="flex ml-auto backdrop-blur-md">
            <ul
                className="flex justify-center items-center gap-x-[10px] z-30"
                role="navigation"
                aria-label="Pagination"
            >
                <li
                    className={` prev-btn flex cursor-pointer items-center bg-transparent justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] disabled] 
                                    ${currentPage == 0
                            ? "bg-[#cccccc] pointer-events-none"
                            : " cursor-pointer"
                        }
                                  `}
                    onClick={previousPage}
                >
                    <ChevronsLeft />
                </li>
                <li
                    className={` prev-btn flex cursor-pointer bg-transparent items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] disabled] ${currentPage == 0
                        ? "bg-[#cccccc] pointer-events-none"
                        : " cursor-pointer"
                        }
    `}
                    onClick={previousPage}
                >
                    <ChevronLeft />
                </li>
                {
                    renderPageNumbers()
                }
                <li
                    className={`flex items-center bg-transparent cursor-pointer justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] ${currentPage == totalPages - 1
                        ? "bg-[#cccccc] pointer-events-none"
                        : " cursor-pointer"
                        }`}
                    onClick={nextPage}
                >
                    <ChevronRight />
                </li>
                <li
                    className={` prev-btn flex cursor-pointer bg-transparent items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] disabled] ${currentPage == 0
                        ? "bg-[#cccccc] pointer-events-none"
                        : " cursor-pointer"
                        }
    `}
                    onClick={previousPage}
                >
                    <ChevronsRight />
                </li>
            </ul>
        </div>
    )
}

export default PaginationComponent
