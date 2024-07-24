import React from 'react';
import { Line } from 'react-chartjs-2';

const RoverPathChart = ({ chartData }) => {
  return (
    <div>
      <h2>Rover Path Chart</h2>
      <Line
        data={chartData}
        options={{
          scales: {
            x: {
              type: 'linear',
              position: 'bottom',
            },
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default RoverPathChart;
