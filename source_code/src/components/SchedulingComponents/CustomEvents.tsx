/* eslint-disable max-len */
import * as React from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-calendar/dist/Calendar.css';
import eventIcon from '../../assets/img/event.svg';
import billedTickIcon from '../../assets/img/billedTick.svg';
import { usePermission } from '../../hooks/usePermission';
import { useSelector } from 'react-redux';
export default function CustomEvents({
    event,
}: {
    event?: any;
}): React.JSX.Element {
    const { permissions } = usePermission({
        itemsToCheck: ['view_others_calendar'],
    });
    const allEvents = useSelector(
        ({ getServices }: any) => getServices?.scheduledEvents
    );
    const eventDate = new Date(event?.start);
    const isDateInArray = (array: any, date: any): any => {
        return array.some((item: any) => {
            const itemDate = new Date(item.start);
            return (
                itemDate.getFullYear() === date.getFullYear() &&
                itemDate.getMonth() === date.getMonth() &&
                itemDate.getDate() === date.getDate()
            );
        });
    };
    const background =
        event?.view === 'month' || event?.availabilityShow
            ? 'transparent'
            : event?.backgroundColorWeek;
    const customClass = event?.availabilityShow
        ? 'custom-border-only-event'
        : 'customEvents';
    return (
        <div
            data-testid="custom-events"
            className={customClass}
            style={{
                backgroundColor: background,
                borderLeft: event?.availabilityShow ? '3px solid' : '2px solid',
                borderColor: event?.backgroundColorMonth,
                height: '100%',
                position: 'relative',
                paddingRight: '7px',
                paddingTop: event?.view !== 'month' ? '5px' : '',
                width: event?.availabilityShow ? '1rem' : '',
                marginLeft: isDateInArray(allEvents, eventDate) ? '3rem' : '',
            }}
        >
            {!event?.sessionNoteBilling ? (
                <div
                    className="relative"
                    onClick={() => event.onClick(event.id)}
                >
                    <img
                        src={eventIcon}
                        className={`w-[1rem] absolute end-0 ${!permissions?.view_others_calendar ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    />
                </div>
            ) : (
                !event?.slotselection && (
                    <div
                        className="relative"
                        onClick={() => event.onClick(event.id)}
                    >
                        <img
                            src={billedTickIcon}
                            className={`w-[1rem] absolute end-0 ${!permissions?.view_others_calendar ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                        />
                    </div>
                )
            )}
            {event?.title && (
                <div
                    className="flex flex-row ml-2"
                    onClick={() => event.onClick(event.id)}
                >
                    {!event?.availabilityShow && (
                        <div
                            style={{
                                backgroundColor: event?.backgroundColorMonth,
                            }}
                            className="w-[0.5rem] h-[0.5rem] rounded-full text-transparent mt-1 mr-1"
                        >
                            1
                        </div>
                    )}
                    <div className="flex flex-col w-[9.6rem]">
                        <label>{event?.title}</label>
                        {event?.isBillable && (
                            <div className="flex space-x-1">
                                <label className="font-light text-gray-500">
                                    Billing Code:
                                </label>
                                <label>{event?.authorizationCode}</label>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
