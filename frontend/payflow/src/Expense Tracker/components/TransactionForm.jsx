import React, { useState } from 'react';
import { InputCard } from '../../components/InputCard';
import { Button } from '../../components/Button';
import axios from "axios";

const TransactionForm = () => {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("Investment");
    const userId = localStorage.getItem("userId");
    
    
    const handleClick = async () => {
        if (!name || !amount || !type) {
            console.error("All fields are required");
            return;
        }
    
        const formData = { userId: localStorage.getItem('userId'), name, amount: parseFloat(amount), type };
        console.log(formData);
    
        try {
            const response = await axios.post("http://ec2-18-206-114-27.compute-1.amazonaws.com:3000/api/v1/budget/transaction", formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
    
            if (response.status === 200) {
                console.log("Transaction added successfully");
                window.location.href = '/budget';
            } else {
                console.error("Error: ", response.data.message || "Failed to add transaction");
            }
        } catch (error) {
            console.error("Error during transaction submission: ", error.response?.data?.message || error.message);
        }
    };

    return (
        <div className='border-2 border-secondary rounded-md p-6 w-full'>
            <h3 className='font-bold text-3xl text-rose-300 flex justify-center mb-4'>New Transaction</h3>

            <div>
                <InputCard
                    label={"Transaction Name"}
                    placeholder={"Enter the transaction name"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <InputCard
                    label={"Amount"}
                    placeholder={"Enter the amount"}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type="number" // Ensure it's a number input
                />
                <div className="mt-4">
                    <label className="block text-white mb-2">Type</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full p-2 rounded-md bg-gray-800 text-white"
                    >
                        <option value="Investment">Investment</option>
                        <option value="Expense">Expense</option>
                        <option value="Savings">Savings</option>
                    </select>
                </div>
                <div className='flex justify-center mt-4'>
                    <Button label={"Submit Transaction"} onClick={handleClick} />
                </div>
            </div>
        </div>
    );
};

export default TransactionForm;
