import { useContext } from "react";
import { authContext } from "../../Provider/Authprovider";
import { Helmet } from "react-helmet-async";


const MyProfile = () => {
    const {user} = useContext(authContext)
    return (
        <div>
            <Helmet>
                <title>Dashboard | My-Profile</title>
            </Helmet>
            <h3 className="text-xl font-bold">My Profile:</h3>
            <div className="">
                <img className="w-52 rounded-md" src={user?.photoURL} alt="" />
                <p className="">Name: {user?.displayName}</p>
                <p className="">Email: {user?.email}</p>
            </div>
        </div>
    );
};

export default MyProfile;