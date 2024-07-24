import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
} from 'chart.js';
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const RoverNavigator = () => {
  const [inputData, setInputData] = useState('');
  const [outputData, setOutputData] = useState('');
  const [chartData, setChartData] = useState(null);

  const navigateRovers = (input) => {
    const lines = input.trim().split('\n');
    if (lines.length < 3) {
      setOutputData(
        'Invalid input. Please provide valid plateau coordinates and rover instructions.',
      );
      return;
    }

    const upperRightCoords = lines[0].split(' ').map(Number);
    const plateauMaxX = upperRightCoords[0];
    const plateauMaxY = upperRightCoords[1];

    const leftTurn = { N: 'W', W: 'S', S: 'E', E: 'N' };
    const rightTurn = { N: 'E', E: 'S', S: 'W', W: 'N' };
    const moveForward = {
      N: [0, 1],
      E: [1, 0],
      S: [0, -1],
      W: [-1, 0],
    };

    const isValidPosition = (x, y) => {
      return x >= 0 && x <= plateauMaxX && y >= 0 && y <= plateauMaxY;
    };

    const executeCommands = (x, y, orientation, commands) => {
      const path = [[x, y]];
      for (let command of commands) {
        if (command === 'L') {
          orientation = leftTurn[orientation];
        } else if (command === 'R') {
          orientation = rightTurn[orientation];
        } else if (command === 'M') {
          const [dx, dy] = moveForward[orientation];
          const newX = x + dx;
          const newY = y + dy;
          if (isValidPosition(newX, newY)) {
            x = newX;
            y = newY;
            path.push([x, y]);
          }
        }
      }
      return path;
    };

    const results = [];
    const paths = [];
    for (let i = 1; i < lines.length; i += 2) {
      const initialPosition = lines[i].split(' ');
      if (initialPosition.length !== 3) {
        setOutputData(
          'Invalid rover position. Please provide valid coordinates and orientation.',
        );
        return;
      }

      let [x, y, orientation] = initialPosition;
      x = parseInt(x);
      y = parseInt(y);
      if (
        !isValidPosition(x, y) ||
        !['N', 'E', 'S', 'W'].includes(orientation)
      ) {
        setOutputData(
          'Invalid rover position or orientation. Please provide valid data.',
        );
        return;
      }

      const commands = lines[i + 1];
      if (!/^[LRM]*$/.test(commands)) {
        setOutputData('Invalid commands. Only L, R, and M are allowed.');
        return;
      }

      const path = executeCommands(x, y, orientation, commands);
      paths.push(path);
      results.push(
        `${path[path.length - 1][0]} ${path[path.length - 1][1]} ${orientation}`,
      );
    }

    setOutputData(results.join('\n'));

    const chartPathData = paths.flat();
    setChartData({
      labels: chartPathData.map((_, index) => index + 1),
      datasets: [
        {
          label: 'Rover Path',
          data: chartPathData.map(([x, y]) => ({ x, y })),
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: false,
          pointRadius: 5,
        },
      ],
    });
  };

  const handleInputChange = (e) => {
    setInputData(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    navigateRovers(inputData);
  };

  return (
    <div>
      <h1>Mars Rover Navigator</h1>
      <form onSubmit={handleFormSubmit}>
        <textarea
          value={inputData}
          onChange={handleInputChange}
          rows='10'
          cols='50'
          placeholder='Enter the input data...'
        />
        <br />
        <button type='submit'>Navigate Rovers</button>
      </form>
      <h2>Output:</h2>
      <pre role='region'>{outputData}</pre>

      {chartData && (
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
      )}
    </div>
  );
};

export default RoverNavigator;
