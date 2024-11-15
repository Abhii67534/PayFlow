import React, { useEffect, useState } from 'react';
import Graph from '../components/Graph';
import TransactionForm from '../components/TransactionForm';
import Labels from '../components/Labels';
import List from '../components/List';
import axios from 'axios';
import { getLabels } from '../helper/helper';

function ExpenseTracker() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No authentication token found.');
        }

        const response = await axios.get('http://ec2-18-206-114-27.compute-1.amazonaws.com:3000/api/v1/budget/list', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (Array.isArray(response.data)) {
          setTransactions(response.data);
          setLabels(getLabels(response.data));
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (err) {
        console.error('Error fetching transactions:', err); // Log the actual error
        setError('An error occurred while fetching transactions.');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []); // Empty dependency array ensures this runs only on initial render

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="pt-2 min-h-screen w-screen bg-cover bg-center bg-[url('/src/images/dr4.jpg')]">
      <div className='font-bold text-4xl text-blue-300 flex justify-center mb-10 mt-5'>BUDGET OVERVIEW</div>
      <div className='sm:flex justify-around p-6 pt-0'>
        <div className='w-full sm:w-1/2'>
          <Graph transactions={transactions} /> 
        </div>
        <div className='mt-10 ml-10 sm:mt-0 w-[400px] sm:content-center lg:w-[500px]'>
          <Labels labels={labels} /> {/* Pass labels to Labels */}
        </div>
      </div>

      <div className='flex justify-center m-10'>
        <TransactionForm />
      </div>

      <div>
        <List transactions={transactions} />
      </div>
    </div>
  );
}

export default ExpenseTracker;
