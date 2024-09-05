import { useState } from "react";
import { Button } from "../../components/Button";
import { Heading } from "../../components/Heading";
import { InputCard } from "../../components/InputCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const subHead = "Enter your information to create an account";

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error,setError]= useState("")
    const navigate = useNavigate();

    const handleClick = (event) => {
        event.preventDefault();
        navigate("/signin");
    };

    const handleSignUp = async () => {
        setLoading(true);
        if (!email || !firstName || !lastName || !password) {
            setError('All fields are required.');
            setLoading(false);
            return;
        }
        
        const formData = {
            userName: email,
            firstName,
            lastName,
            password
        };
        console.log(password);
        

        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", formData);
            console.log("Response received:", response);

            if (response.status === 200) {
                localStorage.setItem('authToken', response.data.token);
                navigate("/signin");
            } else {
                setError("An error occoured during signup,please try again")
            }
        } catch (error) {
            console.error("Error during signin", error);
            setError('An error occurred during signup. Please try again.');
            
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="pt-20 min-h-screen w-screen bg-cover bg-center bg-[url('/src/images/dr4.jpg')]">
            <div className=" text-center lg:text-left lg:ml-12 lg:mx-0 w-[400px] h-[600px] mx-auto mt-0 my-8 p-4 border border-secondary rounded-lg shadow-lg bg-black bg-opacity-90">
                <Heading name={"SIGN UP"} subhead={subHead} />

                {error && (
                    <p className="text-red-500 mb-4">{error}</p>
                )}

                <div className="ml-6">
                    <InputCard
                        label={"First Name"}
                        placeholder={"John"}
                        onChange={(e) => setFirstName(e.target.value)}
                        
                    />
                    <InputCard
                        label={"Last Name"}
                        placeholder={"Doe"}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <InputCard
                        label={"Email"}
                        placeholder={"abc@example.com"}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputCard
                        label={"Password"}
                        placeholder={""}
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="lg:text-center">
                        <Button
                            label={loading ? "Signing Up..." : "Sign Up"}
                            onClick={handleSignUp}
                            disabled={loading}
                        />
                        <div className="mt-2 pr-10">
                            Already have an account?
                            <a className="underline cursor-pointer" onClick={handleClick}>
                                Login
                            </a>
                        </div>
                    </div>


                </div>
            </div>
        </div>

    );
};
