import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const LineChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const destroyChart = () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };

    destroyChart();

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: '환율',
            data: data.values,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderWidth: 2,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: [
            {
              type: 'linear',
              position: 'bottom',
            },
          ],
        },
      },
    });
    console.log(data);
    return () => destroyChart();
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default LineChart;
