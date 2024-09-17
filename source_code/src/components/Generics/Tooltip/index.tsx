import * as React from 'react';

export type TooltipPlacementProps =
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'middle';

type TooltipProps = {
    children?: React.ReactNode;
    title?: string;
    placement?: TooltipPlacementProps;
};

const getTailwindTooltipPosition = (
    placement: TooltipPlacementProps
): string => {
    switch (placement) {
        case 'top':
            return 'top-0 left-1/2 transform -translate-x-1/2 -translate-y-full';
        case 'right':
            return 'top-1/2 left-full transform -translate-y-1/2 translate-x-2';
        case 'bottom':
            return 'top-full left-1/2 transform -translate-x-1/2 translate-y-2';
        case 'left':
            return 'top-1/2 right-full transform -translate-y-1/2 -translate-x-2';
        case 'middle':
            return 'top-0 left-1/2 transform -translate-x-1/2 -translate-y-full';
        default:
            return '';
    }
};

const Tooltip = ({
    children,
    title,
    placement = 'top',
}: TooltipProps): React.JSX.Element => {
    const [isTooltipVisible, setTooltipVisible] = React.useState(false);

    const handleMouseEnter = (): void => {
        setTooltipVisible(true);
    };

    const handleMouseLeave = (): void => {
        setTooltipVisible(false);
    };

    const tooltipContentStyle: string =
        'absolute z-50 ' +
        (isTooltipVisible ? 'visible opacity-100' : 'invisible opacity-0') +
        ' transition-opacity duration-300 bg-gray-600 text-white py-1 px-2 text-xs font-medium rounded shadow-sm text-center whitespace-nowrap ' +
        getTailwindTooltipPosition(placement);

    return (
        <div
            className="relative inline-block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            <div className={tooltipContentStyle}>
                {title}
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
        </div>
    );
};

export default Tooltip;
