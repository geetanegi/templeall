import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function ChartComponent({ data, errorMessage, itemType }) {
    useEffect(() => {
        let newArr = [];
        for (let i = 0, len = data.length; i < len; i++) {
            newArr[i] = {
                x: Date.parse(data[i][0]),
                y: data[i][1],
                tooltipData: data[i][2],
            };
        }
        Highcharts.chart('container', {
            credits: false,
            title: {
                text: '',
            },
            yAxis: {
                gridLineColor: '#197F07',
                gridLineWidth: 0,
                lineWidth: 1,
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
                    text: 'Count',
                },
            },
            tooltip: {
                formatter: function () {
                    return (
                        '<b>' +
                        Highcharts.dateFormat('%d %b %Y', this.x) +
                        '</b> <br>' +
                        'Count:' +
                        ' ' +
                        this.y +
                        '<br>' +
                        `${itemType === 'program' ? 'Programs' : 'Targets'} added: ` +
                        this.point.tooltipData
                    );
                },
            },
            xAxis: {
                title: 'Date',
                type: 'datetime',
                labels: {
                    formatter: function () {
                        return Highcharts.dateFormat('%d %b %Y', this.value);
                    },
                },
            },
            plotOptions: {
                series: {
                    animation: false,
                },
            },
            series: [
                {
                    showInLegend: false,
                    data: newArr,
                    tooltip: {
                        valueDecimals: 2,
                    },
                },
            ],
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
