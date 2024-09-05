
import { Button } from "../../components/Button";
import { InputCard } from "../../components/InputCard";
import { useState } from "react";
import axios from "axios";

export const SendMoney = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const recieverId = urlParams.get("userId");

    const [amount, setAmount] = useState("");

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const senderId = localStorage.getItem("userId");
    console.log("Sender id", senderId ,"amaount",amount ,"rec id",recieverId)

    const formData = {
        senderId,
        recieverId,
        amount
    }

    const handleSendMoney = async () => {
        if (!amount || !recieverId || !senderId) {
            // Handle error (e.g., show a message or log an error)
            console.error("Amount or User ID or sender ID is missing");
            return;
        }



        try {
            const response = await axios.post("http://localhost:3000/api/v1/account/transfer", {formData});

           if(response.status ==200){
            console.log("Send Money Success")
           }
        } catch (error) {
            // Handle error
            console.error("Error sending money:", error);
        }
    };

    return (
        <div className="pt-10 h-screen w-screen bg-cover bg-center bg-[url('/src/images/sky.jpg')]">
            <div className="w-[400px] h-[300px] mx-auto my-8 p-4 border border-gray-200 rounded-lg shadow-lg bg-black bg-opacity-90">
                <div className="text-2xl text-center font-bold mb-10">
                    Send Money
                </div>
                <div className="flex justify-center mb-6">
                    <InputCard
                        label={"Amount in $"}
                        placeholder={"Enter amount"}
                        value={amount}
                        onChange={handleAmountChange}
                    />
                </div>
                <div className="flex justify-center">
                    <Button label={"Send Money"} onClick={handleSendMoney} />
                </div>
            </div>
        </div>

    );
};
