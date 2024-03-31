import React, { useEffect, useState } from 'react';
import {Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';


const BarChart = (props) => {
  const [key, setKey] = useState(0);

  const getBackgroundColor = (context) => {
    const value = 1;
    return value > 0 ? 'green' : 'red';
  };
  const [chartData, setChartData] = useState({
    labels: props.label,
    datasets: [
      {
        label: 'DNS Analysis',
        data: props.data,
        backgroundColor: getBackgroundColor,
        borderWidth: 0,
        borderRadius:6,
        border:0,
        width:2,
      
      },
    ],
  });
  useEffect(() => {
    setChartData({
      labels: props.label,
      datasets: [
        {
          label: 'DNS Analysis',
          data: props.data,
          backgroundColor: getBackgroundColor,
          borderRadius:6,
          border:0,
        },
      ],
    })
  }, [props.profit]);
 
  const options = {
    scales: {
      x: {
        grid: {
          drawBorder: false,
          drawTicks: false,
        },
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 100,
        },
        barPercentage: 0.1, // Adjust this value to control the width of the bars
        categoryPercentage: 0.2, // Adjust this value to control the space between bars
      },
      y: {
        beginAtZero: true,
        maxTicksLimit: 5,
      },
    },
    zoom: {
      enabled: true,
      mode: 'x',
    },
    pan: {
      enabled: true,
      mode: 'x',
    },
  };

  return (
    <div className='overflow-x-auto'>
      <Bar data={chartData} options={options}/>
    </div>
  );
};

export default BarChart;
