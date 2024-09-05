import { useNavigate } from "react-router-dom"
import { Button } from "../../components/Button"
import { Heading } from "../../components/Heading"
import { InputCard } from "../../components/InputCard"
import { useState } from "react"
import axios from "axios"
const subHead = "Please enter your credentials to access your account"
export const Signin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(""); 

    const navigate = useNavigate()
    const handleClick = (event) => {
        event.preventDefault();
        navigate("/signup")
    }

    const handleSignin = async () => {
        const formData = {
            userName: email,
            password: password
        }
        try {
            console.log(formData);
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", formData);
            if (response.status == 200) {
                console.log("successful")
                const token = response.data.token
                const userId = response.data.userId
                

                localStorage.setItem("authToken", token)
                localStorage.setItem("userId", userId)

                const getBal = await axios.get("http://localhost:3000/api/v1/account/balance", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                localStorage.setItem("balance", getBal.data.balance)

                navigate("/dashboard")

            } else {
                // Handle different response statuses if needed
                setError('Incorrect username or password.');
            }
        } catch (error) {
            console.error("Error during signin", error);
            setError('An error occurred during signin. Please try again.');
        }

    }
    return (
        <div className="pt-20 h-screen w-screen bg-cover bg-center bg-[url('/src/images/dr4.jpg')]">
            <div className=" text-center lg:text-left lg:ml-12 lg:mx-0 w-[400px] h-[600px] mx-auto mt-0 my-8 p-4 border border-secondary rounded-lg shadow-lg bg-black bg-opacity-90">
                <Heading name={"SIGN IN"} subhead={subHead} />

                {error && (
                    <p className="text-red-500 mb-4">{error}</p>
                )}
                
                <div className="ml-5">
                    <InputCard label={"Email"} placeholder={"abc@example.com"} onChange={(e) => {
                        setEmail(e.target.value)
                    }} />
                    <InputCard label={"Password"} placeholder={"******"} name={"password"}  onChange={(e) => {
                        setPassword(e.target.value)
                    }} />
                </div>
                <div className="lg:text-center">
                    <Button label={"Sign In"} onClick={handleSignin} />
                    <div>
                        Doesn't have an account? <a className="underline cursor-pointer" onClick={handleClick} >Sign up</a>
                    </div>
                </div>

            </div>
        </div>

    )
}