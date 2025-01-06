import React from "react";

interface alerts {
  message: string;
  onClose: () => void;
}

const WarningAlerts: React.FC<alerts> = ({ message, onClose }) => {
  return (
    <div
      id="alert-4"
      className="mb-2 flex items-center rounded-lg bg-yellow-50 p-2 text-yellow-800 dark:bg-gray-800 dark:text-yellow-300"
      role="alert"
    >
      <svg
        className="h-4 w-4 flex-shrink-0"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span className="sr-only">Info</span>
      <div className="ms-3 text-sm font-medium">{message}</div>
      <button
        type="button"
        className="-mx-1.5 -my-1.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-50 p-1.5 text-yellow-500 hover:bg-yellow-200 focus:ring-2 focus:ring-[#FFFF00] dark:bg-gray-800 dark:text-yellow-300 dark:hover:bg-gray-700"
        data-dismiss-target="#alert-4"
        aria-label="Close"
        onClick={onClose}
      >
        <span className="sr-only">Close</span>
        <svg
          className="h-3 w-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
          // onClick={onClose}
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
};

export default WarningAlerts;
