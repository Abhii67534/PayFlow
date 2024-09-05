// Labels.jsx
import React from 'react';
import { LabelComponent } from './LabelComponent';

function Labels({ labels }) {
  return (
    <div>
      <div className='border-2 border-secondary rounded-md bg-black bg-opacity-90'>
        {labels.map(({ type, color, totalAmount, percent }) => (
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
