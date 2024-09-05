import React from 'react';

const List = ({ transactions }) => {

  return (
    <div className='border-2 border-secondary rounded-md p-4 bg-black bg-opacity-90 pb-10 mx-10'>
      <h3 className='flex justify-center text-2xl text-rose-300 font-semibold mb-4'>LIST OF TRANSACTIONS</h3>
      <div className='flex justify-around font-bold'>
        <div>Description</div>
        <div>Type</div>
        <div>Amount</div>
      </div>
      {transactions.map((trans) => (
        <div key={trans._id} className='flex justify-around border-b py-2'>
          <div>{trans.transName}</div>
          <div>{trans.type}</div>
          <div>${trans.amount.toFixed(2)}</div>
        </div>
      ))}
    </div>
  );
};

export default List;
