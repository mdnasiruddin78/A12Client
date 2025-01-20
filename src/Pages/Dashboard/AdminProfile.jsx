import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { authContext } from "../../Provider/Authprovider";


const AdminProfile = () => {

    const { user } = useContext(authContext)

    return (
        <div>
            <Helmet>
                <title>Dashboard | Admin-Profile</title>
            </Helmet>
            <h3 className="text-xl font-bold">Admin Profile:</h3>
            <div className="flex items-center space-x-4">
                <div>
                    <img className="w-32 h-32 rounded-full" src={user?.photoURL} alt="" />
                </div>
                <div>
                    <p className="">Name: {user?.displayName}</p>
                    <p className="">Email: {user?.email}</p>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;