import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import TextAreaInput from './TextAreaInput';

import '@testing-library/jest-dom/extend-expect';

describe('TextAreaInput Component', () => {
  test('renders the textarea with the correct initial value', () => {
    render(<TextAreaInput value='initial value' onChange={() => {}} />);

    const textarea = screen.getByPlaceholderText('Enter the input data...');

    expect(textarea).toBeInTheDocument();
    expect(textarea.value).toBe('initial value');
  });

  test('calls the onChange handler when the textarea value changes', () => {
    const handleChange = jest.fn();

    render(<TextAreaInput value='' onChange={handleChange} />);

    const textarea = screen.getByPlaceholderText('Enter the input data...');

    fireEvent.change(textarea, { target: { value: 'new value' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
  });

  test('displays updated value when props change', () => {
    const { rerender } = render(
      <TextAreaInput value='initial value' onChange={() => {}} />,
    );

    const textarea = screen.getByPlaceholderText('Enter the input data...');

    expect(textarea.value).toBe('initial value');

    rerender(<TextAreaInput value='updated value' onChange={() => {}} />);
    expect(textarea.value).toBe('updated value');
  });
});
