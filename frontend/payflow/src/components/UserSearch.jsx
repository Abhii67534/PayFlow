import { useState } from "react";
import { Button } from "./Button";
import { InputCard } from "./InputCard";
import axios from "axios";
import { Users } from "./Users";

export const UserSearch = () => {
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState(null);
  const handleClick = async () => {
    try {
      const response = await axios.get("http://ec2-18-206-114-27.compute-1.amazonaws.com:3000/api/v1/user/bulk", { params: { filter } });
      if (response.status === 200) {
        setUsers(response.data.users)

      } else {
        console.error("No users found");
      }
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const handleSendMoney = (userId) => {
    console.log("Navigating to /send with userId:", userId);
    try {
      navigate(`/send?userId=${userId}`);
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };


  return (
    <div>
      <div className="flex items-center content-center">
        <InputCard
          label={"Users"}
          placeholder={"Search users"}
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        />
        <div className="ml-10 mt-5">
          <Button label={"Submit"} onClick={handleClick} />
        </div>
      </div>
      <div className="md:w-[700px] border-2 border-secondary mr-10 bg-black bg-opacity-80 rounded-lg p-5 mt-20">

        <div>
          {users ? (
            users.map((user) => (
              <div key={user._id}>
                <div className="flex font-semibold items-center justify-between content-center pr-10 pl-2 mb-4">
                  <div className="flex ">
                    <div className="pr-2">{user.firstName}</div>
                    <div>{user.lastName}</div>
                  </div>
                  <Button label={"Send Money"} onClick={() => handleSendMoney(user._id)} />
                </div>

              </div>



            ))

          ) : (
            <Users />
          )}
        </div>
      </div>
    </div>

  );
};
