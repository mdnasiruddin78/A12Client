import { useContext } from "react";
import { authContext } from "../../Provider/Authprovider";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import MyprofileCard from "../../Components/MyprofileCard";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";


const MyProfile = () => {

    const { user } = useContext(authContext)
    const axiosSecure = UseAxiosSecure()
    const { data: myPosts = []} = useQuery({
        queryKey: ['myPosts'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/emailLimit/${user?.email}`)
            console.log(res.data)
            return res.data
        }
    })

    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/singleUser/${user?.email}`)
            return res.data;
        }
    })

    return (
        <div>
            <Helmet>
                <title>Dashboard | My-Profile</title>
            </Helmet>
            <h3 className="text-xl font-bold">My Profile:</h3>
            <div className="flex items-center space-x-4">
                <div>
                    <img className="w-32 h-32 rounded-full" src={user?.photoURL} alt="" />
                </div>
                <div>
                    <p className="">Name: {user?.displayName}</p>
                    <p className="">Email: {user?.email}</p>
                    <p>
                        {
                            users?.badge === 'Gold' ? <div>Badge: <span className="btn btn-ghost btn-xs bg-orange-600">{users?.badge}</span></div> : <div>Badge: <span className="btn btn-ghost btn-xs bg-brown-600">{users?.badge}</span></div>
                        }
                    </p>
                </div>
            </div>
            <h3 className="text-xl font-bold py-4">My 3 Recent Posts:</h3>
            <div className="grid grid-cols-1 gap-4">
                {
                    myPosts && myPosts.length > 0 ? myPosts.map(myPost => <MyprofileCard key={myPost._id} myPost={myPost}></MyprofileCard>) : <p className="text-red-500">You Have No Posts</p>
                }
            </div>
        </div>
    );
};

export default MyProfile;