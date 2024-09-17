/* eslint-disable max-len */
import * as React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';

export default function Breadcrumb({
    name,
}: {
    name?: any;
}): React.JSX.Element {
    return (
        <>
            <ol
                className="flex items-center whitespace-nowrap"
                aria-label="Breadcrumb"
                data-testid="bread-crumb"
            >
                <li className="inline-flex items-center">
                    <Link
                        to={ROUTES.masterCriteriaTemplate}
                        className="flex items-center text-sm text-[#0D7899] hover:text-[#0D7899] focus:outline-none focus:text-[#0D7899]"
                    >
                        Mastery Criteria /
                    </Link>
                </li>
                <li
                    className="inline-flex pl-1 items-center text-sm font-semibold text-gray-800 truncate"
                    aria-current="page"
                >
                    {name?.length ? name : 'Criteria Name'}
                </li>
            </ol>
        </>
    );
}
