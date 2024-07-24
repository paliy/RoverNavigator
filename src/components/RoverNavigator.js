import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
} from 'chart.js';
import React, { useCallback, useState } from 'react';

import { executeCommands, isValidPosition } from '../helpers';
import RoverPathChart from './RoverPathChart';
import TextAreaInput from './TextAreaInput';

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

    const [plateauMaxX, plateauMaxY] = lines[0].split(' ').map(Number);
    const results = [];
    const paths = [];

    for (let i = 1; i < lines.length; i += 2) {
      const [x, y, orientation] = lines[i].split(' ');
      if (
        !isValidPosition(parseInt(x), parseInt(y), plateauMaxX, plateauMaxY) ||
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

      const path = executeCommands(
        parseInt(x),
        parseInt(y),
        orientation,
        commands,
        plateauMaxX,
        plateauMaxY,
      );
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

  const handleInputChange = useCallback((e) => {
    setInputData(e.target.value);
  }, []);

  const handleFormSubmit = useCallback(
    (e) => {
      e.preventDefault();
      navigateRovers(inputData);
    },
    [inputData],
  );

  return (
    <div>
      <h1>Mars Rover Navigator</h1>
      <form onSubmit={handleFormSubmit}>
        <TextAreaInput value={inputData} onChange={handleInputChange} />
        <br />
        <button type='submit'>Navigate Rovers</button>
      </form>
      <h2>Output:</h2>
      <pre role='region'>{outputData}</pre>

      {chartData && <RoverPathChart chartData={chartData} />}
    </div>
  );
};

export default RoverNavigator;
