import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const extractUsers = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/user/userinfo");

                // Get logged-in user ID from localStorage
                const loggedInUserId = localStorage.getItem("userId");

                // Filter out the logged-in user from the list of users
                const filteredUsers = response.data.users.filter(user => user._id !== loggedInUserId);

                setUsers(filteredUsers);
            } catch (error) {
                console.error("Failed to fetch users", error);
            }
        };
        extractUsers();
    }, []);

    const handleClick = (userId) => {
        console.log("Navigating to /send with userId:", userId);
        try {
            navigate(`/send?userId=${userId}`);
        } catch (error) {
            console.error("Navigation error:", error);
        }
    };

    return (
        <div>
            <div className="pl-2 font-bold text-xl mb-8">
                All Users
            </div>
            {users.length > 0 ? (
                users.map((user) => (
                    <div key={user._id}>
                        <div className="flex font-semibold items-center justify-between content-center pr-10 pl-2 mb-4">
                            <div className="flex">
                                <div className="pr-2">{user.firstName}</div>
                                <div>{user.lastName}</div>
                            </div>
                            <Button label={"Send Money"} onClick={() => handleClick(user._id)} />
                        </div>
                    </div>
                ))
            ) : (
                <p>No users found</p>
            )}
        </div>
    );
};
