import { useEffect, useState } from "react"
import { Balance } from "../../components/Balance"
import { Heading } from "../../components/Heading"
import { Users } from "../../components/Users"
import { UserSearch } from "../../components/UserSearch"
import { useNavigate } from "react-router-dom"

export const Dashboard = () => {
    const navigate = useNavigate();
    const balance = localStorage.getItem("balance");
    const fixedBal = parseFloat(balance).toFixed(2);

    const handleExchange = () => {
        navigate("/exchange")
    }

    const handleBudget = () => {
        navigate("/budget")
    }

    return <div className="pt-2 h-screen w-screen bg-cover bg-center bg-[url('/src/images/dr4.jpg')]">
        <div className="pl-6 ">
            <div className="flex justify-center ">
                <Heading name={"DASHBOARD"} placeholder={""} />
            </div>

            <div className="p-5 flex justify-center mb-10">
                <button className="mr-10 h-[400px] btn btn-xs sm:btn-md md:btn-lg  btn-secondary btn-outline" onClick={handleExchange}>Currency Exchange</button>
                <button className="mr-10 h-[400px] btn btn-xs sm:btn-md md:btn-lg  btn-secondary btn-outline" onClick={handleBudget}>Budget Tracker </button>
            </div>


            <Balance amount={fixedBal} />
            <UserSearch />

        </div>
    </div>

}

