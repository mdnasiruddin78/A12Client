import { useContext } from "react";
import { authContext } from "../../Provider/Authprovider";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import HomeCard from "../../Components/HomeCard";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import MyprofileCard from "../../Components/MyprofileCard";


const MyProfile = () => {

    const { user } = useContext(authContext)
    const axiosPublic = UseAxiosPublic()
    // const { data: myPosts = [] , refetch } = useQuery({
    //     queryKey: ['myPosts'],
    //     queryFn: async () => {
    //         const res = await axiosPublic.get(`/addPost/${user?.email}`)
    //         console.log(res.data)
    //         return res.data
    //     }
    // })

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
                </div>
            </div>
            <h3 className="text-xl font-bold py-4">My 3 Recent Posts:</h3>
            {/* <div className="grid grid-cols-1 gap-4">
                {
                    myPosts.map(myPost => <MyprofileCard key={myPost._id} myPost={myPost}></MyprofileCard>)
                }
            </div> */}
        </div>
    );
};

export default MyProfile;