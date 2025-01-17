import { useContext } from "react";
import { authContext } from "../../Provider/Authprovider";


const MyProfile = () => {
    const {user} = useContext(authContext)
    return (
        <div>
            <h3 className="text-xl font-bold">My Profile:</h3>
            <div className="">
                <img className="w-52 rounded-md" src={user?.photoURL} alt="" />
                <p className="text-gray-500">Name: {user?.displayName}</p>
                <p className="text-gray-500">Email: {user?.email}</p>
            </div>
        </div>
    );
};

export default MyProfile;