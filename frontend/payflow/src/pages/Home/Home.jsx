import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";

export const Home = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate("/signup")
    }
    const handleSignIn = () => {
        navigate("/signin")
    }
    return (
        <div className="h-screen w-screen bg-cover bg-center bg-[url('/src/images/dr4.jpg')]">
            <div className="text-blue-200 pt-20 pl-10 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                <div>
                    Send Money to your loved
                </div>
                <div className="pl-2 sm:pl-5">
                    ones with just a click
                </div>
            </div>
            <p className="text-blue-200 pl-10 text-left p-4 sm:text-sm md:text-base lg:text-lg max-w-md">
                Take your financial life online. Your PayFlow
                account will be a one-stop-shop for sending money,budget management and currency exchange.
            </p>
            <div className="pl-20 flex">
                <div className="pr-10">
                    <Button label={"Register Now !"} onClick={handleClick} />
                </div>

                <div>
                <Button label={"Sign In  !"} onClick={handleSignIn} />
                </div>
            </div>

        </div>
    );
};
