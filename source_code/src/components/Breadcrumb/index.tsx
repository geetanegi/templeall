import * as React from 'react';
import { Link } from 'react-router-dom';

export default function Breadcrumb({
    name,
    pageName,
    routeName,
}: {
    name: string;
    pageName: string;
    routeName: string;
}): React.JSX.Element {
    return (
        <>
            <ol
                className="flex items-center whitespace-nowrap"
                aria-label="Breadcrumb"
            >
                <li className="inline-flex items-center">
                    <Link
                        to={routeName}
                        className="flex items-center text-sm text-[#0D7899] hover:text-[#0D7899] focus:outline-none focus:text-[#0D7899]"
                    >
                        {pageName} /
                    </Link>
                </li>
                <li
                    className="inline-flex pl-1 items-center text-sm font-semibold text-gray-800 truncate"
                    aria-current="page"
                >
                    {name?.length ? name : 'Session Name'}
                </li>
            </ol>
            <hr className="mt-2 mb-2" />
            {/* <div className="Line48 w-full pl-5 h-0 border border-[#3d3d3d]"></div> */}
        </>
    );
}
