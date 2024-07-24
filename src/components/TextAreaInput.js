import React from 'react';

const TextAreaInput = ({ value, onChange }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      rows='10'
      cols='50'
      placeholder='Enter the input data...'
    />
  );
};

export default TextAreaInput;
