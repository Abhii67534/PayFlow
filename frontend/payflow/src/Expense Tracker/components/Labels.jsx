// Labels.jsx
import React from 'react';
import { LabelComponent } from './LabelComponent';

function Labels({ labels }) {
  // Default labels to display when no labels are provided
  const defaultLabels = [
    { type: 'Investment', color: '#4CAF50', totalAmount: 0, percent: 0 },
    { type: 'Savings', color: '#2196F3', totalAmount: 0, percent: 0 },
    { type: 'Expense', color: '#F44336', totalAmount: 0, percent: 0 },
  ];

  // Use default labels if none are provided
  const labelsToDisplay = labels && labels.length > 0 ? labels : defaultLabels;

  return (
    <div>
      <div className='border-2 border-secondary rounded-md bg-black bg-opacity-90'>
        {labelsToDisplay.map(({ type, color, totalAmount, percent }) => (
          <LabelComponent 
            key={type}
            label={type}
            color={color}
            amount={totalAmount.toFixed(2)}
            percentage={percent.toFixed(2)}
          />
        ))}
      </div>
    </div>
  );
}

export default Labels;
