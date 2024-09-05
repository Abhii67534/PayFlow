import React, { useState } from 'react'
import { InputCard } from '../../components/InputCard'
import { Button } from '../../components/Button'
import axios from "axios";

const TransactionForm=()=> {
    const [name,setName] = useState("")
    const [amount, setAmount]= useState("")
    const [type,setType]= useState("Investment")

    const handleClick = async ()=>{
        const formData = {name,amount,type};

        const response = await axios.post("http://localhost:3000/api/v1/budget/transaction",formData)

        if(response.status == 200){
            window.location.href = '/budget';
        }else{
            console.error("we ran into error")
        }
    }
    return (
        <div className='border-2  border-secondary rounded-md p-6 w-full'>
            <h3 className='font-bold text-3xl text-rose-300 flex justify-center mb-4'>New Transaction</h3>

            <div>
                <InputCard label={"Expense Type"} onChange={(e)=>{setName(e.target.value)}}/>
                <InputCard label={"Amount"} onChange={(e)=>{setAmount(e.target.value)}}/>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="Investment" defaultValue>Investment</option>
                    <option value="Expense" >Expense</option>
                    <option value="Savings" >Savings</option>
                </select>
                <div className='flex justify-center mt-4'>
                    <Button label={"Submit Transaction"} onClick={handleClick}/>
                </div>
            </div>

        </div>
    )
}

export default TransactionForm
