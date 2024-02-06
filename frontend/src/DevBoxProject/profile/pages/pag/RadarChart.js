// RadarChart.js

import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const RadarChart = ({ data }) => {
    useEffect(() => {
        const canvas = document.getElementById('radarChart');
        const ctx = canvas.getContext('2d');

        if (window.myRadarChart) {
            window.myRadarChart.destroy();
        }

        window.myRadarChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: data.labels, // 변경된 레이블을 사용합니다.
                datasets: [{
                    label: 'My Dataset',
                    data: data.values,
                    fill: true,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgb(255, 99, 132)',
                    pointBackgroundColor: 'rgb(255, 99, 132)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(255, 99, 132)',
                }],
            },
            options: {
                elements: {
                    line: {
                        borderWidth: 3,
                    },
                },
            },
        });
    }, [data]);

    return (
        <canvas id="radarChart" width="200" height="200"></canvas>
    );
};

export default RadarChart;
