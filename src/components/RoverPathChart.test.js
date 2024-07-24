import { render, screen } from '@testing-library/react';
import React from 'react';

import RoverPathChart from './RoverPathChart';

import '@testing-library/jest-dom/extend-expect';

describe('RoverPathChart Component', () => {
  test('renders the chart with provided data', () => {
    const chartData = {
      labels: [1, 2, 3],
      datasets: [
        {
          label: 'Rover Path',
          data: [
            { x: 1, y: 2 },
            { x: 2, y: 3 },
            { x: 3, y: 4 },
          ],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: false,
          pointRadius: 5,
        },
      ],
    };

    render(<RoverPathChart chartData={chartData} />);

    const chartTitle = screen.getByText('Rover Path Chart');

    expect(chartTitle).toBeInTheDocument();
  });

  test('renders Line chart with correct data', () => {
    const chartData = {
      labels: [1, 2, 3],
      datasets: [
        {
          label: 'Rover Path',
          data: [
            { x: 1, y: 2 },
            { x: 2, y: 3 },
            { x: 3, y: 4 },
          ],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: false,
          pointRadius: 5,
        },
      ],
    };

    render(<RoverPathChart chartData={chartData} />);

    const canvas = screen.getByRole('img');

    expect(canvas).toBeInTheDocument();
  });

  test('handles empty chartData gracefully', () => {
    const chartData = {
      labels: [],
      datasets: [],
    };

    render(<RoverPathChart chartData={chartData} />);

    const chartTitle = screen.getByText('Rover Path Chart');

    expect(chartTitle).toBeInTheDocument();
  });
});
