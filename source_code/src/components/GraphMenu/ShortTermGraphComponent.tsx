import React, { useState, useEffect } from 'react';
import chartApis from '../../api/services/chart.service';
import ShortTermChart from '../ChartComponent/ShortTermChart.jsx';

export default function ShortTermGraphComponent({
    id,
    fromDate,
    toDate,
    type,
}: {
    id: string;
    fromDate: string | Date;
    toDate: string | Date;
    type: string;
}): React.JSX.Element {
    const [chartData, setChartData] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        if (fromDate && toDate) {
            (async () => {
                try {
                    const response = await chartApis.getShortTermGraphData({
                        interventionPlanShortTermGoalId: id,
                        startDate: fromDate,
                        endDate: toDate,
                    });
                    setChartData(response?.data?.data || []);
                    setErrorMessage('');
                } catch (err) {
                    setChartData([]);
                    setErrorMessage('Error fetching chart data.');
                }
            })();
        } else {
            setErrorMessage('Please select date range to view data.');
        }
    }, [fromDate, toDate, id]);
    return (
        <ShortTermChart
            data={chartData}
            errorMessage={errorMessage}
            type={type}
        />
    );
}
