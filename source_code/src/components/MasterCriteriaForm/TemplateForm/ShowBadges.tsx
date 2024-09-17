import React from 'react';
import crossBadge from '../../../assets/img/crossBadge.svg';

function ShowBadges({
    badges,
    setBadges,
    handleBadgeClick,
}: {
    badges?: any;
    setBadges?: any;
    handleBadgeClick?: any;
}): React.JSX.Element {
    return (
        <div className="space-x-2 space-y-4" data-testid={`show-badges`}>
            {badges?.map((item: any, index: any) => (
                <span
                    key={index}
                    className="inline-flex items-center gap-x-1.5 py-2 ps-4 pe-3 rounded-full text-xs font-medium bg-[#EAEAEA] text-gray-700"
                >
                    {item}
                    <button
                        type="button"
                        onClick={() =>
                            handleBadgeClick(item, badges, setBadges)
                        }
                        data-testid={`show-badges-${index}`}
                        className="flex-shrink-0 text-black fill-black size-4 inline-flex items-center justify-center rounded-full hover:bg-blue-200 focus:outline-none focus:bg-blue-200 focus:text-blue-500"
                    >
                        <span className="sr-only">Remove badge</span>
                        <img
                            className="flex-shrink-0"
                            src={crossBadge}
                            alt="clear search"
                        />
                    </button>
                </span>
            ))}
        </div>
    );
}

export default ShowBadges;
