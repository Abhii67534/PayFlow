// Graph.jsx
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { chartData } from '../helper/helper'; // Import the helper function

Chart.register(ArcElement, Tooltip, Legend);

function Graph({ transactions }) {
    const dataConfig = chartData(transactions);

    return (
        <div className='relative h-[300px]'>
            <Doughnut 
                data={dataConfig.data} 
                options={dataConfig.options} 
            />
        </div>
    );
}

export default Graph;
