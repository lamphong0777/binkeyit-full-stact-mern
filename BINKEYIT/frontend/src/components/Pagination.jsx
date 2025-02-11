import { useState } from "react";

const Pagination = ({ totalPage, currentPage, onPageChange }) => {
    const pages = Array.from({ length: totalPage }, (_, i) => i + 1);

    return (
        <div className="flex justify-center items-center w-full py-3">
            <nav aria-label="Page navigation">
                <ul className="inline-flex -space-x-px text-sm">
                    {/* Previous Button */}
                    <li>
                        <button
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg 
                                ${currentPage === 1 ? "hidden opacity-50 cursor-not-allowed" : "hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"}
                            `}
                        >
                            Previous
                        </button>
                    </li>

                    {/* Page Numbers */}
                    {pages.map((page) => (
                        <li key={page}>
                            <button
                                onClick={() => onPageChange(page)}
                                className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 
                                    ${
                                    currentPage === page
                                        ? "text-white bg-green-800 hover:bg-blue-100 hover:text-green-700"
                                        : "text-gray-900 bg-white hover:bg-gray-500 hover:text-white"
                                }
                                `}
                            >
                                {page}
                            </button>
                        </li>
                    ))}

                    {/* Next Button */}
                    <li>
                        <button
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage === totalPage}
                            className={`-z-10 flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg 
                                ${currentPage === totalPage ? "hidden cursor-not-allowed" : "hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"}
                            `}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;
