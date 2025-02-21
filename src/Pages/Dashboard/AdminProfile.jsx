import { Helmet } from "react-helmet-async";
import { useContext, useState } from "react";
import { authContext } from "../../Provider/Authprovider";
import { useForm } from "react-hook-form";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { FaCommentDots, FaUsers } from "react-icons/fa";
import { BsFillPostcardFill } from "react-icons/bs";
import React from "react";
import { Chart } from "react-google-charts";


const AdminProfile = () => {

    const { user } = useContext(authContext)
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = UseAxiosSecure()
    const [allUser, setAllUser] = useState([]);
    const [recived ,setRecived] = useState([]);
    const [comments,setComments] = useState([])

    const data = [
        ["Element", "Density", { role: "style" }],
        ["Total-Users", allUser.length, "#b87333"], // RGB value
        ["Total-Posts", recived.length, "silver"], // English color name
        ["Total-Comments",comments.length , "gold"],
    ];

    const onSubmit = data => {
        const tagName = {
            tag: data.tag,
        }
        // console.log(tagName)
        axiosSecure.post('/addTags', tagName)
            .then(res => {
                // console.log(res.data)
                if (res.data.insertedId) {
                    reset()
                    toast.success('Tag Added Successfully!')
                }
            })
    }

    const { data: recivedData = []} = useQuery({
        queryKey: ['recivedData'],
        queryFn: async () => {
            const res = await axiosSecure.get('/addPost')
            setRecived(res.data)
            return res.data
        }
    })

    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            setAllUser(res.data)
            return res.data;
        }
    })

    const { data: comment = [] } = useQuery({
        queryKey: ['comment'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allComment')
            setComments(res.data)
            return res.data;
        }
    })

    return (
        <div>
            <Helmet>
                <title>Dashboard | Admin-Profile</title>
            </Helmet>
            <h3 className="text-xl font-bold text-white">Admin Profile:</h3>
            <div className="flex items-center space-x-4">
                <div>
                    <img className="w-32 h-32 rounded-full border-2 border-blue-600" src={user?.photoURL} alt="" />
                </div>
                <div>
                    <p className="text-white">Name: {user?.displayName}</p>
                    <p className="text-white">Email: {user?.email}</p>
                </div>
            </div>
            <div className="flex space-x-4 py-4 text-white">
                <div className="flex items-center space-x-3">
                    <div>
                        <h3>Users</h3>
                    </div>
                    <div className="flex items-center space-x-3">
                        <FaUsers />
                        <p>{users.length}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <div>
                        <h3>Posts</h3>
                    </div>
                    <div className="flex items-center space-x-3">
                        <BsFillPostcardFill className="text-xl" />
                        <p>{recivedData.length}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <div>
                        <h3>Comments</h3>
                    </div>
                    <div className="flex items-center space-x-3">
                        <FaCommentDots className="text-xl" />
                        <p>{comment.length}</p>
                    </div>
                </div>
            </div>
            <h3 className="text-xl font-bold text-white">pie chart:</h3>
            <Chart chartType="ColumnChart" width="100%" height="100%" data={data} className="mb-5"/>
            <h3 className="text-xl font-bold text-white">Add Tags:</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                <div>
                    <p className="text-white">Tag Name:</p>
                    <input {...register("tag", { required: true })}
                        type="text"
                        placeholder="enter a tag name"
                        className='block lg:w-1/2 w-full px-4 py-2 text-white bg-[#262626] border border-white rounded-lg focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                    />
                </div>
                <button className="btn bg-blue-700 border-none text-white">Submit</button>
            </form>
        </div>
    );
};

export default AdminProfile;