import React, { useEffect, useState } from 'react';
import chartApis from '../../api/services/chart.service';
import ChartComponent from '../ChartComponent/index.jsx';

export default function Graphs({
    itemType,
    id,
    fromDate,
    toDate,
    idType,
}: {
    itemType: string;
    id: string;
    fromDate: string | Date;
    toDate: string | Date;
    idType: string;
}): React.JSX.Element {
    const [chartData, setChartData] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        if (fromDate && toDate) {
            (async () => {
                try {
                    const response = await chartApis[
                        itemType === 'program'
                            ? 'getAllMasteredPrograms'
                            : 'getAllMasteredTargets'
                    ]({
                        id,
                        fromDate,
                        toDate,
                        idType,
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
    }, [fromDate, toDate, itemType]);

    return (
        <ChartComponent
            data={chartData}
            errorMessage={errorMessage}
            itemType={itemType}
        />
    );
}
