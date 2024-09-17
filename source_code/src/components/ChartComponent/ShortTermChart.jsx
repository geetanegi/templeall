/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect } from 'react';
import Highcharts from 'highcharts/highstock';
import moment from 'moment';
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function ShortTermChart({ errorMessage, data, type }) {
    const formatTrialResponse = (dataArr) => {
        if (type === 'Duration') {
            return moment('00:00', 'mm:ss')
                .add(dataArr, 'seconds')
                .format('mm:ss');
        } else if (type === 'Percent Accuracy') {
            return `${dataArr}%`;
        } else return dataArr;
    };
    const getSeries = (dataArr) => {
        const series = [];
        dataArr.forEach((plotItem) => {
            if (
                series.length &&
                series[series.length - 1].name === plotItem.Phase
            ) {
                series[series.length - 1].data.push({
                    x: moment(
                        plotItem['Start Time'],
                        'YYYY-MM-DDTHH:mm:ss'
                    ).valueOf(),
                    y: Number(parseFloat(plotItem.Score).toFixed(2)),
                    phase: plotItem.Phase,
                });
            } else {
                series.push({
                    name: plotItem.Phase,
                    marker: {
                        enabled: true,
                        radius: 6,
                    },
                    data: [
                        {
                            x: moment(
                                plotItem['Start Time'],
                                'YYYY-MM-DDTHH:mm:ss'
                            ).valueOf(),
                            y: Number(parseFloat(plotItem.Score).toFixed(2)),
                            phase: plotItem.Phase,
                        },
                    ],
                });
            }
        });
        return {
            series,
        };
    };
    useEffect(() => {
        const { series } = getSeries(data || []);
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
                    text: 'Data',
                },
            },
            xAxis: {
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
                        `${type}:` +
                        formatTrialResponse(this.y) +
                        '<br>'
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
