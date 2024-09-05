import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { InputCard } from '../../components/InputCard';
import { Button } from '../../components/Button';

const CurrencyExchange = () => {
    const [conversion, setConversion] = useState(null);
    const [finalamt, setFinalAmt] = useState(null)
    const [fromCurrency, setFromCurrency] = useState("");
    const [toCurrency, setToCurrency] = useState("");
    const [amount, setAmount] = useState("");



    const handleClick = async () => {
        try {
            const response = await axios.get(`https://v6.exchangerate-api.com/v6/a08f54361f85bb75a51d7724/pair/${fromCurrency}/${toCurrency}/${amount}`);
            if (response.status === 200) {
                const rate = response.data.conversion_rate;
                setFinalAmt(rate * amount)
            } else {
                console.error("Something went wrong with the conversion");
            }
        } catch (error) {
            console.error("Error fetching the conversion rate:", error);
        }
    }
    return (
        <div className="pt-20 h-screen w-screen bg-cover bg-center bg-[url('/src/images/dr4.jpg')]">
            <div className=" text-center lg:text-left lg:ml-12 lg:mx-0 w-[800px] h-[400px] mx-auto mt-0 my-8 p-4 border border-secondary rounded-lg shadow-lg bg-black bg-opacity-90">
            <div className='text-3xl font-bold pb-10'>
                Currency Exchange
            </div>
                <div className='flex justify-around'>
                    <InputCard label={"From(Currency)"} placeholder={"Example-USD"} onChange={(e) => { setFromCurrency(e.target.value) }} />
                    <InputCard label={"To(Currency)"} placeholder={"Example-INR"}  onChange={(e) => { setToCurrency(e.target.value) }} />
                </div>

                <div className='flex justify-around '>
                    <InputCard label={"Amount"} placeholder={""} onChange={(e) => { setAmount(e.target.value) }} />
                    <div >

                        <div className='font-bold text-lg m-0 p-0' >
                        Result
                    </div>
                    <div className='mt-2 w-[300px] h-[42px] border-2 rounded-lg bg-zinc-900 bg-opacity-90 content-center'>
                        {finalamt ? parseFloat(finalamt).toFixed(2) : "--"}
                    </div>
                </div>

            </div>
            <div className='p-10'>
                <Button label={"Convert"} onClick={handleClick} />
            </div>


        </div>

        </div >
    )
}

export default CurrencyExchange
