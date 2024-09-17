import React, { useState, useEffect } from 'react';
import StockChart from '../ChartComponent/StockChart.jsx';
import chartApis from '../../api/services/chart.service';

export default function TargetGraphComponent({
    id,
    fromDate,
    toDate,
    dataType,
}: {
    id: string;
    fromDate: string | Date;
    toDate: string | Date;
    dataType: string;
}): React.JSX.Element {
    const [chartData, setChartData] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        if (fromDate && toDate) {
            (async () => {
                try {
                    const response = await chartApis.getTargetTrialData({
                        id,
                        fromDate,
                        toDate,
                        dataType,
                    });
                    setChartData(response?.data?.data || {});
                    setErrorMessage('');
                } catch (err) {
                    setChartData({});
                    setErrorMessage('Error fetching chart data.');
                }
            })();
        } else {
            setErrorMessage('Please select date range to view data.');
        }
    }, [fromDate, toDate, id]);
    return (
        <StockChart
            data={chartData}
            errorMessage={errorMessage}
            dataType={dataType}
        />
    );
}
