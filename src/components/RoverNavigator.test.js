import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import RoverNavigator from './RoverNavigator';

import '@testing-library/jest-dom/extend-expect';

// Mock react-chartjs-2
jest.mock('react-chartjs-2', () => ({
  Line: () => <div>Mocked Chart</div>, // Mocked chart component
}));

const PLACEHOLDER_TEXT = 'Enter the input data...';
const NAVIGATE_ROVERS_BUTTON = 'Navigate Rovers';
const OUTPUT_ROLE = 'region';
const INVALID_COMMANDS_TEXT = 'Invalid commands. Only L, R, and M are allowed.';
const VALID_OUTPUT_TEXT = '4 5 N';

test('renders Mars Rover Navigator form', () => {
  render(<RoverNavigator />);
  const headingElement = screen.getByText(/Mars Rover Navigator/i);
  expect(headingElement).toBeInTheDocument();
});

test('handles valid input and produces correct output', () => {
  render(<RoverNavigator />);

  fireEvent.change(screen.getByPlaceholderText(PLACEHOLDER_TEXT), {
    target: { value: '5 5\n1 2 N\nMMRMMMLM' },
  });

  fireEvent.click(screen.getByText(NAVIGATE_ROVERS_BUTTON));

  const outputElement = screen.getByRole(OUTPUT_ROLE);
  expect(outputElement).toHaveTextContent(VALID_OUTPUT_TEXT);
});

test('handles invalid input gracefully', () => {
  render(<RoverNavigator />);

  fireEvent.change(screen.getByPlaceholderText(PLACEHOLDER_TEXT), {
    target: { value: '5 5\n1 2 N\nXYZ' },
  });

  fireEvent.click(screen.getByText(NAVIGATE_ROVERS_BUTTON));

  const outputElement = screen.getByRole(OUTPUT_ROLE);
  expect(outputElement).toHaveTextContent(INVALID_COMMANDS_TEXT);
});

test('renders RoverNavigator and handles input correctly', () => {
  render(<RoverNavigator />);

  const chart = screen.queryByText('Mocked Chart');

  expect(chart).toBeNull();

  fireEvent.change(screen.getByPlaceholderText(PLACEHOLDER_TEXT), {
    target: {
      value: `5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM`,
    },
  });

  fireEvent.click(screen.getByText(NAVIGATE_ROVERS_BUTTON));

  const outputElement = screen.getByRole(OUTPUT_ROLE);
  expect(outputElement).toHaveTextContent('1 3 N 5 1 E');
  expect(chart).toBeDefined();

  expect(screen.getByText('Mocked Chart')).toBeInTheDocument();
});
