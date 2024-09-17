/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect } from 'react';
import Highcharts from 'highcharts/highstock';
import moment from 'moment';
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type

// const data = {
//     0: 'Phase',
//     1: 'X axis',
//     2: 'Tooltip data',
//     3: 'Y axis',
//     4: 'sessions',
//     5: 'Prompts',
//     6: 'Trial count',
//     7: 'Total trials'
// }

export default function StockChart({ errorMessage, data, dataType }) {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const formatTrialResponse = (dataArr, type) => {
        if (type === 'Latency' || type === 'Duration') {
            return moment('00:00', 'mm:ss')
                .add(dataArr, 'seconds')
                .format('mm:ss');
        } else if (type === 'Time Sampling' || type === 'First Probe') {
            return `${dataArr}%`;
        } else return dataArr;
    };
    const getPlotBandsAndLines = (dataArr) => {
        const plotLines = [];
        const plotBands = [];
        dataArr?.phaseChangeData?.forEach((dataPoint) => {
            plotLines.push({
                width: 2,
                value: moment(
                    dataPoint.startDate,
                    'YYYY-MM-DDTHH:mm:ss'
                ).valueOf(),
            });
            plotBands.push({
                color: 'transparent',
                label: {
                    text: dataPoint.phaseName,
                },
                from: moment(
                    dataPoint.startDate,
                    'YYYY-MM-DDTHH:mm:ss'
                ).valueOf(),
                to: moment(dataPoint.endDate, 'YYYY-MM-DDTHH:mm:ss').valueOf(),
            });
        });
        dataArr?.targetRenameData?.forEach((dataPoint) => {
            plotBands.push({
                color: 'transparent',
                label: {
                    text: dataPoint.name,
                    y: -6,
                },
                from: moment(
                    dataPoint.startDate,
                    'YYYY-MM-DDTHH:mm:ss'
                ).valueOf(),
                to: dataPoint?.endDate
                    ? moment(dataPoint.endDate, 'YYYY-MM-DDTHH:mm:ss').valueOf()
                    : moment().valueOf(),
            });
        });
        return { plotLines, plotBands };
    };
    const getSeries = (dataArr) => {
        const series = [];
        dataArr.forEach((plotItem) => {
            if (series.length) {
                if (series[series.length - 1].name === plotItem[0]) {
                    series[series.length - 1].data.push({
                        x: moment(plotItem[1], 'YYYY-MM-DDTHH:mm:ss').valueOf(),
                        y: Number(parseFloat(plotItem[3]).toFixed(2)),
                        tooltipData: plotItem[2],
                        phase: plotItem[0],
                        dataType: dataType,
                        sessions: plotItem[4],
                        prompts: plotItem[5],
                        trialNos: plotItem?.[6] || '',
                        totalSteps: plotItem?.[7] || '',
                    });
                } else {
                    series.push({
                        name: plotItem[0],
                        marker: {
                            enabled: true,
                            radius: 6,
                        },
                        data: [
                            {
                                x: moment(
                                    plotItem[1],
                                    'YYYY-MM-DDTHH:mm:ss'
                                ).valueOf(),
                                y: Number(parseFloat(plotItem[3]).toFixed(2)),
                                tooltipData: plotItem[2],
                                phase: plotItem[0],
                                dataType: dataType,
                                sessions: plotItem[4],
                                prompts: plotItem[5],
                                trialNos: plotItem?.[6] || '',
                                totalSteps: plotItem?.[7] || '',
                            },
                        ],
                        tooltip: {
                            valueDecimals: 2,
                        },
                    });
                }
            } else {
                series.push({
                    name: plotItem[0],
                    marker: {
                        enabled: true,
                        radius: 6,
                    },
                    data: [
                        {
                            x: moment(
                                plotItem[1],
                                'YYYY-MM-DDTHH:mm:ss'
                            ).valueOf(),
                            y: Number(parseFloat(plotItem[3]).toFixed(2)),
                            tooltipData: plotItem[2],
                            phase: plotItem[0],
                            dataType: dataType,
                            sessions: plotItem[4],
                            prompts: plotItem[5],
                            trialNos: plotItem?.[6] || '',
                            totalSteps: plotItem?.[7] || '',
                        },
                    ],
                    tooltip: {
                        valueDecimals: 2,
                    },
                });
            }
        });
        return { series };
    };
    const getTrialResponse = (item) => {
        let str = '';
        if (dataType === 'Latency' || dataType === 'Duration') {
            str += formatTrialResponse(item[2], dataType);
        } else {
            str += item[2];
        }
        if (item[4]) {
            if (dataType === 'Rate') {
                str += '/' + formatTrialResponse(item[4], 'Duration');
            } else {
                str += '/' + item[4];
            }
        }
        return str;
    };
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const getTrialsTableForTaskAnalysis = (
        trials,
        sessions,
        prompts,
        trialNos,
        totalSteps
    ) => {
        const trialsData = [];
        const sessionsArr = sessions.split(',');
        const promptsResponse = trials.split(',');
        const trialNosArr = trialNos.split(',');
        const totalStepsArr = totalSteps.split(',');
        sessionsArr.forEach((sessionId, index) => {
            if (trialsData.length) {
                if (trialsData[trialsData.length - 1][4] === sessionId) {
                    const isSameTrial =
                        trialsData[trialsData.length - 1][5] ===
                        trialNosArr[index];
                    if (isSameTrial) {
                        trialsData[trialsData.length - 1] = [
                            trialsData[trialsData.length - 1][0],
                            trialsData[trialsData.length - 1][1],
                            promptsResponse[index] === 'IND'
                                ? trialsData[trialsData.length - 1][2] + 1
                                : trialsData[trialsData.length - 1][2],
                            totalStepsArr[index],
                            sessionId,
                            trialNosArr[index],
                        ];
                    } else {
                        trialsData.push([
                            trialsData[trialsData.length - 1][0],
                            trialsData[trialsData.length - 1][1],
                            promptsResponse[index] === 'IND' ? 1 : 0,
                            totalStepsArr[index],
                            sessionId,
                            trialNosArr[index],
                        ]);
                    }
                } else {
                    trialsData.push([
                        trialsData[trialsData.length - 1][0] + 1,
                        1,
                        promptsResponse[index] === 'IND' ? 1 : 0,
                        totalStepsArr[index],
                        sessionId,
                        trialNosArr[index],
                    ]);
                }
            } else {
                trialsData.push([
                    1,
                    1,
                    promptsResponse[index] === 'IND' ? 1 : 0,
                    totalStepsArr[index],
                    sessionId,
                    trialNosArr[index],
                ]);
            }
        });
        let str =
            '<table style="border: 1px solid #ccc;"><th style="border: 1px solid #ccc;">Session No.</th><th style="border: 1px solid #ccc;">Trial Count</th><th style="border: 1px solid #ccc;">IND Steps</th><th style="border: 1px solid #ccc;">Total Steps</th>';
        trialsData.forEach((item) => {
            str += `<tr style="border: 1px solid #ccc;"><td style="border: 1px solid #ccc;">${item[0]}</td><td style="border: 1px solid #ccc;">${item[1]}</td>
            <td style="border: 1px solid #ccc;">
            ${item[2]}
                    </td>
                    <td style="border: 1px solid #ccc;">
            ${item[3]}
                    </td></tr>`;
        });
        str += '</table>';
        return str;
    };
    const getTrialsTable = (trials, sessions, prompts) => {
        const trialsData = [];
        const trialsArr = trials.split(',');
        const sessionsArr = sessions.split(',');
        const secondResponse = prompts ? prompts.split(',') : '';
        trialsArr.forEach((item, index) => {
            if (trialsData.length) {
                if (
                    trialsData[trialsData.length - 1][3] === sessionsArr[index]
                ) {
                    trialsData.push([
                        trialsData[trialsData.length - 1][0],
                        trialsData[trialsData.length - 1][1] + 1,
                        item,
                        sessionsArr[index],
                        Array.isArray(secondResponse)
                            ? secondResponse[index]
                            : '',
                    ]);
                } else {
                    trialsData.push([
                        trialsData[trialsData.length - 1][0] + 1,
                        1,
                        item,
                        sessionsArr[index],
                        Array.isArray(secondResponse)
                            ? secondResponse[index]
                            : '',
                    ]);
                }
            } else {
                trialsData.push([
                    1,
                    1,
                    item,
                    sessionsArr[index],
                    Array.isArray(secondResponse) ? secondResponse[index] : '',
                ]);
            }
        });
        let str =
            '<table style="border: 1px solid #ccc;"><th style="border: 1px solid #ccc;">Session No.</th><th style="border: 1px solid #ccc;">Trial Count</th><th style="border: 1px solid #ccc;">Trial Response</th>';
        trialsData.forEach((item) => {
            str += `<tr style="border: 1px solid #ccc;"><td style="border: 1px solid #ccc;">${item[0]}</td><td style="border: 1px solid #ccc;">${item[1]}</td><td style="border: 1px solid #ccc;">
            ${getTrialResponse(item)}
                    </td></tr>`;
        });
        str += '</table>';
        return str;
    };
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const getDataTypeTooltip = () => {
        if (dataType === 'Percent') {
            return 'Prompts Clicked in that phase: ';
        } else if (dataType === 'Duration') {
            return 'Duration played for: ';
        } else if (dataType === 'Frequency') {
            return 'Count of frequency selected: ';
        } else if (dataType === 'Score') {
            return 'Score: ';
        } else if (dataType === 'Rating Scale') {
            return 'Rating: ';
        } else if (dataType === 'Latency') {
            return 'Latency Duration: ';
        } else if (dataType === 'Time Sampling') {
            return 'Trial response - positive or negative: ';
        } else if (dataType === 'First Probe') {
            return 'Trial response - positive or negative: ';
        } else if (dataType === 'Task Analysis') {
            return 'Trial Data of session: ';
        } else return 'Count of frequency selected: ';
    };
    useEffect(() => {
        const { series } = getSeries(data?.chartData || []);
        const { plotLines, plotBands } = getPlotBandsAndLines(data);
        Highcharts.stockChart('container', {
            accessibility: {
                enabled: true,
            },
            rangeSelector: {
                selected: 1,
            },
            legend: {
                enabled: true,
                accessibility: {
                    enabled: true,
                },
            },
            yAxis: {
                opposite: false,
                gridLineColor: '#197F07',
                gridLineWidth: 0,
                lineWidth: 2,
                labels: {
                    enabled: true,
                    formatter: function () {
                        return this.value;
                    },
                },
                plotLines: [
                    {
                        color: '#FF0000',
                        width: 1,
                        value: 0,
                    },
                ],
                title: {
                    text: dataType,
                },
            },
            xAxis: {
                plotLines,
                plotBands,
                crosshair: {
                    snap: true,
                },
                labels: {
                    formatter: function () {
                        return moment(this.value).format(
                            'DD-MMM-YYYY HH:mm:ss'
                        );
                    },
                },
            },
            tooltip: {
                shared: false,
                split: false,
                enabled: true,
                useHTML: true,
                formatter: function () {
                    return (
                        'Phase: ' +
                        ' ' +
                        this.point.phase +
                        '<br>' +
                        'Date: ' +
                        moment(this.x).format('YYYY-MM-DD') +
                        '<br>' +
                        'Data Point: ' +
                        formatTrialResponse(this.y, dataType) +
                        '<br>' +
                        getDataTypeTooltip() +
                        '<br>' +
                        (dataType.toLowerCase() === 'task analysis'
                            ? getTrialsTableForTaskAnalysis(
                                  this.point.tooltipData,
                                  this.point.sessions,
                                  this.point.prompts,
                                  this.point.trialNos,
                                  this.point.totalSteps
                              )
                            : getTrialsTable(
                                  this.point.tooltipData,
                                  this.point.sessions,
                                  this.point.prompts
                              ))
                    );
                },
            },
            series,
        });
    }, [data]);
    return (
        <>
            {errorMessage ? (
                <div className="w-full h-[400px] flex justify-center items-center">
                    {errorMessage}
                </div>
            ) : null}
            <div
                id="container"
                className={`${errorMessage ? 'invisible h-0' : 'visible h-[500px]'} w-full `}
            ></div>
        </>
    );
}
