// LineChart.js

import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const LineChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // 파괴 함수
    const destroyChart = () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };

    // 이전 차트 파괴
    destroyChart();

    // 새로운 차트 생성
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: 'Exchange Rate',
            data: data.values,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false,
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

    // 컴포넌트가 언마운트될 때 차트 파괴
    return () => destroyChart();
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default LineChart;
