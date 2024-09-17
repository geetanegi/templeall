import moment, { utc } from 'moment';
import { useState } from 'react';

export const useTimer = (timeLimit: number = 0): any => {
    const [defaultState, setDefaultState] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
        timer: null,
        displayHour: '00',
        displayMinutes: '00',
        displaySeconds: '00',
        startTime: {},
        currentTime: {},
        timeInSecond: 0,
        totalTime: 0,
        started: false,
    });
    const [intervalObj, setIntervalObj] = useState<any>({});
    const resetTimer = (time: number): void => {
        setDefaultState((prev) => {
            clearInterval(intervalObj);
            const timeArr = moment('00:00:00', 'HH:mm:ss')
                .add(time, 'seconds')
                .format('HH:mm:ss')
                .split(':');
            const displayHour = timeArr[0];
            const displayMinutes = timeArr[1];
            const displaySeconds = timeArr[2];
            const hours = parseInt(displayHour);
            const minutes = parseInt(displayMinutes);
            const seconds = parseInt(displaySeconds);
            return {
                ...prev,
                timeInSecond: time,
                totalTime: time,
                displayHour,
                displayMinutes,
                displaySeconds,
                hours,
                minutes,
                seconds,
                started: false,
            };
        });
    };
    const updateTime = (): void => {
        setDefaultState((prev) => {
            const currentTime = utc();
            if (prev?.startTime) {
                const diffTime = currentTime.diff(prev?.startTime, 'seconds');

                const totalTime = diffTime
                    ? diffTime + prev?.timeInSecond
                    : diffTime;

                const timeArr = moment('00:00:00', 'HH:mm:ss')
                    .add(totalTime, 'seconds')
                    .format('HH:mm:ss')
                    .split(':');
                const displayHour = timeArr[0];
                const displayMinutes = timeArr[1];
                const displaySeconds = timeArr[2];
                const hours = parseInt(displayHour);
                const minutes = parseInt(displayMinutes);
                const seconds = parseInt(displaySeconds);
                return {
                    ...prev,
                    displayHour,
                    displayMinutes,
                    displaySeconds,
                    hours,
                    minutes,
                    seconds,
                    totalTime,
                    started: true,
                };
            }
            return { ...prev };
        });
    };
    const updateTimeFunc = (): void => {
        setDefaultState((prev: any) => {
            const timeInSecond = moment(
                `${prev.displayHour}:${prev.displayMinutes}:${prev.displaySeconds}`,
                'HH:mm:ss'
            ).diff(moment('00:00:00', 'HH:mm:ss'), 'seconds');
            if (timeLimit === 0 || timeInSecond < timeLimit) {
                updateTime();
            } else {
                setIntervalObj((prevInterval: any) => {
                    clearInterval(prevInterval);
                    return {};
                });
            }
            return { ...prev };
        });
    };
    const startTimer = (): void => {
        setDefaultState((prev) => ({
            ...prev,
            startTime: utc(),
            started: true,
        }));
        const interval = setInterval(updateTimeFunc, 1000);
        setIntervalObj(interval);
    };

    const stopTimer = (): void => {
        if (intervalObj) {
            clearInterval(intervalObj);
            setIntervalObj({});
            setDefaultState((prev) => ({
                ...prev,
                started: false,
                timeInSecond: moment(
                    `${prev.displayHour}:${prev.displayMinutes}:${prev.displaySeconds}`,
                    'HH:mm:ss'
                ).diff(moment('00:00:00', 'HH:mm:ss'), 'seconds'),
            }));
        }
    };

    return {
        timer: defaultState,
        startTimer,
        stopTimer,
        resetTimer,
    };
};
